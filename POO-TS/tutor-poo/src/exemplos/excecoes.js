// SaldoInsuficienteError é a classe - classe filha - herança - exceções - tratamento de exceções
class SaldoInsuficienteError extends Error {
  constructor(saldoAtual, valorSolicitado) {
    super(`Saldo R$ ${saldoAtual.toFixed(2)} insuficiente para R$ ${valorSolicitado.toFixed(2)}`);
    this.name = 'SaldoInsuficienteError';
  }
}

// Conta é a classe - classe pai - encapsulamento
class Conta {
  constructor(saldoInicial) {
    this.saldo = saldoInicial;
  }

  // Método para transferir um valor da conta - encapsulamento
  transferir(valor) {
    if (valor <= 0) throw new Error('Valor de transferência inválido');
    if (valor > this.saldo) throw new SaldoInsuficienteError(this.saldo, valor);
    this.saldo -= valor;
    return this.saldo;
  }
}

// Função para executar o exemplo
function executar() {
  console.log('\n--- Exemplo: Tratamento de exceções ---\n');

  const conta = new Conta(100);

  try { // Tratamento de exceções - Exceções - tratamento de exceções - encapsulamento
    console.log('Transferência válida. Saldo restante:', conta.transferir(40));
    conta.transferir(200);
  } catch (erro) { // Tratamento de exceções - Exceções - tratamento de exceções - encapsulamento - if/else
    if (erro instanceof SaldoInsuficienteError) {
      console.log('Exceção de negócio capturada:', erro.message);
    } else {
      console.log('Erro genérico:', erro.message);
    }
  }

  // Exibe o saldo final da conta
  console.log('Saldo final da conta:', conta.saldo);
}

// Exporta a função executar para ser usada em outros arquivos
module.exports = { executar };
