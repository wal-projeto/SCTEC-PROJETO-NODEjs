// PASSO 1 — Primeira classe do projeto (arquivo produto.class.js)
// =============================================================================

// Palavra-chave "class" + nome = define o molde (classe) chamado Produto
class Produto {
  // Abre o constructor (executado em todo: new Produto(nome, preco))
  constructor(nome, preco) {
    // Atribui ao atributo nome deste objeto o valor recebido no parâmetro nome
    this.nome = nome;
    // Atribui ao atributo preco deste objeto o valor recebido no parâmetro preco
    this.preco = preco;
  // Fecha o constructor
  }

  // Declara o método verificarProduto (sem parâmetros)
  verificarProduto() {
    // Retorna true se preco > 5, senão retorna false
    return this.preco > 5;
  // Fecha o método verificarProduto
  }

  // Declara o método ligar
  ligar() {
    // Condição: chama verificarProduto() e testa se o resultado é true
    if (this.verificarProduto()) {
      // Caminho quando preço > 5: devolve string informando sucesso
      return `O produto ${this.nome} foi ligado!`;
    }
    // Caminho quando preço <= 5: devolve string informando que não ligou
    return `O produto ${this.nome} não pôde ser ligado!`;
  // Fecha o método ligar
  }

  // Declara o método valorPromocional
  valorPromocional() {
    // Calcula 80% do preço (desconto de 20%) e retorna o número
    return this.preco * 0.8;
  // Fecha o método valorPromocional
  }

  // Declara o método get (retorna dados resumidos do produto)
  get() {
    // Inicia retorno de um objeto literal { chave: valor, ... }
    return {
      // Chave "nome" recebe o valor de this.nome
      nome: this.nome,
      // Chave "preco" recebe o valor de this.preco
      preco: this.preco,
    
    }; // Fecha o objeto literal
  
  } // Fecha o método get

} // Fecha a classe Produto

// module.exports torna esta classe disponível para import (require) em outro arquivo
module.exports = Produto;


/**
 * Dica rápida sobre this: em qualquer linha com this.nome ou this.preco, 
 * leia como "deste produto que estou criando agora" — cada new Produto(...) 
 * tem seu próprio this.
 */