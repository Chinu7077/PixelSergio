import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Star, Zap, RotateCcw } from "lucide-react";

interface Fact {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: React.ComponentType<any>;
}

const pokemonFacts: Fact[] = [
  {
    id: 1,
    title: "Original Mascot Plan",
    content: "Pikachu was not the original mascot! Clefairy was initially planned to be the face of Pokémon, but Pikachu was chosen for its more universal appeal.",
    category: "History",
    icon: Star
  },
  {
    id: 2,
    title: "Dual-Type Starter",
    content: "Bulbasaur is the only starter Pokémon from Generation 1 that has dual typing from the beginning (Grass/Poison).",
    category: "Types",
    icon: Sparkles
  },
  {
    id: 3,
    title: "Name Origins",
    content: "Many Pokémon names are puns or combinations! For example, 'Ekans' is 'snake' spelled backwards, and 'Arbok' is 'kobra' backwards.",
    category: "Names",
    icon: Brain
  },
  {
    id: 4,
    title: "Magikarp's Power",
    content: "Despite being considered weak, Magikarp can survive in almost any body of water, even polluted ones, making it one of the most adaptable Pokémon.",
    category: "Biology",
    icon: Zap
  },
  {
    id: 5,
    title: "Psychic Powerhouse",
    content: "Alakazam's brain never stops growing, and its IQ reportedly exceeds 5,000. It can remember everything that ever happened to it, from birth until death.",
    category: "Stats",
    icon: Brain
  },
  {
    id: 6,
    title: "Team Rocket's Inspiration",
    content: "Team Rocket was inspired by the Yakuza, Japanese organized crime syndicates. Their uniforms and hierarchical structure reflect this influence.",
    category: "Characters",
    icon: Star
  },
  {
    id: 7,
    title: "Ditto's Secret",
    content: "Ditto can transform into any Pokémon, but it can't change its face when it transforms - it always keeps its simple dot eyes!",
    category: "Abilities",
    icon: Sparkles
  },
  {
    id: 8,
    title: "Fastest Pokémon",
    content: "Ninjask is one of the fastest Pokémon with a base speed of 160, but in the anime, Electrode is often portrayed as the fastest due to its ability to explode and propel itself.",
    category: "Speed",
    icon: Zap
  },
  {
    id: 9,
    title: "Legendary Genetics",
    content: "Mew contains the DNA of all Pokémon species, which is why it can learn almost every move through TMs and breeding.",
    category: "Legendary",
    icon: Star
  },
  {
    id: 10,
    title: "Type Effectiveness Origin",
    content: "The type effectiveness system was inspired by rock-paper-scissors, but expanded to create strategic depth in battles.",
    category: "Mechanics",
    icon: Brain
  },
  {
    id: 11,
    title: "Pokémon Size Facts",
    content: "Despite its appearance, Gastly is 4'3\" tall and weighs only 0.2 pounds, making it mostly gas. Meanwhile, tiny Cosmoem weighs over 2,200 pounds!",
    category: "Physics",
    icon: Sparkles
  },
  {
    id: 12,
    title: "Evolution Stones",
    content: "Evolution stones were inspired by real-world geology. The Thunder Stone, for example, was based on the concept of piezoelectric crystals that generate electricity when compressed.",
    category: "Items",
    icon: Zap
  },
  {
    id: 13,
    title: "Pokémon Cry Secrets",
    content: "In the original games, Pokémon cries were created by manipulating and combining sound samples. Some cries are actually reversed or modified versions of others!",
    category: "Audio",
    icon: Brain
  },
  {
    id: 14,
    title: "Hidden Power Formula",
    content: "The move Hidden Power's type and power are determined by a complex mathematical formula based on the Pokémon's Individual Values (IVs).",
    category: "Mechanics",
    icon: Sparkles
  },
  {
    id: 15,
    title: "Shiny Odds",
    content: "The chance of encountering a shiny Pokémon in the original Gold/Silver games was 1 in 8,192. This became the standard for many generations!",
    category: "Rarity",
    icon: Star
  },
  {
    id: 16,
    title: "Professor Oak's Secret",
    content: "Professor Oak was originally planned to be the final boss of the original games, but this idea was scrapped during development.",
    category: "Development",
    icon: Brain
  },
  {
    id: 17,
    title: "MissingNo. Mystery",
    content: "MissingNo., the famous glitch Pokémon, appears because the game reads data from areas of memory not meant to contain Pokémon data.",
    category: "Glitches",
    icon: Zap
  },
  {
    id: 18,
    title: "Type Matchup Count",
    content: "With 18 different types, there are 324 possible type matchup combinations in Pokémon battles, creating incredible strategic depth.",
    category: "Strategy",
    icon: Sparkles
  }
];

