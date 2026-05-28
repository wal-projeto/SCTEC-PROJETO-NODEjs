import { CustomError } from "../models/CustomError.js";
import { Pokemon } from "../models/Pokemon.js";
import { PokemonService }   from "../services/PokemonService.js";

export class PokemonController {
    private pokemonService: PokemonService;
    constructor(){
        this.pokemonService = new PokemonService();
    }
    async fetchPokemon(name: string): Promise<void> {
        try {
            const pokemon = await this.pokemonService.fetchPokemon(name);
            console.log(`Pokemon ${pokemon.name} encontrado na PokeAPI`);
            
        } catch (error: any) {
            if (error.response?.status === 404){
                throw new CustomError(`O Pokemon ${name} não existe na base de Dados da PokeAPI `);
            }
            throw new CustomError((error as Error).message);
        }
    }
    listaPokemonsOrdenada(): void {
        const pokemons = this.pokemonService.getPokemons();
        const pokemonsOrdenadosID = pokemons.sort((a,b) => {
            if(a.id === b.id){
                return 0;
            }
            if (a.id > b.id){
                return 1;
            }
            return -1;
            
        });
        console.log('Lista de Pokemon');
        console.log(
          `ID: ${this.pokemon.id} , Nome: ${pokemon.name.toUpperCase()} , Tipo: ${pokemon.type}`);
  
    }
}