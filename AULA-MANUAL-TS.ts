import { lstat } from "fs";

/**
 * TIPOS DO DIA A DIA:
 * 
 * Os primitivos:  string, number, e boolean
 * Matrizes: string[], number[], []Array<number>. Aprenderemos mais sobre a sintaxe T<U>quando abordarmos genéricos .
 * any: pode usar sempre que não quiser que um determinado valor cause erros de verificação de tipo.
     Quando um valor é do tipo any, você pode acessar quaisquer propriedades dele (que, por sua vez, também serão do 
     tipo any), chamá-lo como uma função, atribuí-lo (ou recebê-lo de) um valor de qualquer tipo, ou praticamente 
     qualquer outra coisa que seja sintaticamente válida: */
        let obj: any = { x: 0 };
        // Nenhuma das linhas de código a seguir gerará erros do compilador.
        // Usar `any` desativa todas as verificações de tipo adicionais e é assumido
        // você conhece o ambiente melhor que o TypeScript.
        // obj.foo();
        // obj();
        // obj.bar = 100;
        // obj = 'hello';
        // const n: number = obj;
    //Esse tipo any é útil quando você não quer escrever um tipo longo apenas para convencer o TypeScript de que 
    //uma determinada linha de código está correta.
    // noImplicitAny
        //Quando você não especifica um tipo e o TypeScript não consegue inferi-lo a partir do contexto, o compilador normalmente usará o valor padrão any.
        //Geralmente, você deve evitar isso, pois anynão há verificação de tipo. Use a flag do compilador noImplicitAny para sinalizar qualquer implícito anycomo um erro

// Anotações de tipo em variáveis : Sempre que possível, o TypeScript tenta inferir automaticamente os tipos no seu código.
let myName: string = 'Alice';


// Funções:  

// O TypeScript permite especificar os tipos dos valores de entrada e saída das funções.
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
// Quando um parâmetro possui uma anotação de tipo, os argumentos dessa função serão verificados como nesse caso:
//greet(42); // <- ERRO! O argumento do tipo 'número' não pode ser atribuído ao parâmetro do tipo 'string'.


function getFavoriteNumber(): number { 
  return 26;
}
//  TypeScript infere o tipo de retorno da função com base em suas instruções return

// Funções que retornam promessas:  
// Promise <tipo>
async function getFavoriteNumber1(): Promise<number> {
  return 26;
}

// Funções Anônimas: 
// Funções anônimas são um pouco diferentes de declarações de funções. Quando uma função aparece 
// em um local onde o TypeScript pode determinar como ela será chamada, os parâmetros dessa função recebem automaticamente tipos.
const names = ['Alice', 'Bob', 'Eve'];

// Digitação contextual para função - parâmetros inferidos como tendo tipo string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// A digitação contextual também se aplica a funções de seta
names.forEach((s) => {
  console.log(s.toUpperCase());
});
/**
 * Embora o parâmetro snão tivesse uma anotação de tipo, o TypeScript usou os tipos da forEachfunção, juntamente com o tipo inferido da matriz, 
para determinar o tipo sque ela teria.
* Esse processo é chamado de tipagem contextual porque o contexto em que a função ocorreu informa qual tipo ela deve ter.
* Assim como nas regras de inferência, você não precisa aprender explicitamente como isso acontece, mas entender que acontece pode ajudá-lo a perceber quando as anotações de tipo não são necessárias. Mais adiante, veremos mais exemplos de como o contexto em que um valor ocorre pode afetar seu tipo.
 */


// Tipos de objetos:
// qualquer valor JavaScript com propriedades, ou seja, quase todos! Para definir um tipo objeto, basta listar suas propriedades e seus respectivos tipos.
// A anotação de tipo do parâmetro é um tipo de objeto. O tipo de cada propriedade também é opcional. Se você não especificar um tipo, será assumido como any.
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });


// Propriedades opcionais:
// Os tipos de objeto também podem especificar que algumas ou todas as suas propriedades são opcionais . 
// Para fazer isso, adicione um ? após o nome da propriedade:
function printName(obj: { first: string; last?: string }) {
  console.log(obj)
}
// Ambos sãoa aceitos  OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
// Em JavaScript, se você acessar uma propriedade que não existe, obterá 
// o valor undefined em vez de um erro de tempo de execução. Por isso, ao ler 
// uma propriedade opcional, você terá que verificar se há indefinido antes de usá-la.

function printName2(obj: { first: string; last?: string }) {
  // Erro - pode travar se 'obj.last' não for fornecido!
  //console.log(obj.last.toUpperCase());

  // 'obj.last' é possivelmente 'indefinido'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // Uma alternativa segura usando sintaxe JavaScript moderna:
  console.log(obj.last?.toUpperCase());
}

printName2({first: "Manu"});


// TIPOS DE UNIÃO:
// O sistema de tipos do TypeScript permite criar novos tipos a partir de tipos existentes usando uma grande variedade de operadores.
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}
// OK
printId(101);
// OK
printId('202');
// Error
// printId({ myID: 22342 }); <- ERRO" Argumento do tipo '{ myID: number; }' não pode ser atribuído ao parâmetro do tipo 'string | número'.

// O separador dos membros da união é permitido antes do primeiro elemento, então você também poderia escrever assim:
function printTextOrNumberOrBool(
  TNB: 
  | string 
  | number 
  | boolean
) {
  console.log(TNB);
}
printTextOrNumberOrBool("nuvem")
printTextOrNumberOrBool(5.587);
printTextOrNumberOrBool(true);

// Trabalhando com Tipos de União

//  TypeScript só permite uma operação se ela for válida para TODOS OS MEMBROS da união. 
// Por exemplo, se você tiver a união string | number, não poderá usar métodos que estejam disponíveis apenas em string
function printId2(id: number | string) {
  //console.log(id.toUpperCase());  // ERRO! A propriedade 'toUpperCase' não existe no tipo 'number'.
}

// A solução é restringir a união com código. A restrição ocorre quando o TypeScript consegue deduzir um tipo mais específico para um valor com base na estrutura do código.
function printId4(id: number | string) {
  if (typeof id === 'string') {
    //Neste branch, id é do tipo 'string'
    console.log(id.toUpperCase());
  } else {
    // Aqui, id é do tipo 'número'
    console.log(id);
  }
}
// Outro exemplo é usar uma função como Array.isArray:
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Aqui: 'x' é 'string[]' ->array de string
    console.log('Hello, ' + x.join(' and '));
  } else {
    // Aqui: 'x' é 'string'
    console.log('Welcome lone traveler ' + x);
  }
}
welcomePeople("fERA");
// União em que todos os membros têm algo em comum. Por exemplo, tanto arrays quanto strings 
// possuem um método slice. Você poderá usar essa propriedade sem restringir o uso.

// O tipo de retorno é inferido como number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
const ST = getFirstThree("PARANOIA");
console.log(ST);
const NM = getFirstThree([24,25,26]);
console.log(NM);


// ALIAS DE TIPO:
// usar o mesmo tipo mais de uma vez e se referir a ele por um único nome
/// Um alias de tipo é simplesmente um nome que você dá para um tipo já existente.
//Serve para reutilizar tipos sem precisar escrever tudo de novo.
// Pode ser usado para objetos, uniões, primitivos e até tipos complexos.

type Point = {
  x: number;
  y: number;
};

