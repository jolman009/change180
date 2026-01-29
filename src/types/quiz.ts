// Quiz TypeScript Interfaces

export interface QuizOption {
  id: string;
  text: string;
  // Points assigned to each package when this option is selected
  scores: {
    discovery: number;
    clarity: number;
    rooted: number;
    flourish: number;
    family: number;
  };
}

export interface QuizQuestion {
  id: string;
  category: 'lifeStage' | 'challenge' | 'goals' | 'commitment';
  questionKey: string; // Translation key
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
}

export interface QuizScores {
  discovery: number;
  clarity: number;
  rooted: number;
  flourish: number;
  family: number;
}

export interface PackageRecommendation {
  packageId: 'discovery' | 'clarity' | 'rooted' | 'flourish' | 'family';
  score: number;
  matchPercentage: number;
}

export interface QuizResult {
  primaryRecommendation: PackageRecommendation;
  secondaryRecommendation?: PackageRecommendation;
  scores: QuizScores;
  personalizedMessage: string;
  relatedBlogSlugs: string[];
}

export interface QuizUserData {
  email: string;
  firstName: string;
  answers: QuizAnswer[];
  result: QuizResult;
  completedAt: string;
  language: 'en' | 'es';
}

export type QuizStep = 'intro' | 'questions' | 'email' | 'results';