console.log ("Entendendo o this:");

const usuario = { //objeto literal
  nome: "Walao",

 // O 'this' dentro desse método se refere ao objeto 'usuario'
  saudar: function() {
    console.log("Olá, meu nome é " + this.nome);
  }
};

usuario.saudar(); 

console.log ();

/**
 *  Dentro de um Objeto onde o this é mais usado):
 * serve para acessar propriedades do próprio objeto.
 * Se você não usasse this.nome, o código daria erro porque 
 * não saberia de qual "nome" você está falando.
 *
 * Resumo curto: O this significa "este objeto aqui 
 * onde eu estou agora".
 */

console.log ();


console.log ("Entendendo o this: com Arrow functions enchergando uma varável global, mesmo estando dentro de um escopo de objeto:");

/*** O que acontece se eu usar uma Arrow Function no lugar da função tradicional?
 * Se você mudar o método saudar para uma Arrow Function, o resultado muda completamente:
 * O arrow function não tem seu próprio this; ela herda o this do contexto onde foi criada.
 *
 */

global.limite = 1; // Variável global, acessível de qualquer lugar do código

const calculadora = { 
  limite: 20, 

  verificarSePassou: (valor) => { // Arrow Function 
        valor > global.limite,  // Aqui o this.limite não funciona aqui porque o this do arrow function é o global: global.timite = 1
        console.log("O limite atual é:", global.limite); 
        return valor > global.limite;
       } 
};

const numeros = [10, 25, 5, 30];

console.log(calculadora.verificarSePassou(25)); // Resultado: true
console.log(calculadora.verificarSePassou(0)); // Resultado: false

/**
 * O "Pulo do Gato" com Arrow Functions => :
 * Se você mudar a função dentro da calculadora para 
 * uma Arrow Function, o código quebraria:

verificarSePassou: (valor) => valor > this.limite // ERRO!

Por que? Porque a Arrow Function é "teimosa" e não aceita 
o this do objeto Calculadora; ela tenta pegar o this do sistema (global), 
onde o limite não existe.

-Arrow Function (=>): O this é fixo e vem de 
fora (do contexto onde ela foi criada).

No caso acima:
// objeto literal const calculadora que tem um método verificarSePassou. 
// Ele usa um arrow function, o que é 
// um detalhe importante para o comportamento do this. O this dentro do 
// arrow function não vai apontar para o objeto calculadora, mas sim 
// para o escopo global (onde global.limite = 1).
*/


console.log ();
console.log ("Entendendo o this: com a função .call() enchergando o this do objeto, mesmo que a função esteja fora desse objeto:");
/** 
Para que a função nossoFilterComContexto aceite um objeto externo como 
contexto (o this: minimo = 50), vamos adicionar um terceiro parâmetro à função, o contexto. 

 */

//O contexto é o objeto que queremos usar como this dentro da funcaoFiltradora.
const nossoFilterComContexto = (lista, funcaoFiltradora, contexto) => {
  const novaLista = [];
  for (const elemento of lista) {
    // Usamos o .call() para "forçar" o 'this.minimo'(contexto) da função a ser o nosso objeto
    if (funcaoFiltradora.call(contexto, elemento)) {
        console.log("Elemento aceito:", elemento, "com contexto mínimo:", contexto.minimo);
      novaLista.push(elemento);
    }
  }
  return novaLista;
};
// --- TESTANDO ---
// Este é o objeto que queremos usar como contexto para o 'this'(limite=50) 
const configuracao = { 
  minimo: 50
};
const notas = [10, 80, 45, 90, 30];

