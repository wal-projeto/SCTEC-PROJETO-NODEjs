// closure: mantém na memória as variáveis e o contexto de execução de uma função,

// callstack: pilha de execução

// garbage collector: limpa a memória

// callback: função que é passada como argumento para outra função

//promises - assincronismo



// closure: mantém na memória as variáveis e o contexto de execução de uma função, 
// para que eu possa usar elas depois, mesmo que ja tenha 
// finalizado a execução.
// escopo -> compilação
// contexto -> execução

function teste(){
     console.log("Oi, eu sou a função teste")
    const pessoa = {
       nome: "João", // contexto de execução e ESCOPO da teste
    }

    const arrowFunction = () => {
        console.log("Oi, eu sou a arrowFunction")
        return pessoa // acesso devido ao escopo

    }

    return arrowFunction // retornando 
}

const arrow_funcao = teste() // chamando a função teste() que retorna a arrowFunction

console.log(typeof arrow_funcao )

const pessoa1 =  arrow_funcao()
console.log(pessoa1) 

console.log(teste.pessoa)

/** porque consigo imprimir a variavel pessoa mesmo depois da função teste() ter finalizado
 Você consegue imprimir a variável pessoa por causa de um conceito chamado Closure (Fechamento).
 Mesmo que a função teste já tenha terminado de rodar, a arrowFunction não "esquece" de onde veio.

Como funciona a "Mochila" (Closure):
Quando você cria uma função dentro de outra, o JavaScript cria um vínculo eterno. A função interna (a arrow) salva na "mochila" dela todo o escopo onde ela nasceu.
1. Nascimento: A arrowFunction nasce dentro da teste. Ela olha em volta e vê a variável pessoa.
2. Exportação: Quando você faz return arrowFunction, você está mandando a função para fora da "fábrica" (teste).
3. A Sobrevivência: A função teste morre (o escopo dela é limpo), mas como a arrowFunction ainda está viva na sua variável arrow_funcao, ela mantém o acesso àquela variável pessoa que estava na mochila dela.

Por que isso é especial?
Normalmente, variáveis dentro de funções são destruídas para economizar memória assim que a função termina. Mas o JavaScript percebe:
 "Ei, aquela arrow function que saiu ainda pode precisar da variável pessoa, então não vou destruí-la".

 Em resumo: Você consegue imprimir pessoa porque a função carrega o contexto original de criação com ela, não importa para onde você a leve no código.
Ficou claro que a função "se lembra" do lugar onde foi escrita?
Quer ver o que acontece se você mudar o valor de pessoa antes de retornar a função?
 Se você mudar o valor antes do return, a função vai refletir essa mudança. Isso prova que ela não tirou uma "foto" estática, mas sim que ela mantém uma referência viva ao espaço na memória onde a variável mora.Veja este exemplo:

 Veja este exemplo:

function teste() {
    let pessoa = { nome: "João" };

    const arrowFunction = () => {
        return pessoa;
    };

    // Mudando o valor ANTES de devolver a função
    pessoa = { nome: "Carlos" }; 

    return arrowFunction;
}

const minhaFuncao = teste();
console.log(minhaFuncao()); // Resultado: { nome: "Carlos" }

O que aconteceu?
Como a arrowFunction guarda uma referência ao escopo (o lugar onde a variável vive) e não apenas ao valor do momento:
1. Ela aponta para o "espaço" chamado pessoa.
2. Como você trocou o conteúdo desse espaço para "Carlos" antes de terminar a função teste, quando você chama a função lá fora, ela vai até aquele espaço e encontra o valor mais atualizado.

E se mudarmos DEPOIS de a função já estar lá fora?

Se você tivesse uma forma de alterar aquela variável interna (por exemplo, através de outra função), a arrowFunction continuaria mostrando o valor novo. O "vínculo" é permanente enquanto a função existir.

Fato curioso: Isso é o que permite a existência de encapsulamento no JavaScript. Você pode criar variáveis que ninguém consegue tocar diretamente (estão escondidas dentro da teste), mas que suas funções internas conseguem ler e modificar.
me dê um exemplo disso: E se mudarmos DEPOIS de a função já estar lá fora?

Para fazer isso, precisamos retornar duas funções: uma para ler o valor e outra para mudar o valor. Assim, você verá que a primeira função "percebe" a mudança feita pela segunda, mesmo as duas já estando "lá fora".

Veja esse exemplo de um Saldo Bancário:

function criarConta() {
    let saldo = 100; // Variável "escondida" (privada)

    const verSaldo = () => {
        console.log(`Seu saldo atual é: R$ ${saldo}`);
    };

    const depositar = (valor) => {
        saldo += valor; // Muda o valor DEPOIS de tudo criado
        console.log(`Depositado: R$ ${valor}`);
    };

    // Retornamos as duas funções dentro de um objeto
    return { verSaldo, depositar };
}

// 1. A função teste (criarConta) executa e termina.
const minhaConta = criarConta();

// 2. Chamamos a função de ver o saldo.
minhaConta.verSaldo(); // Resultado: 100

// 3. Mudamos a variável interna usando a outra função "lá fora".
minhaConta.depositar(50); 

// 4. Chamamos a primeira função de novo.
minhaConta.verSaldo(); // Resultado: 150!

Por que isso funciona?

Mesmo que a função criarConta já tenha sido finalizada, o espaço na memória onde a variável saldo vive não foi destruído.

As duas funções (verSaldo e depositar) compartilham a mesma "mochila" (o mesmo closure). Quando a função depositar mexe no saldo, ela está alterando o valor exato que a verSaldo está vigiando.


Onde isso é usado na vida real?
É exatamente assim que funcionam os Hooks no React (como o useState). Você recebe uma função para ver o valor e outra para mudar, e o React mantém esse valor vivo e atualizado "atrás das câmeras" através de closures.

Conseguiu visualizar como as duas funções continuam conectadas à mesma variável, mesmo depois de "saírem da fábrica"? Quer tentar criar um contador que só permite aumentar o número e nunca diminuir?


 */

