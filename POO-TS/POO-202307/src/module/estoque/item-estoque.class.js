/**
 * =============================================================================
 * CLASSE: ItemEstoque (composição)
 * =============================================================================
 *
 * COMPOSIÇÃO:
 *   ItemEstoque agrupa um produto (item) + quantidade.
 *   Relação "tem um" produto e "tem uma" quantidade — não é subclasse de Produto.
 *
 * Fluxo no index.js:
 *   const xbox = new Fisico('X-Box', 30);
 *   const xboxEstoque = new ItemEstoque(xbox, 3);
 *   xboxEstoque.get() → valor total = preco * 3
 *
 * Observação:
 *   this.item é o objeto Fisico inteiro (referência).
 *   calcularValorTotal() usa this.item.preco (atributo herdado de Produto).
 * =============================================================================
 */

class ItemEstoque {
  constructor(item, quantidade) {
    this.item = item;           // referência ao objeto Produto/Digital/Fisico
    this.quantidade = quantidade;
  }

  calcularValorTotal() {
    return this.item.preco * this.quantidade;
  }

  get() {
    return {
      nome: this.item.nome,
      preco: this.item.preco,
      valor: this.calcularValorTotal(),
      quantidade: this.quantidade,
    };
  }
}

module.exports = ItemEstoque;
