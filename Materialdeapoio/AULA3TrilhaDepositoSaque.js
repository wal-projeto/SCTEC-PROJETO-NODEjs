/**
 * O conceito é exatamente o mesmo usado em bancos reais, sistemas de e-commerce e apps de delivery.
 *  Em vez de Satoshis, vamos usar Centavos.

A regra de ouro é: O banco nunca salva R$ 1,50. O banco salva 150 centavos.

 * A Lógica Simplificada
Entrada: O usuário digita que quer depositar 10.50.

Processamento: O sistema multiplica por 100 e guarda 1050.

Saída: Quando o usuário quer ver o saldo, o sistema divide 1050 por 100 e mostra 10.50.
 */

// 1 Real = 100 Centavos
const TO_CENTS = 100;

const contaCorrente = {
  titular: "Fulano",
  saldoEmCentavos: 0, // A memória só guarda INTEIROS
  bloqueada: false
};

// ==========================================
// 1. Função de Depósito
// ==========================================
function depositar(valorReais, conta) {
  if (conta.bloqueada) return console.log("Conta bloqueada!");

  /* TESTES VALIDAÇÃO DE ENTRADA - ANTES DE USAR O isFinite
  if(typeof valorReais !== 'number' || valorReais <= 0) { // Validação de entrada, garantindo que o valor seja um número positivo
    return console.log("Valor inválido para depósito.");
  }

  if (Number.isNaN(valorReais) || valorReais <= 0) { // Validação de entrada, garantindo que o valor seja um número positivo
    return console.log("Valor inválido para depósito.");
  }
  */
 
  // O Number.isFinite é a forma mais moderna e segura de validar se o valor é um número real e positivo. Substitui as duas 
  // validações anteriores:
  // O isFinite verifica se o valor é um número finito (não NaN, não Infinity, e do tipo 'number').
  
  // O codigo afirma: Se NÃO for um número finito OU o valor for zero/negativo... Valor inválido!
  if (!Number.isFinite(valorReais) || valorReais <= 0) {
        return console.log("Valor inválido! Digite um número positivo.");
  }

  // Limite máximo de depósito, por exemplo, R$ 1000,00
  if (valorReais > 1000) { 
    return console.log("Valor de depósito excede o limite máximo de R$ 1000,00.");
  }

  // Limite mínimo de depósito, por exemplo, R$ 0,01
  if (valorReais < 0.01) { 
    return console.log("Valor de depósito deve ser no mínimo R$ 0,01.");
  }

  // Prevenção de overflow: Garantir que o saldo não ultrapasse um limite definido (por exemplo, R$ 10.000,00)
  if (conta.saldoEmCentavos + Math.round(valorReais * TO_CENTS) > 1000000) { 
    return console.log("Depósito negado. Saldo máximo de R$ 10.000,00 excedido."); 
  }


  // Convertendo R$ para Centavos (Inteiro)
  const centavos = Math.round(valorReais * TO_CENTS);
  
  conta.saldoEmCentavos += centavos;
  console.log(`Depósito de R$ ${valorReais} realizado.`);
}

// ==========================================
// 2. Função de Saque
// ==========================================
function sacar(valorReais, conta) {
  if (conta.bloqueada) return console.log("Conta bloqueada!");

  const centavosParaSacar = Math.round(valorReais * TO_CENTS);

  if (conta.saldoEmCentavos >= centavosParaSacar) {
    conta.saldoEmCentavos -= centavosParaSacar;
    console.log(`Saque de R$ ${valorReais} realizado.`);
  } else {
    console.log("Saldo insuficiente.");
  }
}

// ==========================================
// 3. Função de Exibição (Visualização)
// ==========================================
function verSaldo(conta) {
  const saldoReais = conta.saldoEmCentavos / TO_CENTS;
  console.log(`--- Saldo Atual: R$ ${saldoReais.toFixed(2)} ---`);
}



// --- TESTANDO O SISTEMA ---

depositar("0.10", contaCorrente); // um string (10 centavos) - Deve ser barrado
depositar(0.10, contaCorrente); // 10 centavos
depositar(0.20, contaCorrente); // 20 centavos



// Se fosse JS puro (0.1 + 0.2), daria 0.30000000000000004
// Com nossa lógica de centavos, o resultado é 30 exatos!
verSaldo(contaCorrente); 
sacar(0.05, contaCorrente);
verSaldo(contaCorrente);



