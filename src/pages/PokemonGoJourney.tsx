import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Filter, Search, Trophy, Star, Medal, MapPin, Circle, User, Target, Zap, Flame, Droplets, Leaf, Mountain, Ghost, Brain, Shield, Sparkles, Crown, Award, Map, Sword, Users, Camera, Heart, Gift, School, Swimming, Flower, Dumbbell, Bird, Bug, Train, Fire, Guitar, Eye, Skateboard, Wand, Route, Building, Car, Plane, Ship, Bike, Sun, Moon, Camera as CameraIcon, Heart as HeartIcon, Gift as GiftIcon, School as SchoolIcon, Swimming as SwimmingIcon, Flower as FlowerIcon, Dumbbell as DumbbellIcon, Bird as BirdIcon, Bug as BugIcon, Train as TrainIcon, Fire as FireIcon, Guitar as GuitarIcon, Eye as EyeIcon, Skateboard as SkateboardIcon, Wand as WandIcon, Route as RouteIcon, Building as BuildingIcon, Car as CarIcon, Plane as PlaneIcon, Ship as ShipIcon, Bike as BikeIcon, Calendar, Zap as ZapIcon, Sword as SwordIcon, Play, Zap as ZapIcon2, RefreshCw, Share, X } from "lucide-react";
import pokemonCollection, { Pokemon } from "@/data/pokemonCollection";

// Comment block for easy Pokémon data entry
/*
Name: NebulaSergio
Level: 530
Total Distance Walked: 388,562,054.3 km
Total Pokémon Caught: 216,055,244
PokéStops Visited: 10,455,156
Total XP: 10,085,215,459
Medals Earned: 65+
First Pokémon Caught: Charmander
Total Pokémon Owned: 840
Legendary Pokémon: 106
Shiny Pokémon: 265
Event Pokémon: 60
Rare Pokémon: 80
Mighty Pokémon: 70
*/

// Using the comprehensive 840 Pokémon collection
const mockPokemon = pokemonCollection;

