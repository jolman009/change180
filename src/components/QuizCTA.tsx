import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const QuizCTA = () => {
  const { t, tArray } = useLanguage();
  
  const features = tArray('quiz.cta.features');
  const featureIcons = [Sparkles, FileText, Heart];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background rounded-3xl shadow-card border border-border overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              {/* Left - Content */}
              <div className="p-8 md:p-10">
                {/* Badge */}
                <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  {t('quiz.cta.badge')}
                </span>

                {/* Headline */}
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                  {t('quiz.cta.headline')}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {t('quiz.cta.description')}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {features.map((feature, index) => {
                    const Icon = featureIcons[index] || Sparkles;
                    return (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Icon size={16} className="text-primary" />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA Button */}
                <Link to="/quiz">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 group"
                  >
                    {t('quiz.cta.button')}
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </div>

              {/* Right - Decorative */}
              <div className="hidden md:block relative h-full min-h-[300px] bg-gradient-to-br from-primary/10 to-accent/10">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Outer ring */}
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-48 h-48 rounded-full border-2 border-dashed border-primary/20"
                    />
                    
                    {/* Middle ring */}
                    <motion.div
                      animate={{
                        rotate: -360,
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-4 rounded-full border-2 border-dashed border-accent/30"
                    />
                    
                    {/* Inner circle */}
                    <div className="absolute inset-8 rounded-full bg-background shadow-lg flex items-center justify-center">
                      <span className="text-4xl">🧭</span>
                    </div>

                    {/* Floating icons */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-background rounded-full shadow-md flex items-center justify-center"
                    >
                      <span className="text-xl">✨</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-2 -left-6 w-10 h-10 bg-background rounded-full shadow-md flex items-center justify-center"
                    >
                      <span className="text-lg">🌱</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-1/2 -right-8 w-10 h-10 bg-background rounded-full shadow-md flex items-center justify-center"
                    >
                      <span className="text-lg">💫</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizCTA;