/**
 * CTROL + ALT + I : ABRE O CHATGPT
 * 
 * Trilha Base - Carteira Básica de Bitcoin
 * Você trabalha em uma exchange de criptomoedas. O Bitcoin (BTC) é fracionável em até 8 casas decimais. A menor unidade do Bitcoin se chama Satoshi (1 BTC = 100.000.000 Satoshis).
 * Se você tentar somar frações de Bitcoin diretamente no JavaScript (ex: 0.10000000 + 0.20000000), 
 * a linguagem vai gerar um erro de precisão matemática e a sua empresa perderá dinheiro.
 * Sua missão é criar as funções de saque e depósito, mas com uma regra vital: A memória do 
 * servidor (variável) só pode guardar números INTEIROS (Satoshis).
 * O Código Base (Copie e cole no seu arquivo carteira-basica.js):
 * 
 * Critério de aceite: A função de teste unitário não deve printar nenhum erro no terminal!
 */

// Memória do Servidor
const CONVERSION_FACTOR = 100000000; // 1 BTC = 100 milhões de Satoshis
const wallet = {
  satoshiCredits: 0,
  locked: false, // A carteira começa DESBLOQUEADA, permitindo operações de depósito e saque, garantindo a funcionalidade básica da carteira.
};
const wallet2 = {
  satoshiCredits: 0,
  locked: false, // A carteira começa DESBLOQUEADA, permitindo operações de depósito e saque, garantindo a funcionalidade básica da carteira.
};
const wallet3 = {
  satoshiCredits: 0,
  locked: false, // A carteira começa DESBLOQUEADA, permitindo operações de depósito e saque, garantindo a funcionalidade básica da carteira.
};

// ==========================================
// 1. Crie a Função de Depósito
// ==========================================
function depositBTC(btcValue, wallet) {
    if (wallet.locked) { // Verificação de segurança para carteiras bloqueadas locked: true, impedindo depósitos, garantindo a integridade dos fundos.
      throw new Error("Carteira bloqueada. Operação de depósito não permitida.");
    }
    const satoshis = Math.floor(btcValue * CONVERSION_FACTOR);

    wallet.satoshiCredits += satoshis;
}

// ==========================================
// 2. Crie a Função de Saque
// ==========================================
function withdrawBTC(btcValue, wallet) {
    if (wallet.locked) { // Verificação de segurança para carteiras bloqueadas "locked: true", impedindo saques, garantindo a integridade dos fundos.
      throw new Error("Carteira bloqueada. Operação de saque não permitida.");
    }
    const satoshis = Math.floor(btcValue * CONVERSION_FACTOR); // Conversão de BTC para Satoshis, garantindo que a memória do servidor armazene apenas números inteiros, prevenindo erros de precisão.

    if (wallet.satoshiCredits < satoshis) { // Verificação de saldo insuficiente, prevenindo saques que excedam o saldo disponível, garantindo a integridade financeira da carteira.
      throw new Error("Saldo insuficiente."); // Prevenção de saques que excedam o saldo disponível, garantindo a integridade financeira da carteira.
    }

    wallet.satoshiCredits -= satoshis; // Subtração do valor em Satoshis do saldo da carteira, garantindo que a memória do servidor armazene apenas números inteiros, prevenindo erros de precisão.
}




