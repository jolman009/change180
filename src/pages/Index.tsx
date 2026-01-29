import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import About from "@/components/About";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import QuizCTA from "@/components/QuizCTA";
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
          <Hero />
          <About />
          <WhoWeHelp />
          <QuizCTA />
          <Services />
          <Packages />
          <Testimonials />
          <FAQ />
          <Newsletter />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
