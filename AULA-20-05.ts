/** 
 * npm i -D tsx  <<-- serve para instalar o pacote tsx como dependência de desenvolvimento no seu projeto.
 * - É uma ferramenta que permite rodar arquivos TypeScript diretamente com o Node.js, sem precisar compilar manualmente com tsc.
 *  - Ele também suporta ESM (ECMAScript Modules) e watch mode para recarregar automaticamente quando você salva alterações.
 *  - Funciona como um substituto moderno para o antigo ts-node.
 * - npm i : comando para instalar / -D : salva como depend. de desenvolvimento, não em produção / tsx: o pacote
 * No package.json configuramos: 
"scripts": {
  "dev": "tsx --watch src/api.ts",
  "start": "node dist/api.js",
  "build": "tsc"
}
dev → roda direto o TypeScript com recarregamento automático.
start → roda a versão compilada
build → compila para dist.


// PARA EXECUTAR  O ARQUIVO:
Compilar usando o arquivo como ponto de entrada: Use a flag --project para forçar o TypeScript a ler suas configurações enquanto aponta para o arquivo:
tsc --project tsconfig.json DESAFIO.ts --outDir dist

Ignorar o aviso explicitamente: Se você não precisa das regras do seu tsconfig.json para esse arquivo específico, adicione a flag sugerida pelo próprio erro:
tsc DESAFIO.ts --outDir dist --ignoreConfig

Usar o ts-node (Sem gerar arquivos na pasta dist): Se o seu objetivo é apenas executar o arquivo para ver o resultado no terminal sem precisar compilar, use o ts-node:
npx ts-node DESAFIO.ts


COMPILAR MANUALMENTE, POIS NAO ESTA CONFIGURADO NO tsconfig e no package.json

node dist/AULA-20-05.js
OU
npx tsx AULA-20-05.ts <<- roda o binario do tsx do node_modules sem criar o js
---------------------------------------------------------------*/


// dados de um servidor, eles chegam como texto (String).crases (`) para envolver o texto. 
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

// ------------------------------------------------

// DECLARAÇÃO DE UM ARRAY COM TIPAGEM:
const lista: number[] = [1, 2, 3, 4];

const lista1: Array<number> = [1, 2, 3, 4];

// DECLARANDO UM OBJETO COM TIPAGEM DIRETA:
const pessoa: { nome: string; idade: number } = {
  nome: 'wal',
  idade: 20,
};
console.log(typeof pessoa);
console.log(pessoa);

// CRIAMDO UM OBJETO ATRAVES DE UMA CLASSE  ============
class casa {
  cor: string;
  quartos: number;

  constructor(cor: string, quartos: number) {
    this.cor = cor;
    this.quartos = quartos;
  }
}

const modelagem = new casa('amarela', 4);
console.log(modelagem);
console.log(typeof modelagem);

// TYPE: CRIA QUALQUER ESTRUTURA DE DADOS  =============================
type Pessoa = {
  nome1: string;
  idade: number;
};

const user: Pessoa = {
  nome1: 'walquiria',
  idade: 49,
};
console.log(typeof user);
console.log(user);

// DECLANDO OUTRO TYPE E UTILIZANDO O ANTERIOR =========================
type Chines = typeof user

const chino = {nome3: "Xanxum", idadae: 30};

console.log(chino);

//=====================================

// O TiPO ANY SIGNIFICA QUE ENTRA QUALQUER COISA- MAS TEMOS QUE FAZER IF PARA SAIR UM VALOR - O TS não vai tentar validar
const pessoa2: any = {};


//===  TIPO UNKNOWN (Desconhecido):
//  Dizemos ao TS que não sabemos o que tem ali, então ele vai ficar tentando validar - Processo CHAMADO NARROW TYPE

// IMAGINEMOS QUE RECEBEMOS UM OBJETO, COM UMA PROPRIEDADE NOME E QUEREMOS ACESSAR A PROPRIEDADE NOME DESSE OBJETO:
// declaramos unknown porque nao sabemos o que pode vir, mas para testar vamos atribuir um JavaScript Object Notation(JSON-string) 

const desc: unknown = JSON.parse('{"nome": "Marcelo"}');  // JSON.parse transfoma o que veio em um Objeto
    // se o tipo desc foi uma string:
  if (typeof desc === 'string') {
    desc.toLocaleUpperCase(); // transforma ela em MAIUSCULAS
    console.log(desc);
  }
