// src/services/PokemonService.ts
import { PokemonInterface } from '../interfaces/PokemonInterface';
import { Pokemon } from '../models/Pokemon';

export class PokemonService {
  private pokemons: Pokemon[] = [];

  async fetchPokemon(name: string): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`Pokémon "${name}" não encontrado na PokeAPI`);
    }
    const data = await response.json();
    const pokemon: Pokemon = new Pokemon(
      data.id,
      data.name,
      data.types[0].type.name
    );
    this.pokemons.push(pokemon);
    return pokemon;
  }

  getPokemons(): Pokemon[] {
    return this.pokemons;
  }
}
