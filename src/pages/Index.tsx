import Hero from "../components/Hero";
import Pokedex from "../components/Pokedex";
import Quiz from "../components/Quiz";
import Knowledge from "../components/Knowledge";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Hero onNavigateToSection={scrollToSection} />
      <Pokedex />
      <Quiz />
      <Knowledge />
      <Footer onNavigateToSection={scrollToSection} />
    </div>
  );
};

export default Index;
