// MeioDePagamento é a classe - classe pai - interface
class MeioDePagamento {
  // Método para pagar um valor - interface
  pagar(valor) {
    throw new Error('Método pagar() deve ser implementado');
  }

  // Método para emitir um comprovante - interface
  emitirComprovante() {
    throw new Error('Método emitirComprovante() deve ser implementado');
  }
}

// CartaoCredito é a classe - classe filha - herança - interface
class CartaoCredito extends MeioDePagamento {
  constructor(bandeira, limite) {
    super();
    this.bandeira = bandeira;
    this.limite = limite;
  }

  // Método para pagar um valor - interface
  pagar(valor) {
    if (valor > this.limite) throw new Error('Limite do cartão excedido');
    return `Pagamento de R$ ${valor.toFixed(2)} no cartão ${this.bandeira}`;
  }

  // Método para emitir um comprovante - interface
  emitirComprovante() {
    return `Comprovante cartão ${this.bandeira} - aprovado`;
  }
}

// Pix é a classe - classe filha - herança - interface
class Pix extends MeioDePagamento {
  constructor(chave) {
    super();
    this.chave = chave;
  }

  // Método para pagar um valor - interface
  pagar(valor) {
    return `PIX de R$ ${valor.toFixed(2)} enviado para chave ${this.chave}`;
  }

  // Método para emitir um comprovante - interface
  emitirComprovante() {
    return `Comprovante PIX instantâneo - chave ${this.chave}`;
  }
}

// Função para processar pagamentos - interface
function processarPagamentos(meios, valor) {
  for (const meio of meios) {
    console.log(meio.pagar(valor));
    console.log(meio.emitirComprovante());
    console.log('---');
  }
}

// Função para executar o exemplo
function executar() {
  console.log('\n--- Exemplo: Interface / contrato (MeioDePagamento) ---\n');

  const meios = [new CartaoCredito('Visa', 3000), new Pix('email@empresa.com')];
  processarPagamentos(meios, 149.9);
  console.log('O sistema não precisa saber se é cartão ou PIX — só o contrato pagar/emitir.');
}

module.exports = { executar };
