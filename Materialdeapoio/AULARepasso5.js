
/** COMPILAÇÃO     -  INTERPRETAÇÃO/EXECUÇÃO
 *  ESCOPO         -  CONTEXTO
 * 
 * ESCOPO : DEFINE O QUE O CÓDIGO EM UM DADO LOCAL ENXERGA, COMO SE FOSSE BARREIRAS QUE DIVIDE O CÓDIGO.
  -CARACTERÍSTICA: SÓ É POSSÍVEL ENXERGAR DE DENTRO PARA FORA, O ESCOPO FILHO VÊ O PAI, MAS O PAI NÃO VÊ O FILHO.
  - O ESCOPO DEPENDE DA ORDEM QUE EU DECLARO, DA LOCALIZAÇÃO DO CÓDIGO.
  - ELE É ESTÁTICO!!!!! ELE NÃO MUDA , DIFERENTE DO CONTEXTO "this", ele é DINÂMICO E MUDA CONFORME A EXECUÇÃO
   - A VARIÁVEL "VAR" É A ÚNICA QUE VAGA DO ESCOPO, COM EXCEÇÃO DO ESCOPO DE BLOCO if{ }, for{ }, switch{} E DO ESCOPO DE FUNÇÃO, 
   SOMENTE NESSES CASOS ELA NÃO VAZA
 - A ABERTURA DE UM ESCOPO OCORRE NA SUA DECLARAÇÃO . ENTÃO UMA LINGUAGEM PURAMENTE INTERPRETADA ESSE CÓDIGO ABAIXO DÁ ERRO, 
 POIS ESTARIA EXECUTANDO UMA FUNÇÃO, MAS SUA DECLARADA ACONTECEU DEPOIS DA CHAMADA.
 - EXEMPLO:

teste ();

function test() {
   console.log("zzzzzzz")
}

- MAS O JAVASCRIPT EXECUTA DE FORMA HIBRIDA:

* MEIO COMPILADA: FASE DE COMPILAÇÃO(CRIAÇÃO DE ESCOPO) QUE SIGNIFICA QUE ELE LÊ TODO O ARQUIVO ANTES, ISSO SE CHAMA 
HOISTING: LÊ TUDO QUE ESTÁ DECLARADO E PUXA PARA CIMA DO ARQUIVO).
 Ele ignora chamadas de função ou cálculos agora. Ele só quer saber:  "quem são as variáveis e funções deste arquivo?"
  
* E MEIO INTERPRETADA/EXECUÇÃO: Agora que o motor já tem o "mapa" de onde as funções estão, ele começa a ler linha por linha, 
   de cima para baixo:
  1.Na Linha (teste(): O motor pergunta ao escopo: "Existe uma função chamada teste?". O escopo responde: "Sim, eu a encontrei na fase de compilação!".
  2.Ação: A função é executada e imprime "zzzzzzz".
  3.Resto do código: Ele continua lendo, mas como a função já foi "processada" na fase anterior, ele não precisa fazer mais nada 
  ao passar pela declaração dela.

  Por que isso é importante para o seu this?
  A declaração de escopo que você mencionou acontece na compilação. Quando você usa uma " arrow function ", o this é "amarrado" na fase de compilação 
  (ele olha quem é o pai no mapa do código).
  Quando você usa uma função comum, o this é decidido apenas na fase de execução, dependendo de quem chamou a função.
  
  Resumo visual:
  - Compilação: O JS separa as ferramentas (funções e variáveis).
  - Execução: O JS usa as ferramentas na ordem em que aparecem.
  
  Cuidado: Se você transformar seu teste em uma variável (const teste = () => ...), o Hoisting não funciona da mesma forma e o código daria erro 
  se chamado antes da linha de criação. 
  Quer ver a diferença do que acontece com variáveis const nessa fase de compilação?

   --------DIFERENÇA DO QUE ACONTECE COM VARIÁVEL CONST NA FASE DE COMPILAÇÃO ------
   Aqui é onde o bicho pega! O comportamento muda completamente porque o JavaScript trata declaração de função de um jeito e declaração de variável de outro.
   1. Fase de Compilação (O que o JS vê)
   - Ao encontrar const teste = ..., o motor do JS faz o seguinte:
   - Ele reconhece que a variável teste existe.
   - Mas ele não a inicializa. Ela fica em um estado chamado TDZ (Temporal Dead Zone) ou Zona Morta Temporal.
   - Diferente da function, o código da arrow function ainda não foi "lido" nem guardado na memória, apenas o nome da variável foi reservado.
   
   2. Fase de Execução (Onde o erro acontece)
   - Se o seu código estiver assim:

   teste(); // ❌ ERRO AQUI!

   const teste = () => {
      console.log("zzzzzzz");
};
   1. Linha: (teste();): O motor pergunta: "Tem 'teste' no escopo?". 
   O escopo diz: "Tem, mas ela ainda não foi inicializada, você não pode tocar nela!".
   Resultado: ReferenceError: Cannot access 'teste' before initialization.


   Por que com function funciona e com const não?
   - Function Declaration: O Hoisting é completo. O JS leva o nome e o corpo da função para o topo. É como se ele montasse o brinquedo antes de você brincar.
   - Const/Let/Var: O Hoisting é parcial. O JS sabe que a variável vai existir, mas não deixa você usar até que ele chegue na linha onde você deu um valor 
   para ela. É como se ele reservasse o lugar na prateleira, mas o brinquedo ainda estivesse na caixa.
   
   E o this léxico nisso tudo?
   - Como a Arrow Function é sempre atribuída a uma variável (como const), ela sofre essas duas regras ao mesmo tempo:
      A) Na Compilação: Ela já decide quem é o this (olhando para o pai).
      B) Na Execução: Ela só passa a existir quando o código chega na linha dela.
      Resumo da ópera: Se você quer usar o "poder" do Hoisting (chamar antes de declarar), 
      você tem que usar function comum. Se usar Arrow Function, a ordem das linhas importa muito!


_____________________________ AGORA VAMOS ENTENDER CONTEXTO ________________

 Se você usar const limite = 1000 (sem o nome global antes nome da variável.), 
 * o Node.js guarda isso em um escopo de "módulo" privado, e nem o global 
 * nem o this conseguem acessar essa variável, a menos que você a chame 
 * pelo nome diretamente. */

