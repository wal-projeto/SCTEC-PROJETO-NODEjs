/**
 * =============================================================================
 * SUBCLASSE: Fisico (herança + polimorfismo)
 * =============================================================================
 *
 * Mesma ideia de Digital, mas com regras de produto físico (frete, endereço).
 *
 * POLIMORFISMO em valorPromocional():
 *   • Produto/Digital: preco * 0.8
 *   • Fisico: (preco com frete) * 0.8  ← mesma "mensagem", cálculo diferente
 *
 * Quando Estoque chama item.get() para um Fisico, entra este get().
 * Quando chama para um Digital, entra o get() de digital.class.js.
 * O código que usa (Estoque) não precisa saber o tipo exato — só chama .get().
 * =============================================================================
 */

const Produto = require('../produto/produto.class');

class Fisico extends Produto {
  /** Comportamento exclusivo de produto físico (não existe em Digital). */
  calcularFrete() {
    return this.preco * 1.1; // 10% sobre o preço
  }

  /**
   * Override: substitui a implementação de Produto.valorPromocional().
   * JavaScript usa sempre a versão da classe mais específica do objeto.
   */
  valorPromocional() {
    return this.calcularFrete() * 0.8;
  }

  get() {
    return {
      nome: this.nome,
      preco: this.preco,
      endereco: 'Rua blablabla, 10.',
      total: this.calcularFrete(),
      promocional: this.valorPromocional(), // chama o override desta classe
    };
  }
}

module.exports = Fisico;
