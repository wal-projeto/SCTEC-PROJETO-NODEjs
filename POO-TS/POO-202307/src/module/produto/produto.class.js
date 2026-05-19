/**
 * =============================================================================
 * CLASSE BASE: Produto
 * =============================================================================
 *
 * POO — conceitos neste arquivo:
 *
 *   • CLASSE: molde que define atributos (nome, preco) e métodos (ligar, get...)
 *   • OBJETO/INSTÂNCIA: criado com new Produto('X', 10) em outro arquivo
 *   • ENCAPSULAMENTO: dados (this.nome, this.preco) + comportamentos na mesma classe
 *   • ABSTRAÇÃO: expõe get() e esconde detalhes internos de verificarProduto()
 *
 * HERANÇA:
 *   Digital e Fisico estendem esta classe (extends Produto).
 *   Elas herdam nome, preco, valorPromocional() e podem SOBRESCREVER métodos.
 *
 * module.exports: permite que outros arquivos façam require() desta classe.
 * =============================================================================
 */

class Produto {
  /**
   * CONSTRUCTOR — roda automaticamente em todo new Produto(...) ou new Digital(...)
   * (subclasses chamam super(nome, preco) indiretamente via extends)
   *
   * Define o ESTADO inicial do objeto (atributos de instância).
   */
  constructor(nome, preco) {
    this.nome = nome;   // atributo de instância — cada objeto tem o seu
    this.preco = preco;
  }

  /**
   * Método de instância: usa this para acessar dados DESTE objeto.
   */
  verificarProduto() {
    return this.preco > 500;
  }

  ligar() {
    if (this.verificarProduto()) {
      return `O produto ${this.nome} foi ligado!`;
    }
    return `O produto ${this.nome} não pôde ser ligado!`;
  }

  /**
   * Comportamento compartilhado pelas subclasses.
   * Fisico SOBRESCREVE (override) este método para incluir frete no cálculo.
   */
  valorPromocional() {
    return this.preco * 0.8;
  }

  /**
   * Retorna um "resumo" do produto — padrão que Digital e Fisico especializam em get().
   */
  get() {
    return {
      nome: this.nome,
      preco: this.preco,
    };
  }
}

module.exports = Produto;
