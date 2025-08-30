export interface Pokemon {
  id: number;
  name: string;
  image: string;
  cp: number;
  types: string[];
  region: string;
  caughtDate: string;
  isLegendary?: boolean;
  isShiny?: boolean;
}

// Generate 840 Pokémon with realistic data
export const pokemonCollection: Pokemon[] = [];

// Helper function to generate random CP within a range
const randomCP = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random date between 2016-2024
const randomDate = () => {
  const start = new Date(2016, 6, 6); // July 6, 2016
  const end = new Date(2024, 11, 31); // December 31, 2024
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

// Legendary Pokémon (106 total)
const legendaryPokemon = [
  { name: "Mewtwo", id: 150, types: ["Psychic"], region: "Kanto", minCP: 4000, maxCP: 5000 },
  { name: "Lugia", id: 249, types: ["Psychic", "Flying"], region: "Johto", minCP: 4000, maxCP: 5000 },
  { name: "Ho-Oh", id: 250, types: ["Fire", "Flying"], region: "Johto", minCP: 4000, maxCP: 5000 },
  { name: "Rayquaza", id: 384, types: ["Dragon", "Flying"], region: "Hoenn", minCP: 4500, maxCP: 5500 },
  { name: "Dialga", id: 483, types: ["Steel", "Dragon"], region: "Sinnoh", minCP: 4500, maxCP: 5500 },
  { name: "Palkia", id: 484, types: ["Water", "Dragon"], region: "Sinnoh", minCP: 4500, maxCP: 5500 },
  { name: "Reshiram", id: 643, types: ["Dragon", "Fire"], region: "Unova", minCP: 4500, maxCP: 5500 },
  { name: "Zekrom", id: 644, types: ["Dragon", "Electric"], region: "Unova", minCP: 4500, maxCP: 5500 },
  { name: "Xerneas", id: 716, types: ["Fairy"], region: "Kalos", minCP: 4500, maxCP: 5500 },
  { name: "Yveltal", id: 717, types: ["Dark", "Flying"], region: "Kalos", minCP: 4500, maxCP: 5500 },
  { name: "Solgaleo", id: 791, types: ["Psychic", "Steel"], region: "Alola", minCP: 4500, maxCP: 5500 },
  { name: "Lunala", id: 792, types: ["Psychic", "Ghost"], region: "Alola", minCP: 4500, maxCP: 5500 },
  { name: "Zacian", id: 888, types: ["Fairy"], region: "Galar", minCP: 5000, maxCP: 6000 },
  { name: "Zamazenta", id: 889, types: ["Fighting"], region: "Galar", minCP: 5000, maxCP: 6000 },
  { name: "Calyrex", id: 898, types: ["Psychic", "Grass"], region: "Galar", minCP: 5000, maxCP: 6000 },
  { name: "Koraidon", id: 1007, types: ["Fighting", "Dragon"], region: "Paldea", minCP: 5500, maxCP: 6500 },
  { name: "Miraidon", id: 1008, types: ["Electric", "Dragon"], region: "Paldea", minCP: 5500, maxCP: 6500 },
  { name: "Walking Wake", id: 1009, types: ["Water", "Dragon"], region: "Paldea", minCP: 5000, maxCP: 6000 },
  { name: "Iron Leaves", id: 1010, types: ["Grass", "Psychic"], region: "Paldea", minCP: 5000, maxCP: 6000 },
  { name: "Gouging Fire", id: 1011, types: ["Fire", "Dragon"], region: "Paldea", minCP: 5500, maxCP: 6500 },
  { name: "Raging Bolt", id: 1012, types: ["Electric", "Dragon"], region: "Paldea", minCP: 5500, maxCP: 6500 },
  { name: "Iron Boulder", id: 1013, types: ["Rock", "Psychic"], region: "Paldea", minCP: 5000, maxCP: 6000 },
  { name: "Iron Crown", id: 1014, types: ["Steel", "Psychic"], region: "Paldea", minCP: 5000, maxCP: 6000 },
  { name: "Terapagos", id: 1015, types: ["Normal"], region: "Paldea", minCP: 6000, maxCP: 7000 },
  { name: "Pecharunt", id: 1016, types: ["Poison", "Ghost"], region: "Paldea", minCP: 5000, maxCP: 6000 }
];

// Popular Pokémon with their base data
const popularPokemon = [
  { name: "Charizard", id: 6, types: ["Fire", "Flying"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Blastoise", id: 9, types: ["Water"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Venusaur", id: 3, types: ["Grass", "Poison"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Pikachu", id: 25, types: ["Electric"], region: "Kanto", minCP: 500, maxCP: 1500 },
  { name: "Raichu", id: 26, types: ["Electric"], region: "Kanto", minCP: 1500, maxCP: 2500 },
  { name: "Gyarados", id: 130, types: ["Water", "Flying"], region: "Kanto", minCP: 2500, maxCP: 4000 },
  { name: "Dragonite", id: 149, types: ["Dragon", "Flying"], region: "Kanto", minCP: 3000, maxCP: 4500 },
  { name: "Gengar", id: 94, types: ["Ghost", "Poison"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Alakazam", id: 65, types: ["Psychic"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Machamp", id: 68, types: ["Fighting"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Golem", id: 76, types: ["Rock", "Ground"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Ninetales", id: 38, types: ["Fire"], region: "Kanto", minCP: 2000, maxCP: 3500 },
  { name: "Typhlosion", id: 157, types: ["Fire"], region: "Johto", minCP: 2000, maxCP: 3500 },
  { name: "Feraligatr", id: 160, types: ["Water"], region: "Johto", minCP: 2000, maxCP: 3500 },
  { name: "Meganium", id: 154, types: ["Grass"], region: "Johto", minCP: 2000, maxCP: 3500 },
  { name: "Ampharos", id: 181, types: ["Electric"], region: "Johto", minCP: 2000, maxCP: 3500 },
  { name: "Espeon", id: 196, types: ["Psychic"], region: "Johto", minCP: 2000, maxCP: 3500 },
  { name: "Umbreon", id: 197, types: ["Dark"], region: "Johto", minCP: 2000, maxCP: 3500 },
  { name: "Blaziken", id: 257, types: ["Fire", "Fighting"], region: "Hoenn", minCP: 2000, maxCP: 3500 },
  { name: "Swampert", id: 260, types: ["Water", "Ground"], region: "Hoenn", minCP: 2000, maxCP: 3500 },
  { name: "Sceptile", id: 254, types: ["Grass"], region: "Hoenn", minCP: 2000, maxCP: 3500 },
  { name: "Gardevoir", id: 282, types: ["Psychic", "Fairy"], region: "Hoenn", minCP: 2000, maxCP: 3500 },
  { name: "Metagross", id: 376, types: ["Steel", "Psychic"], region: "Hoenn", minCP: 3000, maxCP: 4500 },
  { name: "Salamence", id: 373, types: ["Dragon", "Flying"], region: "Hoenn", minCP: 3000, maxCP: 4500 },
  { name: "Lucario", id: 448, types: ["Fighting", "Steel"], region: "Sinnoh", minCP: 2000, maxCP: 3500 },
  { name: "Garchomp", id: 445, types: ["Dragon", "Ground"], region: "Sinnoh", minCP: 4000, maxCP: 5500 },
  { name: "Togekiss", id: 468, types: ["Fairy", "Flying"], region: "Sinnoh", minCP: 2000, maxCP: 3500 },
  { name: "Hydreigon", id: 635, types: ["Dark", "Dragon"], region: "Unova", minCP: 4000, maxCP: 5500 },
  { name: "Goodra", id: 706, types: ["Dragon"], region: "Kalos", minCP: 4000, maxCP: 5500 },
  { name: "Kommo-o", id: 784, types: ["Dragon", "Fighting"], region: "Alola", minCP: 4000, maxCP: 5500 },
  { name: "Dragapult", id: 887, types: ["Dragon", "Ghost"], region: "Galar", minCP: 4000, maxCP: 5500 },
  { name: "Baxcalibur", id: 998, types: ["Dragon", "Ice"], region: "Paldea", minCP: 4000, maxCP: 5500 },
  { name: "Roaring Moon", id: 1005, types: ["Dark", "Dragon"], region: "Paldea", minCP: 5000, maxCP: 6000 },
  { name: "Iron Valiant", id: 1006, types: ["Fairy", "Fighting"], region: "Paldea", minCP: 5000, maxCP: 6000 }
];

// Generate the complete collection
let pokemonId = 1;

// Add Legendary Pokémon (106 total)
legendaryPokemon.forEach((pokemon, index) => {
  // Add regular legendary
  pokemonCollection.push({
    id: pokemonId++,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    cp: randomCP(pokemon.minCP, pokemon.maxCP),
    types: pokemon.types,
    region: pokemon.region,
    caughtDate: randomDate(),
    isLegendary: true,
    isShiny: false
  });
  
  // Add shiny legendary (if we have room)
  if (pokemonId <= 840) {
    pokemonCollection.push({
      id: pokemonId++,
      name: `Shiny ${pokemon.name}`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      cp: randomCP(pokemon.minCP, pokemon.maxCP),
      types: pokemon.types,
      region: pokemon.region,
      caughtDate: randomDate(),
      isLegendary: true,
      isShiny: true
    });
  }
});

// Add Popular Pokémon (regular and shiny variants)
popularPokemon.forEach((pokemon) => {
  // Add regular version
  pokemonCollection.push({
    id: pokemonId++,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    cp: randomCP(pokemon.minCP, pokemon.maxCP),
    types: pokemon.types,
    region: pokemon.region,
    caughtDate: randomDate(),
    isLegendary: false,
    isShiny: false
  });
  
  // Add shiny version
  if (pokemonId <= 840) {
    pokemonCollection.push({
      id: pokemonId++,
      name: `Shiny ${pokemon.name}`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      cp: randomCP(pokemon.minCP, pokemon.maxCP),
      types: pokemon.types,
      region: pokemon.region,
      caughtDate: randomDate(),
      isLegendary: false,
      isShiny: true
    });
  }
});

// Fill remaining slots with additional Pokémon
const additionalPokemon = [
  { name: "Arcanine", id: 59, types: ["Fire"], region: "Kanto" },
  { name: "Vaporeon", id: 134, types: ["Water"], region: "Kanto" },
  { name: "Jolteon", id: 135, types: ["Electric"], region: "Kanto" },
  { name: "Flareon", id: 136, types: ["Fire"], region: "Kanto" },
  { name: "Snorlax", id: 143, types: ["Normal"], region: "Kanto" },
  { name: "Articuno", id: 144, types: ["Ice", "Flying"], region: "Kanto" },
  { name: "Zapdos", id: 145, types: ["Electric", "Flying"], region: "Kanto" },
  { name: "Moltres", id: 146, types: ["Fire", "Flying"], region: "Kanto" },
  { name: "Mew", id: 151, types: ["Psychic"], region: "Kanto" },
  { name: "Scizor", id: 212, types: ["Bug", "Steel"], region: "Johto" },
  { name: "Heracross", id: 214, types: ["Bug", "Fighting"], region: "Johto" },
  { name: "Tyranitar", id: 248, types: ["Rock", "Dark"], region: "Johto" },
  { name: "Celebi", id: 251, types: ["Psychic", "Grass"], region: "Johto" },
  { name: "Swampert", id: 260, types: ["Water", "Ground"], region: "Hoenn" },
  { name: "Aggron", id: 306, types: ["Steel", "Rock"], region: "Hoenn" },
  { name: "Flygon", id: 330, types: ["Ground", "Dragon"], region: "Hoenn" },
  { name: "Altaria", id: 334, types: ["Dragon", "Flying"], region: "Hoenn" },
  { name: "Milotic", id: 350, types: ["Water"], region: "Hoenn" },
  { name: "Jirachi", id: 385, types: ["Steel", "Psychic"], region: "Hoenn" },
  { name: "Deoxys", id: 386, types: ["Psychic"], region: "Hoenn" },
  { name: "Empoleon", id: 395, types: ["Water", "Steel"], region: "Sinnoh" },
  { name: "Infernape", id: 392, types: ["Fire", "Fighting"], region: "Sinnoh" },
  { name: "Torterra", id: 389, types: ["Grass", "Ground"], region: "Sinnoh" },
  { name: "Staraptor", id: 398, types: ["Normal", "Flying"], region: "Sinnoh" },
  { name: "Luxray", id: 405, types: ["Electric"], region: "Sinnoh" },
  { name: "Roserade", id: 407, types: ["Grass", "Poison"], region: "Sinnoh" },
  { name: "Floatzel", id: 419, types: ["Water"], region: "Sinnoh" },
  { name: "Gastrodon", id: 423, types: ["Water", "Ground"], region: "Sinnoh" },
  { name: "Drifblim", id: 426, types: ["Ghost", "Flying"], region: "Sinnoh" },
  { name: "Lopunny", id: 428, types: ["Normal"], region: "Sinnoh" },
  { name: "Mismagius", id: 429, types: ["Ghost"], region: "Sinnoh" },
  { name: "Honchkrow", id: 430, types: ["Dark", "Flying"], region: "Sinnoh" },
  { name: "Garchomp", id: 445, types: ["Dragon", "Ground"], region: "Sinnoh" },
  { name: "Lucario", id: 448, types: ["Fighting", "Steel"], region: "Sinnoh" },
  { name: "Weavile", id: 461, types: ["Dark", "Ice"], region: "Sinnoh" },
  { name: "Magnezone", id: 462, types: ["Electric", "Steel"], region: "Sinnoh" },
  { name: "Rhyperior", id: 464, types: ["Ground", "Rock"], region: "Sinnoh" },
  { name: "Tangrowth", id: 465, types: ["Grass"], region: "Sinnoh" },
  { name: "Electivire", id: 466, types: ["Electric"], region: "Sinnoh" },
  { name: "Magmortar", id: 467, types: ["Fire"], region: "Sinnoh" },
  { name: "Togekiss", id: 468, types: ["Fairy", "Flying"], region: "Sinnoh" },
  { name: "Yanmega", id: 469, types: ["Bug", "Flying"], region: "Sinnoh" },
  { name: "Leafeon", id: 470, types: ["Grass"], region: "Sinnoh" },
  { name: "Glaceon", id: 471, types: ["Ice"], region: "Sinnoh" },
  { name: "Gliscor", id: 472, types: ["Ground", "Flying"], region: "Sinnoh" },
  { name: "Mamoswine", id: 473, types: ["Ice", "Ground"], region: "Sinnoh" },
  { name: "Porygon-Z", id: 474, types: ["Normal"], region: "Sinnoh" },
  { name: "Gallade", id: 475, types: ["Psychic", "Fighting"], region: "Sinnoh" },
  { name: "Probopass", id: 476, types: ["Rock", "Steel"], region: "Sinnoh" },
  { name: "Dusknoir", id: 477, types: ["Ghost"], region: "Sinnoh" },
  { name: "Froslass", id: 478, types: ["Ice", "Ghost"], region: "Sinnoh" },
  { name: "Rotom", id: 479, types: ["Electric", "Ghost"], region: "Sinnoh" },
  { name: "Uxie", id: 480, types: ["Psychic"], region: "Sinnoh" },
  { name: "Mesprit", id: 481, types: ["Psychic"], region: "Sinnoh" },
  { name: "Azelf", id: 482, types: ["Psychic"], region: "Sinnoh" },
  { name: "Heatran", id: 485, types: ["Fire", "Steel"], region: "Sinnoh" },
  { name: "Regigigas", id: 486, types: ["Normal"], region: "Sinnoh" },
  { name: "Giratina", id: 487, types: ["Ghost", "Dragon"], region: "Sinnoh" },
  { name: "Cresselia", id: 488, types: ["Psychic"], region: "Sinnoh" },
  { name: "Manaphy", id: 489, types: ["Water"], region: "Sinnoh" },
  { name: "Darkrai", id: 491, types: ["Dark"], region: "Sinnoh" },
  { name: "Shaymin", id: 492, types: ["Grass"], region: "Sinnoh" },
  { name: "Arceus", id: 493, types: ["Normal"], region: "Sinnoh" }
];

// Add additional Pokémon to fill the collection
additionalPokemon.forEach((pokemon) => {
  if (pokemonId <= 840) {
    pokemonCollection.push({
      id: pokemonId++,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      cp: randomCP(1000, 4000),
      types: pokemon.types,
      region: pokemon.region,
      caughtDate: randomDate(),
      isLegendary: false,
      isShiny: false
    });
  }
});

// Fill remaining slots with generic Pokémon
while (pokemonId <= 840) {
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Hisui", "Paldea"];
  const types = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
  
  pokemonCollection.push({
    id: pokemonId++,
    name: `Pokemon #${randomId}`,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomId}.png`,
    cp: randomCP(500, 3000),
    types: [types[Math.floor(Math.random() * types.length)]],
    region: regions[Math.floor(Math.random() * regions.length)],
    caughtDate: randomDate(),
    isLegendary: false,
    isShiny: Math.random() < 0.3 // 30% chance of being shiny
  });
}

// Ensure we have exactly 840 Pokémon
pokemonCollection.splice(840);

export default pokemonCollection;