const categoryColors: { [key: string]: string } = {
  History: "bg-pokemon-red text-white",
  Types: "bg-grass text-white",
  Names: "bg-psychic text-white",
  Biology: "bg-water text-white",
  Stats: "bg-electric text-black",
  Characters: "bg-pokemon-blue text-white",
  Abilities: "bg-fire text-white",
  Speed: "bg-pokemon-yellow text-black",
  Legendary: "bg-pokemon-red text-white",
  Mechanics: "bg-accent text-accent-foreground",
  Physics: "bg-secondary text-secondary-foreground",
  Items: "bg-primary text-primary-foreground",
  Audio: "bg-purple-600 text-white",
  Rarity: "bg-pokemon-yellow text-black",
  Development: "bg-pokemon-blue text-white",
  Glitches: "bg-destructive text-destructive-foreground",
  Strategy: "bg-grass text-white"
};

const Knowledge = () => {
  const navigate = useNavigate();
  const [displayedFacts, setDisplayedFacts] = useState<Fact[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Function to get random facts
  const getRandomFacts = (count: number = 6) => {
    const shuffled = [...pokemonFacts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Initialize with random facts
  useEffect(() => {
    setDisplayedFacts(getRandomFacts(6));
  }, []);

  // Function to shuffle facts with animation
  const shuffleFacts = async () => {
    setIsShuffling(true);
    
    // Wait a bit for the animation to show
    setTimeout(() => {
      setDisplayedFacts(getRandomFacts(6));
      setIsShuffling(false);
    }, 500);
  };

  return (
    <section id="knowledge" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-pokemon text-3xl md:text-4xl text-pokemon-solid-yellow mb-4 text-pokemon-solid">
            📚 Pokémon Knowledge
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover amazing facts and secrets about the Pokémon universe!
          </p>
          <Button
            onClick={shuffleFacts}
            disabled={isShuffling}
            className="bg-gradient-to-r from-pokemon-blue to-pokemon-blue/90 hover:from-pokemon-blue/90 hover:to-pokemon-blue text-white shadow-pokeball hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-2 border-pokemon-blue/20"
          >
            <RotateCcw className={`mr-2 h-4 w-4 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? 'Shuffling...' : 'New Facts'}
          </Button>
        </div>

        {/* Facts Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-500 ${
          isShuffling ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          {displayedFacts.map((fact, index) => {
            const IconComponent = fact.icon;
            return (
              <Card 
                key={`${fact.id}-${index}`} 
                className="h-full shadow-card hover:shadow-hover transition-all duration-300 transform hover:scale-105 bg-card border-2 border-border/50"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <Badge 
                        className={`${
                          categoryColors[fact.category] || 'bg-muted text-muted-foreground'
                        } text-xs font-medium`}
                      >
                        {fact.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3 text-foreground">
                    {fact.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {fact.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Fun Stats Section */}
        <div className="mt-16 text-center">
          <h3 className="font-pokemon text-2xl text-pokemon-solid-yellow mb-8 text-pokemon-solid">Did You Know?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 border-2 border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">1,025</div>
              <div className="text-sm text-muted-foreground">Total Pokémon</div>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 border-2 border-border/50">
              <div className="text-3xl font-bold text-secondary mb-2">18</div>
              <div className="text-sm text-muted-foreground">Different Types</div>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 border-2 border-border/50">
              <div className="text-3xl font-bold text-accent mb-2">1996</div>
              <div className="text-sm text-muted-foreground">First Game Released</div>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 border-2 border-border/50">
              <div className="text-3xl font-bold text-pokemon-red mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Years of Pokémon</div>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>Showing 6 random facts out of {pokemonFacts.length} total facts in our knowledge base</p>
          </div>
          
          {/* My Pokémon GO Journey Button */}
          <div className="mt-12 text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/pokemon-go-journey')}
              className="bg-gradient-to-r from-pokemon-yellow to-pokemon-yellow/90 hover:from-pokemon-yellow/90 hover:to-pokemon-yellow text-black font-semibold px-8 py-3 shadow-electric hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-2 border-pokemon-yellow/20"
            >
              🚀 My Pokémon GO Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Knowledge;