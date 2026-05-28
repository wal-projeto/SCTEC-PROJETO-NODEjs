// Estrutura do Pokemon
import {PokemonInterface} from '../Interfaces/PokemonInterface.js';


export class Pokemon implements PokemonInterface {
    id: number;
    name: string;
    type: string;


    constructor(id: number, name: string, type: string) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}