global.limite = 1000 // Agora o limite é parte do objeto global, e o this.limite dentro do .call() vai funcionar

// 2. OBJETO COM MÉTODO
const configuracao = {
  limite: 10, 
  filtro: function(valor) {
    console.log("O this.limite atual é:", this.limite);
    return valor > this.limite;
} 
};

//Chamada normal (this é o objeto), pois a função é chamada a partir do objeto configuracao.filtro(500)
console.log(configuracao.filtro(500))

//Chamada com .call() para mudar o contexto do this apontando para o escopo global: configuracao.filtro.call(globalThis,500)
console.log(configuracao.filtro.call(globalThis, 500)) 
/**
 * O .call() tem o poder de sobrescrever o dono da função, mesmo que ela já esteja dentro de um objeto.
 * Se você fizer isso, você estará dizendo ao JavaScript: Use a lógica da função que está dentro de configuracao, mas mude 
 * o this dela para o escopo global".
 * 
 * No entanto, há um detalhe técnico: para o .call() acessar 
 * o limite = 1000, a forma como você o declarou importa: console.log(configuracao.filtro.call(globalThis, 50)); 
 * 
 * O que acontece no resultado?
 * Se você estiver no Node.js (Terminal Ubuntu): O const limite = 1000 
 * não vai para o objeto global automaticamente. 
 * O this.limite dentro do .call(globalThis) retornaria undefined, 
 * e a comparação seria 50 > undefined, resultando em false.
 * Para funcionar no Node.js usando o escopo global, você teria que definir 
 * como global.limite = 1000.
 * 
 * A lógica de ouro do .call():
 * O .call() sempre prioriza o que você passa no primeiro argumento. Ele 
 * ignora que a função está escrita dentro de configuracao 
 * e "teletransporta" a execução dela para o novo contexto que você definiu.
 * 
 * Em resumo: O .call() manda mais que a estrutura do objeto. Se você injetar 
 * um novo contexto, o this original é sempre descartado.
 * 
 *
 *  ***************  IMPORTANTE  ******************
OBS: CADA FUNÇÃO NORMAL CRIA O SEU PRÓPRIO CONTEXTO. POR PATRÃO O 
CONTEXTO DELA É SEMPRE "GLOBAL", A NÃO SER EU EU MODIFIQUE ESSE 
CONTEXTO  "OU"  QUE ESSA FUNÇÃO ESTEJA DENTRO DE UM OBJETO(ENTÃO O CONTEXTO DELA
ESTÁ VINCULADO OU OBJETO).
 * */

const person = {  // OBJETO person com Atributos e um função fullName
   age: 10,
   name: "Robson",

   fullName3: function(){
      console.log (this); }
};

//chamando a função NORMAL fullName, que está dentro do objeto person, então por padrão o contexto dela é o objeto person
person.fullName3(); 




// MAS , ARROW FUNCTION É UMA FUNCÃO QUE ROUBA O CONTEXTO DO SEU PAI, PORQUE ELA NAO CRIA O SEU PRÓPRIO CONTEXTO

const person30 = {   // OBJETO 
   age: 55,
   name: "Cristiane",
}

