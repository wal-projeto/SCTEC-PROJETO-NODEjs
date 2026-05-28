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
    listPokemons(): void {
        const pokemons = this.pokemonService.getPokemons();
        console.log('Lista de Pokemon');
        pokemons.forEach((pokemon:Pokemon) => {
            console.log(`ID: ${pokemon.id} , Nome: ${pokemon.name} , Tipo: ${pokemon.type}`);  
        });
    }
}