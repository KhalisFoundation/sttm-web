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

export interface AI_Translation_Text {
  prompt_id: number,
  run_id: number,
  translation_id: number,
  translation_text: string,
}

export interface AI_Translation_Response {
  padArth: {
    text: AI_Translation_Text[];
  };
  text: AI_Translation_Text[];
}

export type RatingType = 'accuracy' | 'readability' | 'tone' | 'appropriateness';