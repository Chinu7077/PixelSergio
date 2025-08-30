import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shuffle, Loader2, ChevronLeft, ChevronRight, MapPin, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  types?: Array<{
    type: {
      name: string;
    };
  }>;
  height?: number;
  weight?: number;
  stats?: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities?: Array<{
    ability: {
      name: string;
    };
  }>;
  region?: string;
}

interface Region {
  name: string;
  displayName: string;
  color: string;
  pokemonCount: number;
}

const regions: Region[] = [
  { name: "all", displayName: "All Regions", color: "bg-gradient-to-r from-pokemon-red to-pokemon-blue", pokemonCount: 1025 },
  { name: "kanto", displayName: "Kanto", color: "bg-gradient-to-r from-pokemon-red to-pokemon-red/80", pokemonCount: 151 },
  { name: "johto", displayName: "Johto", color: "bg-gradient-to-r from-pokemon-blue to-pokemon-blue/80", pokemonCount: 100 },
  { name: "hoenn", displayName: "Hoenn", color: "bg-gradient-to-r from-pokemon-yellow to-pokemon-yellow/80", pokemonCount: 135 },
  { name: "sinnoh", displayName: "Sinnoh", color: "bg-gradient-to-r from-pokemon-blue to-pokemon-blue/80", pokemonCount: 107 },
  { name: "unova", displayName: "Unova", color: "bg-gradient-to-r from-pokemon-red to-pokemon-red/80", pokemonCount: 156 },
  { name: "kalos", displayName: "Kalos", color: "bg-gradient-to-r from-pokemon-yellow to-pokemon-yellow/80", pokemonCount: 72 },
  { name: "alola", displayName: "Alola", color: "bg-gradient-to-r from-pokemon-blue to-pokemon-blue/80", pokemonCount: 88 },
  { name: "galar", displayName: "Galar", color: "bg-gradient-to-r from-pokemon-red to-pokemon-red/80", pokemonCount: 89 },
  { name: "paldea", displayName: "Paldea", color: "bg-gradient-to-r from-pokemon-yellow to-pokemon-yellow/80", pokemonCount: 120 }
];

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  const typeColors: { [key: string]: string } = {
    fire: "bg-gradient-to-r from-fire to-red-600 text-white",
    water: "bg-gradient-to-r from-water to-blue-600 text-white",
    grass: "bg-gradient-to-r from-grass to-green-600 text-white",
    electric: "bg-gradient-to-r from-electric to-yellow-500 text-black",
    psychic: "bg-gradient-to-r from-psychic to-purple-600 text-white",
    ice: "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900",
    dragon: "bg-gradient-to-r from-purple-600 to-purple-800 text-white",
    dark: "bg-gradient-to-r from-gray-800 to-gray-900 text-white",
    fairy: "bg-gradient-to-r from-pink-400 to-pink-600 text-white",
    normal: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
    fighting: "bg-gradient-to-r from-red-700 to-red-800 text-white",
    poison: "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
    ground: "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white",
    flying: "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white",
    bug: "bg-gradient-to-r from-green-400 to-green-600 text-white",
    rock: "bg-gradient-to-r from-yellow-800 to-yellow-900 text-white",
    ghost: "bg-gradient-to-r from-purple-700 to-purple-900 text-white",
    steel: "bg-gradient-to-r from-gray-500 to-gray-700 text-white",
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemon;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by region
    if (selectedRegion !== "all") {
      filtered = filtered.filter(p => p.region === selectedRegion);
    }
    
    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, selectedRegion, pokemon]);

  const fetchPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
      const data = await response.json();
      
      const pokemonWithDetails = await Promise.all(
        data.results.map(async (p: any, index: number) => {
          const detailResponse = await fetch(p.url);
          const details = await detailResponse.json();
          
          // Determine region based on Pokemon ID
          let region = "kanto";
          if (details.id > 151 && details.id <= 251) region = "johto";
          else if (details.id > 251 && details.id <= 386) region = "hoenn";
          else if (details.id > 386 && details.id <= 493) region = "sinnoh";
          else if (details.id > 493 && details.id <= 649) region = "unova";
          else if (details.id > 649 && details.id <= 721) region = "kalos";
          else if (details.id > 721 && details.id <= 809) region = "alola";
          else if (details.id > 809 && details.id <= 898) region = "galar";
          else if (details.id > 898 && details.id <= 1025) region = "paldea";
          
          return {
            id: details.id,
            name: p.name,
            url: p.url,
            sprites: details.sprites,
            types: details.types,
            region
          };
        })
      );
      
      setPokemon(pokemonWithDetails);
      setFilteredPokemon(pokemonWithDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (pokemonUrl: string) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(pokemonUrl);
      const details = await response.json();
      setSelectedPokemon(details);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
    setLoadingDetails(false);
  };

  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemon.length);
    const randomPokemon = pokemon[randomIndex];
    fetchPokemonDetails(randomPokemon.url);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of Pokedex section
    const element = document.getElementById('pokedex');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getRegionColor = (regionName: string) => {
    const region = regions.find(r => r.name === regionName);
    return region ? region.color : "bg-gray-500";
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <span className="ml-4 text-xl font-semibold">Loading Pokémon...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pokedex" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-pokemon text-3xl md:text-4xl text-pokemon-solid-yellow mb-4 text-pokemon-solid">
            🎯 Pokédex
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover all 1,025 Pokémon from across all generations with detailed information
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPokemon.length)} of {filteredPokemon.length} Pokémon
          </p>
        </div>

        {/* Region Filter */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Filter by Region</h3>
            <p className="text-sm text-muted-foreground">Explore Pokémon from specific regions</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {regions.map((region) => (
              <button
                key={region.name}
                onClick={() => setSelectedRegion(region.name)}
                className={`p-3 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                  selectedRegion === region.name
                    ? `${region.color} text-white shadow-lg`
                    : 'bg-card hover:bg-accent/10 border border-border'
                }`}
              >
                <div className="text-xs font-medium">{region.displayName}</div>
                <div className="text-lg font-bold">{region.pokemonCount}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={getRandomPokemon}
            className="flex items-center gap-2 bg-gradient-to-r from-pokemon-yellow to-pokemon-yellow/90 hover:from-pokemon-yellow/90 hover:to-pokemon-yellow text-black border-pokemon-yellow/30"
          >
            <Shuffle className="h-4 w-4" />
            Random
          </Button>
        </div>

        {/* Pokemon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          {currentPokemon.map((p) => (
            <Card 
              key={p.id} 
              className="cursor-pointer hover:shadow-hover transition-all duration-300 transform hover:scale-105 bg-card shadow-card border-2 border-border/50 hover:border-pokemon-red/30"
              onClick={() => fetchPokemonDetails(p.url)}
            >
              <CardContent className="p-4 text-center">
                <div className="aspect-square mb-3 flex items-center justify-center bg-muted rounded-lg relative overflow-hidden">
                  {p.sprites?.other?.['official-artwork']?.front_default ? (
                    <img
                      src={p.sprites.other['official-artwork'].front_default}
                      alt={p.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">?</span>
                    </div>
                  )}
                  {/* Region indicator */}
                  <div className="absolute top-2 right-2">
                    <Badge className={`text-xs px-2 py-1 ${getRegionColor(p.region || 'kanto')} text-white`}>
                      {p.region?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  #{p.id.toString().padStart(3, '0')} {capitalizeFirstLetter(p.name)}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {p.types?.map((type) => (
                    <Badge
                      key={type.type.name}
                      className={`${
                        typeColors[type.type.name] || 'bg-gray-500 text-white'
                      } text-xs`}
                    >
                      {capitalizeFirstLetter(type.type.name)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex space-x-1">
              {generatePageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className={`min-w-[40px] ${
                    currentPage === pageNum 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent"
                  }`}
                >
                  {pageNum}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* No results message */}
        {filteredPokemon.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No Pokémon found matching your search.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedRegion("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pokemon Detail Modal */}
        <Dialog open={!!selectedPokemon} onOpenChange={() => setSelectedPokemon(null)}>
          <DialogContent className="max-w-2xl">
            {loadingDetails ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : selectedPokemon ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-center text-foreground">
                    #{selectedPokemon.id?.toString().padStart(3, '0')} {capitalizeFirstLetter(selectedPokemon.name)}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="aspect-square mb-4 flex items-center justify-center bg-muted rounded-lg">
                      <img
                        src={selectedPokemon.sprites?.other?.['official-artwork']?.front_default || selectedPokemon.sprites?.front_default || ''}
                        alt={selectedPokemon.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {selectedPokemon.types?.map((type) => (
                        <Badge
                          key={type.type.name}
                          className={`${
                            typeColors[type.type.name] || 'bg-gray-500 text-white'
                          }`}
                        >
                          {capitalizeFirstLetter(type.type.name)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Physical Stats</h4>
                        <p>Height: {selectedPokemon.height ? (selectedPokemon.height / 10).toFixed(1) : 'Unknown'} m</p>
                        <p>Weight: {selectedPokemon.weight ? (selectedPokemon.weight / 10).toFixed(1) : 'Unknown'} kg</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Abilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedPokemon.abilities?.map((ability, index) => (
                            <Badge key={index} variant="outline">
                              {capitalizeFirstLetter(ability.ability.name.replace('-', ' '))}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Base Stats</h4>
                        <div className="space-y-2">
                          {selectedPokemon.stats?.map((stat) => (
                            <div key={stat.stat.name} className="flex justify-between">
                              <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                              <span className="font-mono">{stat.base_stat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Pokedex;