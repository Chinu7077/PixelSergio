import { Button } from "@/components/ui/button";

interface HeroProps {
  onNavigateToSection: (section: string) => void;
}

const Hero = ({ onNavigateToSection }: HeroProps) => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover blur-sm"
          poster="/pokeball-pattern.jpg"
        >
          <source src="/pokemon-background.mp4" type="video/mp4" />
          <source src="/pokemon-background.webm" type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-pokemon-red/20 via-pokemon-blue/20 to-pokemon-yellow/20"></div>
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        

      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Logo with Pokemon Solid styling */}
          <div className="mb-8">
            <h1 className="font-pokemon text-4xl md:text-6xl lg:text-7xl text-pokemon-solid-yellow mb-4 drop-shadow-2xl text-pokemon-solid">
              Pokidex
            </h1>
          </div>
          
          {/* Enhanced Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
            Your ultimate guide to explore, quiz, and learn about the amazing world of <span className="text-pokemon-red font-semibold">Pokémon</span>!
          </p>
          
          {/* CTA Buttons with Pokemon Solid theme */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pokemon-red to-pokemon-red/90 hover:from-pokemon-red/90 hover:to-pokemon-red text-white font-semibold px-8 py-3 shadow-pokeball hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-2 border-pokemon-red/20"
              onClick={() => onNavigateToSection('pokedex')}
            >
              🎯 Explore Pokédex
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-gradient-to-r from-pokemon-yellow to-pokemon-yellow/90 hover:from-pokemon-yellow/90 hover:to-pokemon-yellow text-black font-semibold px-8 py-3 shadow-electric hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-2 border-pokemon-yellow/20"
              onClick={() => onNavigateToSection('quiz')}
            >
              ⚡ Play Quiz
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-gradient-to-r from-pokemon-blue/10 to-pokemon-blue/20 hover:from-pokemon-blue/20 hover:to-pokemon-blue/30 text-pokemon-blue border-2 border-pokemon-blue/30 hover:border-pokemon-blue/50 font-semibold px-8 py-3 shadow-card hover:shadow-hover transition-all duration-300 transform hover:scale-105"
              onClick={() => onNavigateToSection('knowledge')}
            >
              📚 Learn Facts
            </Button>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        
      </div>
    </section>
  );
};

export default Hero;