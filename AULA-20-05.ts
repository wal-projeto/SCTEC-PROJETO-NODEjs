// dados de um servidor, eles chegam como texto (String).

import { error } from "console";

//  crases (`) para envolver o texto.
const usuarioJsonTexto = `{
  "nome": "João Silva",
  "idade": 28,
  "ativo": true,
  "cidade": "Florianópolis"
}`;
// JSON.parse => TRANSFORMA TEXTO PARA  OBJETO
const Obj = JSON.parse(usuarioJsonTexto);
console.log(Obj);

// JSON.stringify => TRANSFORMA OBJETO PARA TEXTO
const texto = JSON.stringify(Obj);
console.log(texto);

// DECLARAÇÃO DE UM ARRAY COM TIPAGEM:
const lista: number[] = [1, 2, 3, 4];

const lista1: Array<number> = [1, 2, 3, 4];

// DECLARANDO UM OBJETO COM TIPAGEM DIRETA:
const pessoa: { nome: string; idade: number } = {
  nome: "wal",
  idade: 20,
};
console.log(typeof pessoa);
console.log(pessoa);

//OU CRIAMDO UM OBJETO ATRAVES DE UMA CLASSE
class casa {
  cor: string;
  quartos: number;

  constructor(cor: string, quartos: number) {
    this.cor = cor;
    this.quartos = quartos;
  }
}

const modelagem = new casa("amarela", 4);
console.log(modelagem);
console.log(typeof modelagem);

//OU CLIANDO UM TIPO/INTERFACE:
type Pessoa = {
  nome1: string;
  idade: number;
};

const user: Pessoa = {
  nome1: "walquiria",
  idade: 49,
};
console.log(typeof user);
console.log(user);

// O TiPO ANY SIGNIFICA QUE ENTRA QUALQUER COISA- Vc diz para o Type Script desistir dessa variável e ele faz!
// É IMPORTANTE TRATAR E ESPECIFICAR O QUE VAI SAI, COM if( )
const pessoa2: any = {};

const stringOrNumber: number | string | boolean = 10;



// TIPO unknown - Desconhecido - Nós dicemos para o Type Script que não sabemos o que tem ali, mas ele não vai desistir e
// vai ficar tentando/validar a variável - se CHAMA NARROW TYPE

const desconhecido: unknown = JSON.parse('{"nome": "Marcelo"}'); // declaramos unknown mas atribuimos a variável um JavaScript Object Notation (JSON) string
if (typeof desconhecido === "string") {
  // se o tipo desconhecido foi igual a uma string:
  desconhecido.toLocaleUpperCase(); // transforma ela em MAIUSCULAS
  console.log(desconhecido);
}
console.log(desconhecido); // SE NÃO imprime a variável
console.log(typeof desconhecido); // OBSERVAMOS QUE É DO TIPO OBJECT, MAS VAMOS TESTAR TODAS AS VARIÁVES
if(typeof desconhecido === 'object'){  // se o tipo de desconhecido for objetc
    if(desconhecido !== null && 'nome' in desconhecido){ //  e se desconhecido nao for nulo e se a chave nome estiver nele:
        if(typeof desconhecido.nome === 'string'){  //se a chave nome foi uma string:
        console.log(desconhecido.nome); // imprime o valor da chave
        }
    }
};


const desconhecido1: unknown = true; // declaramos unknown mas atribuimos a variável um JavaScript Object Notation (JSON) string
if (typeof desconhecido1 === "boolean") {
  console.log(desconhecido1);
}
console.log(!desconhecido1); // SE NÃO imprime a variável
console.log(typeof desconhecido);


// OBS:  TYPE SCRIPT VALIDA TIPOS , MAS OS TESTES UNITARIOS VALIDÃO OS TIPOS E OS COMPORTAMENTOS 


// UM TIPO MAPEADO: é um tipo genérico que usa uma união de PropertyKeytipos (frequentemente criados por meio de um 
// operador de ordenaçãokeyof ) para iterar pelas chaves e criar um tipo( O TYPESCRIPT TEM UMA SINTAXE PROPRIA PARA PODERMOS 
// CRIAR TIPOS) :

type flagCriada = {  // Definindo um tipo de objeto com 2 chaves literais, o valor são string
    MOSTRAR_LOGS: 'MOSTRAR LOGS'
    RODAR_EM_BACKGROUND: 'RODAR EM BACKGROUND',
    // MODO_ESCURO: 'MODO ESCURO <- Se eu incluir mais essa propriedade, ela sera mapeada automaticamento.
}