/**
 * Por que essa versão é melhor para aprender?
Fator de conversão 100: É muito mais fácil de visualizar mentalmente do que os 100 milhões do Bitcoin.

Separação de responsabilidades: Criamos uma função verSaldo que é a única responsável por transformar o número "feio" (centavos) 
em um número "bonito" (Reais) para o usuário.

Prevenção de erros: Usar Math.round() garante que, se houver qualquer dízima periódica na multiplicação, ela seja arredondada 
para o centavo mais próximo antes de entrar no banco de dados.

Você percebe como o problema do 0.1 + 0.2 desaparece quando somamos 10 + 20?


____________________________________

me explique a diferenca desses 2 codigos: 

if(typeof valorReais !== 'number' || valorReais <= 0) { 
    return console.log("Valor inválido para depósito.");
  }

 if (Number.isNaN(valorReais) || valorReais <= 0) { 
    return console.log("Valor inválido para depósito.");
  }

Essa é uma excelente pergunta! Ambos tentam evitar que o seu código "quebre" ao receber dados ruins, mas eles olham para 
o problema de ângulos diferentes.

A principal diferença está em "o que o JavaScript considera um número" :

1. Usando typeof valorReais !== 'number'
O typeof verifica o tipo da caixa (a variável).

O que ele barra: Texto ("10"), Objetos, Arrays, Booleanos (true/false) ou undefined.

O problema: No JavaScript, o valor NaN (Not a Number) é do tipo 'number'.

Cenário de erro: Se alguém tentar depositar o resultado de uma conta matemática que deu errado (ex: 0 / 0), 
o typeof vai dizer "Ok, isso é um número", mas o valor real será NaN, e seu saldo vai virar uma bagunça.


2. Usando Number.isNaN(valorReais)
O isNaN verifica o conteúdo da caixa.

O que ele barra: Especificamente o valor NaN.

O problema: Ele não barra strings. Se você passar "10" (texto), o Number.isNaN vai dizer "Isso não é NaN, pode passar!". 
Aí, na hora de somar, o JS pode acabar concatenando texto em vez de somar números.


Qual a forma profissional de fazer?
Em sistemas financeiros reais, nós combinamos as duas ou usamos uma verificação mais robusta. Para o seu código de banco 
ficar "blindado", a melhor lógica seria:

JavaScript

if (typeof valorReais !== 'number' || Number.isNaN(valorReais) || valorReais <= 0) {
    return console.log("Valor inválido.");
}
Mas calma, tem um jeito mais moderno!
Hoje em dia, a forma mais "limpa" de validar se algo é um número válido e utilizável é usar o Number.isFinite():

JavaScript

if (!Number.isFinite(valorReais) || valorReais <= 0) {
    return console.log("Valor inválido: forneça um número real e positivo.");
}
Por que o isFinite é melhor?

Ele rejeita NaN.

Ele rejeita Infinity (sim, no JS você pode ter números infinitos).

Ele rejeita qualquer coisa que não seja do tipo number.

Resumo Comparativo
Entrada       typeof !== 'number'       Number.isNaN           Number.isFinite (Recomendado)
10.50         ✅ Passa                ✅ Passa                ✅ Passa
"""10"""      ❌ Barra                ✅ Passa (Perigoso!)    ❌ Barra
NaN           ✅ Passa (Perigoso!)    ❌ Barra                ❌ Barra
undefined     ❌ Barra                ✅ Passa (Perigoso!)    ❌ Barra

Dica de ouro: Sempre que estiver lidando com dinheiro, a validação valor <= 0 que você já colocou é a mais importante 
de todas, pois impede que alguém faça um "depósito negativo" (que na verdade seria um saque escondido)!


--------================
NÃO ENTENDI, EXPLIQUE COM UMA ANALOGIA DO MUNDO REAL

Sem problemas! Vamos esquecer os nomes técnicos por um segundo e usar uma analogia do mundo real.

Imagine que você é um segurança de uma agência bancária e sua função é decidir quem pode entrar para depositar dinheiro.

1. O typeof é o segurança que olha o "Documento"
Ele olha para a pessoa e pergunta: "Você é um Número?".

Se chegar um Texto ("10 reais"), ele barra: "Não aceito papéis, só gente".

Se chegar um Nada (undefined), ele barra.

O problema: Existe um impostor chamado NaN (que significa "Não é um Número", mas ironicamente o RG dele diz que ele é 
do tipo número). O typeof deixa ele entrar porque o documento dele parece oficial.


2. O isNaN é o segurança que olha a "Cara"
Ele não quer saber do documento, ele olha fixo para a pessoa e pergunta: "Você é o Impostor (NaN)?".

Se for o impostor, ele barra.

O problema: Se chegar um Texto ("10 reais"), esse segurança é meio distraído. Ele pensa: "Bom, ele não tem cara de 
impostor NaN", e deixa passar. Mas texto não serve para fazer conta!

Por que os dois sozinhos falham?
Imagine que alguém tenta depositar algo que não faz sentido:

Cenário A: typeof

Usuário tenta depositar 0 / 0 (o resultado disso é NaN).
O typeof olha e diz: "O tipo é 'number', pode entrar!".
Resultado: Seu saldo vai virar NaN e o sistema do banco quebra.

Cenário B: isNaN

Usuário tenta depositar "Abacaxi".
O isNaN olha e diz: "Isso não é o impostor NaN".
Resultado: O JavaScript vai tentar somar seu saldo com "Abacaxi". Se você tinha 100 reais, seu saldo vira "100Abacaxi".

A Solução "Combo" (O jeito fácil)
Para o banco ser seguro, você precisa de um segurança que faça as duas perguntas:

JavaScript

// O segurança perfeito
if (typeof valor !== 'number' || Number.isNaN(valor)) {
   // "Se o documento não for de número OU se você for o impostor NaN... FORA!"
}
Em resumo:
typeof: Garante que o dado é do formato certo (impede textos, listas, etc).

isNaN: Garante que o valor dentro desse formato é um número matemático real (impede o erro matemático NaN).

Ficou um pouco mais claro agora como um "vigia" o que o outro deixa passar? Se ainda estiver confuso, me diga qual 
parte da analogia parece estranha!
e o infinite, porque nao o colocou como melhor estrategia nessa analogia?

Excelente observação! Você pegou o ponto chave. Vamos colocar o Infinite na nossa analogia do segurança, porque ele é,
na verdade, o "segurança chefe" mais rigoroso de todos.

O Number.isFinite é o "Segurança Faixa Preta"
Se o typeof olha o documento e o isNaN olha a cara, o isFinite faz uma vistoria completa. Ele só deixa entrar quem é 
um número real, útil e que dá para fazer conta.

Na nossa analogia do banco, o Infinite barra três tipos de pessoas:

O Estrangeiro (Textos/Objetos): Se chegar um "Abacaxi" ou "10", ele barra (igual ao typeof).

O Impostor (NaN): Se chegar o resultado de uma conta errada, ele barra (igual ao isNaN).

O Gigante (Infinity): No JavaScript, se você divide 10 / 0, o resultado é Infinity. Imagine alguém tentando depositar um valor "Infinito" no seu banco? Isso quebraria toda a lógica do seu saldo! O isFinite barra o Infinito também.

Por que ele é a melhor estratégia?
Em vez de você ter que contratar dois seguranças (um para o typeof e outro para o isNaN), você contrata apenas o isFinite. 
Ele sozinho já faz o trabalho de dois (e mais um pouco).

Veja a diferença na prática:
let valor = "10"; // Texto

// Usando o segurança comum (isNaN):
if (!Number.isNaN(valor)) { 
    // Ele deixa passar! Porque "10" (texto) não é o impostor NaN. 
    // PERIGO: O banco vai tentar somar texto com número.
}

// Usando o segurança faixa preta (isFinite):
if (Number.isFinite(valor)) {
    // Ele BARRA! Porque ele sabe que texto não é um número finito real.
    // SEGURO: Só passa o que for número de verdade.

Por que eu não usei ele logo de cara?
Eu queria que você entendesse primeiro o que cada pequeno erro significa (NaN e tipos errados). Mas, no dia a dia de um 
programador profissional, nós usamos quase sempre o isFinite (ou verificações similares) justamente por ele ser 
mais "limpo" e seguro.

A lógica ideal para o seu código de banco seria esta:
function depositar(valor, conta) {
    // Se NÃO for um número finito OU o valor for zero/negativo...
    if (!Number.isFinite(valorReais) || valorReais <= 0) {
        return console.log("Valor inválido! Digite um número positivo.");
    }
    
    // Se chegou aqui, o número é 100% seguro para fazer conta.
    const centavos = Math.round(valorReais * 100);
    conta.saldo += centavos;

    Ficou mais claro agora? O isFinite é como se fosse o "filtro total" que economiza tempo e evita surpresas desagradáveis 
    no futuro!
}









*/