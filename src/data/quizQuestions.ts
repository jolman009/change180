import { QuizQuestion, QuizScores, QuizAnswer, QuizResult, PackageRecommendation } from '@/types/quiz';

/**
 * Quiz Questions
 * 
 * Scoring Philosophy:
 * - Discovery: Best for exploration, first-timers, uncertain about coaching
 * - Clarity: Good for specific transitions, short-term focus
 * - Rooted: Deep work, pattern changes, lasting transformation
 * - Flourish: Long-term commitment, comprehensive change
 * - Family: Anyone with parenting/family challenges
 */
export const quizQuestions: QuizQuestion[] = [
  // Question 1: Life Stage
  {
    id: 'q1-life-stage',
    category: 'lifeStage',
    questionKey: 'quiz.questions.lifeStage',
    options: [
      {
        id: 'single',
        text: 'quiz.options.lifeStage.single',
        scores: { discovery: 2, clarity: 3, rooted: 2, flourish: 2, family: 0 },
      },
      {
        id: 'married-no-kids',
        text: 'quiz.options.lifeStage.marriedNoKids',
        scores: { discovery: 2, clarity: 2, rooted: 3, flourish: 2, family: 1 },
      },
      {
        id: 'parent-young',
        text: 'quiz.options.lifeStage.parentYoung',
        scores: { discovery: 1, clarity: 2, rooted: 3, flourish: 3, family: 4 },
      },
      {
        id: 'parent-teens',
        text: 'quiz.options.lifeStage.parentTeens',
        scores: { discovery: 1, clarity: 2, rooted: 3, flourish: 3, family: 4 },
      },
      {
        id: 'empty-nester',
        text: 'quiz.options.lifeStage.emptyNester',
        scores: { discovery: 2, clarity: 3, rooted: 3, flourish: 2, family: 1 },
      },
      {
        id: 'caregiver',
        text: 'quiz.options.lifeStage.caregiver',
        scores: { discovery: 1, clarity: 2, rooted: 3, flourish: 3, family: 2 },
      },
    ],
  },

  // Question 2: Primary Challenge
  {
    id: 'q2-challenge',
    category: 'challenge',
    questionKey: 'quiz.questions.challenge',
    options: [
      {
        id: 'stress-overwhelm',
        text: 'quiz.options.challenge.stressOverwhelm',
        scores: { discovery: 2, clarity: 3, rooted: 4, flourish: 3, family: 2 },
      },
      {
        id: 'relationships',
        text: 'quiz.options.challenge.relationships',
        scores: { discovery: 2, clarity: 2, rooted: 3, flourish: 4, family: 3 },
      },
      {
        id: 'career-purpose',
        text: 'quiz.options.challenge.careerPurpose',
        scores: { discovery: 3, clarity: 4, rooted: 3, flourish: 2, family: 0 },
      },
      {
        id: 'parenting',
        text: 'quiz.options.challenge.parenting',
        scores: { discovery: 1, clarity: 2, rooted: 3, flourish: 3, family: 5 },
      },
      {
        id: 'faith-spiritual',
        text: 'quiz.options.challenge.faithSpiritual',
        scores: { discovery: 2, clarity: 2, rooted: 4, flourish: 4, family: 1 },
      },
      {
        id: 'life-transition',
        text: 'quiz.options.challenge.lifeTransition',
        scores: { discovery: 3, clarity: 4, rooted: 3, flourish: 2, family: 1 },
      },
    ],
  },

  // Question 3: What Do You Hope to Achieve?
  {
    id: 'q3-goals',
    category: 'goals',
    questionKey: 'quiz.questions.goals',
    options: [
      {
        id: 'clarity-direction',
        text: 'quiz.options.goals.clarityDirection',
        scores: { discovery: 4, clarity: 5, rooted: 2, flourish: 1, family: 1 },
      },
      {
        id: 'healing-peace',
        text: 'quiz.options.goals.healingPeace',
        scores: { discovery: 1, clarity: 2, rooted: 4, flourish: 4, family: 2 },
      },
      {
        id: 'personal-growth',
        text: 'quiz.options.goals.personalGrowth',
        scores: { discovery: 2, clarity: 3, rooted: 4, flourish: 4, family: 1 },
      },
      {
        id: 'family-harmony',
        text: 'quiz.options.goals.familyHarmony',
        scores: { discovery: 1, clarity: 2, rooted: 3, flourish: 3, family: 5 },
      },
      {
        id: 'confidence',
        text: 'quiz.options.goals.confidence',
        scores: { discovery: 2, clarity: 3, rooted: 4, flourish: 3, family: 1 },
      },
      {
        id: 'faith-alignment',
        text: 'quiz.options.goals.faithAlignment',
        scores: { discovery: 2, clarity: 2, rooted: 4, flourish: 5, family: 2 },
      },
    ],
  },

  // Question 4: Commitment Level
  {
    id: 'q4-commitment',
    category: 'commitment',
    questionKey: 'quiz.questions.commitment',
    options: [
      {
        id: 'exploring',
        text: 'quiz.options.commitment.exploring',
        scores: { discovery: 5, clarity: 2, rooted: 1, flourish: 0, family: 1 },
      },
      {
        id: 'ready-short',
        text: 'quiz.options.commitment.readyShort',
        scores: { discovery: 3, clarity: 5, rooted: 2, flourish: 1, family: 2 },
      },
      {
        id: 'ready-invest',
        text: 'quiz.options.commitment.readyInvest',
        scores: { discovery: 1, clarity: 2, rooted: 5, flourish: 4, family: 3 },
      },
      {
        id: 'fully-committed',
        text: 'quiz.options.commitment.fullyCommitted',
        scores: { discovery: 0, clarity: 1, rooted: 3, flourish: 5, family: 3 },
      },
    ],
  },

  // Question 5: How important is faith in your growth journey?
  {
    id: 'q5-faith-importance',
    category: 'goals',
    questionKey: 'quiz.questions.faithImportance',
    options: [
      {
        id: 'central',
        text: 'quiz.options.faithImportance.central',
        scores: { discovery: 2, clarity: 2, rooted: 4, flourish: 5, family: 2 },
      },
      {
        id: 'important',
        text: 'quiz.options.faithImportance.important',
        scores: { discovery: 2, clarity: 3, rooted: 3, flourish: 3, family: 2 },
      },
      {
        id: 'open',
        text: 'quiz.options.faithImportance.open',
        scores: { discovery: 3, clarity: 3, rooted: 2, flourish: 2, family: 2 },
      },
      {
        id: 'prefer-secular',
        text: 'quiz.options.faithImportance.preferSecular',
        scores: { discovery: 3, clarity: 4, rooted: 2, flourish: 1, family: 2 },
      },
    ],
  },

  // Question 6: What's driving your decision to seek coaching now?
  {
    id: 'q6-urgency',
    category: 'commitment',
    questionKey: 'quiz.questions.urgency',
    options: [
      {
        id: 'crisis',
        text: 'quiz.options.urgency.crisis',
        scores: { discovery: 2, clarity: 3, rooted: 4, flourish: 3, family: 3 },
      },
      {
        id: 'turning-point',
        text: 'quiz.options.urgency.turningPoint',
        scores: { discovery: 2, clarity: 4, rooted: 4, flourish: 3, family: 2 },
      },
      {
        id: 'gradual-desire',
        text: 'quiz.options.urgency.gradualDesire',
        scores: { discovery: 3, clarity: 3, rooted: 3, flourish: 4, family: 2 },
      },
      {
        id: 'curious',
        text: 'quiz.options.urgency.curious',
        scores: { discovery: 5, clarity: 2, rooted: 1, flourish: 1, family: 1 },
      },
    ],
  },
];

