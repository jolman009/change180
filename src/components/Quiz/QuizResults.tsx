import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check,
  Download,
  RefreshCw,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Star,
} from 'lucide-react';
import { PopupButton } from 'react-calendly';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { QuizResult } from '@/types/quiz';
import { packageDetails } from '@/data/quizQuestions';

interface QuizResultsProps {
  result: QuizResult;
  firstName: string;
  email: string;
  onRetake: () => void;
}

const QuizResults = ({ result, firstName, email, onRetake }: QuizResultsProps) => {
  const { t, tArray, language } = useLanguage();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const calendlyUrl = 'https://calendly.com/change180lifecoach';
  
  const primaryPackage = packageDetails[result.primaryRecommendation.packageId];
  const secondaryPackage = result.secondaryRecommendation
    ? packageDetails[result.secondaryRecommendation.packageId]
    : null;

  const primaryFeatures = tArray(
    `quiz.results.packageFeatures.${result.primaryRecommendation.packageId}`
  );

  // Get personalized message with fallback
  const getPersonalizedMessage = () => {
    const message = t(result.personalizedMessage);
    // If translation key is returned (not found), use generic message
    if (message === result.personalizedMessage || message.startsWith('quiz.results.messages')) {
      return t(`quiz.results.messages.${result.primaryRecommendation.packageId}.general`);
    }
    return message;
  };

  // Handle PDF download (placeholder - would integrate with PDF generation)
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In production, this would call a PDF generation service
    // For now, we'll create a simple text download
    const pdfContent = `
CHANGE 180 - Your Personal Growth Roadmap
=========================================

Hello ${firstName}!

Based on your quiz results, we recommend: ${t(primaryPackage.nameKey)}

Your Match Score: ${result.primaryRecommendation.matchPercentage}%

${getPersonalizedMessage()}

What You'll Get:
${primaryFeatures.map((f) => `• ${f}`).join('\n')}

Investment: ${primaryPackage.price}
Duration: ${t(primaryPackage.durationKey)}

Ready to start? Book your session at:
https://calendly.com/change180lifecoach

Questions? Contact us at:
change180lifecoach@gmail.com

---
Change 180 Life Coaching
Faith-centered guidance for real-life transformation
change180.org
    `.trim();

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Change180-Growth-Roadmap-${firstName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsGeneratingPdf(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ✨ {t('quiz.results.yourMatch')}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            {t('quiz.results.greeting')}, {firstName}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('quiz.results.basedOnAnswers')}
          </p>
        </motion.div>

        {/* Primary Recommendation Card */}
        <motion.div
          variants={itemVariants}
          className={`rounded-3xl border-2 p-6 md:p-8 mb-8 ${primaryPackage.color}`}
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{primaryPackage.icon}</span>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  {t(primaryPackage.nameKey)}
                </h2>
                <p className="text-muted-foreground">{t(primaryPackage.taglineKey)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-foreground">
                {result.primaryRecommendation.matchPercentage}% {t('quiz.results.matchScore')}
              </span>
            </div>
          </div>

          {/* Personalized Message */}
          <div className="bg-white/50 rounded-2xl p-5 mb-6">
            <h3 className="font-medium text-foreground mb-2">
              {t('quiz.results.whyThisPackage')}
            </h3>
            <p className="text-muted-foreground">{getPersonalizedMessage()}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">
              {t('quiz.results.whatYouGet')}
            </h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {primaryFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price & Duration */}
          <div className="flex flex-wrap gap-6 mb-6 text-sm">
            <div>
              <span className="text-muted-foreground">{t('quiz.results.price')}:</span>
              <span className="ml-2 font-semibold text-foreground text-lg">
                {primaryPackage.price}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('quiz.results.duration')}:</span>
              <span className="ml-2 font-medium text-foreground">
                {t(primaryPackage.durationKey)}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <PopupButton
            url={calendlyUrl}
            rootElement={document.getElementById('root')!}
            text={t('quiz.results.bookNow')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-4 font-medium text-center inline-block"
          />
        </motion.div>

        {/* Secondary Recommendation */}
        {secondaryPackage && result.secondaryRecommendation && (
          <motion.div
            variants={itemVariants}
            className="bg-muted/50 rounded-2xl p-5 mb-8 border border-border"
          >
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <span className="text-xl">{secondaryPackage.icon}</span>
              {t('quiz.results.alsoConsider')}
            </h3>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-serif text-lg text-foreground">
                  {t(secondaryPackage.nameKey)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(secondaryPackage.taglineKey)} • {secondaryPackage.price}
                </p>
              </div>
              <span className="text-sm text-muted-foreground bg-white px-3 py-1 rounded-full">
                {result.secondaryRecommendation.matchPercentage}% {t('quiz.results.matchScore')}
              </span>
            </div>
          </motion.div>
        )}

        {/* Download PDF */}
        <motion.div variants={itemVariants} className="mb-8">
          <Button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            variant="outline"
            className="w-full rounded-full py-6 border-2"
          >
            {isGeneratingPdf ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full mr-2"
                />
                {t('quiz.results.downloadingPdf')}
              </>
            ) : (
              <>
                <Download size={18} className="mr-2" />
                {t('quiz.results.downloadPdf')}
              </>
            )}
          </Button>
        </motion.div>

        {/* Related Resources */}
        {result.relatedBlogSlugs.length > 0 && (
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <BookOpen size={18} />
              {t('quiz.results.relatedResources')}
            </h3>
            <div className="space-y-3">
              {result.relatedBlogSlugs.map((slug) => (
                <Link
                  key={slug}
                  to={`/blog/${slug}`}
                  className="block bg-muted/50 hover:bg-muted rounded-xl p-4 border border-border transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {slug
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-border"
        >
          <Button
            onClick={onRetake}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw size={16} className="mr-2" />
            {t('quiz.results.retakeQuiz')}
          </Button>
          
          <Link to="/#contact">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <MessageCircle size={16} className="mr-2" />
              {t('quiz.results.contactUs')}
            </Button>
          </Link>
        </motion.div>

        {/* Questions prompt */}
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          {t('quiz.results.questions')}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default QuizResults;