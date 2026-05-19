// =============================================================================
// PASSO 4 de 6 — COMPOSIÇÃO (Estoque TEM produtos)
// =============================================================================

// Define a classe Estoque que "tem" uma lista de produtos
class Estoque {
  // Abre o constructor que recebe uma lista de produtos
  constructor(items) {
    // Atribui a lista de produtos ao atributo items
    this.items = items;
    console.log("--Lista dos Produtos em Estoque: nome e preço---")
    console.log(this.items)
  }

  // Declara o método getValorTotal que calcula o valor total do estoque
  getValorTotal() {
    // Inicializa o total com 0
    let total = 0;
    // Loop pela lista de produtos - polimorfismo
    for (const item of this.items) {
      // Chama o método get() do produto para obter o preço
      const preco = item.get().preco;
      // Soma o preço ao total
      total += preco;
    }
    return total;
  }
}

module.exports = Estoque;
