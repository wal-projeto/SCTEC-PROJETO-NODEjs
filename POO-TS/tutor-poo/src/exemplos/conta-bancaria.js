// ContaBancaria é a classe - classe filha - herança
class ContaBancaria {
  #saldo = 0;
  #limiteSaque = 1000;

  constructor(titular, saldoInicial = 0) {
    this.titular = titular;
    if (saldoInicial > 0) this.#saldo = saldoInicial;
  }

  get saldo() {
    return this.#saldo;
  }


  // Método para depositar um valor na conta - encapsulamento
  depositar(valor) {
    if (valor <= 0) throw new Error('Depósito deve ser positivo');
    this.#saldo += valor;
    return `Depósito de R$ ${valor.toFixed(2)} realizado. Saldo: R$ ${this.#saldo.toFixed(2)}`;
  }


  // Método para sacar um valor da conta - encapsulamento
  sacar(valor) {
    if (valor <= 0) throw new Error('Saque deve ser positivo');
    if (valor > this.#limiteSaque) throw new Error('Valor acima do limite de saque');
    if (valor > this.#saldo) throw new Error('Saldo insuficiente');
    this.#saldo -= valor;
    return `Saque de R$ ${valor.toFixed(2)} realizado. Saldo: R$ ${this.#saldo.toFixed(2)}`;
  }
}


// Função para executar o exemplo - encapsulamento
function executar() {
  console.log('\n--- Exemplo: Encapsulamento (ContaBancaria) ---\n');

  const conta = new ContaBancaria('Maria', 500);
  console.log(conta.depositar(200));
  console.log(conta.sacar(150));
  console.log('Saldo via getter (forma correta):', conta.saldo);

  console.log('\n❌ Uso incorreto (ebook): alterar saldo direto ignoraria validações.');
  console.log('   Em JS com #saldo, conta.saldo = 999999 não altera o saldo real.');
  console.log('   Saldo real permanece:', conta.saldo);

  try {
    conta.sacar(5000);
  } catch (erro) {
    console.log('\n✅ Regra de negócio protegida:', erro.message);
  }
}

// Exporta a função executar para ser usada em outros arquivos
module.exports = { executar };
