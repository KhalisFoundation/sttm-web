export interface SilenceDetectionConfig {
  threshold?: number;
  durationMs?: number;
  fftSize?: number;
  smoothingTimeConstant?: number;
}

export interface SilenceDetectionCallbacks {
  onSilenceDetected: () => void;
}

export class SilenceDetector {
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private rafId: number | null = null;
  private silenceStartTime: number | null = null;
  private hasDetectedAudio: boolean = false;
  
  private threshold: number;
  private durationMs: number;
  private onSilenceDetected: () => void;

  constructor(
    analyser: AnalyserNode,
    callbacks: SilenceDetectionCallbacks,
    config: SilenceDetectionConfig = {}
  ) {
    this.analyser = analyser;
    this.onSilenceDetected = callbacks.onSilenceDetected;
    this.threshold = config.threshold ?? 0.03;
    this.durationMs = config.durationMs ?? 1500;

    // Initialize data array
    const fftSize = config.fftSize ?? 2048;
    if (analyser.fftSize !== fftSize) {
      analyser.fftSize = fftSize;
    }
    analyser.smoothingTimeConstant = config.smoothingTimeConstant ?? 0.1;
    this.dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  private checkAudioLevel = () => {
    if (!this.analyser || !this.dataArray) return;

    // @ts-expect-error - Web Audio API type definition issue with Uint8Array
    this.analyser.getByteTimeDomainData(this.dataArray);

    // RMS calculation
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const v = (this.dataArray[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / this.dataArray.length);
    const isSilent = rms < this.threshold;
    const now = performance.now();

    if (!isSilent) {
      this.hasDetectedAudio = true;
      this.silenceStartTime = null;
    }

    if (this.hasDetectedAudio && isSilent) {
      if (this.silenceStartTime === null) {
        this.silenceStartTime = now;
      } else if (now - this.silenceStartTime >= this.durationMs) {
        this.onSilenceDetected();
        this.stop();
        return;
      }
    }

    if (this.rafId !== null) {
      this.rafId = requestAnimationFrame(this.checkAudioLevel);
    }
  };

  start(): void {
    if (!this.analyser || this.rafId !== null) return;

    // Reset state
    this.silenceStartTime = null;
    this.hasDetectedAudio = false;

    // Ensure data array is properly sized
    if (!this.dataArray || this.dataArray.length !== this.analyser.frequencyBinCount) {
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }

    this.rafId = requestAnimationFrame(this.checkAudioLevel);
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.silenceStartTime = null;
    this.hasDetectedAudio = false;
  }

  destroy(): void {
    this.stop();
    this.analyser = null;
    this.dataArray = null;
  }
}

// Helper function to create audio context and analyser from a stream
export function createAudioAnalyser(
  stream: MediaStream,
  config: { fftSize?: number; smoothingTimeConstant?: number } = {}
): { audioContext: AudioContext; analyser: AnalyserNode } {
  const AudioContextClass =
    window.AudioContext ||
    // @ts-expect-error Safari webkit prefix
    window.webkitAudioContext;

  const audioContext = new AudioContextClass();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  
  analyser.fftSize = config.fftSize ?? 2048;
  analyser.smoothingTimeConstant = config.smoothingTimeConstant ?? 0.1;
  source.connect(analyser);

  return { audioContext, analyser };
}
