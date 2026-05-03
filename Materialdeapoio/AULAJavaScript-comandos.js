/*
  AULA DE PROGRAMAÇÃO - JavaScript Avançado, TypeScript e Deploy

  Esta aula está organizada em blocos:
  1) JavaScript básico
  2) JavaScript intermediário
  3) JavaScript avançado
  4) Conceitos de TypeScript
  5) Próximos passos para criar um projeto com deploy
*/

//////////////////////
// 1) JavaScript básico
//////////////////////

// Variáveis e tipos básicos
const nome = 'Walquiria';
const idade = 50;
const aprendiz = true;
const nada = null;
let indefinido;

console.log(' #####  1) JavaScript básico  #####');
console.log('nome:', nome);
console.log('idade:', idade);
console.log('aprendiz:', aprendiz);
console.log('nada:', nada);
console.log('indefinido:', indefinido);
console.log('');

// Concatenar strings e template strings
const mensagem = `Olá, ${nome}. Você tem ${idade} anos.`;
console.log(mensagem);
console.log('');

// Condicional simples
if (idade >= 18) {
    console.log('Condicional simples:  Você é maior de idade.');
} else {
    console.log('Condicional simples:  Você é menor de idade.');
}
console.log('');


// Condicional com operador ternário:
const mensIdade = idade >= 18 ? 'Maior de idade' : 'Menor de idade';
console.log('Condicional com Operador Ternario:  ' +  mensIdade);
console.log('');



// Funções
function saudacao(nomeDoAluno) {
    return `FUNÇÃO: Bem-vindo(a), ${nomeDoAluno}!`;
}
console.log(saudacao(nome));
console.log('');


// Arrays
const listaDeFrutas = ['maçã', 'banana', 'laranja'];

console.log('Lista de frutas:', listaDeFrutas);


// Objeto aluno com propriedades e um array de matérias
const aluno = {
    nome: 'Walquiria',
    idade: 50,
    curso: 'Node.js',
    materias: ['JavaScript', 'TypeScript', 'Deploy'],
};

console.log('Aluno:', aluno);

console.log('Primeira matéria:', aluno.materias[0]);
console.log('');

// Laços de repetição com for...of
console.log('Laços de repetição com for...of para um array de Frutas:');

for (const fruta of listaDeFrutas) {
    console.log('-', fruta);
}
console.log('');
console.log('');

////////////////////////
// 2) JavaScript intermediário
////////////////////////

console.log('  ######  2) JavaScript intermediário  ######\n');

// Arrow function, map(transformaçõa) e filter(seleção)
const numeros = [1, 2, 3, 4, 5];

//Cria uma nova lista do mesmo tamanho da original, mas com os valores transformados.
// para cada item dessa lista me devolva o doblo
const numerosDobrados = numeros.map((valor) => valor * 2); 

//Cria uma nova lista contendo apenas os elementos que passarem em um "teste" (uma condição verdadeira).
const pares = numeros.filter((valor) => valor % 2 === 0);

console.log('Números:', numeros);
console.log('Números dobrados:', numerosDobrados);
console.log('Pares:', pares);
console.log('');


// Função assíncrona e Promise

//Promise (A Promessa) é um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.
function simulaRequisicao() {
    //new Promise: criando um objeto que representa um valor que "será entregue no futuro".
    //resolve:É uma função que você chama quando a tarefa termina com sucesso. Ao chamar resolve(), você "cumpre a promessa".
    //setTimeout(..., 1000): Simula um atraso de 1 segundo (1000 milissegundos). É como se fosse o tempo de resposta de um servidor.
    return new Promise((resolve) => {  
        setTimeout(() => {
            resolve('Dados recebidos com sucesso!');
        }, 1000);
    });
}

// O async e await (A Espera Elegante) são usados para lidar com operações assíncronas de forma mais legível e fácil de entender.
//async: Essa palavra antes da função avisa ao JavaScript: "Olha, essa função vai lidar com processos assíncronos".
// await: É o "botão de pausa". O código para nessa linha e espera a Promise ser resolvida.
//    -> Sem o await, a variável resposta receberia o objeto Promise pendente em vez do texto.
//    ->Com o await, assim que o resolve é chamado lá na outra função, o valor 'Dados recebidos com sucesso!' é colocado dentro da constante resposta.

