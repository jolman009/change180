import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress = ({ current, total }: QuizProgressProps) => {
  const { t } = useLanguage();
  const progress = (current / total) * 100;

  return (
    <div className="mb-8">
      {/* Text indicator */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          {t('quiz.progress.question')} {current} {t('quiz.progress.of')} {total}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index < current
                ? 'bg-primary'
                : index === current - 1
                ? 'bg-primary'
                : 'bg-muted'
            }`}
            initial={{ scale: 0.8 }}
            animate={{
              scale: index === current - 1 ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizProgress;