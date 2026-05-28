
/** QUANDO USAR CADA COMANDO DE FLUXO DE EXECUÇÃO para o PROJETO:
 npm run dev
 Usa tsx --watch src/api.ts.
 Roda o projeto em modo desenvolvimento.
 Mantém o processo aberto e recompila automaticamente quando você salva alterações.
 Ideal para quando você está codando e quer ver mudanças instantâneas.
 Para sair, pressione Ctrl + C.
 
 npm start
 Faz tsc && node dist/src/api.js.
 Primeiro compila todo o projeto para dist.
 Depois roda a versão compilada do seu projeto principal.
 Esse é o fluxo de produção: roda uma vez e termina.
 Não fica em watch, então o terminal volta ao prompt normalmente.


npx tsx AULA-TS.ts
Executa o arquivo direto, sem compilar para dist.
Útil para testes rápidos ou rodar apenas uma vez sem watch.
Não gera arquivos .js no dist. npx executa binario tsx que esta dentro de node_modules


OBS: SE A FUNÇÃO ESTÁ DECLARADA ASSIM:
export async function buscarUsuario(...): Promise<Usuario> { ... }
- então todo caminho do código precisa terminar com return usuario ou throw erro.
- Se você deixa o catch só com console.error(...), o TypeScript reclama porque essa ramificação não retorna nada.
PARA VERIFICAR RODE: 
npx tsc --noEmit   <- Isso vai mostrar exatamente em qual arquivo e linha o erro ocorre.

Ctrl + K seguido de Ctrl + C → comenta o bloco selecionado



*/

// ----- TYPE SCRIPT PARA PROGRAMADORES JAVA SCRIPT --- https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

// CRIANDO UM OBJETO COM TIPO INFERIDO:
const user7 = {
  name: "Sofia",
  id: 0
}
// DESCREVENDO EXPLICITAMENTE A FORMA DESTE OBJETO USANDO UMA DECLARAÇÃO DE  INTERFACE 
interface User {
  name: string;
  id:number;
}
// EM SEGUIDA, DECLAMOS UM OBJETO EM CONFORMIDADE COM A INTERFACE( as propriedades devem ser idanticas!)
const user1: User = {
  name: "Marcio", 
  id: 4,
}

// DECLARAÇÃO DE INTERFACE COM CLASSES: boolean, bigint, null, number, string, symbol, e undefined 
interface User_A {
  name: string;
  id: number;
}
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
const usuario: User_A = new UserAccount("Rafael", 45);

// ANOTACÃO DE INTERFACE COMO PARÂMETRO E RETORNO DE FUNÇÃO:
function deleteUser (meta: User_A) {

}
function getAdminUser(): User_A { // User_A como RETORNO
  // Se vc NÃO DECLARAR QUE A FUNÇÃO RETORNA void, undefined ou any, ENTÃO TERÁ QUE RETORNAR UM VALOR, ou no caso INSTANCIAR da Clase que criou o typo  e retornar 
  return new UserAccount('Admin', 500);
}
const B = getAdminUser();

// TIPOS PRIMITIVOS: boolean, bigint, null, number, string, symbol, e undefined
// any (permitir qualquer coisa), unknown (garanta que alguém usando esse tipo 
// declare qual tipo é), never (não é possível que esse tipo aconteça)
// e void (uma função que retorna undefined ou que não tem valor de retorno).

// CONSTRUIR TIPOS: Interfaces e Types. Você deve preferir interface. 
// Use type quando precisar de funcionalidades específicas.


// COMPONDO TIPOS : 
// criar tipos complexos combinando os simples. 
// Existem duas formas populares de fazer isso: com uniões, e com genéricos.

// UNIÃO: 
// você pode declarar que um tipo pode ser um de muitos. Por exemplo, 
// você pode descrever um tipo boolean como sendo true ou false:
type MeuBooleano = true | false; // a var é classificada como boolean
// Um caso de uso popular de tipos uniões é para descrever o valor 
// que um conjunto de literais de string ou number pode ter:
type EstadoDaJanela = 'aberto' | 'fechado' | 'minimizado';
type EstadosDeBloqueio = 'trancado' | 'destrancado';
type NumerosImparesMenoresQue10 = 1 | 3 | 5 | 7 | 9;
// Uniões fornecem uma forma de gerenciar tipos diferentes também. Por exemplo, 
// você pode ter uma função que recebe como argumento um array ou uma string:
function buscarComprimento(obj: string | string[]) {
  return obj.length;
}

// EXEMPLO COM OVERLOADS : COMO FUNCIONA?:
//Os overloads (function processarEntrada(...)) dizem ao compilador quais tipos 
// de entrada são aceitos e qual tipo de saída será retornado.
function processarEntrada(input: string): number;
function processarEntrada(input: string[]): string;