async function usarRequisicao() {
    console.log('Aguardando resposta da requisição...');
    const resposta = await simulaRequisicao();
    console.log(resposta);
}
/*
O Fluxo de Execução (O que acontece na tela): 
1. Quando você chama usarRequisicao(), a ordem é:
2. Exibe: "Aguardando resposta da requisição..."
3. O programa "pausa" naquela função por 1 segundo.
4. A Promise resolve.
5. Exibe: "Dados recebidos com sucesso!"
6. .then(): Como usarRequisicao é async, ela mesma retorna uma Promise. O .then() no final 
garante que algo só aconteça depois que toda a função terminar.
*/
usarRequisicao().then(() => {
    console.log('Requisição finalizada.\n');



/* Para tratar erros em funções assíncronas (async/await), usamos o bloco try...catch. 
É como dizer ao código: "Tente (try) fazer isso, se der errado, capture (catch) o erro".
*/

//1. Modificando a Promise para Falhar
// Primeiro, vamos mudar a função para que ela possa "rejeitar" a promessa:

function simulaRequisicao(sucesso) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sucesso) {
                resolve('Dados recebidos com sucesso!');
            } else {
                // Chamamos o reject em caso de falha
                reject('Erro: Servidor fora do ar!'); 
            }
        }, 1000);
    });
}

//2. Usando Try...Catch no Async
// Agora, dentro da função async, protegemos o código:

async function usarRequisicao() {
    try {
        console.log('Iniciando requisição...');
        
        // Tentamos obter a resposta (forçando o erro passando 'false')
        const resposta = await simulaRequisicao(false); 
        
        console.log(resposta); // Esta linha NÃO executa se houver erro
    } catch (erro) {
        // Se o 'reject' for chamado, o código pula direto para cá
        console.error('Ops! Algo deu errado:', erro);
    } finally {
        // Opcional: executa sempre, independente de sucesso ou erro
        console.log('Processamento finalizado.');
    }
}
usarRequisicao();

/*
Por que isso é importante?
1. Evita o "Crash": Sem o try...catch, um erro em uma Promise pode travar a execução do seu 
script ou gerar avisos de "Uncaught Promise Rejection".
2. reject vs resolve: No mundo real, o resolve é usado para quando a API responde (Status 200), 
e o reject para erros de rede ou servidor (Status 404, 500).
3. O Bloco finally: É muito útil para esconder indicadores de "Carregando..." (loaders) no
VS Code ou no navegador, já que ele roda tanto se der certo quanto se der errado.Dica para o 

VS Code:Como você está usando o Quokka, se você forçar o erro, verá uma marcação vermelha ao 
lado da linha que falhou, facilitando muito o debug!/*

*/