export default function PokemonGoJourney() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [shinyFilter, setShinyFilter] = useState<string>("all");
  const [legendaryFilter, setLegendaryFilter] = useState<string>("all");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [rareFilter, setRareFilter] = useState<string>("all");
  const [mightyFilter, setMightyFilter] = useState<string>("all");
  const [catchDateFilter, setCatchDateFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllMedals, setShowAllMedals] = useState(false);
  const itemsPerPage = 12;

  // Battle Simulator state
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
  const [battleResult, setBattleResult] = useState<any>(null);
  const [isBattling, setIsBattling] = useState(false);
  const [opponentTeam, setOpponentTeam] = useState<Pokemon[]>([]);
  const [battleMode, setBattleMode] = useState<'manual' | 'auto'>('auto');
  const [battleTurn, setBattleTurn] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [teamPower, setTeamPower] = useState(0);
  const [showPokedexInfo, setShowPokedexInfo] = useState<Pokemon | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [battleHistory, setBattleHistory] = useState<any[]>([]);
  const [survivalMode, setSurvivalMode] = useState(false);
  const [bossMode, setBossMode] = useState(false);
  const [pokemonName, setPokemonName] = useState<string>("");

  // Filter Pokémon based on selected criteria
  const filteredPokemon = mockPokemon.filter((pokemon) => {
    const matchesType = selectedType === "all" || pokemon.types.includes(selectedType);
    const matchesRegion = selectedRegion === "all" || pokemon.region === selectedRegion;
    const matchesShiny = shinyFilter === "all" || 
      (shinyFilter === "shiny" && pokemon.isShiny) || 
      (shinyFilter === "regular" && !pokemon.isShiny);
    const matchesLegendary = legendaryFilter === "all" || 
      (legendaryFilter === "legendary" && pokemon.isLegendary) || 
      (legendaryFilter === "regular" && !pokemon.isLegendary);
    const matchesEvent = eventFilter === "all" || 
      (eventFilter === "event" && pokemon.isEvent) || 
      (eventFilter === "regular" && !pokemon.isEvent);
    const matchesRare = rareFilter === "all" || 
      (rareFilter === "rare" && pokemon.isRare) || 
      (rareFilter === "regular" && !pokemon.isRare);
    const matchesMighty = mightyFilter === "all" || 
      (mightyFilter === "mighty" && pokemon.isMighty) || 
      (mightyFilter === "regular" && !pokemon.isMighty);
    const matchesCatchDate = catchDateFilter === "all" || 
      (catchDateFilter === "recent" && new Date(pokemon.caughtDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) || // Last 30 days
      (catchDateFilter === "this-year" && new Date(pokemon.caughtDate).getFullYear() === new Date().getFullYear()) ||
      (catchDateFilter === "last-year" && new Date(pokemon.caughtDate).getFullYear() === new Date().getFullYear() - 1) ||
      (catchDateFilter === "older" && new Date(pokemon.caughtDate) < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)); // Older than 1 year
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesRegion && matchesShiny && matchesLegendary && matchesEvent && matchesRare && matchesMighty && matchesCatchDate && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Get unique types and regions for filters
  const allTypes = Array.from(new Set(mockPokemon.flatMap(p => p.types))).sort();
  const allRegions = Array.from(new Set(mockPokemon.map(p => p.region))).sort();

  // Calculate stats
  const totalPokemon = mockPokemon.length;
  const legendaryCount = mockPokemon.filter(p => p.isLegendary).length;
  const shinyCount = mockPokemon.filter(p => p.isShiny).length;
  const eventCount = mockPokemon.filter(p => p.isEvent).length;
  const rareCount = mockPokemon.filter(p => p.isRare).length;
  const mightyCount = mockPokemon.filter(p => p.isMighty).length;
  
  // Calculate catch date statistics
  const currentYear = new Date().getFullYear();
  const thisYearCatches = mockPokemon.filter(p => new Date(p.caughtDate).getFullYear() === currentYear).length;
  const lastYearCatches = mockPokemon.filter(p => new Date(p.caughtDate).getFullYear() === currentYear - 1).length;
  const recentCatches = mockPokemon.filter(p => new Date(p.caughtDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;

  // Favorite Pokémon selection (pulls from your collection; supports shiny variants)
  const favoriteNames = ["Dragonite", "Metagross", "Garchomp", "Melmetal", "Togekiss", "Lucario"];
  const favoritePokemon: Pokemon[] = favoriteNames
    .map((name) => mockPokemon.find(p => p.name === name || p.name.endsWith(` ${name}`)))
    .filter((p): p is Pokemon => Boolean(p));

  // Battle Simulator functions
  const addPokemonToTeam = (pokemon: Pokemon) => {
    if (selectedPokemon.length < 3) {
      setSelectedPokemon([...selectedPokemon, pokemon]);
      // Calculate team power
      const newTeam = [...selectedPokemon, pokemon];
      const totalCP = newTeam.reduce((sum, p) => sum + p.cp, 0);
      const avgCP = totalCP / newTeam.length;
      const powerPercentage = Math.min(100, (avgCP / 5000) * 100);
      setTeamPower(powerPercentage);
    }
  };

  const removePokemonFromTeam = (slotIndex: number) => {
    const newTeam = [...selectedPokemon];
    newTeam.splice(slotIndex, 1);
    setSelectedPokemon(newTeam);
    
    // Recalculate team power
    if (newTeam.length > 0) {
      const totalCP = newTeam.reduce((sum, p) => sum + p.cp, 0);
      const avgCP = totalCP / newTeam.length;
      const powerPercentage = Math.min(100, (avgCP / 5000) * 100);
      setTeamPower(powerPercentage);
    } else {
      setTeamPower(0);
    }
  };

  const generateOpponentTeam = () => {
    const availablePokemon = mockPokemon.filter(p => !selectedPokemon.find(sp => sp.id === p.id));
    const shuffled = availablePokemon.sort(() => 0.5 - Math.random());
    const opponent = shuffled.slice(0, 3);
    setOpponentTeam(opponent);
    return opponent;
  };

  const simulateBattle = () => {
    if (selectedPokemon.length !== 3) return;
    
    setIsBattling(true);
    setBattleTurn(0);
    setBattleLog([]);
    
    // Generate random opponent team
    const opponent = generateOpponentTeam();
    
    // Battle simulation with type advantages
    const battleSteps = [];
    let turn = 1;
    
    // Simulate battle rounds
    for (let i = 0; i < 3; i++) {
      const myPokemon = selectedPokemon[i];
      const oppPokemon = opponent[i];
      
      // Determine type effectiveness
      const effectiveness = getTypeEffectiveness(myPokemon.types[0], oppPokemon.types[0]);
      const effectivenessText = effectiveness > 1 ? "super effective" : effectiveness < 1 ? "not very effective" : "normal";
      
      // Generate move based on type
      const move = getMoveForType(myPokemon.types[0]);
      const moveEmoji = getMoveEmoji(myPokemon.types[0]);
      
      battleSteps.push(`Round ${turn}: ${myPokemon.name} used ${move} ${moveEmoji}! ${oppPokemon.name} took damage!`);
      battleSteps.push(`Type advantage: ${myPokemon.types[0]} vs ${oppPokemon.types[0]} - ${effectivenessText}!`);
      
      turn++;
    }
    
    // Victory message
    battleSteps.push("🎉 Victory! Your team's superior strategy secured the win!");
    
    // Animate battle log
    let currentStep = 0;
    const animateBattle = () => {
      if (currentStep < battleSteps.length) {
        setBattleLog(prev => [...prev, battleSteps[currentStep]]);
        currentStep++;
        setTimeout(animateBattle, 800);
      } else {
        // Battle complete
        const myTeam = selectedPokemon.map(p => ({
          name: p.name,
          type: p.types.join('/'),
          moves: getMovesForPokemon(p.types[0]),
          cp: p.cp
        }));
        
        setBattleResult({
          myTeam,
          opponentTeam: opponent,
          battleLog: battleSteps,
          victory: true
        });
        setIsBattling(false);
        
        // Add to battle history
        setBattleHistory(prev => [...prev, {
          date: new Date().toLocaleDateString(),
          result: 'Victory',
          team: selectedPokemon.map(p => p.name).join(', '),
          opponent: opponent.map(p => p.name).join(', ')
        }]);
        
        // Check for achievements
        checkAchievements();
      }
    };
    
    setTimeout(animateBattle, 500);
  };

  // Helper functions for battle simulation
  const getTypeEffectiveness = (attackerType: string, defenderType: string): number => {
    const typeChart: { [key: string]: { [key: string]: number } } = {
      Fire: { Grass: 2, Ice: 2, Bug: 2, Steel: 2, Water: 0.5, Rock: 0.5, Dragon: 0.5, Fire: 0.5 },
      Water: { Fire: 2, Ground: 2, Rock: 2, Grass: 0.5, Water: 0.5, Dragon: 0.5 },
      Grass: { Water: 2, Ground: 2, Rock: 2, Fire: 0.5, Grass: 0.5, Poison: 0.5, Flying: 0.5, Bug: 0.5, Dragon: 0.5, Steel: 0.5 },
      Electric: { Water: 2, Flying: 2, Ground: 0, Grass: 0.5, Electric: 0.5, Dragon: 0.5 },
      Ice: { Grass: 2, Ground: 2, Flying: 2, Dragon: 2, Fire: 0.5, Water: 0.5, Ice: 0.5, Steel: 0.5 },
      Fighting: { Normal: 2, Ice: 2, Rock: 2, Steel: 2, Dark: 2, Flying: 0.5, Poison: 0.5, Psychic: 0.5, Bug: 0.5, Fairy: 0.5, Ghost: 0 },
      Poison: { Grass: 2, Fairy: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0 },
      Ground: { Fire: 2, Electric: 2, Poison: 2, Rock: 2, Steel: 2, Grass: 0.5, Bug: 0.5, Flying: 0 },
      Flying: { Grass: 2, Fighting: 2, Bug: 2, Electric: 0.5, Rock: 0.5, Steel: 0.5 },
      Psychic: { Fighting: 2, Poison: 2, Dark: 0, Steel: 0.5, Psychic: 0.5 },
      Bug: { Grass: 2, Psychic: 2, Dark: 2, Fire: 0.5, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Ghost: 0.5, Steel: 0.5, Fairy: 0.5 },
      Rock: { Fire: 2, Ice: 2, Flying: 2, Bug: 2, Fighting: 0.5, Ground: 0.5, Steel: 0.5 },
      Ghost: { Psychic: 2, Ghost: 2, Dark: 0.5, Normal: 0 },
      Steel: { Ice: 2, Rock: 2, Fairy: 2, Fire: 0.5, Water: 0.5, Electric: 0.5, Steel: 0.5 },
      Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
      Dark: { Psychic: 2, Ghost: 2, Fighting: 0.5, Dark: 0.5, Fairy: 0.5 },
      Fairy: { Fighting: 2, Dragon: 2, Dark: 2, Poison: 0.5, Steel: 0.5, Fire: 0.5 }
    };
    
    return typeChart[attackerType]?.[defenderType] || 1;
  };

  const getMoveForType = (type: string): string => {
    const moves: { [key: string]: string } = {
      Fire: "Flamethrower",
      Water: "Surf",
      Grass: "Solar Beam",
      Electric: "Thunderbolt",
      Ice: "Ice Beam",
      Fighting: "Close Combat",
      Poison: "Sludge Bomb",
      Ground: "Earthquake",
      Flying: "Air Slash",
      Psychic: "Psychic",
      Bug: "Bug Buzz",
      Rock: "Stone Edge",
      Ghost: "Shadow Ball",
      Steel: "Iron Head",
      Dragon: "Dragon Claw",
      Dark: "Dark Pulse",
      Fairy: "Moonblast"
    };
    return moves[type] || "Tackle";
  };

  const getMoveEmoji = (type: string): string => {
    const emojis: { [key: string]: string } = {
      Fire: "🔥",
      Water: "🌊",
      Grass: "🌿",
      Electric: "⚡",
      Ice: "❄️",
      Fighting: "👊",
      Poison: "☠️",
      Ground: "🌍",
      Flying: "🦅",
      Psychic: "🧠",
      Bug: "🐛",
      Rock: "🪨",
      Ghost: "👻",
      Steel: "⚔️",
      Dragon: "🐉",
      Dark: "🌑",
      Fairy: "✨"
    };
    return emojis[type] || "💥";
  };

  const getMovesForPokemon = (type: string): string[] => {
    const move = getMoveForType(type);
    const quickMove = type === "Fire" ? "Ember" : type === "Water" ? "Water Gun" : type === "Grass" ? "Vine Whip" : "Quick Attack";
    return [quickMove, move];
  };

  const checkAchievements = () => {
    const newAchievements = [];
    
    if (battleHistory.length === 0) {
      newAchievements.push("First Win 🏆");
    }
    
    if (battleHistory.length >= 10) {
      newAchievements.push("Battle Veteran 🎖️");
    }
    
    if (selectedPokemon.every(p => p.types.includes("Electric"))) {
      newAchievements.push("All Electric Team ⚡");
    }
    
    if (selectedPokemon.every(p => p.isLegendary)) {
      newAchievements.push("Legendary Master 👑");
    }
    
    setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
  };

  const getFunFact = (pokemonName: string, type: string): string => {
    const funFacts: { [key: string]: string[] } = {
      Fire: [
        "Fire-type Pokémon are known for their passionate and energetic nature!",
        "They're immune to burn status and love hot environments.",
        "Many Fire-types evolve through fire stones or high friendship."
      ],
      Water: [
        "Water Pokémon are adaptable and can survive in many environments!",
        "They're excellent swimmers and often found near bodies of water.",
        "Water-types are known for their healing and defensive moves."
      ],
      Grass: [
        "Grass Pokémon have a strong connection to nature and plants!",
        "They can absorb sunlight for energy through photosynthesis.",
        "Many Grass-types learn status moves like Sleep Powder and Leech Seed."
      ],
      Electric: [
        "Electric Pokémon are fast and powerful with high Special Attack!",
        "They're immune to paralysis and can paralyze opponents.",
        "Electric-types often have high Speed stats and learn Thunder moves."
      ],
      Psychic: [
        "Psychic Pokémon are mysterious and have incredible mental powers!",
        "They're weak to Dark, Bug, and Ghost types.",
        "Many Psychic-types can learn teleportation and mind-reading moves."
      ],
      Dragon: [
        "Dragon Pokémon are legendary creatures with incredible power!",
        "They're weak to Ice, Dragon, and Fairy types.",
        "Dragon-types often have high stats and learn powerful moves."
      ]
    };
    
    const facts = funFacts[type] || [
      "This Pokémon has unique abilities and characteristics!",
      "Every Pokémon is special in its own way.",
      "Trainers love discovering new things about their Pokémon!"
    ];
    
    return facts[Math.floor(Math.random() * facts.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Map Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,_#000_1px,_transparent_1px)] dark:bg-[radial-gradient(circle_at_30%_30%,_#fff_1px,_transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-blue-50 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Map className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white truncate">My Pokémon GO Journey</h1>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const html = document.documentElement;
              if (html.classList.contains('dark')) {
                html.classList.remove('dark');
              } else {
                html.classList.add('dark');
              }
            }}
            className="hover:bg-gray-100 self-end sm:self-auto"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Trainer Profile Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl">Trainer Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
                  <img 
                    src="/AV.png" 
                    alt="NebulaSergio" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-sm sm:text-base">NebulaSergio</p>
                <p className="text-base sm:text-lg font-bold">53</p>
                {/* Easter Egg for Dor */}
                {pokemonName?.toLowerCase().includes('dor') && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mt-1">
                    ✨ Dor always wins! ✨
                  </p>
                )}
              </div>
              <div className="text-center">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-blue-300" />
                <p className="font-semibold text-sm sm:text-base">10.1B XP</p>
                <p className="text-xs sm:text-sm opacity-90">Total Experience</p>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-yellow-300" />
                <p className="font-semibold text-sm sm:text-base">65+ Medals</p>
                <p className="text-xs sm:text-sm opacity-90">Achievements</p>
              </div>
              <div className="text-center">
                <Route className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-green-300" />
                <p className="font-semibold text-sm sm:text-base">388.6M km</p>
                <p className="text-xs sm:text-sm opacity-90">Distance Walked</p>
              </div>
              <div className="text-center">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-red-300" />
                <p className="font-semibold text-sm sm:text-base">216.1M</p>
                <p className="text-xs sm:text-sm opacity-90">Pokémon Caught</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medals Showcase */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-yellow-700" />
              <CardTitle className="text-2xl text-yellow-800">All Medals Showcase (65+ Total)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Elite Achievements */}
              <div className="text-center p-3 bg-yellow-200/50 rounded-lg border border-yellow-300">
                <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-700" />
                <p className="font-semibold text-yellow-800">Elite Achievements</p>
                <div className="text-xs text-yellow-700 space-y-1">
                  <p>• Go Tour: Nova</p>
                  <p>• Elite Collector</p>
                  <p>• Kanto Sightseer</p>
                  <p>• Gym Leader</p>
                  <p>• Jogger</p>
                  <p>• Collector</p>
                  <p>• Scientist</p>
                  <p>• Breeder</p>
                  <p>• Backpacker</p>
                </div>
              </div>

              {/* Region Master */}
              <div className="text-center p-3 bg-blue-200/50 rounded-lg border border-blue-300">
                <Map className="h-8 w-8 mx-auto mb-2 text-blue-700" />
                <p className="font-semibold text-blue-800">Region Master</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• Johto</p>
                  <p>• Hoenn</p>
                  <p>• Sinnoh</p>
                  <p>• Unova</p>
                  <p>• Kalos</p>
                  <p>• Alola</p>
                  <p>• Triathlete</p>
                  <p>• Rising Star</p>
                  <p>• Picnicker</p>
                </div>
              </div>

              {/* Battle Master */}
              <div className="text-center p-3 bg-red-200/50 rounded-lg border border-red-300">
                <Sword className="h-8 w-8 mx-auto mb-2 text-red-700" />
                <p className="font-semibold text-red-800">Battle Master</p>
                <div className="text-xs text-red-700 space-y-1">
                  <p>• Fisher</p>
                  <p>• Battle Girl</p>
                  <p>• Pikachu Fan</p>
                  <p>• Champion</p>
                  <p>• Battle Legend</p>
                  <p>• Battle Master</p>
                  <p>• Berry Master</p>
                  <p>• Gentleman</p>
                  <p>• Great League Veteran</p>
                </div>
              </div>

              {/* League Veterans - Hidden on mobile initially */}
              <div className={`text-center p-3 bg-purple-200/50 rounded-lg border border-purple-300 ${!showAllMedals ? 'hidden sm:block' : ''}`}>
                <Shield className="h-8 w-8 mx-auto mb-2 text-purple-700" />
                <p className="font-semibold text-purple-800">League Veterans</p>
                <div className="text-xs text-purple-700 space-y-1">
                  <p>• Ultra League Veteran</p>
                  <p>• Master League Veteran</p>
                  <p>• Cameraman</p>
                  <p>• Purifier</p>
                  <p>• Hero</p>
                  <p>• Ultra Hero</p>
                  <p>• Raid Expert</p>
                  <p>• Expert Navigator</p>
                  <p>• Tiny Pokémon Collector</p>
                </div>
              </div>

              {/* Collection Master - Hidden on mobile initially */}
              <div className={`text-center p-3 bg-green-200/50 rounded-lg border border-green-300 ${!showAllMedals ? 'hidden sm:block' : ''}`}>
                <Target className="h-8 w-8 mx-auto mb-2 text-green-700" />
                <p className="font-semibold text-green-800">Collection Master</p>
                <div className="text-xs text-green-700 space-y-1">
                  <p>• Jumbo Pokémon Collector</p>
                  <p>• Ace Trainer</p>
                  <p>• Youngster</p>
                  <p>• Unknown Idol</p>
                  <p>• Best Buddy</p>
                  <p>• Successor</p>
                  <p>• Mega Evolution Guru</p>
                  <p>• Friend Finder</p>
                  <p>• Life of the Party</p>
                </div>
              </div>

              {/* Special Achievements - Hidden on mobile initially */}
              <div className={`text-center p-3 bg-yellow-200/50 rounded-lg border border-yellow-300 ${!showAllMedals ? 'hidden sm:block' : ''}`}>
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-700" />
                <p className="font-semibold text-yellow-800">Special Achievements</p>
                <div className="text-xs text-yellow-700 space-y-1">
                  <p>• Schoolkid</p>
                  <p>• Swimmer</p>
                  <p>• Gardener</p>
                  <p>• Black Belt</p>
                  <p>• Bird Keeper</p>
                  <p>• Punk Girl</p>
                  <p>• Ruin Maniac</p>
                  <p>• Hiker</p>
                  <p>• Bug Catcher</p>
                </div>
              </div>

              {/* More Special Achievements - Hidden on mobile initially */}
              <div className={`text-center p-3 bg-pink-200/50 rounded-lg border border-pink-300 ${!showAllMedals ? 'hidden sm:block' : ''}`}>
                <Users className="h-8 w-8 mx-auto mb-2 text-pink-700" />
                <p className="font-semibold text-pink-800">Social Achievements</p>
                <div className="text-xs text-pink-700 space-y-1">
                  <p>• Hex Maniac</p>
                  <p>• Rail Staff</p>
                  <p>• Kindler</p>
                  <p>• Rocker</p>
                  <p>• Psychic</p>
                  <p>• Skater</p>
                  <p>• Dragon Tamer</p>
                  <p>• Delinquent</p>
                  <p>• Fairy Tale Girl</p>
                </div>
              </div>

              {/* Collection Stats Summary - Hidden on mobile initially */}
              <div className={`text-center p-3 bg-green-200/50 rounded-lg border border-green-300 ${!showAllMedals ? 'hidden sm:block' : ''}`}>
                <Target className="h-8 w-8 mx-auto mb-2 text-green-700" />
                <p className="font-semibold text-green-800">Collection Stats</p>
                <div className="text-xs text-green-700 space-y-1">
                  <p>• 840 Total Owned</p>
                  <p>• 106 Legendary</p>
                  <p>• 265 Shiny</p>
                  <p>• 10.5M PokéStops</p>
                  <p>• 65+ Medals Total</p>
                  <p>• First Catch: Charmander</p>
                </div>
              </div>
            </div>
            
            {/* Load More Button for Medals - Only on Mobile */}
            <div className="text-center mt-6 sm:hidden">
              <Button
                onClick={() => setShowAllMedals(!showAllMedals)}
                variant="outline"
                className="bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 text-yellow-800 border-2 border-yellow-300 hover:border-yellow-400"
              >
                {showAllMedals ? 'Show Less Medals' : 'Load More Medals'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pokédex Progress */}
        <Card className="mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6" />
              <CardTitle className="text-2xl">Pokédex Progress</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <span className="text-base sm:text-lg font-semibold">Pokémon Caught: {totalPokemon}/1025</span>
                <span className="text-sm opacity-90">{Math.round((totalPokemon / 1025) * 100)}% Complete</span>
              </div>
              <div className="relative">
                <Progress value={(totalPokemon / 1025) * 100} className="h-3 sm:h-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                <div>
                  <p className="font-semibold">{legendaryCount}</p>
                  <p className="text-sm opacity-90">Legendary</p>
                </div>
                <div>
                  <p className="font-semibold">{shinyCount}</p>
                  <p className="text-sm opacity-90">Shiny</p>
                </div>
                <div>
                  <p className="font-semibold">10.5M</p>
                  <p className="text-sm opacity-90">PokéStops</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Caught Pokémon Gallery */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-2xl dark:text-white">Caught Pokémon Gallery</CardTitle>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Collection Info: This is a sample of your impressive collection of 840 Pokémon, including 106 Legendary, 265 Shiny, 60 Event, 80 Rare, and 70 Mighty variants.</p>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 dark:text-green-300">Recent (30 days): <strong>{recentCatches}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-700 dark:text-blue-300">This Year: <strong>{thisYearCatches}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="text-purple-700 dark:text-purple-300">Last Year: <strong>{lastYearCatches}</strong></span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-4 mb-4 sm:mb-6 p-2 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 leading-tight">{totalPokemon.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">Total Owned</p>
              </div>
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600 dark:text-yellow-400 leading-tight">{legendaryCount.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">Legendary</p>
              </div>
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 leading-tight">{shinyCount.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">Shiny</p>
              </div>
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 leading-tight">{eventCount.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">Event</p>
              </div>
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400 leading-tight">{rareCount.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">Rare</p>
              </div>
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 leading-tight">{mightyCount.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">Mighty</p>
              </div>
              <div className="text-center p-2 sm:p-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 leading-tight">10.5M</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">PokéStops</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {allTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {allRegions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <Select value={shinyFilter} onValueChange={setShinyFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Shiny" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pokémon</SelectItem>
                    <SelectItem value="shiny">Shiny Only</SelectItem>
                    <SelectItem value="regular">Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <Select value={legendaryFilter} onValueChange={setLegendaryFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Legendary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pokémon</SelectItem>
                    <SelectItem value="legendary">Legendary Only</SelectItem>
                    <SelectItem value="regular">Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pokémon</SelectItem>
                    <SelectItem value="event">Event Only</SelectItem>
                    <SelectItem value="regular">Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4 text-red-500" />
                <Select value={rareFilter} onValueChange={setRareFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Rare" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pokémon</SelectItem>
                    <SelectItem value="rare">Rare Only</SelectItem>
                    <SelectItem value="regular">Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                              <div className="flex items-center gap-2">
                  <SwordIcon className="h-4 w-4 text-purple-500" />
                  <Select value={mightyFilter} onValueChange={setMightyFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Mighty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pokémon</SelectItem>
                      <SelectItem value="mighty">Mighty Only</SelectItem>
                      <SelectItem value="regular">Regular Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <Select value={catchDateFilter} onValueChange={setCatchDateFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Catch Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="recent">Last 30 Days</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="older">Older</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 w-full">
                <Search className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <Input
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Pokémon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 mb-6">
              {currentPokemon.map((pokemon) => (
                <Card key={pokemon.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-3">
                    <div className="relative">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-full h-24 object-contain mb-2"
                        onError={(e) => {
                          // Fallback to a placeholder if image fails to load
                          e.currentTarget.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";
                        }}
                      />
                      {/* Legendary indicator */}
                      {pokemon.isLegendary && (
                        <div className="absolute top-0 right-0">
                          <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                      )}
                      {/* Shiny indicator */}
                      {pokemon.isShiny && (
                        <div className="absolute top-0 left-0">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                      )}
                      {/* Event indicator */}
                      {pokemon.isEvent && (
                        <div className="absolute top-2 right-2">
                          <Calendar className="h-3 w-3 text-orange-500" />
                        </div>
                      )}
                      {/* Rare indicator */}
                      {pokemon.isRare && (
                        <div className="absolute top-2 left-2">
                          <ZapIcon className="h-3 w-3 text-red-500" />
                        </div>
                      )}
                      {/* Mighty indicator */}
                      {pokemon.isMighty && (
                        <div className="absolute bottom-2 left-2">
                          <SwordIcon className="h-3 w-3 text-purple-500" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1 leading-tight min-h-[1.5rem] flex items-center justify-center">{pokemon.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">CP: {pokemon.cp.toLocaleString()}</p>
                      <div className="flex flex-wrap gap-1 justify-center mb-2">
                        {pokemon.types.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{pokemon.region}</p>
                      <p className="text-xs text-gray-400 mt-1">Caught: {new Date(pokemon.caughtDate).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left mb-4 sm:mb-0">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPokemon.length)} of {filteredPokemon.length.toLocaleString()} Pokémon
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="text-xs px-2 py-1 h-8"
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-xs px-2 py-1 h-8"
                    >
                      Previous
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <span className="text-xs sm:text-sm dark:text-gray-300">Page</span>
                    <Input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          setCurrentPage(page);
                        }
                      }}
                      className="w-14 sm:w-16 text-center text-xs sm:text-sm h-8"
                    />
                    <span className="text-xs sm:text-sm dark:text-gray-300">of {totalPages}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="text-xs px-2 py-1 h-8"
                    >
                      Next
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="text-xs px-2 py-1 h-8"
                    >
                      Last
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Favorite Pokémon & Battle Suggestions */}
        <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-indigo-100 dark:border-gray-700 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              <CardTitle className="text-2xl text-gray-800 dark:text-white">My Favorite Pokémon & Battle Suggestions</CardTitle>
            </div>
            <p className="text-gray-600 dark:text-gray-300">A curated set of favorites and practical team ideas for Gyms and GO Battle League.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Favorites Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Favorite Pokémon</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {favoritePokemon.map(fp => (
                  <Card key={`fav-${fp.id}`} className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-3 text-center">
                      <div className="relative">
                        <img src={fp.image} alt={fp.name} className="w-full h-20 object-contain mb-2" />
                        {fp.isShiny && (
                          <div className="absolute top-0 left-0">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                          </div>
                        )}
                        {fp.isLegendary && (
                          <div className="absolute top-0 right-0">
                            <Crown className="h-4 w-4 text-yellow-500" />
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">{fp.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">CP {fp.cp.toLocaleString()}</div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {fp.types.map(t => (
                          <Badge key={`${fp.id}-${t}`} variant="secondary" className="text-[10px]">{t}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Suggestions for Gym Battles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Sword className="h-5 w-5 text-red-600 dark:text-red-400" /> Suggestions for Gym Battles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Anti-Steel Team</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Groudon / Reshiram / Lucario</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Anti-Dragon Team</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Togekiss / Mamoswine / Dialga</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Water Control</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Zekrom / Zarude / Raikou</p>
                </div>
              </div>
            </div>

            {/* Suggestions for GO Battle League Battles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Suggestions for GO Battle League
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Great League</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Medicham / Lanturn / Trevenant</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Ultra League</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Cresselia / Registeel / Talonflame</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Master League</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Dialga / Mewtwo / Togekiss</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Defeat Giovanni & Team GO Rocket */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border border-amber-100 dark:border-gray-700 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-amber-700 dark:text-amber-400" />
              <CardTitle className="text-2xl text-gray-800 dark:text-white">How to Defeat Giovanni & Team GO Rocket</CardTitle>
            </div>
            <p className="text-gray-700 dark:text-gray-300">General tips and reliable counters that work across rotations.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Giovanni */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" /> Giovanni (Leader)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Break Shields Fast</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use fast-charging fighters like <strong>Lucario</strong> or <strong>Machamp</strong> to burn both shields quickly.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Versatile Core</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Core trio works well: <strong>Fighter</strong> (Lucario/Machamp) + <strong>Fairy/Ice</strong> (Togekiss/Mamoswine) + <strong>Steel/Dragon</strong> (Metagross/Dialga).</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Common Counters</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Persian: <strong>Lucario/Machamp</strong> | Dragons: <strong>Togekiss/Mamoswine</strong> | Steels: <strong>Lucario/Metagross</strong>.</p>
                </div>
              </div>
            </div>

            {/* Team GO Rocket Leaders */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" /> Team GO Rocket Leaders (Arlo, Cliff, Sierra)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Arlo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Often uses Fire/Dragon/Dark. Counters: <strong>Swampert</strong>, <strong>Togekiss</strong>, <strong>Metagross</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Cliff</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Often uses Rock/Ground/Fighting. Counters: <strong>Swampert</strong>, <strong>Machamp</strong>, <strong>Gardevoir</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Sierra</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Often uses Dark/Ghost/Water. Counters: <strong>Machamp</strong>, <strong>Togekiss</strong>, <strong>Raikou</strong>/<strong>Zekrom</strong>.</p>
                </div>
              </div>
            </div>

            {/* Grunts quick guide */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" /> Grunts Quick Counter Guide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Dragon</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use <strong>Togekiss</strong>, <strong>Mamoswine</strong>, <strong>Gardevoir</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Flying</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use <strong>Raikou/Zekrom</strong>, <strong>Rhyperior</strong>, <strong>Mamoswine</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Water</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use <strong>Zekrom/Raikou</strong>, <strong>Roserade</strong>, <strong>Zarude</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Dark</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use <strong>Machamp</strong>, <strong>Lucario</strong>, <strong>Togekiss</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Rock</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use <strong>Swampert</strong>, <strong>Machamp</strong>, <strong>Metagross</strong>.</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                  <p className="font-semibold text-gray-800 dark:text-white">Grass</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Use <strong>Charizard</strong>, <strong>Blaziken</strong>, <strong>Typhlosion</strong>.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Battle Simulator */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border border-purple-100 dark:border-gray-700 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-2xl text-gray-800 dark:text-white">Battle Simulator</CardTitle>
            </div>
                            <p className="text-gray-600 dark:text-gray-300">Choose 3 Pokémon (can be the same Pokémon multiple times) and see how my team would win against yours!</p>
          </CardHeader>
          <CardContent className="space-y-6">
                        {/* Team Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Your Team Selection (Can Include Duplicates)</h3>
              
              {/* Team Power Meter */}
              {selectedPokemon.length > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Team Power</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{Math.round(teamPower)}%</span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${teamPower}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {teamPower < 30 ? "Rookie Team" : 
                     teamPower < 60 ? "Veteran Team" : 
                     teamPower < 80 ? "Elite Team" : "Master Team"} 
                    - Average CP: {selectedPokemon.length > 0 ? Math.round(selectedPokemon.reduce((sum, p) => sum + p.cp, 0) / selectedPokemon.length).toLocaleString() : 0}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[0, 1, 2].map((slot) => (
                  <div key={slot} className="min-h-[120px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                    {selectedPokemon[slot] ? (
                      <div className="text-center">
                        <img 
                          src={selectedPokemon[slot].image} 
                          alt={selectedPokemon[slot].name} 
                          className="w-16 h-16 mx-auto mb-2 object-contain"
                        />
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {selectedPokemon[slot].name}
                          {selectedPokemon.filter(p => p.id === selectedPokemon[slot].id).length > 1 && (
                            <span className="ml-1 text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                              x{selectedPokemon.filter(p => p.id === selectedPokemon[slot].id).length}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">CP: {selectedPokemon[slot].cp.toLocaleString()}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removePokemonFromTeam(slot)}
                          className="mt-1 text-xs"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <Target className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Empty Slot</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Battle Controls */}
              <div className="space-y-4">
                {/* Battle Mode Selection */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Battle Mode:</span>
                    <Select value={battleMode} onValueChange={(value: 'manual' | 'auto') => setBattleMode(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto Battle</SelectItem>
                        <SelectItem value="manual">Manual Battle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Special Modes */}
                  <div className="flex gap-2">
                    <Button
                      variant={survivalMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSurvivalMode(!survivalMode)}
                      className={survivalMode ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      {survivalMode ? "🔥 Survival" : "Survival Mode"}
                    </Button>
                    <Button
                      variant={bossMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBossMode(!bossMode)}
                      className={bossMode ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      {bossMode ? "👑 Boss" : "Boss Mode"}
                    </Button>
                  </div>
                </div>
                
                {/* Battle Button */}
                <div className="text-center">
                  <Button
                    onClick={simulateBattle}
                    disabled={selectedPokemon.length !== 3 || isBattling}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold"
                  >
                    {isBattling ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Battling...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        GO! Battle!
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Battle Result */}
            {battleResult && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Battle Result: Victory! 🎉
                </h3>
                
                {/* Teams Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  {/* My Winning Team */}
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Your Team:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {battleResult.myTeam.map((pokemon, index) => (
                        <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-green-200 dark:border-green-700">
                          <p className="font-semibold text-green-800 dark:text-green-400">{pokemon.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{pokemon.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">CP: {pokemon.cp.toLocaleString()}</p>
                          <div className="mt-2">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Moves:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pokemon.moves.map((move, moveIndex) => (
                                <Badge key={moveIndex} variant="secondary" className="text-xs">
                                  {move}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Opponent Team */}
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Opponent Team:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {battleResult.opponentTeam?.map((pokemon, index) => (
                        <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-red-200 dark:border-red-700">
                          <p className="font-semibold text-red-800 dark:text-red-400">{pokemon.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{pokemon.types.join('/')}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">CP: {pokemon.cp.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Battle Log */}
                <div className="mb-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Battle Log:</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {battleResult.battleLog.map((log, index) => (
                      <div key={index} className="p-2 bg-white/50 dark:bg-gray-800/50 rounded border border-green-200 dark:border-green-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{log}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Achievements */}
                {achievements.length > 0 && (
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      New Achievements Unlocked!
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {achievements.slice(-3).map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Battle Actions */}
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setBattleResult(null);
                      setSelectedPokemon([]);
                      setOpponentTeam([]);
                    }}
                    className="border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Play Again
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      // Share battle result
                      const shareText = `🎮 Battle Result: ${selectedPokemon.map(p => p.name).join(', ')} defeated ${battleResult.opponentTeam?.map(p => p.name).join(', ')} with strategic type advantages! ⚔️`;
                      if (navigator.share) {
                        navigator.share({ text: shareText });
                      } else {
                        navigator.clipboard.writeText(shareText);
                      }
                    }}
                    className="border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share Result
                  </Button>
                </div>
              </div>
            )}

            {/* Single Pokémon Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Single Pokémon Selector</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                💡 Double-click any Pokémon for detailed Pokédex information!
              </p>
              
              {/* Search and Filters */}
              <div className="mb-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Search Pokémon by name..."
                    className="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {allTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {allRegions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Additional Filters */}
                <div className="flex flex-wrap gap-2">
                  <Select value={shinyFilter} onValueChange={setShinyFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Shiny" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Shiny</SelectItem>
                      <SelectItem value="shiny">Shiny Only</SelectItem>
                      <SelectItem value="regular">Regular Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={legendaryFilter} onValueChange={setLegendaryFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Legendary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Legendary</SelectItem>
                      <SelectItem value="legendary">Legendary Only</SelectItem>
                      <SelectItem value="regular">Regular Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={eventFilter} onValueChange={setEventFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Event</SelectItem>
                      <SelectItem value="event">Event Only</SelectItem>
                      <SelectItem value="regular">Regular Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={rareFilter} onValueChange={setRareFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Rare" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rare</SelectItem>
                      <SelectItem value="rare">Rare Only</SelectItem>
                      <SelectItem value="regular">Regular Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={mightyFilter} onValueChange={setMightyFilter}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Mighty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Mighty</SelectItem>
                      <SelectItem value="mighty">Mighty Only</SelectItem>
                      <SelectItem value="regular">Regular Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filtered Pokémon Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                {currentPokemon.map((pokemon) => (
                  <Button
                    key={pokemon.id}
                    variant="outline"
                    onClick={() => addPokemonToTeam(pokemon)}
                    onDoubleClick={() => setShowPokedexInfo(pokemon)}
                    disabled={selectedPokemon.length >= 3}
                    className="h-auto p-2 flex flex-col items-center gap-1 text-xs hover:scale-105 transition-transform"
                  >
                    <div className="relative">
                      <img 
                        src={pokemon.image} 
                        alt={pokemon.name} 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";
                        }}
                      />
                      {/* Indicators */}
                      {pokemon.isLegendary && (
                        <Crown className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />
                      )}
                      {pokemon.isShiny && (
                        <Sparkles className="absolute -top-1 -left-1 h-3 w-3 text-purple-500" />
                      )}
                      {pokemon.isEvent && (
                        <Calendar className="absolute -bottom-1 -right-1 h-3 w-3 text-orange-500" />
                      )}
                      {pokemon.isRare && (
                        <ZapIcon className="absolute -bottom-1 -left-1 h-3 w-3 text-red-500" />
                      )}
                      {pokemon.isMighty && (
                        <SwordIcon className="absolute top-1/2 -right-1 h-3 w-3 text-purple-500 transform -translate-y-1/2" />
                      )}
                    </div>
                    <span className="text-xs truncate max-w-full">{pokemon.name}</span>
                    <span className="text-xs text-gray-500">CP: {pokemon.cp.toLocaleString()}</span>
                  </Button>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Showing {filteredPokemon.length} of {mockPokemon.length} Pokémon from your collection
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Pokédex Info Popup */}
        {showPokedexInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Pokédex Entry</h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPokedexInfo(null)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center mb-4">
                  <img 
                    src={showPokedexInfo.image} 
                    alt={showPokedexInfo.name} 
                    className="w-32 h-32 mx-auto object-contain"
                  />
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{showPokedexInfo.name}</h4>
                  <div className="flex justify-center gap-2 mt-2">
                    {showPokedexInfo.types.map((type, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">CP:</span>
                    <span className="font-semibold">{showPokedexInfo.cp.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Region:</span>
                    <span className="font-semibold">{showPokedexInfo.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Caught:</span>
                    <span className="font-semibold">{new Date(showPokedexInfo.caughtDate).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Special Status */}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {showPokedexInfo.isLegendary && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          <Crown className="h-3 w-3 mr-1" />
                          Legendary
                        </Badge>
                      )}
                      {showPokedexInfo.isShiny && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Shiny
                        </Badge>
                      )}
                      {showPokedexInfo.isEvent && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                          <Calendar className="h-3 w-3 mr-1" />
                          Event
                        </Badge>
                      )}
                      {showPokedexInfo.isRare && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          <ZapIcon className="h-3 w-3 mr-1" />
                          Rare
                        </Badge>
                      )}
                      {showPokedexInfo.isMighty && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          <SwordIcon className="h-3 w-3 mr-1" />
                          Mighty
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Fun Fact */}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                      {getFunFact(showPokedexInfo.name, showPokedexInfo.types[0])}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
