// One-off Khalis AI question for sttm-web — no conversation, no follow-up.
//
// Talks to the new Khalis AI backend through the same-origin proxy the Express
// server exposes at /api/khalis-ai/* (see server/khalis-ai-proxy.js), which
// handles the backend's Origin/cookie/CSRF constraints. Each call establishes a
// fresh session, asks one question, reads the whole SSE response, and returns
// the grounded answer plus the shabad/verse ids the UI needs. The result feeds
// the same "Ask Khalis AI" UI the legacy gurbanichatbot used to.

const BASE = '/api/khalis-ai';
const SHABAD_ID_PREFIX = 'sttm:shabad:';

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// banidb ShabadID from a Khalis `sttm:shabad:<N>` id (or null).
function toBanidbShabadId(khalisShabadId?: string): string | null {
  if (!khalisShabadId || !khalisShabadId.startsWith(SHABAD_ID_PREFIX)) return null;
  const id = khalisShabadId.slice(SHABAD_ID_PREFIX.length);
  return /^\d+$/.test(id) ? id : null;
}

// banidb VerseID from an answer-verse evidence id `...:verse:<N>` (or null).
function banidbVerseIdFromEvidenceId(evidenceId?: string): string | null {
  if (!evidenceId) return null;
  const m = /:verse:(\d+)$/.exec(evidenceId);
  return m ? m[1] : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TurnEvent { type?: string; data?: any; }

// Human labels for the turn's progress stages, shown in the dialog while the AI
// works (mirrors the reference web client's wording).
const STAGE_LABELS: Record<string, string> = {
  searching: 'Searching Gurbani…',
  selecting_sources: 'Selecting Shabads…',
  generating: 'Writing an answer…',
  rewriting: 'Refining the answer…',
  validating: 'Checking the answer…',
  checking_safety: 'Reviewing…',
  auditing: 'Finishing up…',
};

// Parse one SSE frame's `data:` payload into a typed event (or null).
function parseFrame(frame: string): TurnEvent | null {
  const data = frame
    .split(/\r?\n/)
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice('data:'.length).trim())
    .join('');
  if (!data) return null;
  try {
    return JSON.parse(data) as TurnEvent;
  } catch {
    return null;
  }
}

async function establishSession(): Promise<string> {
  const csrfRes = await fetch(`${BASE}/sessions/csrf`, { credentials: 'same-origin' });
  if (!csrfRes.ok) throw new Error(`khalis-ai csrf failed: ${csrfRes.status}`);
  const { csrfToken } = await csrfRes.json();

  const sessionRes = await fetch(`${BASE}/sessions`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': csrfToken,
      'idempotency-key': uuid(),
    },
    body: JSON.stringify({ clientRequestId: uuid() }),
  });
  if (!sessionRes.ok) throw new Error(`khalis-ai session failed: ${sessionRes.status}`);
  const snapshot = await sessionRes.json();
  return snapshot.csrfToken as string;
}

export interface KhalisAiAnswer {
  /** The grounded answer text (empty for a source-only/no-match outcome). */
  answer: string;
  /** banidb ShabadID of the primary shabad the AI grounded in (or null). */
  selectedShabadId: string | null;
  /** banidb VerseID the answer is grounded in (or null). */
  groundedVerseId: string | null;
  /** banidb VerseIDs for the results list (selected first, then related). */
  candidateVerseIds: string[];
}

