export interface VerseFeedback {
  verseId: number;
  status: 'approved' | 'rejected' | '';
  translationId: number;
  details: {
    category: string;
    suggested: string;
    comment: string;
  };
}

export interface FeedbackData {
  rating: {
    accuracy: number;
    readability: number;
    tone: number;
    appropriateness: number;
  };
  overallFeedback: string;
  teekaFeedback: string;
  source: string;
  verses: VerseFeedback[];
  email: string;
  shabadId: number;
}

export type AI_Translation_Type = 'pss' | 'pss-padarth' | 'pss_simple';

interface AI_Translation_Base {
  type: AI_Translation_Type,
  prompt_id: number,
  run_id: number,
}

export interface AI_Translation_Text extends AI_Translation_Base {
  type: 'pss' | 'pss_simple',
  translation_id: number,
  translation_text: string,
  is_scholar_reviewed?: number,
}

export interface AI_Translation_Word {
  translation_id: number,
  translation_text: string,
}

export interface AI_Translation_Padarth extends AI_Translation_Base {
  type: 'pss-padarth',
  words: AI_Translation_Word[],
}

export type AI_Translation_Entry = AI_Translation_Text | AI_Translation_Padarth;

export interface AI_Translation_Response {
  verses: Record<string, AI_Translation_Entry[]>;
  count: number;
}

export type RatingType = 'accuracy' | 'readability' | 'tone' | 'appropriateness';