console.log(desc); // SE NÃO FOR UMA STRING imprime a variável, que no caso é um OBJETO!

console.log(typeof desc); // Comando para verificar o tipo

// MAS: um objeto pode ser nulo, entao temos que verificar isso também:
if (typeof desc === 'object' && desc !== null) {
  // agora vamos verificar se a chave nome existe no desc
  if ('nome' in desc) {
    //  Agora verificamos de o valor da chave nome é uma String:
    if (typeof desc.nome === 'string') {
      console.log(desc.nome); // imprime o valor da chave
    }
  }
}


// =======  OUTRO EXEMPLO: declaramos unknown mas atribuimos a variável um boleano para validar:
const desc1: unknown = true; 
if (typeof desc1 === 'boolean') {
  console.log(desc1);
}
console.log(!desc1); // SE NÃO imprime a variável NEGADA
console.log(typeof desc);


// OBS:  TYPESCRIPT VALIDA TIPOS, MAS OS "TESTES UNITARIOS" VALIDÃO OS TIPOS E OS COMPORTAMENTOS


// NO MANUAL, NO TÓPICO, MANIPULAÇÃO DE TIPOS TEMOS: 
//  - Criando tipos a partir de tipos / Genériocos /  Operador de tipo de chave / Tipo de operador de tipo /  
// Tipos de acesso indexado /  Tipos condicionais /  Tipos Mapeados / Tipos de literais de modelo.

// ======== VAMOS FALAR DOS TIPOS MAPEADOS: ======
// UM TIPO MAPEADO: é um tipo genérico que usa uma união de PropertyKeytipos (frequentemente criados por meio de um operador
// de ordenação keyof) para iterar pelas chaves e criar um novo tipo nelas( O TS TEM A SINTAXE PROPRIA PARA CRIAR NOVOS TIPOS):

// EXEMPLO: Definindo um TYPE objeto com 2 chaves literais do tipo string:
type flagCriada = {
  MOSTRAR_LOGS: 'MOSTRAR LOGS';
  RODAR_EM_BACKGROUND: 'RODAR EM BACKGROUND';
  MODO_ESCURO: 'MODO ESCURO';
  //<- Se eu incluir mais essa propriedade aqui, ela será mapeada automaticamento.
};

// ESSE É O ALGORITMO QUE PEGA UM TIPO E CRIA UM NOVO:
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean; // É UM For E DIZ: Para cada propriedade kEY(chave) de flagCriada adicione o TIPO BOOLEANO
};

// DECLARANDO O NOVO TIPO BASEADO NO TIPO flagCriada, MAS COM SEU TIPO ALTERADO, POIS AS CHAVES AGORA TEM VALOR BOLEANO
type Flagsboleana = OptionsFlags<flagCriada>;

// AGORA PODEMOS DECLARAR UM NOVO OBJETO COM ESSE NOVO FORMATO chave: boleano
const flags: Flagsboleana = {
  MOSTRAR_LOGS: true,
  RODAR_EM_BACKGROUND: false,
  MODO_ESCURO: false,
};
console.log(flags);
/** 
EXPLICAÇÃO:
flagCriada: Define um tipo de objeto com chaves específicas e valores de string literal.
OptionsFlags<Type>: Um tipo genérico que converte cada chave de um tipo string em uma chave com o tipo boolean.
Flagsboleana: Aplica o Algoritimo OptionsFlags ao tipo flagCriada, resultando em um tipo onde cada chave de flagCriada 
é convertida em uma chave com o tipo boolean.
flags: é do tipo Flagsboleana e recebe os valores de suas chaves como boleanos
 */


// ====== USANDO OU | PARA DIZER QUE UMA VARIÁVEL PODE SER MAIS DE UM TIPO
const teste: number | string = 10



// MARROW TYPE : ESTREITAMENTO / DESANBIGUAR(RETIRAR AS VARIÁVEIS DO "OU" DO PARÂMETRO) PARA A FUNÇÃO RETORNAR UM VALOR:
function desambiguar(a: String | number | boolean) {
  // VAMOS DESAMBIGUER CADA POSSIBILIDADE QUE "a" PODE ASSUMIR:
  if (typeof a === 'string') {
    return a.toLocaleUpperCase;
  }
  if (typeof a === 'boolean') {
    return a;
  }
  return a;
}
console.log(desambiguar('Maranhão'));
console.log(desambiguar(true));
console.log(desambiguar(110));


