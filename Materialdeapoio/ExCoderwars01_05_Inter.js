/** Shift + home ou shift + end para selecionar o código
EXERCICIO INTERMEDIARIO 1) Iniciante - Perdido sem um mapa
 *  
 * Description:
Given an array of integers, return a new array with each value doubled.
For example:
[1, 2, 3] --> [2, 4, 6]
 */
console.log('-------map() : Não altera o array original, cria um novo-----------');
function maps(elemento){
  return elemento.map(n => n * 2);
}
lista = [1, 2, 3];
console.log(lista); // imprime o array original 
console.log(maps(lista)); // imprime o novo array com os valores dobrados
console.log();



console.log('-------imprime o novo array com os valores convertidos para string-----------');
const novaListaMap = lista.map(element => {
  return String(element)
});
console.log(novaListaMap); 
console.log();



console.log('-------for ...of : Mais legível/Tradicional-----------');
y = [10, 20, 30];
function maps1(y){
  let novoArray = [];
  for (let n of y) {
    novoArray.push(n ** 2);

  }
  return novoArray;
  }
console.log(y); // imprime o array original 
console.log(maps1(y)); // imprime o novo array com os valores ao quadrado
console.log();



console.log(`-------reduce() : é usado para transformar um array em um 
  único valor, mas esse "valor" pode ser um novo array. É uma forma mais poderosa e versátil, usada por programadores mais avançados---`);

function maps(x1) {
  return x1.reduce((acumulador, n) => {
    acumulador.push(n * 2);
    return acumulador;
  }, []); // Começa com um array vazio []
}
x1 = [100, 200, 300];
console.log(x1); // imprime o array original 
console.log(maps(x1)); // imprime o novo array com os valores dobrados
console.log();






/**EXERCICIO INTERMEDIARIO 2) Uma agulha no palheiro
 * Descrição:
Você consegue encontrar a agulha no palheiro?
Escreva uma função findNeedle()que receba uma arraylista cheia de lixo, mas que contenha um único elemento."needle"

Após a sua função encontrar a agulha, ela deverá retornar uma mensagem (em formato de texto) que diga:
"found the needle at position "Além disso, indexencontrou a agulha, então:

Exemplo (Entrada --> Saída)
["hay", "junk", "hay", "hay", "moreJunk", "needle", "randomJunk"] --> "found the needle at position 5" 
Observação: Em COBOL, deve retornar "found the needle at position 6"
 */
console.log('-------.find(): Tradicional-----------');
function findNeedle(lista4){
  lista4.find(element => {
    if (element === "needle") {
      console.log(`A palavra agulha foi encontrada na posição: ${lista4.indexOf(element)}`);
    }
  });
}
lista4 = ["hay", "junk", "hay", "hay", "moreJunk", "needle", "randomJunk"];
console.log(lista4); // imprime o array original
findNeedle(lista4);


console.log();  
console.log('-----------------');
function findNeedle1(lista5){
  const agulha = "needle";

  const indece = lista5.findIndex((elemento) => {
    if (elemento === agualha) {// retorna true ou flase
      return true;
    }
    return false;

  }); 
  return (`A palavra agulha foi encontrada na posição: ${indece}`);  
}








/**EXERCICIO INTERMEDIARIO 3) Bem-vindo!
 * 
 * Descrição:
O analista de negócios da sua startup informou ao departamento de marketing que o site tem um grande público na Escandinávia e países vizinhos. O departamento de marketing acha que seria ótimo dar as boas-vindas aos visitantes em seu próprio idioma. Felizmente, vocês já utilizam uma API que detecta a localização do usuário, então essa é uma solução fácil.

A Tarefa
Pense em uma maneira de armazenar os idiomas como um banco de dados. Os idiomas estão listados abaixo para que você possa copiar e colar!
Escreva uma função 'welcome' que receba um parâmetro 'language', do tipo String String, e retorne uma saudação — caso ela esteja presente no seu banco de dados. O padrão deve ser inglês se o idioma não estiver no banco de dados ou em caso de entrada inválida.
O banco de dados
Por favor, adapte este texto ao seu idioma.

[ ("english", "Welcome")
, ("czech", "Vitejte")
, ("danish", "Velkomst")
, ("dutch", "Welkom")
, ("estonian", "Tere tulemast")
, ("finnish", "Tervetuloa")
, ("flemish", "Welgekomen")
, ("french", "Bienvenue")
, ("german", "Willkommen")
, ("irish", "Failte")
, ("italian", "Benvenuto")
, ("latvian", "Gaidits")
, ("lithuanian", "Laukiamas")
, ("polish", "Witamy")
, ("spanish", "Bienvenido")
, ("swedish", "Valkommen")
, ("welsh", "Croeso")
]
Possíveis entradas inválidas incluem:

IP_ADDRESS_INVALID - not a valid ipv4 or ipv6 ip address
IP_ADDRESS_NOT_FOUND - ip address not in the database
IP_ADDRESS_REQUIRED - no ip address was supplied
 * 
 */