function teste(){  // função teste com uma arrowFunction() e uma função t() dentro dela:
   console.log (this)


   const arrowFunction = () => {
      console.log (this)
   }
   arrowFunction() //O CONTEXTO DELA É A DO SEU PAI teste(), e teste() por sus vez recebeu o contexto person30 determinado por apply


   function t(){
    console.log (this)
   }
   t() // AO NÃO PASSAR UM CONTEXTO. o CONTEXTO de t() É O GLOBAL POR SER O PATRÃO.
}

// chamando a função teste, e com o apply EU DETERMINEI QUE SEU CONTEXTO SEJA A DO OBJETO person
teste.apply(person30 );


// Se chamamos a função teste sem passar nenhum contexto, o contexto dela será o global, 
// E POR CONSEQUÊNCIA O CONTEXTO DA arrowFunction também será global.
//teste(this) 

/**  -----------------------------------------------------------------------
IMPORTANTE SOBRE A ARROW FUNCTION:
Você não consegue mudar o contexto (this) de uma arrow function. Essa é uma das características fundamentais delas: o this é léxico. 
Isso significa que ele é definido no "" momento em que a função é criada (herdando do pai) """" e se torna """imutável""""" dentro dela.
Se você tentar usar métodos como .bind(), .call() ou .apply() em uma arrow function para passar um novo contexto, o JavaScript 
simplesmente ignora o novo this e usa o original.

EXEMPLO DE CÓDIGO:
*/
// OBS: ISSO É UM OBJETO DECLARADO, ELE NAO CRIA ESCOPO!!!! SO UMA FUNÇÃO CRIA ESCOPO, OU SEJA só A função metodoArrow() tem um escopo.
const objetoPai = { 
  nome: 'Original',
  metodoArrow: () => {
    console.log(this.nome);
  }
};

objetoPai.metodoArrow();  // Resultado:  "undefined " porque é o valor de 'this.nome' no escopo global(o pai dela).
// Chamando metodoArrow no contexto do objetoPai: Para a Arrow Function, o "pai" não é o objeto literal(objetoPai), mas sim o escopo 
// onde o objeto foi criado. No JavaScript, um par de chaves { ... } define um objeto, mas não cria um novo escopo. O escopo só é criado 
// por funções ou pelo arquivo/módulo global.
// OU SEJA, NESSE código:
// 1. O objetoPai está sendo definido no escopo global (ou dentro de algum módulo).
// 2. A Arrow Function metodoArrow é criada e olha para fora em busca do contexto.
// 3. Como o objeto {} não é um escopo, ela "pula" o objeto e captura o this do nível acima (o global ou window).
// Regra de ouro: 
// - Arrow Function: O this é definido onde a função foi escrita (lexical).
// - Função Comum: O this é definido por quem chamou a função (quem está antes do ponto). Se você quer que a 
// função acesse o nome: 'Original', você precisa construir a sintaxe de método(função) tradicional: metodoArrow2() { ... }.



//-----AGORA VAMOS CRIA UM CONTEXTO GLOBAL PARA QUE A FUNÇÃO metodoArrow() ENXERGUE ESSE CONTEXTO: -----
nome1 = "Global234"; // Contexto GLOBAL do arquivo/window 

const objetoPai1 = {
  nome1: 'Original',
  metodoArrow: () => {  // Ela ignora a varável  'Original' porque o objeto não é um escopo. Ela vai roubar o 'this' de onde o 'objetoPai' nasceu.
    console.log(nome1); 
  }
};
objetoPai1.metodoArrow(); // Resultado: "Global1234" , porque NO contexto global a variável nome1 EXISTE, então funciona.



//------- AGORA MESMO QUE EU INSISTA EM CRIAR UM NOVO CONTEXTO NA MÃO PARA A ARROW FUNCTION ela vai IGNORAR , OBSERVA ABAIXO: ------
// novo contexto criado
const novoContexto = { nome: 'Novo' };


// Tentar forçar o novo contexto para a arrow function  - e não funciona!!!
objetoPai.metodoArrow.call(novoContexto); 
// Resultado: undefined (ou o valor de 'this.nome' no escopo global/pai)




// ---- PARA QUE UMA ARROW FUNCTION FUNCIONE É PRECISO CRIA-LA DENTRO DE UMA CLASSE OU DENTRO DE UMA FUNÇÃO:  ---------- 
// A diferença visual de "Pai"
// Para a Arrow Function herdar o objeto, o objeto precisaria ser uma Classe ou a função teria que estar dentro de outra função:

// - No meu código (Não funcionou): A arrow function nasce "no meio da rua" (global) e o objeto é só uma caixa ao redor dela. 

// - Ja em uma Classe (Funciona): 
class Pessoa {
  nome = 'Original';
  metodoArrow = () => {
    console.log(this.nome); // Aqui o 'pai' é a instância da classe!
  }
}
pessoa2 = new Pessoa();
pessoa2.metodoArrow(); // Resultado: "Original"