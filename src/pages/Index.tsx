import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import About from "@/components/About";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import QuizCTA from "@/components/QuizCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <WhoWeHelp />
      <QuizCTA /> 
      <Services />
      <Packages />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
