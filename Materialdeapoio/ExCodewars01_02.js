/* 
SHIT + ALT + A = COMENTA UM BLOCO DE CODIGO

COTROL + ; = COMENTA A LINHA

para executar este código, use o comando: node index.js ou node ./ 

CTROL + ALT + I : ABRE O CHATGPT

CTROL + SHIT + P = ABRA A PALHETA DE COMANDOS - QUOKKA :  START ON CURRENT FILE

INTALEI NA PASTA MATERIALDEAPOIO A DEPENDENCIA mocha chai como o comando "npm install mocha chai";
e para teste em ambiente de desenvolvimento instalamos: " npm install mocha chai --save-dev ""

Configure o Script: No seu arquivo package.json, adicione:
  {
  "scripts": {
    "test": "mocha"
  },
  "devDependencies": {
    "chai": "^6.2.2",
    "mocha": "^11.7.5"
  }
}
Agora PARA TESTAR o  codigo utilizamos  o comando:  "  npm test "
ou npx mocha "nome do arquivo" <---- mais recomendado, por ser rapido, explicacao no final E ESTA INSTALADO



/** 

EXERCIO BASICO 1)
Muito simples FUNÇÃO NEGATIVO/POSITIVO DE UM NUMERO: dado um número, encontre seu oposto (inverso 
aditivo).
Exemplos:

1: -1
14: -14
-34: 34 

function opposite(number) {
  return -number;
}
console.log(opposite(1));
console.log(opposite(14));
console.log(opposite(-34));

// TESTE DE CODIGO:
 module.exports = opposite;

//const { assert } = require('chai');
const assert = chai.assert;
const chai = require('chai');


describe('Fixed tests', () => {
  it('Is it a function?', () => {
    assert.strictEqual(typeof opposite, 'function', 'opposite should be a function');
  });
  it('should return -1', () => {
    assert.strictEqual(opposite(1), -1);
  });
  it('should return 0', () => {
    assert.strictEqual(opposite(0), 0);
  });
  it('should return -4.25', () => {
    assert.strictEqual(opposite(4.25), -4.25);
  });
  it('should return -3.3333333', () => {
    assert.strictEqual(opposite(3.3333333), -3.3333333);
  });
  it('should return 12525220.3325', () => {
    assert.strictEqual(opposite(-12525220.3325), 12525220.3325);
  });
  it('should return 5', () => {
    assert.strictEqual(opposite(-5), 5);
  });
});

*/


/* EXERCIO BASICO 2)
Descrição FUNÇÃO PAR/IMPAR:
Crie uma função que receba um número inteiro como argumento e retorne verdadeiro 
"Even"para números pares ou "Odd"falso para números ímpares. 
*/
function evenOrOdd(number){
    return number % 2 === 0 ? "Even" : "Odd";
}

module.exports = evenOrOdd;
//IMPORTANTE: Você precisa exportar a função dessa maneira: module.exports = evenOrOdd, para que os testes  Mocha/Chai possam acessá-la.

evenOrOdd(2); 
evenOrOdd(7);
evenOrOdd(-42);
evenOrOdd(-7);
evenOrOdd(0);

/** 
-Agora PARA TESTAR o  codigo utilizamos  o comando:  "  npm test "   OU " npx mocha 'nome do arquivo' " <-- mais recomendado, por ser 
rapido, explicacao no final E ESTA INSTALADO

npx mocha --watch  ExCodewars01_02.js <-- para ficar assistindo o arquivo e rodar os testes automaticamente 
toda vez que salvar o arquivo. */


//TESTE DO CODIGO
const chai = require('chai');
const assert = chai.assert;

describe("Sample tests",() => {
  
  it("2 is even", () => {
    assert.strictEqual(evenOrOdd(2), "Even");
  });
  it("7 is odd", () => {
    assert.strictEqual(evenOrOdd(7), "Odd");
  });
  it("-42 is even", () => {
    assert.strictEqual(evenOrOdd(-42), "Even");
  });
  it("-7 is odd", () => {
    assert.strictEqual(evenOrOdd(-7), "Odd");
  });
  it("0 is even", () => {
    assert.strictEqual(evenOrOdd(0), "Even");
  });
});



/**
 * antes vc disse que para rodar tinha que digitar npm test , 
 * logo a AI para testar esta utilizando o comando npx mocha AULAFuncao.js, 
 * qual é o correto ?

Ambas as formas estão corretas, mas elas funcionam de maneiras ligeiramente 
diferentes por baixo dos panos. Como você está aprendendo sobre arquitetura 
e boas práticas, entender essa diferença é fundamental:


1. npm test (O Jeito Recomendado)
Este comando executa o que estiver definido dentro do campo "scripts" do 
seu arquivo package.json.

Por que usar: 
É o padrão da indústria. Ele cria uma "camada de abstração". 
Se amanhã você decidir trocar o Mocha pelo Jest (outro framework de testes), 
você só muda o comando dentro do package.json. Quem for testar o seu código 
continuará digitando apenas npm test, sem precisar saber qual ferramenta 
você usa.

Vantagem: Ele já "sabe" onde procurar os binários do Mocha dentro da sua pasta node_modules.

2. npx mocha AULAFuncao.js (O Jeito Direto)
O comando npx serve para executar binários de pacotes Node.js diretamente.

Por que usar: 
É excelente para testes rápidos ou quando você quer rodar um arquivo 
específico que não está na pasta padrão de testes.

Vantagem: Se você não tiver o Mocha instalado globalmente na sua máquina,
o npx localiza a versão instalada no seu projeto e a executa na hora.

Resumo da Comparação
Comando     Onde ele olha?                                    Uso principal
npm test    No seu arquivo package.json.                       Uso diário no desenvolvimento e em sistemas de automação.
npx mocha   Na pasta node_modules ou baixa temporariamente.   Testar um arquivo isolado ou rodar ferramentas sem configurar scripts.

Qual usar agora?
Para o seu aprendizado atual, o mais correto é o npm test.

Ao usar npm test, você garante que qualquer pessoa (ou você mesmo no futuro)
 que baixar seu projeto saberá exatamente como rodar os testes, pois a 
 instrução está documentada no package.json.

Dica: Se o seu arquivo de teste se chama AULAFuncao.js, você pode ajustar
 o seu script no package.json para:

JSON
"scripts": {
  "test": "mocha AULAFuncao.js"
}
Assim, ao digitar npm test, o Mocha saberá exatamente qual arquivo deve validar!
 * 
 * 
 */