/**
 * Calculate quiz scores from answers
 */
export function calculateScores(answers: QuizAnswer[]): QuizScores {
  const scores: QuizScores = {
    discovery: 0,
    clarity: 0,
    rooted: 0,
    flourish: 0,
    family: 0,
  };

  answers.forEach((answer) => {
    const question = quizQuestions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) return;

    scores.discovery += option.scores.discovery;
    scores.clarity += option.scores.clarity;
    scores.rooted += option.scores.rooted;
    scores.flourish += option.scores.flourish;
    scores.family += option.scores.family;
  });

  return scores;
}

/**
 * Get package recommendations sorted by score
 */
export function getRecommendations(scores: QuizScores): PackageRecommendation[] {
  const maxPossibleScore = quizQuestions.length * 5; // 5 is max score per question
  
  const recommendations: PackageRecommendation[] = [
    {
      packageId: 'discovery',
      score: scores.discovery,
      matchPercentage: Math.round((scores.discovery / maxPossibleScore) * 100),
    },
    {
      packageId: 'clarity',
      score: scores.clarity,
      matchPercentage: Math.round((scores.clarity / maxPossibleScore) * 100),
    },
    {
      packageId: 'rooted',
      score: scores.rooted,
      matchPercentage: Math.round((scores.rooted / maxPossibleScore) * 100),
    },
    {
      packageId: 'flourish',
      score: scores.flourish,
      matchPercentage: Math.round((scores.flourish / maxPossibleScore) * 100),
    },
    {
      packageId: 'family',
      score: scores.family,
      matchPercentage: Math.round((scores.family / maxPossibleScore) * 100),
    },
  ];

  return recommendations.sort((a, b) => b.score - a.score);
}

