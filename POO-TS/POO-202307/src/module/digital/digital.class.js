/**
 * =============================================================================
 * SUBCLASSE: Digital (herança)
 * =============================================================================
 *
 *   Digital extends Produto  →  relação "é um": Digital É UM Produto
 *
 * O que herda da classe pai (sem reescrever):
 *   • constructor via super (automático com extends)
 *   • nome, preco, verificarProduto(), ligar(), valorPromocional()
 *
 * O que especializa:
 *   • get() — adiciona link e promocional no retorno
 *
 * POLIMORFISMO:
 *   const p = new Digital('Zelda', 4);
 *   p.get()  → executa o get() de Digital, não o de Produto
 *
 * Carregamento: este arquivo só roda quando index.js faz require() dele.
 * =============================================================================
 */

const Produto = require('../produto/produto.class');

class Digital extends Produto {
  /**
   * Sobrescrita (override) do método get() da classe base.
   * Mesmo nome de método, comportamento específico para produto digital.
   */
  get() {
    return {
      nome: this.nome,       // herdados de Produto (preenchidos no constructor da base)
      preco: this.preco,
      link: `https://www.escoladnc.com.br/${this.nome}`,
      promocional: this.valorPromocional(), // usa método herdado de Produto
    };
  }
}

module.exports = Digital;