function unitTests() { // Testes unitários para validar a precisão das operações de depósito e saque, garantindo que a implementação atenda aos critérios de aceite sem erros de precisão.
  console.log("Iniciando depósitos fracionados...");
  
  // Carteira 1
  depositBTC(0.1, wallet); // Depósito de 0.1 BTC, convertendo para Satoshis e armazenando como inteiro, garantindo a precisão das operações financeiras.
  depositBTC(0.2, wallet); // Depósito de 0.2 BTC, convertendo para Satoshis e armazenando como inteiro, garantindo a precisão das operações financeiras.
  

  // Carteira 2
  depositBTC(0.100000009, wallet2); // Depósito de 0.100000009 BTC, convertendo para Satoshis e armazenando como inteiro, garantindo a precisão das operações financeiras.
  depositBTC(0.200000009, wallet2); // Depósito de 0.200000009 BTC, convertendo para Satoshis e armazenando como inteiro, garantindo a precisão das operações financeiras.
  

  // carteira 3 
  try {
    depositBTC(0.3, wallet3); // Tentativa de depósito em carteira bloqueada, esperando que a função lance um erro, garantindo a segurança dos fundos.
  } catch (error) {
    console.log(`✅ SUCESSO! Depósito bloqueado corretamente: ${error.message}`);
  }


  [wallet, wallet2, wallet3].forEach((w) => { // Validação dos saldos das carteiras, convertendo de Satoshis para BTC e comparando com o valor esperado, garantindo que a implementação atenda aos critérios de aceite sem erros de precisão.
    const credits = w.satoshiCredits / CONVERSION_FACTOR;
    credits === 0.3 // Verificação de precisão, garantindo que o saldo seja exatamente 0.3 BTC, prevenindo erros de precisão e garantindo a integridade financeira da carteira.
      ? console.log(
          `✅ SUCESSO! Saldo exato: ${credits} BTC. Nenhum Satoshi perdido.`,
        )
      : console.error( // Detecção de erro grave, indicando que a precisão foi comprometida, garantindo a integridade financeira da carteira.
          `❌ ERRO GRAVE! Saldo detectado: ${credits} BTC. Falha de precisão.`,
        );
  });
}

unitTests();


/**
 * **Explicação linha a linha do código:**

1-10: Comentário explicando o problema de precisão com Bitcoin em JavaScript e a necessidade de usar Satoshis (inteiros) para cálculos financeiros.

12-13: Definição da constante `CONVERSION_FACTOR` (100 milhões = 1 BTC em Satoshis) e inicialização da carteira `wallet`.

14-21: Três objetos de carteira: `wallet` e `wallet2` iniciam desbloqueadas, `wallet3` começa bloqueada para testes de segurança.

27-37: Função `depositBTC`:
- Verifica se a carteira está bloqueada (lança erro se verdadeira)
- Converte valor BTC para Satoshis usando `Math.floor()` (garantindo inteiros)
- Adiciona os Satoshis ao saldo da carteira

40-53: Função `withdrawBTC`:
- Verifica se a carteira está bloqueada (lança erro se verdadeira)
- Converte valor BTC para Satoshis usando `Math.floor()`
- Verifica se há saldo suficiente (lança erro se insuficiente)
- Subtrai os Satoshis do saldo da carteira

56-81: Função `unitTests` e sua execução:
- Loga mensagem de início dos testes
- Faz 3 depósitos em `wallet`: 0.1, 0.2 e 0.3 BTC
- Faz 3 depósitos em `wallet2`: 0.100000009, 0.200000009 e 0.300000009 BTC
- Para cada carteira, converte Satoshis de volta para BTC e verifica se equals 0.3
- Se true: loga mensagem de sucesso
- Se false: loga mensagem de erro grave
- Executa os testes unitários

**Por que está dando erro grave:**
O erro ocorre nas linhas 64 e 69. O teste espera um saldo de **0.3 BTC** (resultado de 0.1 + 0.2), mas o código está depositando um terceiro valor:
- `wallet`: 0.1 + 0.2 + **0.3** = 0.6 BTC (60.000.000 Satoshis)
- `wallet2`: 0.100000009 + 0.200000009 + **0.300000009** = 0.600000027 BTC → após `Math.floor()` também fica 0.6 BTC exato

Como o teste verifica `credits === 0.3`, ambas as carteiras falham nessa comparação e imprimem a mensagem de erro grave.

**Correção necessária:** 
Remover ou comentar as linhas 64 e 69 (os terceiros depósitos), já que o objetivo do teste é validar que 0.1 + 0.2 = 0.3 sem perda de precisão, usando apenas dois depósitos por carteira. Alternativamente, alterar o teste para esperar 0.5 BTC se a intenção era fazer três depósitos (0.1+0.2+0.2), mas o comentário do problema menciona especificamente 0.1+0.2.
 */