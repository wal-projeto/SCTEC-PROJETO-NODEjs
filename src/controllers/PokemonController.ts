import { CustomError } from "../models/CustomError";
import { PokemonService }   from "../services/PokemonService";

export class PokemonController {
    private pokemonService: PokemonService;

    constructor(){
        this.pokemonService = new PokemonService();
    }

    async fetchPokemon(name: string): Promise<void> {
        try {
            const pokemon = await this.pokemonService.fetchPokemon(name);
            console.log(`Pokemon ${pokemon.name} encontrado na PokeAPI`);
            
        } catch (error) {
            throw new CustomError((error as Error).message);
        }
    }

    listPokemons(): void {
        const pokemons = this.pokemonService.getPokemons();
        console.log('Lista de Pokemon');
        pokemons.forEach(pokemon => {
            console.log(`ID: ${pokemon.id} , Nome: ${pokemon.name} , Tipo: ${pokemon.type}`);  
        });
    }
}