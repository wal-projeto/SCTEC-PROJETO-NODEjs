// =============================================================================
// PASSO 5 de 6 — COMPOSIÇÃO: produto + quantidade (ItemEstoque TEM produto e quantidade)
// =============================================================================

// Define a classe ItemEstoque que "tem" um produto e uma quantidade
class ItemEstoque {
  // Abre o constructor que recebe um produto e uma quantidade
  constructor(item, quantidade) {
    // Atribui o produto ao atributo item
    this.item = item;
    // Atribui a quantidade ao atributo quantidade
    this.quantidade = quantidade;
  }

  // Declara o método calcularValorTotal que calcula o valor total do item
  calcularValorTotal() {
    // Calcula o valor total do item - preço do produto vezes a quantidade
    return this.item.preco * this.quantidade;
  }

  // Declara o método get que retorna o item no estoque
  get() {
    // Retorna um objeto com os dados do item no estoque
    return {
      // Inclui os dados do item no estoque
      ...this.item, // copia propriedades enumeráveis do objeto (nome, preco, etc.)
      // Inclui o valor total do item no estoque
      valor: this.calcularValorTotal(), // chama o método calcularValorTotal()
      // Inclui a quantidade do item no estoque
      quantidade: this.quantidade, // inclui a quantidade do item no estoque
    };
  } 
}

module.exports = ItemEstoque;
