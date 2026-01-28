import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuizContainer from "@/components/Quiz/QuizContainer";

const Quiz = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-24">
      <QuizContainer />
    </main>
    <Footer />
  </div>
);

export default Quiz;