/**
 * Get personalized message key based on top recommendation
 */
export function getPersonalizedMessageKey(
  primaryPackage: PackageRecommendation['packageId'],
  answers: QuizAnswer[]
): string {
  // Find the challenge answer to personalize further
  const challengeAnswer = answers.find((a) => a.questionId === 'q2-challenge');
  const challengeId = challengeAnswer?.optionId || 'general';

  return `quiz.results.messages.${primaryPackage}.${challengeId}`;
}

/**
 * Get related blog post slugs based on quiz answers
 */
export function getRelatedBlogSlugs(answers: QuizAnswer[]): string[] {
  const blogMapping: Record<string, string[]> = {
    'stress-overwhelm': ['finding-peace-in-chaos'],
    'parenting': ['supporting-your-childs-emotions'],
    'life-transition': ['embracing-new-beginnings'],
    'faith-spiritual': ['embracing-new-beginnings', 'finding-peace-in-chaos'],
    'relationships': ['supporting-your-childs-emotions'],
    'career-purpose': ['embracing-new-beginnings'],
    'healing-peace': ['finding-peace-in-chaos'],
  };

  const relatedSlugs = new Set<string>();

  answers.forEach((answer) => {
    const slugs = blogMapping[answer.optionId];
    if (slugs) {
      slugs.forEach((slug) => relatedSlugs.add(slug));
    }
  });

  // Return up to 2 related posts
  return Array.from(relatedSlugs).slice(0, 2);
}

/**
 * Generate complete quiz result
 */
export function generateQuizResult(answers: QuizAnswer[]): QuizResult {
  const scores = calculateScores(answers);
  const recommendations = getRecommendations(scores);
  
  const primaryRecommendation = recommendations[0];
  const secondaryRecommendation = recommendations[1].score > 0 ? recommendations[1] : undefined;

  return {
    primaryRecommendation,
    secondaryRecommendation,
    scores,
    personalizedMessage: getPersonalizedMessageKey(primaryRecommendation.packageId, answers),
    relatedBlogSlugs: getRelatedBlogSlugs(answers),
  };
}

/**
 * Package details for results display
 */
export const packageDetails = {
  discovery: {
    nameKey: 'packages.discovery.name',
    taglineKey: 'packages.discovery.tagline',
    price: '$75',
    duration: '60 minutes',
    durationKey: 'packages.discovery.duration',
    color: 'bg-blue-50 border-blue-200',
    icon: '🌱',
  },
  clarity: {
    nameKey: 'packages.clarity.name',
    taglineKey: 'packages.clarity.tagline',
    price: '$300',
    duration: '4 weeks',
    durationKey: 'packages.clarity.duration',
    color: 'bg-amber-50 border-amber-200',
    icon: '✨',
  },
  rooted: {
    nameKey: 'packages.rooted.name',
    taglineKey: 'packages.rooted.tagline',
    price: '$600',
    duration: '8 weeks',
    durationKey: 'packages.rooted.duration',
    color: 'bg-green-50 border-green-200',
    icon: '🌳',
  },
  flourish: {
    nameKey: 'packages.flourish.name',
    taglineKey: 'packages.flourish.tagline',
    price: '$1,200',
    duration: '12 weeks',
    durationKey: 'packages.flourish.duration',
    color: 'bg-purple-50 border-purple-200',
    icon: '🦋',
  },
  family: {
    nameKey: 'packages.family.name',
    taglineKey: 'packages.family.tagline',
    price: '$110',
    duration: 'per session',
    durationKey: 'packages.family.duration',
    color: 'bg-rose-50 border-rose-200',
    icon: '👨‍👩‍👧‍👦',
  },
};