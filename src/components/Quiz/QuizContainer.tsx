import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { QuizStep, QuizAnswer, QuizResult, QuizUserData } from '@/types/quiz';
import { quizQuestions, generateQuizResult } from '@/data/quizQuestions';
import QuizIntro from './QuizIntro';
import QuizQuestion from './QuizQuestion';
import QuizProgress from './QuizProgress';
import QuizEmailCapture from './QuizEmailCapture';
import QuizResults from './QuizResults';

interface QuizContainerProps {
  onComplete?: (userData: QuizUserData) => void;
  isModal?: boolean;
  onClose?: () => void;
}

const QuizContainer = ({ onComplete, isModal = false, onClose }: QuizContainerProps) => {
  const { language } = useLanguage();
  
  const [step, setStep] = useState<QuizStep>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [userData, setUserData] = useState<{ email: string; firstName: string } | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Handle starting the quiz
  const handleStart = useCallback(() => {
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }, []);

  // Handle answer selection
  const handleAnswer = useCallback((optionId: string) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update or add answer
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === currentQuestion.id);
      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        optionId,
      };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  }, [currentQuestionIndex]);

  // Navigate to next question or email capture
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate results before email capture
      const quizResult = generateQuizResult(answers);
      setResult(quizResult);
      setStep('email');
    }
  }, [currentQuestionIndex, answers]);

  // Navigate to previous question
  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStep('intro');
    }
  }, [currentQuestionIndex]);

  // Handle email form submission
  const handleEmailSubmit = useCallback(
    (email: string, firstName: string) => {
      setUserData({ email, firstName });
      
      // Create complete user data
      const completeUserData: QuizUserData = {
        email,
        firstName,
        answers,
        result: result!,
        completedAt: new Date().toISOString(),
        language,
      };
      
      // Call onComplete callback if provided
      onComplete?.(completeUserData);
      
      // Move to results
      setStep('results');
    },
    [answers, result, language, onComplete]
  );

  // Restart the quiz
  const handleRetake = useCallback(() => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserData(null);
    setResult(null);
  }, []);

  // Get current answer for the current question
  const currentAnswer = answers.find(
    (a) => a.questionId === quizQuestions[currentQuestionIndex]?.id
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-full ${isModal ? 'max-h-[90vh] overflow-y-auto' : 'min-h-screen'}`}
    >
      {/* Close button for modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close quiz"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <AnimatePresence mode="wait">
        {/* Intro Step */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <QuizIntro onStart={handleStart} />
          </motion.div>
        )}

        {/* Questions Step */}
        {step === 'questions' && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="py-8 px-4 md:px-8"
          >
            <div className="max-w-2xl mx-auto">
              <QuizProgress
                current={currentQuestionIndex + 1}
                total={quizQuestions.length}
              />
              
              <QuizQuestion
                question={quizQuestions[currentQuestionIndex]}
                selectedOptionId={currentAnswer?.optionId}
                onSelectOption={handleAnswer}
                onNext={handleNext}
                onBack={handleBack}
                isFirst={currentQuestionIndex === 0}
                isLast={currentQuestionIndex === quizQuestions.length - 1}
              />
            </div>
          </motion.div>
        )}

        {/* Email Capture Step */}
        {step === 'email' && (
          <motion.div
            key="email"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <QuizEmailCapture onSubmit={handleEmailSubmit} />
          </motion.div>
        )}

        {/* Results Step */}
        {step === 'results' && result && userData && (
          <motion.div
            key="results"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <QuizResults
              result={result}
              firstName={userData.firstName}
              email={userData.email}
              onRetake={handleRetake}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizContainer;