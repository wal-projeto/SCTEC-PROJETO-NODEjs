// =============================================================================
// PASSO 3 de 6 — OUTRA SUBCLASSE + POLIMORFISMO (Fisico É UM Produto)
// =============================================================================

const Produto = require('../produto/produto.class');

// Define a classe Fisico que herda da classe Produto - herança
class Fisico extends Produto {

  // Sobrescreve o método calcularFrete() da classe pai (Produto) - polimorfismo
  calcularFrete() {
    // Calcula o frete do produto físico - 10% sobre o preço - polimorfismo
    return this.preco * 1.1;
  }

  // Sobrescreve o método valorPromocional() da classe pai (Produto) - polimorfismo
  valorPromocional() {
    // Calcula o valor promocional do produto físico - 80% sobre o frete - polimorfismo
    return this.calcularFrete() * 0.8;
  }

  // Sobrescreve o método get() da classe pai (Produto) - polimorfismo
  get() {
    // Retorna um objeto com os dados do produto físico
    return {
      nome: this.nome,
      preco: this.preco,
      endereco: 'Rua blablabla, 10.',
      total: this.calcularFrete(), // chama o método calcularFrete() - polimorfismo
      promocional: this.valorPromocional(), // chama o método valorPromocional() - polimorfismo
    };
  }
}

module.exports = Fisico;
