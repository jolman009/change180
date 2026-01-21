import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden gradient-hero pt-24 pb-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-peach-100 rounded-full opacity-40 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-gold-muted rounded-full opacity-50 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-peach-200 rounded-full opacity-30 blur-xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-peach-100 text-primary px-4 py-2 rounded-full mb-8"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">Faith-Centered Life Coaching</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight"
          >
            Change Your Direction.
            <span className="block text-primary">Transform Your Life.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            At Change 180, we help individuals and families experience meaningful, 
            faith-rooted transformation by addressing emotional wellness, purpose, 
            and personal growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg shadow-card hover:shadow-elevated transition-all"
            >
              Start Your Journey
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={scrollToServices}
              variant="outline"
              size="lg"
              className="border-2 border-foreground/20 hover:border-primary hover:text-primary rounded-full px-8 py-6 text-lg transition-all"
            >
              Explore Services
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            You don't need to have it all figured out — you just need a willingness to take the next step.
          </motion.p>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