// Classes
    class Usuario {
        constructor(nome, email) {
            this.nome = nome;
            this.email = email;
        }

        saudacao() {
            return `Olá, ${this.nome}! Seu email é ${this.email}.`;
        }
    }

    const usuario = new Usuario('Aluno', 'aluno@exemplo.com');
    console.log(usuario.saudacao());
    console.log('');


    
    //////////////////////////
    // 3) JavaScript avançado
    //////////////////////////

    console.log('  ######  3) JavaScript avançado  ######\n');

    // Destructuring
    const { curso, materias } = aluno;
    console.log('Curso:', curso);
    console.log('Matérias:', materias);
    console.log('');

    const [primeiraMateria, segundaMateria] = materias;
    console.log('Primeira matéria:', primeiraMateria);
    console.log('Segunda matéria:', segundaMateria);
    console.log('');

    // Spread operator
    const novoAluno = { ...aluno, idade: 21, cidade: 'São Paulo' };
    console.log('Novo aluno:', novoAluno);
    const todasFrutas = [...listaDeFrutas, 'uva'];
    console.log('Todas frutas:', todasFrutas);
    console.log('');

    // Operadores avançados
    const valorIndefinido = undefined;
    const resultado = valorIndefinido ?? 'valor padrão';
    console.log('Null coalescing (??):', resultado);
    console.log('Optional chaining (?.):', aluno.endereco?.cidade);
    console.log('');

    // Funções de ordem superior
    function aplicarOperacao(array, operacao) {
        return array.map(operacao);
    }

    const triplicado = aplicarOperacao(numeros, (valor) => valor * 3);
    console.log('Triplicado:', triplicado);
    console.log('');

    // Modules e imports (conceito)
    console.log('Módulos: em JavaScript moderno usamos export/import para organizar código.');
    console.log('Exemplo: export function, export default, import { nome } from "./arquivo"');
    console.log('');

    // Iteradores e geradores
    function* geradorSequencia() {
        let i = 1;
        while (i <= 3) {
            yield i;
            i += 1;
        }
    }

    const sequencia = geradorSequencia();
    console.log('Geradores:', sequencia.next().value, sequencia.next().value, sequencia.next().value);
    console.log('');

    // Proxy e Reflect (conceito)
    console.log('Proxy/Reflect: permitem interceptar acesso a objetos e personalizar comportamento.');
    console.log('');

    // Tipos avançados de array e objeto
    const usuarioMap = new Map();
    usuarioMap.set('nome', 'Aluno');
    usuarioMap.set('curso', 'Node.js');
    console.log('Map:', usuarioMap.get('nome'), usuarioMap.get('curso'));
    console.log('');

    const usuarioSet = new Set([1, 2, 2, 3]);
    console.log('Set:', usuarioSet);
    console.log('');

    // Regex básico
    const texto = 'JavaScript é poderoso';
    const regex = /JavaScript/;
    console.log('Regex:', regex.test(texto));
    console.log('');

    ////////////////////////
    // 4) Conceitos de TypeScript
    ////////////////////////

    console.log('4) Conceitos de TypeScript');
    console.log('TypeScript adiciona tipos ao JavaScript e precisa ser compilado para rodar no Node.');
    console.log('');
    console.log('Exemplo de interface em TypeScript:');
    console.log(`interface Aluno {\n  nome: string;\n  idade: number;\n  aprendiz: boolean;\n}`);
    console.log('');
    console.log('Exemplo de tipo alias em TypeScript:');
    console.log(`type Ponto = { x: number; y: number };`);
    console.log('');

    //////////////////////////
    // 5) Próximos passos para deploy
    //////////////////////////

    console.log('5) Próximos passos para projeto e deploy');
    console.log('a) Aprenda JavaScript profundo: funções, closures, prototypes, async/await, módulos.');
    console.log('b) Aprenda Node.js para criar backend e APIs.');
    console.log('c) Aprenda TypeScript para código mais seguro e escalável.');
    console.log('d) Aprenda Git e GitHub para controlar versões.');
    console.log('e) Aprenda a criar um servidor simples com Express ou Fastify.');
    console.log('f) Aprenda a testar com Jest ou testes automatizados.');
    console.log('g) Aprenda a usar Docker se quiser produção profissional.');
    console.log('h) Publique em uma plataforma como Vercel, Netlify, Render ou Railway.');
    console.log('i) Use CI/CD para automatizar deploy com GitHub Actions ou outro serviço.');
    console.log('');
    console.log('Execute este arquivo com: node index.js');
});


/**
 * Sistemas complexos requerem o agrupamento de múltiplos dados primitivos.. 
 * 
 * Vetores / Arrays: Estruturas indexadas e ordenadas matematicamente. 
 * Servem para armazenarlistas de dados do mesmo contexto 
 * (ex:  [10.5, 22.1, 8.4] , representando um histórico de temperaturas).. 
 * 
 * Objetos / Dicionários: Estruturas baseadas em chave-valor, utilizadas para 
 * mapear entidades do mundo real. Exemplo estrutural de um Objeto "Usuário", 
 * contendo as chaves  nome ,  idade  e statusAtivo .
 * 
 */