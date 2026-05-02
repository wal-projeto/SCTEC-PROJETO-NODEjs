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

console.log('1) JavaScript básico');
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
    console.log('Você é maior de idade.');
} else {
    console.log('Você é menor de idade.');
}
console.log('');

// Funções
function saudacao(nomeDoAluno) {
    return `Bem-vindo(a), ${nomeDoAluno}!`;
}
console.log(saudacao(nome));
console.log('');

// Arrays
const listaDeFrutas = ['maçã', 'banana', 'laranja'];


// Objeto aluno com propriedades e um array de matérias
const aluno = {
    nome: 'Walquiria',
    idade: 50,
    curso: 'Node.js',
    materias: ['JavaScript', 'TypeScript', 'Deploy'],
};

console.log('Lista de frutas:', listaDeFrutas);
console.log('Aluno:', aluno);
console.log('Primeira matéria:', aluno.materias[0]);
console.log('');

// Laços de repetição com for...of
console.log('Frutas:');
for (const fruta of listaDeFrutas) {
    console.log('-', fruta);
}
console.log('');
console.log('');

////////////////////////
// 2) JavaScript intermediário
////////////////////////

console.log('2) JavaScript intermediário');

// Arrow function, map e filter
const numeros = [1, 2, 3, 4, 5];
const numerosDobrados = numeros.map((valor) => valor * 2);
const pares = numeros.filter((valor) => valor % 2 === 0);

console.log('Números:', numeros);
console.log('Números dobrados:', numerosDobrados);
console.log('Pares:', pares);
console.log('');

// Função assíncrona e Promise
function simulaRequisicao() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Dados recebidos com sucesso!');
        }, 1000);
    });
}

async function usarRequisicao() {
    console.log('Aguardando resposta da requisição...');
    const resposta = await simulaRequisicao();
    console.log(resposta);
}

usarRequisicao().then(() => {
    console.log('');


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

    console.log('3) JavaScript avançado');

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
