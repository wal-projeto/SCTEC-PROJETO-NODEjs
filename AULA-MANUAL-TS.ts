import { lstat } from "fs";

/*
Com base na documentação e no Handbook do typescript, vamos continuar ajustando nosso projeto de busca de usuários no github com as novas técnicas dessa semana:
Tipagem de parâmetros e retorno, funções anônimas: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions
Parâmetros opcionais em funções: https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters
Objetos e propriedades adicionais: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types
Type aliases: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types
Interfaces e a diferença de type aliases: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types
Classes, construtores, métodos e modificadores de acesso: https://www.typescriptlang.org/docs/handbook/2/classes.html#class-members


tsc nome_arquivo.ts --outDir dist <- DA ERRO!!!  error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
- Esse erro ocorre porque o comando tsc desativa o arquivo tsconfig.json automaticamente quando você passa o nome de um arquivo específico (DESAFIO.ts) direto na linha de comando.

Para resolver isso e compilar o seu arquivo aplicando as configurações do projeto, use uma das opções abaixo:
Solução 1. Compilar usando o arquivo como ponto de entrada:
Use a flag --project para forçar o TypeScript a ler suas configurações enquanto aponta para o arquivo:
tsc --project tsconfig.json nome_arquivo.ts --outDir dist

Solução 2: Ignorar o aviso explicitamente
Se você não precisa das regras do seu tsconfig.json para esse arquivo específico, adicione a flag sugerida pelo próprio erro:
tsc nome_arquivo.ts --outDir dist --ignoreConfig

Solução 3: Usar o ts-node (Sem gerar arquivos na pasta dist)
Se o seu objetivo é apenas executar o arquivo para ver o resultado no terminal sem precisar compilar, use o ts-node:
npx ts-node nome_arquivo.ts



*/


/**
 * TIPOS DO DIA A DIA:
Os tipos primitivos: string, número e booleano.
Matrizes
any
noImplicitAny
Anotações de tipo em variáveis
Funções:
  Anotações de tipo de parâmetro
  Anotações de tipo de retorno
  Funções Anônimas
Tipos de objetos:
  Propriedades opcionais
Tipos de União:
  Definindo um tipo de união
  Trabalhando com Tipos de União
Aliases de tipo:
Interfaces:
  Diferenças entre aliases de tipo e interfaces
Asserções de tipo
Tipos literais:
  Inferência literal
null e undefined(indefinido)
  strictNullChecks off
  strictNullChecks on
  Operador de asserção não nulo (Sufixo !)
Enums
Primitivos menos comuns: bigint, symbol


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
 
// noImplicitAny: flag colocado no compilador para sinalizar qualquer implícito any como um erro.
                //Geralmente, você deve evitar isso, pois any não há verificação de tipo.


// Anotações de tipo em variáveis : Sempre que possível, o TypeScript tenta inferir automaticamente os tipos no seu código dependendo do seu inicializador.
  // mas vc pode opcionalmente adicionar uma anotação de tipo para expecificar explicitamente.
let myName: string = 'Alice';


// Funções:  

// O TypeScript permite especificar os tipos dos valores de entrada e saída das funções.
function greet(name: string) {  //PARÊMENTRO: ENTRADA
  console.log("Hello, " + name.toUpperCase() + "!!");
}
// OBS: Quando um parâmetro possui uma anotação de tipo, os argumentos dessa função serão verificados como nesse caso:
//greet(42); // <- ERRO! O argumento do tipo 'número' não pode ser atribuído ao parâmetro do tipo 'string'.


//  TypeScript infere o tipo de retorno da função com base em suas instruções return
function getFavoriteNumber(): number {  // RETORNO:SAIDA
  return 26;
}


// Funções que retornam promessas:  
async function getFavoriteNumber1(): Promise<number> {
  return 26;
}

// FUNÇÕES ANÔNIMAS: 
// Funções anônimas são um pouco diferentes de declarações de funções. Quando uma função aparece 
// em um local onde o TypeScript pode determinar como ela será chamada, os parâmetros dessa função recebem automaticamente tipos.
const names = ['Alice', 'Bob', 'Eve'];

// Tipagem contextual para função:  Embora o parâmetro "s" não tenha uma anotação de tipo, o TS usou o tipo inferido da matriz, para determinar o tipo que "s" terá
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// A Tipagem contextual também se aplica a arrow function: O mesmo acontece, usou o contexto de nomes:string para inferir o tipo ao parâmentro s: string
names.forEach((s) => {
  console.log(s.toUpperCase());
});


// TIPOS DE OBJETOS:
// qualquer valor JavaScript com propriedades, ou seja, quase todos! Para definir um tipo objeto, basta listar suas propriedades e seus respectivos tipos.
// O tipo de cada propriedade também é opcional. Se você não especificar um tipo, será assumido como any.
function printCoord(pt: { x: number; y:number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });


// PROPRIEDADES OPCIONAIS:
// Os tipos de objeto também podem especificar que algumas ou todas as suas propriedades são opcionais " ? ". 
function printName(obj: { first: string; last?: string }) {
  console.log(obj)
}

printName({ first: 'Bob' }); // aqui nao passei o "last" para a função, mas não ocorre erro!!! ele será undefind
printName({ first: 'Alice', last: 'Alisson' });



// Em JavaScript, "acessar" uma propriedade que não existe, obterá "underfined", 
// em vez de um erro de tempo de execução. Por isso, ao ACESSAR uma propriedade opcional, você 
// terá que verificar se ela é underfined antes de usá-la para não dar crash.
function printName2(obj: { first: string; last?: string }) {

  //console.log(obj.last.toUpperCase());  <<--- Erro!! “obj.last is possibly 'undefined'” , aqui nessa linha vc está tentando acessar last, mas se last não for passado dará crash!

  // COMO RESOLVER?? EXISTEM FUAS FORMAS SEGURAS:
  // Verificação manual:
if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase());
}

  // Operador de encadeamento opcional (?.) Uma alternativa segura em sintaxe JavaScript moderna:
  console.log(obj.last?.toUpperCase());
}
printName2({first: "Manuela"});


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



// TRABALHANDO COM TIPOS DE UNIÃO
//  TypeScript só permite uma operação se ela for válida para TODOS OS MEMBROS da união. 
// Por exemplo, se você tiver a união string | number, não poderá usar métodos que estejam disponíveis apenas em string
function printId2(id: number | string) {

  //console.log(id.toUpperCase());  // ERRO! A propriedade 'toUpperCase' não existe no tipo 'number'.
}

// A solução é restringir a união com código. A restrição ocorre quando o TypeScript consegue deduzir um tipo mais específico para um valor com base na estrutura do código.
function printId4(id: number | string) {
  if (typeof id === 'string') { // Se id for string:
    console.log(id.toUpperCase());
  } else { // Aqui, id é do tipo 'número'
    console.log(id);
  }
}

// Outro exemplo de restrição pra um array ou string:
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) { // Aqui: 'x' é um 'string[]'
    console.log('Hello, ' +  x.join(' and '));
  } else {// Aqui: 'x' é 'string'
    console.log('Valor de saida: ' + x);
  }
}
welcomePeople(['feraFerida', 'fantastico']); // passando um array de string


// União em que todos os membros têm algo em comum. Por exemplo, tanto arrays quanto strings 
// possuem um método slice. Você poderá usar essa propriedade sem restringir o uso.
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3); // slice() é comun a string e number
}
const ST = getFirstThree("PARANOIA");
console.log(ST);
const NM = getFirstThree([24,25,26,29,42,75,82]);
console.log(NM);


// ALIAS DE TIPO:
/// Um alias de tipo é simplesmente um nome que você dá para um tipo já existente.
// Serve para reutilizar tipos sem precisar escrever tudo de novo.
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
printCoord4({ x: 100, y: 300 });


//  Alias com união:  O alias ID evita que você tenha que escrever number | string toda vez.
type ID = number | string;

let usuarioId: ID;
usuarioId = 123;  // válido
usuarioId = "abc123";  // válido


// Alias para tipos primitivos: Note que o alias não cria um tipo novo, apenas dá um nome. 
// Ou seja, UserInput ainda é string
type UserInput = string;

function sanitizeInput(str: string): UserInput {
  return str.trim();
}

let user5: UserInput = sanitizeInput("   Walquiria   ");
console.log(user5)
user5 = "novo valor"; // Ainda pode ser reatribuído com uma string

//Diferença de Alias para Interfaces:
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
printCoord5({ x: 100, y: 4500 });
// . O TypeScript se preocupa apenas com a estrutura do valor que passamos a printCoord5 — ele só se importa que ele tenha as propriedades esperadas. 
// TypeScript : sistema de tipos estruturalmente tipado .

/** 
DIFERENÇA PRINCIPAL:
ALIAS:	                                                                        
Dá um nome para qualquer tipo (objetos, uniões, primitivos, funções, etc.).	    
Pode representar coisas complexas como string	                                  
Não pode ser reaberto/extendido depois de declarado para adicionar novas propriedades.	                          
Mais flexível para tipos avançados.	        

INTERFACE
Usado principalmente para objetos e contratos de estrutura.
pode representar number, Promise<string>`, etc.  -> (Não pode representar uniões ou tipos primitivos, só objetos/classes.)
Pode ser extendido ou implementado em classes.
Melhor para modelar APIs, objetos e contratos que podem evoluir.
*/