// Aqui, Point é um alias para { x: number; y: number }.
function printCoord4(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord4({ x: 100, y: 100 });


//  Alias para união:  O alias ID evita que você tenha que escrever number | string toda vez.
type ID = number | string;
let usuarioId: ID;
usuarioId = 123;  // válido
usuarioId = "abc123";  // válido

// Alias para tipos primitivos: Note que o alias não cria um tipo novo, apenas dá um nome. 
// Ou seja, UserInputSanitizedString ainda é string
type UserInput = string;

function sanitizeInput(str: string): UserInput {
  return str.trim();
}

let userInput: UserInput = sanitizeInput("   Walquiria   ");
userInput = "novo valor"; // continua sendo string

//Diferença para interfaces
//type alias → pode representar qualquer tipo (objetos, uniões, primitivos).
//interface → usada principalmente para objetos e pode ser estendida/implementada.


// INTERFACES:
// Uma declaração de interface é outra forma de nomear um tipo de objeto:
interface Point5 {
  x: number;
  y: number;
}

function printCoord5(pt: Point5) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord5({ x: 100, y: 100 });
// . O TypeScript se preocupa apenas com a estrutura do valor que passamos printCoord5 — ele só se importa que ele tenha as propriedades esperadas. 
// O fato de se preocupar apenas com a estrutura e as capacidades dos tipos é o que faz com que chamemos o TypeScript de sistema de tipos estruturalmente tipado .

// Resumindo
//Alias de tipo = apelido para um tipo.
//Facilita a reutilização e deixa o código mais legível.
//Não cria um tipo “novo”, apenas um nome para o mesmo tipo.
/** 
DIFERENÇA PRINCIPAL:
Quase todos os recursos de um tipo interface estão disponíveis em typeuma interface; 
a principal distinção é que um TYPE não pode ser reaberto para adicionar 
novas propriedades, enquanto uma interface é sempre extensível.

TYPE ALIAS:	                                                                    INTERFACE
Dá um nome para qualquer tipo (objetos, uniões, primitivos, funções, etc.).	    Usado principalmente para objetos e contratos de estrutura.
Pode representar coisas complexas como string	                                number, Promise<string>`, etc. (Não pode representar uniões ou tipos primitivos, só objetos/classes.)
Não pode ser reaberto/extendido depois de declarado.	                        Pode ser extendido ou implementado em classes.
Mais flexível para tipos avançados.	                                            Melhor para modelar APIs, objetos e contratos que podem evoluir.
*/
//ESTENDER UMA INTERFACE:
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

function getBear(): Bear {
  return {
    name: 'Urso Pardo',
    honey: true,
  };
}
const bear7 = getBear();
bear7.name;
bear7.honey;
        
// SE NÃO NECESSITO DA FUNÇÃO POSSO CRIAR O OBJETO DIRETAMENTE:
const bear8: Bear = {
  name: 'Urso Polar',
  honey: false,
};

console.log(bear7.name);
console.log(bear7.honey);



// TYPE: ESTENDER UM TIPO POR MEIO DE INTERSEÇÕES
type Animal1 = {
  name: string;
};

type Bear2 = Animal1 & {
  honey: boolean;
};

function getBear2(): Bear2 {
  return {
    name: 'Urso Pardo',
    honey: true,
  };
}

const bear2 = getBear2();
bear2.name;
bear2.honey;


// Adicionar novos campos a uma interface existente  - > declarar a mesma interface mais de uma vez para “mesclar” propriedades (isso se chama declaration merging).

// 1. Window
import * as ts from 'typescript';
export {}; 
declare global {
  interface Window {
    ts: typeof ts;
  }
}
window.ts = ts;

interface Window {
  title: string;
}

interface Window {
  ts: typeof import('typescript');
}

window.ts = require('typescript');
console.log(window.ts.transpileModule( 'const a = 1;' , { } ));



// 2. Array:  Agora todo array tem o método first().
export {};  //  O export {} força o arquivo a ser tratado como módulo

declare global {  // garante que a interface Array seja realmente estendida no escopo global.
  interface Array<T> {
    first(): T | undefined;
  }
}

interface Array<T> {
  first(): T | undefined;
}

Array.prototype.first = function () {
  return this.length > 0 ? this[0] : undefined; // se o array > 0 ? retorna a 1ª posicao senão retorna underfineded
};

const numeros = [10, 20, 30];
console.log(numeros.first()); // 10



//3. String: A interface String ganhou o método reverse().
export {};  // O export {} força o arquivo a ser tratado como módulo, e o declare global garante que a interface String seja realmente estendida no escopo global.

declare global {
  interface String {
    reverse(): string;
  }
}
interface String {
  reverse(): string;
}

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

console.log("Walquiria".reverse()); // "airiuqlaW"


// 4. Console :  O console agora tem um método success.
interface Console {
  success(msg: string): void;
}

console.success = function (msg: string) {
  console.log('✅ ' + msg);
};

console.success('Tudo certo!');

//Resumindo
//Declaration Merging = declarar a mesma interface várias vezes → o TS junta tudo.
//Útil para estender objetos globais sem precisar criar novos tipos.
//Você pode adicionar métodos em Window, Array, String, Console e outros.




// Um tipo não pode ser alterado depois de criado.
type Window6 = {
  title: string;
}

type Window6 = {
  ts: TypeScriptAPI;
}

/** Você aprenderá mais sobre esses conceitos em capítulos posteriores
* Antes da versão 4.2 do TypeScript, os nomes de aliases de tipo podiam aparecer em mensagens de erro , às vezes em vez do tipo anônimo equivalente 
(o que pode ou não ser desejável). As interfaces sempre serão nomeadas nas mensagens de erro.
* Os aliases de tipo não podem participar da fusão de declarações, mas as interfaces podem .
* As interfaces só podem ser usadas para declarar as formas dos objetos, não para renomear tipos primitivos .
* Os nomes das interfaces sempre aparecerão em sua forma original nas mensagens de erro, mas somente quando forem usados ​​nominalmente.
* O uso de interfaces extends geralmente pode ser mais eficiente para o compilador do que aliases de tipo com interseções.
Na maioria dos casos, você pode escolher com base na sua preferência pessoal, e o TypeScript lhe dirá se precisa que algo seja do outro tipo de declaração. Se você quiser uma heurística, use `std::vector` interfaceaté precisar usar recursos de `std::string` type.
 */
        

// ASSERÇÃO DE TIPO:



