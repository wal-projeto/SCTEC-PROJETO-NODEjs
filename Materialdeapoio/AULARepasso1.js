// REPASSO GERAL :  FUNÇÃO /  OBJETO /  ARRAY / MÉTODOS
// CTROL + '  = ABRE O TERMINAL NA PASTA ATIVA

console.log('Função com for que imprime o nome 3 vezes com os índices do array')// Exemplo de função bootstrap
function bootstrap(){
    const nome = "walquiria";
    for (let i = 0; i < 3; i++) {
        console.log(`${i}: ${nome}`);
    }       
}
bootstrap()


console.log();
console.log("-------------Função person---------------");
function person(nome, idade){
    // Não precisa de nome = nome; aqui, o return já monta o objeto
    return {nome, idade};
}
const resultado = person("Walquiria", 30);

console.log('Imprimindo o objeto Todo:', resultado,"\n"); // \n = quebra de linha
console.log('Imprimindo os valores do objeto com resultado.nome e resultado.idade:', resultado.nome, resultado.idade,"\n");
console.log('Imprimindo os valores do objeto com o Object.values():', Object.values(resultado), "\n"); // Object.values: retorna um array com os valores do objeto
console.log('Imprimindo as chaves do objeto:', Object.keys(resultado), "\n"); // Object.keys: retorna um array com as chaves do objeto


// Opção 2: Imprimir direto (passando os valores). JSON.stringify: converter um objeto JavaScript em uma string (texto) JSON
console.log('Dados da pessoa com JSON.stringify:  ' + JSON.stringify(person("Walquiria", 30)) + "  .Ele converter um objeto JavaScript em uma string (texto) JSON \n");



console.log("-----------Função person2--------------+\n");
console.log(`Essa função person2() utiliza o 'operador spread' para criar um novo objeto que inclui as propriedades
    do objeto retornado pela função person(), além de adicionar novas propriedades como profissão e cidade\n`); 

function person2(){
    return{
    ...person("walquiria", 30),
    profissao: "desenvolvedora",
    cidade: "Florianópolis"
}
}
obj_person2 = person2();
console.log(' Imprimindo a função person2() com JSON.stringify:  ' + JSON.stringify(obj_person2),"\n");



console.log();
console.log("-----Função sum : Recebe 2 números e testa se são números ---------");
function sum(a, b){ 
    if(typeof a !== "number" || typeof b !== "number"){
        throw new Error("Os argumentos na chamada da função devem ser números");
    }
    return a + b;
}
   console.log(' Imprimindo o resultado da função sum(5,10):  ' + sum(5, 10),"\n");



console.log();
console.log("-----------Função switch--------------+");
age = 3;
switch(age){
    case 0:
        console.log("Você é um bebê");
        break;
    case 1:
            console.log("Você é uma criança");
            break;
    case 2:
        console.log("Você é um adolescente");
        break;
    default:
        console.log("Condição switch: Você é um adulto \n");
    

}


// O que você tem aqui é a criação de um objeto str com um método charAt e a execução simples desse método dentro de uma função nome.
console.log("CALLBACK : Função 'nome' que chama o método charAt do objeto str que imprime 'Olá, mundo!'. Esse código não é uma callback!----+");
const str = {  // objeto str que tem um método charAt que imprime "Olá, mundo!" no console
    charAt() { 
        console.log("Olá, mundo!\n");
    }
}
function nome(){ // função que chama o método charAt do objeto str.
    str.charAt();
}
nome(); // Chama a função nome, que por sua vez chama o método charAt do objeto str, resultando na impressão de "Olá, mundo!" no console



console.log('Imprimindo o tipo de str: ' + typeof str,"\n");
// Imprime "object", indicando que str é um objeto

console.log('Imprimindo o tipo de str.charAt: ' + typeof str.charAt,"\n");
// Imprime "function", indicando que charAt é um método do objeto str



console.log();
const a = 507;
console.log('Declaramos uma variável de tipo número com o valor:  ' + a + "  e agora vamos usar alguns métodos para manipulá-la:");
console.log(a.toFixed(2),"\n");
// Imprime "5.00" com 2 casas decimais

console.log(a.toExponential(), "\n"); 
// Imprime "5e+0" como notação exponencial

console.log(a.toPrecision(4), "\n"); 
// Imprime "5.00" com 3 dígitos significativos

console.log(a.valueOf(), "\n"); 
// Imprime o valor primitivo do número, que é 507

