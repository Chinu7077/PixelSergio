import { Heart } from "lucide-react";

interface FooterProps {
  onNavigateToSection: (section: string) => void;
}

const Footer = ({ onNavigateToSection }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/80 backdrop-blur-md py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h3 className="font-pokemon text-2xl mb-4 text-pokemon-solid-yellow text-pokemon-solid">🎯 Pokidex</h3>
            <p className="text-gray-700 leading-relaxed">
              Your ultimate companion for exploring the wonderful world of Pokémon. 
              Discover, learn, and test your knowledge!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Quick Links</h4>
            <nav className="space-y-2">
              <button
                onClick={scrollToTop}
                className="block w-full text-gray-600 hover:text-pokemon-red transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => onNavigateToSection('pokedex')}
                className="block w-full text-gray-600 hover:text-pokemon-red transition-colors duration-200"
              >
                Pokédex
              </button>
              <button
                onClick={() => onNavigateToSection('quiz')}
                className="block w-full text-gray-600 hover:text-pokemon-red transition-colors duration-200"
              >
                Quiz
              </button>
              <button
                onClick={() => onNavigateToSection('knowledge')}
                className="block w-full text-gray-600 hover:text-pokemon-red transition-colors duration-200"
              >
                Knowledge
              </button>
            </nav>
          </div>

          {/* Fun Stats */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-4 text-gray-800">Pokémon Stats</h4>
            <div className="space-y-2 text-gray-600">
              <div>🎮 1,025 Total Pokémon</div>
              <div>⚡ 18 Different Types</div>
              <div>🏆 10 Regions to Explore</div>
              <div>📚 Fun Facts & Trivia</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              Made with <Heart className="h-4 w-4 text-pokemon-red fill-current" /> by Chinu ✨
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Pokidex. This is a fan-made project. Pokémon is a trademark of Nintendo, Game Freak, and Creatures Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;