// A implementação única usa string | string[] e decide em tempo de execução o que fazer.
function processarEntrada(input: string | string[]): number | string {
  if (typeof input === "string") {
    // Se for string, retorna o tamanho
    return input.length;
  } else {
    // Se for array, retorna uma string concatenada
    return input.join(", ");
  }
}

// Exemplos de uso : O TypeScript garante que, dependendo do argumento, o retorno seja do tipo correto.
const resultado7 = processarEntrada("Walquiria"); // resultado1: number
const resultado2 = processarEntrada(["Aula", "TS", "Node"]); // resultado2: string

//Para saber o tipo de uma variável, use typeof:
// Tipo	          Predicado
// string	        typeof s === "string"
// number	        typeof n === "number"
// boolean	      typeof b === "boolean"
// undefined	    typeof undefined === "undefined"
// function	      typeof f === "function"
// array	        Array.isArray(a)

// Fazendo um função retornar diferentes tipos dependendo se uma string ou um array forem passados:
function envolverEmArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj]; // Retornando (parameter) obj: string
  }
  return obj;
}


// GENÉRICOS: 
// fornecem variáveis para tipos. Um exemplo comum é um array. Um array que,
// SEM genéricos pode conter qualquer coisa. Um array COM genéricos pode descrever 
// os valores que aquele array contém.
type ArrayDeStrings = Array<string>;
type ArrayDeNumeros = Array<number>;
type ObjetoComNomeArray = Array<{ nome: string }>;


// Você pode declarar seus próprios tipos usando genéricos:
interface Mochila<Tipo> {
	adicionar: (obj: Tipo) => void; // 
	buscar: () => Tipo;
}
 
// Esse é um atalho para dizer ao Typescript que há uma constante chamada mochila, e não se preocupar de onde ela veio.
declare const mochila: Mochila<string>; 
//  adicionar: (obj: string) => void;
//  buscar: () => string;
 
// objeto é uma string, porque nós o declaramos acima como a parte variável de Mochila.
const objeto = mochila.buscar();
 
// Já que a variável mochila é uma string, você não pode passar um número para a função adicionar.
//mochila.adicionar(23); <-- DÂ ERRO!!
mochila.adicionar("23"); // agora sim


// SISTEMA DE TIPOS ESTRUTURAIS
//Um dos princípios centrais do TypeScript é que a checagem de tipo é focada no "formato" que os valores têm. Isso é chamado as vezes de “tipagem do pato” ou “tipagem estrutural”.
//Em um sistema de tipagem estruturado, se dois objetos tem o mesmo formato, eles são considerados do mesmo tipo.
interface Ponto {
  x: number;
  y: number;
}

function exibirPonto(plo: Ponto) {
  console.log(`${plo.x}, ${plo.y}`);
}

//  OBSERVE QUE A variável var_ponto nunca é declarada como sendo do tipo Ponto. Entretanto, 
// o TypeScript compara o formato de var_ponto ao formato de Ponto na checagem de tipo.
// Eles têm o mesmo formato, então o código passa.
const var_ponto = { x: 12, y: 26 };  
exibirPonto(var_ponto); // exibe "12, 26"


// A CORRESPONDENCIA DE TIPO  só requere que um subconjunto de campos do objeto sejam correspondentes:
// A função exibirPonto anteriormente foi criada com a interface Ponto que tem x e y: number
const ponto3 = { x: 12, y: 26, z: 89 };
exibirPonto(ponto3); // logs "12, 26"  <- por isso foi empresso somente x e y do objeto {}

const rect = { x: 33, y: 3, largura: 30, altura: 80 };
exibirPonto(rect); // logs "33, 3"  <- por isso foi empresso somente x e y do objeto {}

const color = { hex: '#187ABF' };  // <- NÃO TEM CORRESPONDÊNCIA COM A INTERFACE Ponto
// exibirPonto(color); <- DÂ ERRO!!
// Argumento do tipo '{ hex: string; }' não é atribuível ao parâmetro do tipo 'Ponto'.
//Digite '{hex: string; }' faltam as seguintes propriedades do tipo 'Ponto': x, y 


// Não há diferença entre como as classes e os objetos se conformam aos formatos:
class PontoVirtual {  //Criamos uma classe que tem a mesma estrutura da INTERFACE PONTO
	x: number;
	y: number;
 
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
 
const novoPontoV = new PontoVirtual(13, 56); // Instanciando o Objeto
exibirPonto(novoPontoV); // logs "13, 56"
// Se o objeto ou classe tem todas as propriedades requeridas, TypeScript dirá que 
// eles são correspondentes, independente dos detalhes de implementação, POR ISSO CONSEGUIMOS ACESSAR A FUNÇÃO anterior exibirPonto()



