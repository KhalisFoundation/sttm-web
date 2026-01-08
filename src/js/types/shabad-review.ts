export interface VerseFeedback {
  verseId: number;
  status: 'approved' | 'rejected' | '';
  details: {
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
  verses: VerseFeedback[];
}

export type RatingType = 'accuracy' | 'readability' | 'tone' | 'appropriateness';