//====== INTERFACE: ESTENDENDO UMA INTERFACE:
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
console.log(bear7.name);
console.log(bear7.honey);
 

// OBS: SE NÃO NECESSITO DA FUNÇÃO POSSO CRIAR O OBJETO DIRETAMENTE:
const bear8: Bear = {
  name: 'Urso Polar',
  honey: false,
};

console.log(bear7.name);
console.log(bear7.honey);



// ====== TYPE: ESTENDER UM TIPO POR MEIO DE INTERSEÇÕES
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
console.log(bear2.name);
console.log(bear2.honey);


// ============ INTERFACE : Adicionar novos campos a uma interface existente  - > declarar a mesma interface mais de uma vez para “mesclar” propriedades (isso se chama declaration merging).
// Primeira declaração da interface
interface Pessoa {
  nome: string;
}

// Segunda declaração da mesma interface
interface Pessoa {
  idade: number;
}

// O TypeScript junta as duas:
const usuario: Pessoa = {
  nome: "Walquiria",
  idade: 25
};

// =========== TYPE : NÃO pode ser alterado depois de criado , OU SEJA, NÃO PORDE SER EXTENDIDO:
// type Pessoa6 = {
//   title: string;
// }
// type Pessoa6 ={
//   ts: number;
// }
// 👉 Aqui o compilador reclama=> Error: Duplicate identifier 'Window', Porque um type é imutável: depois de criado, 
// NÃO PODE ser redefinido ou expandido com outro bloco de código.  

// ======== MAIS EXEMPLOS: Array:  Agora todo array tem o método first().
export {};  //  O export {} força o arquivo a ser tratado como módulo
declare global {  // garante que a interface Array seja realmente estendida no escopo global.
  interface Array<T> {
    first(): T | undefined;
  }
}
Array.prototype.first = function () {
  return this.length > 0 ? this[0] : undefined; // se o array > 0 ? retorna a 1ª posicao senão retorna underfineded
};
const numeros = [10, 20, 30];
console.log(numeros.first());

//===== MAIS EXEMPLOS: String: A interface String ganhou o método reverse().
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






//SERÇÃO DE TIPO:



