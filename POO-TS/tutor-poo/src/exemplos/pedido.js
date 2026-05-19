// Cliente é a classe - classe filha - herança
class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  // Método para resumir o cliente - encapsulamento
  resumo() {
    return `${this.nome} <${this.email}>`;
  }
}

// Produto é a classe - classe filha - herança
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}

// Pagamento é a classe - classe filha - herança
class Pagamento {
  constructor(metodo) {
    this.metodo = metodo;
    this.status = 'pendente';
  }

  // Método para confirmar o pagamento - encapsulamento
  confirmar() {
    this.status = 'pago';
    return `Pagamento via ${this.metodo} confirmado`;
  }
}

// Pedido é a classe - classe filha - herança
class Pedido {
  constructor(cliente) {
    this.cliente = cliente;
    this.itens = [];
    this.pagamento = null;
  }

  // Método para adicionar um produto ao pedido - encapsulamento
  adicionarProduto(produto, quantidade = 1) {
    this.itens.push({ produto, quantidade });
  }

  // Método para calcular o total do pedido - encapsulamento
  total() {
    return this.itens.reduce((soma, item) => soma + item.produto.preco * item.quantidade, 0);
  }

  // Método para finalizar o pedido - encapsulamento
  finalizar(pagamento) {
    this.pagamento = pagamento;
    const msg = this.pagamento.confirmar();
    return {
      cliente: this.cliente.resumo(),
      itens: this.itens.map((i) => `${i.quantidade}x ${i.produto.nome}`),
      total: this.total(),
      pagamento: msg,
    };
  }
}

// Função para executar o exemplo
function executar() {
  console.log('\n--- Exemplo: Sistema de pedidos (aplicação prática) ---\n');

  const cliente = new Cliente('João', 'joao@email.com');
  const pedido = new Pedido(cliente);

  pedido.adicionarProduto(new Produto('Teclado', 199.9), 1);
  pedido.adicionarProduto(new Produto('Mouse', 89.9), 2);

  const resultado = pedido.finalizar(new Pagamento('PIX'));
  console.log(JSON.stringify(resultado, null, 2));
  console.log('\nPedido não acessa email do cliente diretamente — usa cliente.resumo().');
}

module.exports = { executar };