// Ask one question, streaming the AI's progress stages to `onProgress` (for a
// live "thinking" indicator), and resolve with the grounded answer + ids once
// the terminal event arrives. Throws on a transport/backend failure; resolves
// null when there was nothing to show.
export async function askKhalisAiOnce(
  question: string,
  onProgress?: (stageLabel: string) => void,
): Promise<KhalisAiAnswer | null> {
  const q = (question || '').trim();
  if (!q) return null;

  const csrf = await establishSession();
  const clientRequestId = uuid();
  const res = await fetch(`${BASE}/chat/turn`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      accept: 'text/event-stream',
      'x-csrf-token': csrf,
      'idempotency-key': clientRequestId,
    },
    body: JSON.stringify({ clientRequestId, question: q }),
  });
  if (!res.ok || !res.body) throw new Error(`khalis-ai turn failed: ${res.status}`);

  let answer = '';
  let selectedShabadId: string | null = null;
  let groundedVerseId: string | null = null;
  const candidateVerseIds: string[] = [];

  const handle = (ev: TurnEvent | null) => {
    if (!ev || !ev.type || !ev.data) return;
    if (ev.type === 'progress') {
      if (onProgress) onProgress(STAGE_LABELS[ev.data.stage] || 'Asking Khalis AI…');
    } else if (ev.type === 'sources') {
      const selected = toBanidbShabadId(ev.data.selectedShabadId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const candidates: any[] = Array.isArray(ev.data.candidates) ? ev.data.candidates : [];
      let selectedVerseId: string | null = null;
      const relatedVerseIds: string[] = [];
      for (const c of candidates) {
        const verseId = banidbVerseIdFromEvidenceId(c.answerVerse && c.answerVerse.evidenceId);
        if (!verseId) continue;
        if (toBanidbShabadId(c.shabadId) === selected) selectedVerseId = verseId;
        else relatedVerseIds.push(verseId);
      }
      const ordered = [...(selectedVerseId ? [selectedVerseId] : []), ...relatedVerseIds];
      for (const id of ordered) if (!candidateVerseIds.includes(id)) candidateVerseIds.push(id);
    } else if (ev.type === 'terminal') {
      if (ev.data.outcome === 'answer_complete') {
        answer = (ev.data.answer && ev.data.answer.text) || '';
        selectedShabadId =
          toBanidbShabadId(ev.data.selectedShabad && ev.data.selectedShabad.shabadId) ||
          selectedShabadId;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const answerVerses: any[] = Array.isArray(ev.data.answerVerses) ? ev.data.answerVerses : [];
        for (const av of answerVerses) {
          const verseId = banidbVerseIdFromEvidenceId(av.evidenceId);
          if (verseId) { groundedVerseId = verseId; break; }
        }
      } else if (ev.data.outcome === 'source_only') {
        selectedShabadId = toBanidbShabadId(ev.data.selectedShabadId) || selectedShabadId;
        answer = ev.data.message || '';
      }
    }
  };

  // Stream the SSE frames as they arrive so `onProgress` fires live.
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  for (;;) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const parts = buffer.split(/\r?\n\r?\n/);
    buffer = parts.pop() || '';
    for (const frame of parts) handle(parseFrame(frame));
    if (done) break;
  }
  if (buffer.trim()) handle(parseFrame(buffer));

  if (!answer && !selectedShabadId && candidateVerseIds.length === 0) return null;
  return { answer, selectedShabadId, groundedVerseId, candidateVerseIds };
}

// --- Answer stash: hand the answer from the Search page to the Shabad dialog ---
// The turn runs once on the Search page; the Shabad page then shows that answer
// without asking again. Stored under a single "latest" key rather than keyed by
// the question text — the question in the URL gets (double-)encoded between the
// two pages, so matching on it is unreliable. The ask flow only has one answer
// in play at a time, so the latest is always the right one.
const STASH_KEY = 'khalis-ai:latest-answer';

export function stashAnswer(question: string, answer: string): void {
  try {
    sessionStorage.setItem(STASH_KEY, JSON.stringify({ question, answer }));
  } catch {
    // ignore storage failures (private mode / quota)
  }
}

export function readStashedAnswer(): { question: string; answer: string } | null {
  try {
    const raw = sessionStorage.getItem(STASH_KEY);
    return raw ? (JSON.parse(raw) as { question: string; answer: string }) : null;
  } catch {
    return null;
  }
}
