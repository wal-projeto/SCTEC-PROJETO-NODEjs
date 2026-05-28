/**
 * Estrutura do Projeto
Model: Responsável por definir a estrutura dos dados e as operações básicas de manipulação de dados.
Service: Responsável por conter a lógica de negócios e interagir com o Model e a API externa.
Controller: Responsável por receber as requisições, chamar os métodos apropriados no Service e retornar as respostas.
 */


import { PokemonController } from "./controllers/PokemonController";

const pokemonController = new PokemonController();

async function main() {
    await pokemonController.fetchPokemon('pikachu');
    await pokemonController.fetchPokemon('charmader');
    pokemonController.listPokemons();
}
main();