import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Filter, Search, Trophy, Star, Medal, MapPin, Circle, User, Target, Zap, Flame, Droplets, Leaf, Mountain, Ghost, Brain, Shield, Sparkles, Crown, Award, Map, Sword, Users, Camera, Heart, Gift, School, Swimming, Flower, Dumbbell, Bird, Bug, Train, Fire, Guitar, Eye, Skateboard, Wand, Route, Building, Car, Plane, Ship, Bike, Sun, Moon, Camera as CameraIcon, Heart as HeartIcon, Gift as GiftIcon, School as SchoolIcon, Swimming as SwimmingIcon, Flower as FlowerIcon, Dumbbell as DumbbellIcon, Bird as BirdIcon, Bug as BugIcon, Train as TrainIcon, Fire as FireIcon, Guitar as GuitarIcon, Eye as EyeIcon, Skateboard as SkateboardIcon, Wand as WandIcon, Route as RouteIcon, Building as BuildingIcon, Car as CarIcon, Plane as PlaneIcon, Ship as ShipIcon, Bike as BikeIcon } from "lucide-react";
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
*/

// Using the comprehensive 840 Pokémon collection
const mockPokemon = pokemonCollection;

export default function PokemonGoJourney() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [shinyFilter, setShinyFilter] = useState<string>("all");
  const [legendaryFilter, setLegendaryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesRegion && matchesShiny && matchesLegendary && matchesSearch;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Map Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,_#000_1px,_transparent_1px)] dark:bg-[radial-gradient(circle_at_30%_30%,_#fff_1px,_transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Map className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Pokémon GO Journey</h1>
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
            className="hover:bg-gray-100"
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
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
                  <img 
                    src="/AV.png" 
                    alt="NebulaSergio" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold">NebulaSergio</p>
                <p className="text-lg font-bold">53</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                <p className="font-semibold">10.1B XP</p>
                <p className="text-sm opacity-90">Total Experience</p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                <p className="font-semibold">65+ Medals</p>
                <p className="text-sm opacity-90">Achievements</p>
              </div>
              <div className="text-center">
                <Route className="h-8 w-8 mx-auto mb-2 text-green-300" />
                <p className="font-semibold">388.6M km</p>
                <p className="text-sm opacity-90">Distance Walked</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-red-300" />
                <p className="font-semibold">216.1M</p>
                <p className="text-sm opacity-90">Pokémon Caught</p>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

              {/* League Veterans */}
              <div className="text-center p-3 bg-purple-200/50 rounded-lg border border-purple-300">
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

              {/* Collection Master */}
              <div className="text-center p-3 bg-green-200/50 rounded-lg border border-green-300">
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

              {/* Special Achievements */}
              <div className="text-center p-3 bg-yellow-200/50 rounded-lg border border-yellow-300">
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

              {/* More Special Achievements */}
              <div className="text-center p-3 bg-pink-200/50 rounded-lg border border-pink-300">
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

              {/* Collection Stats Summary */}
              <div className="text-center p-3 bg-green-200/50 rounded-lg border border-green-300">
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
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Pokémon Caught: {totalPokemon}/1025</span>
                <span className="text-sm opacity-90">{Math.round((totalPokemon / 1025) * 100)}% Complete</span>
              </div>
              <div className="relative">
                <Progress value={(totalPokemon / 1025) * 100} className="h-4" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
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

        {/* My Favorite Pokémon & Battle Guide */}
        <Card className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-purple-700" />
              <CardTitle className="text-2xl text-purple-800">My Favorite Pokémon & Battle Guide</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Favorite Pokémon */}
              <div className="p-4 bg-purple-200/50 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-purple-800">
                  <Star className="h-5 w-5 text-yellow-600" />
                  My Favorite Pokémon
                </h3>
                <div className="space-y-2 text-sm text-purple-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Flame className="h-4 w-4 text-red-600" />
                    </div>
                    <span><strong>Fire:</strong> Charizard, Blaziken</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Droplets className="h-4 w-4 text-blue-600" />
                    </div>
                    <span><strong>Water:</strong> Gyarados, Swampert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <span><strong>Grass:</strong> Venusaur, Sceptile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span><strong>Electric:</strong> Raichu, Ampharos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                    </div>
                    <span><strong>Dragon:</strong> Dragonite, Garchomp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-gray-600" />
                    </div>
                    <span><strong>Steel:</strong> Metagross, Lucario</span>
                  </div>
                </div>
              </div>

              {/* Gym Battle Suggestions */}
              <div className="p-4 bg-pink-200/50 rounded-lg border border-pink-300">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-pink-800">
                  <Sword className="h-5 w-5 text-red-600" />
                  Gym Battle Suggestions
                </h3>
                <div className="space-y-3 text-sm text-pink-700">
                  <div>
                    <p className="font-semibold text-yellow-600">🔥 Fire Gyms:</p>
                    <p>• Gyarados (Water) - Hydro Pump</p>
                    <p>• Swampert (Water/Ground) - Earthquake</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600">💧 Water Gyms:</p>
                    <p>• Venusaur (Grass) - Solar Beam</p>
                    <p>• Raichu (Electric) - Thunder</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600">🌿 Grass Gyms:</p>
                    <p>• Charizard (Fire) - Fire Blast</p>
                    <p>• Blaziken (Fire/Fighting) - Blaze Kick</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-600">⚡ Electric Gyms:</p>
                    <p>• Garchomp (Dragon/Ground) - Earthquake</p>
                    <p>• Swampert (Water/Ground) - Mud Shot</p>
                  </div>
                </div>
              </div>

              {/* GO Battle League Suggestions */}
              <div className="p-4 bg-purple-200/50 rounded-lg border border-purple-300">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-purple-800">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  GO Battle League
                </h3>
                <div className="space-y-3 text-sm text-purple-700">
                  <div>
                    <p className="font-semibold text-green-600">🥇 Great League (1500 CP):</p>
                    <p>• Azumarill (Water/Fairy) - Bubble + Play Rough</p>
                    <p>• Altaria (Dragon/Flying) - Dragon Breath + Sky Attack</p>
                    <p>• Medicham (Fighting/Psychic) - Counter + Dynamic Punch</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600">🥈 Ultra League (2500 CP):</p>
                    <p>• Giratina (Ghost/Dragon) - Shadow Claw + Dragon Claw</p>
                    <p>• Swampert (Water/Ground) - Mud Shot + Hydro Cannon</p>
                    <p>• Cresselia (Psychic) - Psycho Cut + Moonblast</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-600">🥉 Master League (No CP Limit):</p>
                    <p>• Mewtwo (Psychic) - Psycho Cut + Psystrike</p>
                    <p>• Dialga (Steel/Dragon) - Dragon Breath + Draco Meteor</p>
                    <p>• Kyogre (Water) - Waterfall + Origin Pulse</p>
                  </div>
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
            <p className="text-gray-600 dark:text-gray-300">Collection Info: This is a sample of your impressive collection of 840 Pokémon, including 106 Legendary and 265 Shiny variants.</p>
          </CardHeader>
          <CardContent>
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalPokemon}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Owned</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{legendaryCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Legendary</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{shinyCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Shiny</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">10.5M</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">PokéStops</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
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
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
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
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <Select value={shinyFilter} onValueChange={setShinyFilter}>
                  <SelectTrigger className="w-32">
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
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Legendary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pokémon</SelectItem>
                    <SelectItem value="legendary">Legendary Only</SelectItem>
                    <SelectItem value="regular">Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>

            {/* Pokémon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              {currentPokemon.map((pokemon) => (
                <Card key={pokemon.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-3">
                    <div className="relative">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-full h-24 object-contain mb-2"
                      />
                      {pokemon.isLegendary && (
                        <div className="absolute top-0 right-0">
                          <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                      )}
                      {pokemon.isShiny && (
                        <div className="absolute top-0 left-0">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1 truncate">{pokemon.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">CP: {pokemon.cp.toLocaleString()}</p>
                      <div className="flex flex-wrap gap-1 justify-center mb-2">
                        {pokemon.types.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{pokemon.region}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPokemon.length)} of {filteredPokemon.length} Pokémon
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm dark:text-gray-300">Page</span>
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
                      className="w-16 text-center"
                    />
                    <span className="text-sm dark:text-gray-300">of {totalPages}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
