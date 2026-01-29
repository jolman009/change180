import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo = ({ onComplete }: IntroVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Fade out immediately after video ends
      setIsPlaying(false);
    };

    video.addEventListener("ended", handleEnded);

    // Start playing
    video.play().catch(() => {
      // If autoplay fails (browser restrictions), skip intro
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      // Wait for fade out animation to complete
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, onComplete]);

  // Allow skipping by clicking
  const handleSkip = () => {
    setIsPlaying(false);
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center cursor-pointer"
          onClick={handleSkip}
        >
          <video
            ref={videoRef}
            className="max-w-[80vw] max-h-[70vh] w-auto h-auto object-contain"
            muted
            playsInline
            preload="auto"
          >
            <source src="/images/180video_logo.mp4" type="video/mp4" />
          </video>

          {/* Loading caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-muted-foreground text-sm tracking-widest uppercase"
              >
                {t("intro.loading")}
              </motion.span>
            </div>
          </motion.div>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 text-muted-foreground text-xs"
          >
            {t("intro.skip")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo;