// IMPORTANTE: Aqui usamos 'function(n)' em vez de arrow function '=>' para o 'this' funcionar!
console.log(nossoFilterComContexto(notas, function(n) { return n >= this.minimo; }, configuracao));
/**
 * O que mudou aqui?
 * 1. O parâmetro contexto: Ele recebe o objeto que queremos 
 * que o this represente (neste caso, o objeto configuracao).
 * 2. O método .call(contexto, elemento): Essa é uma função mágica do 
 * JavaScript. Ela diz: "Execute a funcaoFiltradora, mas dentro dela, 
 * faça o this valer o que estiver na variável contexto, que é um objeto externo, que esta fora da função".
 * 3. A troca da Arrow Function: Note que no console.log eu usei 
 * function(n) { ... }. Se eu usasse (n) => ..., o this seria ignorado 
 * e o código não acharia o this.minimo.
 * 
 * Por que isso é útil?
 * Isso permite que você crie filtros que dependem de configurações 
 * externas que podem mudar a qualquer momento. Se você alterar 
 * configuracao.minimo = 70, a mesma chamada de função agora 
 * retornaria apenas [80, 90].
 * 
 * Faz sentido para você por que precisamos usar o .call() para "injetar" 
 * o this dentro da função?
 * 
 * MAS O QUE O .call faz? PODERIA EXPLICAR MELHOR?
 * Imagine que uma função é uma ferramenta (como uma furadeira) e o this 
 * é a bateria que faz ela funcionar.Normalmente, a função já vem com 
 * a própria bateria. O .call() serve para você dizer: "Ei, função, 
 * não use a sua bateria; use esta aqui que eu estou te entregando agora".
 * No código, o .call() faz duas coisas ao mesmo tempo:
 * 1. Executa a função: Ele dá o "play" na função na mesma hora.
 * 2. Define o this: O primeiro valor que você coloca dentro do parênteses 
 * do .call() passa a ser o this dentro daquela função.
 * 
 
 * 
 * Veja a diferença sem e com o .call():
 * 
 * Imagine que temos uma função solta que precisa de um nome:
 * Observe que ela nao esta dentro de nenhum objeto.
 
function dizerNome() {
    console.log("O nome é: " + this.nome);
}
dizerNome(); // Resultado: O nome é: undefined (porque o this não tem um nome para se referir)

- Agora, .call()  "teletransportou" essa função para dentro objeto específico:
dizerNome.call(pessoa1); // Resultado: O nome é: Walao (porque o this agora se refere a pessoa1)
dizerNome.call(pessoa2); // Resultado: O nome é: João (porque o this agora se refere a pessoa2)

- O .call() é como um controle remoto que você pode usar para escolher qual 
objeto será o "dono" da função no momento da execução. Ele ignora onde a 
função foi escrita e foca apenas no contexto que você está entregando.

const pessoa1 = {
    nome: "Walao" 
 }; // Objeto literal com a propriedade nome


const pessoa2 = { 
    nome: "João" }; // Outro objeto com a propriedade nome



 *A)  Se você chamar diretamente dizerNome(), o this.nome será undefined (não tem 
bateria/contexto). Não há um ponto antes dela, como por exemplo pessoa1.dizerNome(),
então o this não tem um objeto para se referir, pois não esta dentro de um objeto.
    
No JavaScript, quando uma função comum é chamada e esta "solta":
     - O this aponta para o Global: O motor do JS define o this como o 
     objeto global (global no Node.js ou window no navegador).
     
     - A busca falha: O JavaScript procura por uma variável chamada nome 
     dentro desse objeto global.
     
     - Resultado undefined: Como você não criou uma variável global.nome, 
     ele não encontra nada e retorna undefined.
     É por isso que eu usei a metáfora da bateria: a função tem o "fio" 
     do this pronto para conectar, mas se você não usar o .call() ou 
     não colocar a função dentro de um objeto, esse fio fica jogado no 
     chão, sem energia (sem contexto).


B) Se você codificar dizerNome.call(pessoa1), o resultado será "O nome é: Walao".
- o .call() agiu como um controle remoto que mudou o "dono" da função no 
momento exato da execução. Agora a Função foi para dentro do objeto pessoa1, 
e o this.nome encontra a propriedade nome dentro de pessoa1, que é "Walao".


- Se você fizer dizerNome.call(pessoa2), o resultado será "O nome é: João".
- novamentvamente o 



No seu Filtro:
Quando fizemos funcaoFiltradora.call(contexto, elemento), nós dissemos ao 
JavaScript: "Rode a função de teste, mas garanta que o this lá dentro seja 
o meu objeto de configuracao, e use o elemento da lista como o valor a 
ser testado."

Resumo: O .call() é um "grampeador" de contexto. Ele grampeia um 
objeto (contexto) em uma função para que ela possa usar os dados 
dele através da palavra this.

Ficou mais claro agora que o .call() é quem conecta o objeto à função?
 * 
 */