/**EXERCICIO INTERMEDIARIO 4) Encontro de Programação #1 - Série de Funções de Ordem Superior -
 * Contagem de desenvolvedores JavaScript vindos da Europa
 * 
 * Descrição:
Você receberá um array de objetos (hashes em Ruby) representando dados sobre os desenvolvedores que se inscreveram para participar do encontro de programação que você está organizando pela primeira vez.

Sua tarefa é retornar o número de desenvolvedores JavaScript originários da Europa .

Por exemplo, dada a seguinte lista:

var list1 = [
  { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'JavaScript' },
  { firstName: 'Maia', lastName: 'S.', country: 'Tahiti', continent: 'Oceania', age: 28, language: 'JavaScript' },
  { firstName: 'Shufen', lastName: 'L.', country: 'Taiwan', continent: 'Asia', age: 35, language: 'HTML' },
  { firstName: 'Sumayah', lastName: 'M.', country: 'Tajikistan', continent: 'Asia', age: 30, language: 'CSS' }
];
Sua função deve retornar um número 1.

Se não houver desenvolvedores JavaScript da Europa, sua função deverá retornar 0.

Notas:
O formato das strings será sempre Europee JavaScript.
Todos os dados serão sempre válidos e uniformes, como no exemplo acima.

Este kata faz parte da série Coding Meetup , que inclui diversos katas curtos e fáceis de seguir, projetados para 
permitir o domínio do uso de funções de ordem superior. Em JavaScript, isso inclui métodos como: forEach, filter, 
map, reduce, some, every, find, findIndex. Outras abordagens para resolver os katas são, obviamente, possíveis.
Aqui está a lista completa dos katas da série Coding Meetup :
 */




/** EXERCICIO INTERMEDIARIO 5) Encontro de Programação #2 - Série de Funções de Ordem Superior - 
 * Cumprimente os desenvolvedores
 * 
 * Encontro de Programação #2 - Série de Funções de Ordem Superior - Cumprimente os desenvolvedores
11.029 de 13.350PiotrBerebecki
Detalhes
Soluções
Discurso (43)
Descrição:
Você receberá uma matriz de objetos (matrizes associativas em PHP, tabelas em COBOL) representando dados sobre 
os desenvolvedores que se inscreveram para participar do próximo encontro de programação que você está organizando.

Sua tarefa é retornar um array onde cada objeto terá uma nova propriedade 'greeting' com o seguinte valor de string:
Olá <firstName here>, o que você mais gosta em <language here>?

Por exemplo, dado o seguinte array de entrada:
var list1 = [
  { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java' },
  { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python' },
  { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby' } 
];
Sua função deve retornar o seguinte array:

[
  { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java',
    greeting: 'Hi Sofia, what do you like the most about Java?'
  },
  { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python',
    greeting: 'Hi Lukas, what do you like the most about Python?'
  },
  { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby',
    greeting: 'Hi Madison, what do you like the most about Ruby?'
  } 
];
Notas:
A ordem das propriedades nos objetos não importa (exceto em COBOL).
O array de entrada será sempre válido e formatado conforme o exemplo acima.


Este kata faz parte da série Coding Meetup , que inclui diversos katas curtos e fáceis de seguir, projetados 
para permitir o domínio do uso de funções de ordem superior. Em JavaScript, isso inclui métodos como: forEach, 
filter, map, reduce, some, every, find, findIndex. Outras abordagens para resolver os katas são, obviamente, 
possíveis.
Aqui está a lista completa dos katas da série Coding Meetup :
 */




/**EXERCICIO INTERMEDIARIO 6) Encontro de Programação #3 - Série de Funções de Ordem Superior - Ruby está chegando?
 * Description:
You will be given an array of objects (associative arrays in PHP) representing data about developers who have 
signed up to attend the next coding meetup that you are organising.

Your task is to return:

true if at least one Ruby developer has signed up; or
false if there will be no Ruby developers.
For example, given the following input array:

var list1 = [
  { firstName: 'Emma', lastName: 'Z.', country: 'Netherlands', continent: 'Europe', age: 29, language: 'Ruby' },
  { firstName: 'Piotr', lastName: 'B.', country: 'Poland', continent: 'Europe', age: 128, language: 'Javascript' },
  { firstName: 'Jayden', lastName: 'P.', country: 'Jamaica', continent: 'Americas', age: 42, language: 'JavaScript' }
];
your function should return true.

Notes:
The input array will always be valid and formatted as in the example above.

This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have 
been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: 
forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course 
possible.
Here is the full list of the katas in the Coding Meetup series:
 */


/**EXERCICIO INTERMEDIARIO 7) Filtrar uma lista
 * 
 * Description:
In this kata you will create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.

Example
filter_list([1,2,'a','b']) == [1,2]
filter_list([1,'a','b',0,15]) == [1,0,15]
filter_list([1,2,'aasf','1','123',123]) == [1,
 */




/** EXERCICIO INTERMEDIARIO 8) Convertendo um hash em um array
 * 
 * Descrição:
Converter um hash em um array. Nada mais, nada menos.

{name: 'Jeremy', age: 24, role: 'Software Engineer'}
deve ser convertido em

[["age", 24], ["name", "Jeremy"], ["role", "Software Engineer"]]
Boa sorte!
 */




/** EXERCICIO INTERMEDIARIO 9) Elevar ao quadrado cada dígito
 
 * Descrição:
Bem-vindo(a). Neste kata, você deverá elevar ao quadrado cada dígito de um número e concatená-los.
Por exemplo, se passarmos 9119 pela função, o resultado será 811181, porque 9 2 é 81 e 1 2 é 1. (81-1-1-81)
Exemplo #2: Uma entrada de 765 retornará/deverá retornar 493625 porque 7 2 é 49, 6 2 é 36 e 5 2 é 25. (49-36-25)
Observação: A função aceita um número inteiro e retorna um número inteiro.
Boa programação!
 */