// keyof
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean; // É UM For E DIZ: Para cada propriedade kEY de flagCriada adicione a O TIPO BOOLEANO
};

type Flagsboleana = OptionsFlags <flagCriada>
const flags: Flagsboleana = {
    MOSTRAR_LOGS: true,
    RODAR_EM_BACKGROUND: false,
}
/**
 * Explicação
1. flagCriada: Este é um tipo que define duas propriedades:
MOSTRAR_LOGS: Uma string literal 'MOSTRAR LOGS'.
RODAR_EM_BACKGROUND: Uma string literal 'RODAR EM BACKGROUND'.
- Essas propriedades são usadas para criar um tipo de objeto com chaves específicas.
2. OptionsFlags<Type>:
Este é um tipo genérico que aceita um tipo Type como parâmetro.
Ele usa uma sintaxe de mapeamento de tipos ([Property in keyof Type]) para iterar sobre todas as chaves do tipo Type.
Para cada chave (Property) no tipo Type, ele define uma propriedade no novo tipo com o mesmo nome, mas com o tipo boolean.
Isso significa que cada chave do tipo Type será convertida em uma chave com o tipo boolean no novo tipo.
3. Flagsboleana:
Este é um tipo que utiliza OptionsFlags com flagCriada como argumento.
Ele aplica o tipo OptionsFlags ao tipo flagCriada, resultando em um tipo onde cada chave de flagCriada é convertida em uma chave com o tipo boolean.
Portanto, 
Flagsboleana resulta num tipo com as mesmas chaves de flagCriada, mas todas como boolean.:
MOSTRAR_LOGS: boolean
RODAR_EM_BACKGROUND: boolean

ENTAO AO DECLARAR UM OBJETO flags que segue o tipo Flagsboleana, suas propriedades seão booleano:

const flags: Flagsboleana = {
    MOSTRAR_LOGS: true,
    RODAR_EM_BACKGROUND: false,
};

4. Resumo:
flagCriada: Define um tipo de objeto com chaves específicas e valores de string literal.
OptionsFlags<Type>: Um tipo genérico que converte cada chave de um tipo dado em uma chave com o tipo boolean.
Flagsboleana: Aplica OptionsFlags ao tipo flagCriada, resultando em um tipo onde cada chave de flagCriada é convertida em uma chave com o tipo boolean.
flags: é do tipo Flagsboleana e recebe os valores de suas chaves como boleanos
 */


// MARROW TYPE : DESANBIGUAR(RETIRAR AS VARIÁVEIS DO "OU" DO PARÂMETRO) PARA PODER RETORNAR UM VALOR ESPECIFICO PARA CADA UMA DELAS:

function desambiguar(a: String | number | boolean ) {
    if ( a === 'string'){
        return a.toLocaleUpperCase
    }
    if( a === 'boolean'){
        return a
    }
    return a;
}
console.log(desambiguar("Maranhão"));
console.log(desambiguar(true));
console.log(desambiguar(110));

const b: number | string = 500;  // uma variável tambem pode receber mais tipos
console.log(desambiguar(b));

// OBS: O ERRO É UMA CLASSE/INTERFACE:
// clss Error{
//     message
// }

// Uma função cujo tipo declarado de saida não seja 'undefined', 'void' nem 'any deve retornar um valor:
// UMA FUNÇÃO PODE RETORNAR TAMBEM MAIS TIPOS , MAS NOS OBRIGA A FAZER UMA VALIDAÇÃO DEPOIS DE RETORNAR UM DOS VALORES:
async function http(url: string): Promise <string | Error> {

  const req = { status: 500 };
  
  // TRANTANDO status para poder retornar ERRO ou SUCESSO
  if (req.status) {
    // Retorna um erro 500
    return new Error(`retorno ${req.status}`);
  }
  if (req.status > 100 && req.status < 399) {
    // retorna uma String
    return `returno Sucesso! ${req.status}`;
  }
  return new Error("Erro Bizarro"); // retorna um Erro
}

// FUNÇÃO MAIN()
function main(){
const resultado =   http('google.com.br'); //  retorno pode ser uma String ou um Erro

console.log(resultado.toString); // unicas propriedades aceitas para os dois casos de retorno: toString e valueOf
console.log(resultado.valueOf);

// AGORA SOU OBRIGADO A TRATAR O ERRO, POIS SENÃO NÃO CONSIGO UTILIZAR A STRING:
if ( typeof resultado !== 'string'){
    resultado 
} else{
    resultado
}
}
main();