console.log(a.toLocaleString(), "\n"); 
// Converte o número para uma string formatada de acordo com as convenções locais

console.log(a.Error,"\n"); 
// Imprime undefined, pois a propriedade Error não existe para a variável números

console.log(a.toString(),"\n"); 
// Converte o número para string


console.log();
const b = "2010";
console.log('Declaramos uma variável de tipo string com o valor:  ' + b + "  e vamos converte-la em numero");
console.log(parseInt(b), "\n"); 
// Converte a string para número inteiro



console.log("Método parseFloat: converte a string para número de ponto flutuante");
const c = "333";
console.log((c, parseFloat(c), "\n")); 
// Converte a string para número de ponto flutuante e imprime 3.14



console.log("Manipulação de strings:\n");
let n = "Walquiria";
console.log(n, "em maiúsculas: " + n.toUpperCase(), "\n"); 
// Converte a string para letras maiúsculas e imprime "WALQUIRIA"

console.log(n, "em minusculas: " + n.toLowerCase(), "\n"); 
// Converte a string para letras minúsculas e imprime "walquiria"

console.log(n, "comprimento: " + n.length, "\n"); 
// Imprime o comprimento da string, que é 9

console.log(n, "caractere na posição 0: " + n.charAt(0), "\n"); 
// Imprime o caractere na posição 0, que é "w"

console.log(n, "contém 'qui' em Walquiria?: " + n.includes("qui"), "\n"); 
// Verifica se a string contém "qui" e imprime true

console.log(n, "substituído Wal por val: " + n.replace("Wal", "val"), "\n"); 
// Substitui "wal" por "val" e imprime "valquiria"

console.log(n, "dividido Walquiria em um array, utilizando i como separador : " + n.split("i"), "\n"); 
// Divide a string em um array usando "i" como separador e imprime ["walqu", "ra"]



console.log("-------------MANIPULAÇÃO DE OBJETOS: person1 {nome: 'Carlos', idade: '25'}-------\n");

const person1 = {
    nome: "Carlos",
    idade: "25",
};

function nome1() {
    
    // O loop for...in itera sobre as "chaves" do objeto person1 e imprime cada chave seguida de seu "valor".
    console.log(" for in: ", "\n");
    for (let key in person1) {
        console.log(`${key}: ${person1[key]}`);
    }
    
    console.log("\n");

    // O loop for...of itera sobre os "valores" do objeto person1 e imprime cada valor
    console.log(" for of: ", "\n");
    for (let value of Object.values(person1)) {
        console.log(value);
    }
}



    console.log();
    // O loop for...of  usando Object.entries para obter tanto as chaves quanto os valores do objeto person1 e imprimindo-os no formato "chave: valor"
    console.log(" for of com Object.entries: ", "\n");
    for (const [key, value] of Object.entries(person1)) {
        console.log(`${key}: ${value}`);
    };


    console.log("Object.keys(person1): ", Object.keys(person1), "\n");
    // keys retorna um array com as chaves do objeto person1, que são "nome" e "idade"

    console.log("Object.values(person1): ", Object.values(person1), "\n");
    //values retorna um array com os valores do objeto person1, que são "Carlos" e "25"

    console.log("Object.entries(person1): ", Object.entries(person1), "\n");
    //entries retorna um array de arrays, onde cada sub-array contém uma chave e seu valor correspondente do objeto person1

    console.log("Object.hasOwnProperty.call(person1, 'nome'): ", Object.hasOwnProperty.call(person1, "nome"), "\n");
    //hasOwnProperty verifica se o objeto person1 possui a propriedade "nome" e retorna true ou false

    console.log("Object.getOwnPropertyDescriptor(person1, 'idade'): ", Object.getOwnPropertyDescriptor(person1, "idade"), "\n");
    //Retorna um objeto que descreve a propriedade "idade" do objeto person1, incluindo seu valor, se é gravável, enumerável, configurável.

    console.log("Object.freeze(person1): ", Object.freeze(person1), "\n");
    //freeze congela o objeto person1, impedindo que suas propriedades sejam modificadas ou adicionadas 

    console.log("Object.isFrozen(person1): ", Object.isFrozen(person1), "\n");
    //isFrozen verifica se o objeto person1 está congelado e retorna true ou false

    console.log("Object.seal(person1): ", Object.seal(person1), "\n");
    //seal sela o objeto person1, impedindo que novas propriedades sejam adicionadas, mas permitindo a modificação das propriedades existentes

    console.log("Object.isSealed(person1): ", Object.isSealed(person1), "\n");
    //isSealed verifica se o objeto person1 está selado e retorna true ou false

    console.log("Object.preventExtensions(person1): ", Object.preventExtensions(person1), "\n");
    //preventExtensions impede que novas propriedades sejam adicionadas ao objeto person1, mas permite a modificação das propriedades existentes

    console.log("Object.isExtensible(person1): ", Object.isExtensible(person1), "\n");
    //isExtensible verifica se o objeto person1 é extensível, ou seja, se novas propriedades podem ser adicionadas, e retorna true ou false

    console.log("Object.create(person1): ", NewObjeto = Object.create(person1), "\n");
    //cria um novo objeto com person1 como protótipo, permitindo que o novo objeto herde as propriedades e métodos de person1
    console.log(NewObjeto);
    console.log(NewObjeto.nome);
    console.log(NewObjeto.idade);
