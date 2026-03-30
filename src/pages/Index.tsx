import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import QuizCTA from "@/components/QuizCTA";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import IntroVideo from "@/components/IntroVideo";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Check if user has seen the intro in this session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {showIntro && <IntroVideo onComplete={handleIntroComplete} />}

      {contentVisible && (
        <>
          <Navigation />
          <main className="pt-24">
            <Hero />
            <WhoWeHelp />
            <QuizCTA />
            <Newsletter />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