// ==========  OUTRO EXEMPLO:
const b: number | string = 222; // uma variável tambem pode receber mais tipos
console.log(desambiguar(b)); // USANDO A FUNÇÃO ANTERIOR PARA TRATAR O VALOR 500 QUE ESTOU PASSANDO


// SE uma função cujo tipo declarado de saida não seja 'undefined', 'void' nem 'any DEVE retornar um valor: 
// function test(): string, number, boolen ???

// UMA FUNÇÃO ASYNC "SEMPRE" RETORNAR UM PROMISE(SUCESSO) QUE NESSE CASO ABAIXO RETORNARÁ uma string ou Error. 
// SÓ QUE ISSO NOS OBRIGA A FAZER UMA VALIDAÇÃO DEPOIS DE RETORNAR A FUNÇÃO MAIN() O VALORES:
async function http(url: string): Promise <string | Error> {
  const req = { status: 500 };
  // TRANTANDO status para poder retornar ERRO ou STRING(AMBOS SÃO CONSIDERADOS SUCESSO)
  if (req.status) {
    return new Error(`ERRO: ${req.status}`); // Retorna um erro 500
  }
  if (req.status > 100 && req.status < 399) {
    return ` Sucesso! ${req.status}`; // retorna uma String
  }
  return new Error('Erro Bizarro'); // retorna um Erro
}

// FUNÇÃO MAIN()
// Passando uma url e o retorno pode ser uma String ou um Erro
function main() {
  const resultado = http('google.com.br');

  // OBSERVE QUE: as unicas propriedades aceitas PARA OS TIPOS string e erro são toString e valueOf,  por ser COMUNS a AMBAS
  console.log(resultado.toString);
  console.log(resultado.valueOf);

  // AGORA SOU OBRIGADO A TRATAR O ERRO, POIS SENÃO NÃO CONSIGO UTILIZAR A STRING:
  if (typeof resultado !== 'string') {
    console.error('Imprimindo o erro', resultado); // imprimi o erro
  } else {
    console.log(resultado); // imprimi quando for uma string
  }
}
main(); // executando a main()



// ======== OPERADOR DE DIAMANTE:
type Pessoa10 = Array <number> // o operador diz o tipo do array

Promise<string | Error>; 
//PROMISE <string | number>: O operador de dimante represente o retorno dela em caso de SUCESSO ( o sucesso significa 
// que ela não vai jogar um erro, e no exemplo acima o erro esta dentro do sucesso, ou seja, o retorno que foi 
// recebino na variável resultado, com isso não vai dar um try/cachet)
 

// SO PODEMOS TIPAR NO CASO DE SUCESSO, POR ISSO < string | Error > COM ISSO EVITAMOS QUE CAIA NO CATCH O RETORNO DELA:
// se eu chamar uma promise sem utilizar um await tenho que fazer um then() porque ele recebe o retorno da promise 
// quando for sucesso, e o catch recebe o erro, e esse é o padrão:  RETORNAR UM ERRO TIPADO NO SUCESSO. e assim
// nunca caia no catch, por mais que a promise tenha a tratativa de erro nele. POIS EM PROJETO CRIAMOS CLASSES DE 
// ERRO, ASSIM PODEMOS DIRECIONAR OS RETORNOS DE ERRO DA TIPAGEM <string | Error> para nossas classes desenvolvidas 

http('google.com.br')
  .then((sucesso) => {
    console.log(sucesso);
    if (sucesso instanceof Error) {
      console.log('Erro capturado', sucesso.message);
      console.log('Pilha de erros', sucesso.stack);
      console.log('Nome', sucesso.name);
      //console.log('Cause', sucesso.cause?);
    }
  })
  .catch((err) => console.log(err));
// A promise não tipa no caso dela dar erro, por isso que no catch podemos ver que err é igual a any, afinal pode ser
// qualquer coisa o retorno de erro

// OBSERVAÇÃO : EXISTE 2 TIPOS DE ERROS: 
// Encerramento de fluxos(a aplicação) : Fatal 
// Erros trataveis -> com os Retornos , como foi nesse caso acima. Ao criar Classes eu consigo prever e saber que esses
// erros foram gerados por mim. Caso contrário foi algo não previsto.