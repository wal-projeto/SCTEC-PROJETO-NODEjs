console.log("\n");

// DESAFIO 1: Dado uma palavra qualquer de temanha N . Encontre a primeira letra única
function primeiraLetraUnica(palavra: string): string | null {
  const frequencia: { [key: string]: number } = {}; // Objeto criado para armazenar a contagem de cada letra na palavra
                  // Estrurura do Objeto: {letra: 0 }

  // Passo 1: Contar a frequência de cada letra na palavra: procmação / papel
  for (const letra of palavra) {
    if (frequencia[letra]) {
      frequencia[letra]++; // { o=2 } / {p=2}
    } else {
      frequencia[letra] = 1; // {p=1 , r=1 , c=1, m=1, a=1, ç=1, ã=1 / {p=1, a=1, e=1, l=1}
    }
  }
  console.log("Frequencia de cada letra: ", frequencia)

  // Passo 2: Encontrar a primeira letra com frequência igual a 1
  for (const letra of palavra) { //{ p: 1, r: 1, o: 2, c: 1, m: 1, a: 1, 'ç': 1, 'ã': 1 } / { p: 2, a: 1, e: 1, l: 1 }
    if (frequencia[letra] === 1) {
        return letra; // retorna a primeira ocorrencia de uma letra ser 1 => {p} / {a}
    }   
  }

  // Passo 3: Retornar null se nenhuma letra única for encontrada
  return null;
}

// Exemplo de uso
const palavra = "procmação";
const palavra1 = "papel";
const resultado = primeiraLetraUnica(palavra);
const resultado1 = primeiraLetraUnica(palavra1);
console.log(`A primeira letra única em "${palavra}" é: ${resultado}`);
console.log(`A primeira letra única em "${palavra1}" é: ${resultado1}\n`);


// DESAFIOS 2:
const pokemons: Pokemon[] = [
    { id: 1, nome: "Bulbasaur", tipo: "Planta"},
    { id: 4, nome: "Charmander", tipo: "Fogo"},
    { id: 7, nome: "Squirtle", tipo: "Água"},
    { id: 37, nome: "Vulpix", tipo: "Fogo"},
]
type Pokemon = {
    id: number;
    nome: string;
    tipo: string;
}

// criar um novo array apenas com os nomes: (MAP) -> cria um novo array do mesmo tamanho
function nomes(pokemons: Pokemon[]) {
    const nomesPokemons = pokemons.map(pok => pok.nome);
    console.log("Array dos Nomes dos Pokemons\n", nomesPokemons);

}
nomes(pokemons);



// criar um array só com os Fogo : com nenhum  ou muitos : (FILTER)-> [] ou [...n]
function apenasFogo (pokemons: Pokemon[]){
    return pokemons.filter((element) => element.tipo.toLowerCase() === "fogo");

}
console.log ("Imprimindo tipo Fogo:\n", apenasFogo(pokemons))



// Encontrar o pokemon com id 7 (FIND) -> encontra nenhum(undefined) ou só o primeiro elemento em um array que satisfaça uma condição
function id_7(pokemons: Pokemon[]) {
    const encontrar = pokemons.find((pokemon) => pokemon.id == 7);
    console.log("Pokemon com Id=7 encontrado:\n ", encontrar);
}
id_7(pokemons);


// Imprimir no console "Nome - Tipo"  de cada um (FOREACH): É um "For" normal, no cado
function nomeTipo(pokemons: Pokemon[]) { 
    pokemons.forEach((pokemon) => {
    console.log( `${pokemon.nome} - ${pokemon.tipo}`)
})
}
nomeTipo(pokemons);



// Ordenação por nome
function ordenacao(pokemons:Pokemon[]) {
    const pokemonOrdenados = pokemons.sort((a,b) =>
    a.nome.localeCompare(b.nome));
    console.log("Ordenação por Nome:\n" , pokemonOrdenados)
}
//console.log(pokemons[1].nome.localeCompare(pokemons[0].nome));
ordenacao(pokemons);



// ordenando por id
function OrdenacaoId(pokemons:Pokemon[]) {
     const pokemonOrdenadosID = pokemons.sort((a,b) => {
       if (a.id === b.id) {
            return 0;
       }
       if(a.id > b.id) {
           return 1 // manda o a para frente
       }
        return -1 // manda o a para traz
     });
console.log ("Ordenação por ID:\n" , pokemonOrdenadosID);
}
OrdenacaoId(pokemons);


// Função ForEach com Callback
console.log("FOrEach com Callbac:"); // function nossoForEach (pokemons, callback){ }
function nossoForEach(pokemons: Pokemon[], callback:(pokemon:Pokemon) => void) {
     for(const element of pokemons){
         callback(element);
     }
}
nossoForEach(pokemons, (pokemon) => {  // chamada da função: passando o objeto e a callback
     console.log(pokemon);
});
/** EXPLICAÇÃO
Quando você chama nossoForEach(pokemons, (pokemon) => { 
    console.log(pokemon); })

o fluxo de execução será o seguinte:
Primeira Iteração:
element é { id: 1, nome: 'Pikachu', tipo: 'Elétrico' }.
callback(element) chama (pokemon) => { console.log(pokemon); } com pokemon sendo { id: 1, nome: 'Pikachu', tipo: 'Elétrico' }.
console.log(pokemon) imprime { id: 1, nome: 'Pikachu', tipo: 'Elétrico' }.

Segunda Iteração:
element é { id: 2, nome: 'Bulbasaur', tipo: 'Planta' }.
callback(element) chama (pokemon) => { console.log(pokemon); } com pokemon sendo { id: 2, nome: 'Bulbasaur', tipo: 'Planta' }.
console.log(pokemon) imprime { id: 2, nome: 'Bulbasaur', tipo: 'Planta' }.

Terceira Iteração:
element é { id: 3, nome: 'Charmander', tipo: 'Fogo' }.
callback(element) chama (pokemon) => { console.log(pokemon); } com pokemon sendo { id: 3, nome: 'Charmander', tipo: 'Fogo' }.
console.log(pokemon) imprime { id: 3, nome: 'Charmander', tipo: 'Fogo' }.

Resumo
Função nossoForEach: Itera sobre um array de objetos Pokemon e chama uma função de callback para cada elemento.
Função de Callback: É uma função que é passada como argumento para nossoForEach e é executada para cada elemento do array. No exemplo, a função de callback imprime cada objeto pokemon no console.
Chamada da Função nossoForEach: Passa o array pokemons e a função de callback para nossoForEach, que então itera sobre o array e executa a função de callback para cada elemento.
 */

// Podemos fazer filter.map.forEach tudo junto
// pokemons
// .filter((p) => p.tipo ==="Fogo")
// .map()
// .array.forEach(element => 