nome1();



console.log();
console.log(" for Each com callback:  lista5 = [5, 10, 20, 30]\n");
lista5 = [5, 10, 20, 30];
contador = 0;
lista5.forEach(lista5 => { // callback que recebe cada elemento da lista5 e verifica se é maior ou igual a 20. Se for, a função retorna sem fazer nada. 
    if (lista5 >= 20) {
        return
    }
    contador += lista5; // Caso contrário, o valor do elemento é adicionado ao contador.
});
console.log(contador, "\n"); 
// Imprime a soma dos elementos da lista5


console.log("Manipulação de arrays:  lista = [1, 2, 3, 4, 5]\n");
lista = [1, 2, 3, 4, 5];
console.log(lista.length, "\n"); 
// Imprime o comprimento do array, que é 5

console.log(lista.push(6), "\n"); 
// Adiciona o elemento 6 ao final do array e imprime o novo comprimento, que é 6

console.log(lista.pop(), "\n"); 
// Remove o último elemento do array (6) e imprime o valor removido, que é 6

console.log(lista.shift(), "\n"); 
// Remove o primeiro elemento do array (1) e imprime o valor removido, que é 1

console.log(lista.unshift(0), "\n"); 
// Adiciona o elemento 0 no início do array e imprime o novo comprimento, que é 5

console.log(lista.slice(1, 4), "\n"); 
// Retorna um novo array contendo os elementos do índice 1 ao 3 (exclusivo) e imprime [2, 3, 4]

console.log(lista.splice(2, 1), "\n"); 
// Remove 1 elemento a partir do índice 2 (o número 3) e imprime o valor removido, que é [3]

console.log(lista.indexOf(4), "\n"); 
// Retorna o índice do primeiro elemento igual a 4 e imprime 2

console.log(lista.includes(5), "\n"); 
// Verifica se o array contém o elemento 5 e imprime true

console.log(lista.join(", "), "\n"); 
// Junta os elementos do array em uma string separada por ", " e imprime "0, 2, 4, 5"

console.log(lista.reverse(), "\n"); 
// Inverte a ordem dos elementos do array e imprime [5, 4, 2, 0]        


