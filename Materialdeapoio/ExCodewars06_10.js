/** EXERCICIO BASICO 6)
Basic Mathematical Operations
 * Descrição:
Sua tarefa é criar uma função que execute quatro operações matemáticas básicas.

A função deve receber três argumentos: operação (string/caractere), valor1 (número) e valor2 (número).
A função deve retornar um resultado numérico após a aplicação da operação escolhida.

Exemplos(Operador, valor1, valor2) --> saída
('+', 4, 7) --> 11
('-', 15, 18) --> -3
('*', 5, 5) --> 25
('/', 49, 7) --> 7
 */
function basicOp(operation, value1, value2){
    switch (operation) {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case '*':
            return value1 * value2;
        case '/':
            return value1 / value2;
        default:
            throw new Error('Operação inválida');
    }       
  return 0;

}
console.log('EXERCICIO - 6 CALCULADORA BASICA');
console.log(basicOp('+', 4, 7)); // Deve retornar 11
console.log(basicOp('-', 15, 18)); // Deve retornar -3
console.log(basicOp('*', 5, 5)); // Deve retornar 25
console.log(basicOp('/', 49, 7)); // Deve retornar 7


/** EXERCICIO BASICO 7) Continue a brincadeira
 * Descrição:
Alex acabou de ganhar um bambolê novo, ele adora, mas se sente desanimado porque seu irmãozinho é melhor que ele.

Escreva um programa onde Alex possa inserir ( n) quantas vezes o aro gira e ele receba uma mensagem encorajadora:

Se Alex conseguir 10 ou mais aros, devolva a corda "Great, now move on to tricks".
Se ele não conseguir 10 aros, devolva a corda "Keep at it until you get it".
 * 
*/



/** EXERCICIO BASICO 8) Trimestre do ano
 * 
 * Descrição:
Dado um mês como um número inteiro de 1 a 12, retorne a qual trimestre do ano ele pertence, também como um número inteiro.

Por exemplo: o mês 2 (fevereiro) faz parte do primeiro trimestre; o mês 6 (junho) faz parte do segundo trimestre; e o mês 11 (novembro) faz parte do quarto trimestre.

Restrição:

1 <= month <= 12
 * 
 */


/** EXERCICIO BASICO 9) Transporte durante as férias
 * Descrição:
Após um trimestre difícil no escritório, você decide descansar e tirar férias. Então, você reserva um voo para você e sua namorada e tenta deixar toda a confusão para trás.

Você precisará de um carro alugado para se locomover durante suas férias. O gerente da locadora de veículos pode lhe oferecer boas condições.

Cada dia de aluguel do carro custa US$ 40. Se você alugar o carro por 7 dias ou mais, ganha um desconto de US$ 50 no total. 
Alternativamente, se você alugar o carro por 3 dias ou mais, ganha um desconto de US$ 20 no total.

Escreva um código que retorne o valor total para diferentes dias (d) de aluguel.
*/

function rentalCarCost(d) {
  precododia = 40 * d;
  desconto3dias = 20;
  desconto7dias = 50;
  if (d >= 7) {
    return precododia - desconto7dias;
  } else if (d >= 3) {
    return precododia - desconto3dias;
  } else {
    return precododia;
  }
}

console.log('EXERCICIO 9 - VALOR DE TRANSPORTE DURANTE AS FÉRIAS');
console.log(rentalCarCost(2)); // Deve retornar 80
console.log(rentalCarCost(3)); // Deve retornar 100
console.log(rentalCarCost(7)); // Deve retornar 230
console.log(rentalCarCost(31)); // Deve retornar 1170


/** EXERCICIO BASICO 10) Gafanhoto - Livro de notas
 * Descrição:
Diário de notas
Complete a função para que ela calcule a média das três notas passadas como parâmetro e retorne 
o valor da letra correspondente a essa nota.

Pontuação Numérica	Nota por letra
90 <= pontuação <= 100	'UM'
80 <= pontuação < 90	'B'
70 <= pontuação < 80	'C'
60 <= pontuação < 70	'D'
0 <= pontuação < 60	'F'
Os valores testados estão todos entre 0 e 100. Não há necessidade de verificar valores 
negativos ou valores maiores que 100.
 * 
*/
