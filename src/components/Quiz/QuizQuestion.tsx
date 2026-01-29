import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizQuestion = ({
  question,
  selectedOptionId,
  onSelectOption,
  onNext,
  onBack,
  isFirst,
  isLast,
}: QuizQuestionProps) => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-4">
      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-2xl md:text-3xl text-foreground mb-8 text-center"
      >
        {t(question.questionKey)}
      </motion.h2>

      {/* Options */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-10"
      >
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          
          return (
            <motion.button
              key={option.id}
              variants={optionVariants}
              onClick={() => onSelectOption(option.id)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 group ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-4">
                {/* Radio indicator */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/30 group-hover:border-primary/50'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <Check size={14} className="text-primary-foreground" />
                    </motion.div>
                  )}
                </div>

                {/* Option text */}
                <span
                  className={`text-base md:text-lg ${
                    isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {t(option.text)}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center"
      >
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={18} className="mr-2" />
          {t('quiz.navigation.back')}
        </Button>

        {/* Next / See Results Button */}
        <Button
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`rounded-full px-6 ${
            !selectedOptionId
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          {isLast ? t('quiz.navigation.seeResults') : t('quiz.navigation.next')}
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default QuizQuestion;