/* 

EXERCIO BASICO 3)

Description:
Nesta tarefa simples, você recebe um número e precisa torná-lo negativo. 
Mas talvez o número já seja negativo?

Notas
O número pode já ser negativo, caso em que nenhuma alteração é necessária.
O zero (0) não é verificado quanto a nenhum sinal específico. Zeros negativos não 
fazem sentido matemático.
Examples
makeNegative(1);    // return -1
makeNegative(-5);   // return -5
makeNegative(0);    // return 0
makeNegative(0.12); // return -0.12 

npx mocha "nome do arquivo"  PARA TESTAR O CODIGO*/

/**
 * Transforma um número em negativo.
 * Se o número já for negativo ou zero, retorna ele mesmo.
 * 
 * COMANDO PARA TESTAR: npx mocha Exerciciocodewars01.js
 */
function makeNegative(num) {
    return num >= 0 ? -num : num;  // Lógica simplificada: se for maior que 0, inverte o valor para negativo -num. Senão, mantém.
}

module.exports = makeNegative; 

console.log('EXERCICIO 3: Tornar um número de um array negativo');
console.log(makeNegative(1));    // Deve retornar -1
console.log(makeNegative(-5));   // Deve retornar -5
console.log(makeNegative(0));    // Deve retornar 0
console.log(makeNegative(0.12)); // Deve retornar -0.12



/**
 * Bloco de Testes

const chai = require('chai');
const assert = chai.assert;

describe("Teste Simples", () => {
    it("O número 0 deve retornar 0", () => {
        // Correção de lógica: o exercício pede para tornar negativo,
        // mas 0 é um caso especial que deve permanecer 0.
        assert.strictEqual(makeNegative(0), 0);
    });

    it("O número 42 deve retornar -42", () => {
        assert.strictEqual(makeNegative(42), -42);
    });

    it("O número -4 deve continuar sendo -4 (não deve inverter para positivo)", () => {
        // Correção de lógica: o exercício pede para tornar negativo, 
        // então -4 deve permanecer -4.
        assert.strictEqual(makeNegative(-4), -4);
    });
});
 */


/**
 * EXERCICIO BSICO 4)
 * 
 * Descrição:
Tarefa
Você recebe uma matriz de números e retorna a soma de todos os números positivos.

Exemplo
[1, -4, 7, 12] => 1+7+12=20
Observação
Se não houver nada para somar, a soma será definida como 0.

MatrizesFundamentos
 */
function positiveSum(arr) {
    let contador = 0;
    for (let i= 0; i < arr.length; i++){
        if (arr[i] > 0){
            contador += arr[i];
        }
    }
    return contador;
}

console.log('EXERCICIO 4: A Soma dos numero positeivos é: ' + positiveSum([1, -4, 7, 12])); // Deve retornar 20





/** EXERCICIO BSICO 5) Remover o primeiro e o último caractere
 * Descrição:
Remover o primeiro e o último caractere
Tarefa
Seu objetivo é escrever uma função que remova o primeiro e o último caractere de uma string. 
Você receberá um parâmetro: a string original.

Importante: Sua função deve lidar com strings de qualquer length ≥ 2número de caracteres. 
Para strings com exatamente 2caracteres, retorne uma string vazia.
 *
Exemplos
'eloquent' --> 'loquen'
'country'  --> 'ountr' 
'person'   --> 'erso'
'ab'       --> '' (empty string)
'xyz'      --> 'y'

Requisitos
    A string de entrada sempre terá pelo menos 2 caracteres.
    Para strings com exatamente 2 caracteres, retorne uma string vazia.
    Para sequências de caracteres com 3 ou mais caracteres, remova o primeiro e o último caractere.
    A função deve lidar com strings contendo letras, números e caracteres especiais.

Casos de teste
Sua solução será testada em relação a:
    Funcionalidade básica com palavras comuns
    Casos extremos com strings de 2 e 3 caracteres
    Cadeias de caracteres contendo números e caracteres especiais
    Casos de teste aleatórios de durações variadas
 * 
 */

function evenOrOdd(number) {
    palavra = "";
  for (let i=1; i < number.length -1; i++){
    let letra = number[i];
    palavra += letra;
    }
console.log('O Exercicio 5: ' + palavra); 
} 
evenOrOdd('AGUA'); 

/**
 * function removeChar(str){
  if(str.length >= 2){
    newStr = str.slice(1, -1);
  }
  return newStr;
};

removeChar('AGUA'); // 
 */