console.log();
console.log("Manipulação de arrays usando métodos de ordem superior: lista1 = [3, 4, 5, 6]\n");
lista1 = [3, 4, 5,6];
function nome2() {
    console.log("método lista1.map(x => x * 2): ", lista1.map(x => x * 2), "\n"); 
    // Retorna um novo array com cada elemento multiplicado por 2

    console.log("método lista1.filter(x => x % 2 === 0): ", lista1.filter(x => x % 2 === 0), "\n"); 
    // Retorna um novo array contendo apenas os elementos pares e imprime [4, 2, 0]

    console.log("método lista1.reduce((acc, x) => acc + x, 0): ", lista1.reduce((acc, x) => acc + x, 0), "\n"); 
    // Reduz o array a um único valor somando todos os elementos a partir de um valor inicial de 0 e imprime

    console.log("método lista1.reduce((acc, x) => acc * x, 1): ", lista1.reduce((acc, x) => acc * x, 1), "\n"); 
    // Reduz o array a um único valor multiplicando todos os elementos

    console.log("método lista1.find(x => x > 3): ", lista1.find(x => x > 3), "\n"  ); 
    // Retorna o primeiro elemento maior que 3 e imprime

    console.log("método lista1.findIndex(x => x === 3): ", lista1.findIndex(x => x === 3), "\n"); 
    // Retorna o índice do primeiro elemento igual a 3 e imprime

    console.log("método lista1.sort((a, b) => b - a): ", lista1.sort((a, b) => b - a), "\n"); 
    // Ordena o array em ordem decrescente e imprime

    console.log("método lista1.some(x => x > 4): ", lista1.some(x => x > 4), "\n"); 
    // Verifica se algum elemento do array é maior que 4 e imprime true

    console.log("método lista1.every(x => x >= 0): ", lista1.every(x => x >= 0), "\n"); 
    // Verifica se todos os elementos do array são maiores ou iguais a 0 e imprime true

    console.log("método lista1.includes(5):  ", lista1.includes(5), "\n"); 
    // Verifica se o array contém o elemento 5 e imprime true

    console.log("método lista1.join(' - '):   ", lista1.join(' - '), "\n"); 
    // Concatena os elementos do array em uma string separada por ' - ' e imprime "3 - 4 - 2 - 0"

    console.log("ForEach - Não retorna um novo array- realiza ações colaterais, imprimindo valores ou modificando elementos do array original");
    // itera sobre os elementos de um array e executar uma função para cada elemento. 
   
    console.log("lista1.forEach(x => console.log(x))", "\n");  // Imprime cada elemento do array
    lista1.forEach(x => console.log(x));

    console.log("lista1.forEach(x => console.log(x * 3)):, \n "); // Imprime cada elemento do array multiplicado por 3
    lista1.forEach(x => console.log(x * 3)); 
    
    console.log("array3.forEach(element => console.log(element + 10))", "\n"); // Imprime cada elemento do array somado a 10
    const array3 = [1, 2, 3, 4];
    novo_array = array3.forEach(element => console.log(element + 10));
    console.log(novo_array); // Imprime cada elemento do array no console
}
nome2();


console.log();
console.log();
console.log("  ------  Função FILTER COM CALLBACK, MAIS SEM ARROW FUNCTION. CRIANDO UMA FUNÇÃO A PARTE  -------\n");
idade = [10,13, 15, 20, 25, 30];

function filtraIdade(idade) { // Essa função é a CALLBACK, ela é a regra de inspeção, a regra de teste.
        return idade > 18; // retorna todos os valores > que 18.
    }
function numero(){ 
    console.log(idade.filter(filtraIdade)); // filter é a função principal, o motor que sabe percorrer listas
}
numero();
/**
 * Quando você escreve idade.filter(filtraId), o JavaScript faz o seguinte:
 * - O filter olha para o primeiro número da lista idade (que é 10).
 * - Ele "telefona" para a função filtraId e pergunta: "Ei, o número 10 passa?".
 * - A função filtraId recebe o 10 no parâmetro idade, faz a conta 10 > 18 e responde: false.
 * - O filter descarta o 10 e pula para o próximo número.
 * - Quando ele chega no 20, a função filtraId responde true, e o filter guarda esse value.
 */


console.log();
console.log(" -----  Função SEM CALLBACK  ---------\n");
function numero3(){
    let idadeFiltrada = [];
    for(let i = 0; i < idade.length; i++){
        if(idade[i] > 18){
            idadeFiltrada.push(idade[i]);
        }
    }
    console.log(idadeFiltrada);
}
numero3();


/**
 * A função que é passada como "ingrediente" (argumento) para outra função, 
 * para ser executada depois (por isso o nome Call Back ou "Chamar de volta")
 */
console.log();
console.log("CALLBACK: CONCEITO, PADRÃO DE USO. usando arrow function, ou seja, sem a necessidade de criar uma função separada para o callback:\n");
function numero2(){
    console.log(idade.filter(x => x > 18)); // x é o elemento da lista que ele esta lendo/  => indica que o que ven a seguir é a regra / x> 18 é o teste, se true número fica na lista, se falso é descartado.
}                           // A arrow function (x => x > 18) é a função de callback.
numero2();
/**
 * numero2(): Ela é um "envelope" que executa o filtro. O callback não tem 
 * nome e não existe fora dali; ele nasce e morre dentro do parênteses do 
 * filter. É a forma mais rápida e limpa de processar dados em JavaScript
 */


console.log();
console.log("ARROW FUNCTION: Forma mais concisa de escrever funções em JavaScript ----");
arrowFunction = () => {
    console.log("Função arrow function () => {}");
    // Imprime "Ola pessoal" no console usando uma arrow function
}
arrowFunction();
// A arrow function é uma função anônima, ou seja, não tem um nome, 
// () => { ... } é a sintaxe básica para criar uma arrow function.
