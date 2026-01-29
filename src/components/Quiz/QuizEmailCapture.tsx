import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizEmailCaptureProps {
  onSubmit: (email: string, firstName: string) => void;
}

const QuizEmailCapture = ({ onSubmit }: QuizEmailCaptureProps) => {
  const { t } = useLanguage();
  
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; email?: string } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = t('quiz.email.validation.firstNameRequired');
    }
    
    if (!email.trim()) {
      newErrors.email = t('quiz.email.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('quiz.email.validation.emailInvalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    onSubmit(email.trim(), firstName.trim());
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full"
      >
        {/* Card */}
        <div className="bg-background rounded-3xl p-8 md:p-10 shadow-card border border-border">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Headline */}
          <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-2">
            {t('quiz.email.headline')}
          </h2>
          
          {/* Subheadline */}
          <p className="text-muted-foreground text-center mb-8">
            {t('quiz.email.subheadline')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name Field */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t('quiz.email.firstName')}
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                  }}
                  placeholder={t('quiz.email.firstNamePlaceholder')}
                  className={`pl-10 rounded-xl ${
                    errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t('quiz.email.email')}
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder={t('quiz.email.emailPlaceholder')}
                  className={`pl-10 rounded-xl ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg font-medium"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                  />
                  {t('quiz.email.submitting')}
                </>
              ) : (
                <>
                  {t('quiz.email.submitButton')}
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Shield size={14} />
            <span>{t('quiz.email.privacy')}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizEmailCapture;