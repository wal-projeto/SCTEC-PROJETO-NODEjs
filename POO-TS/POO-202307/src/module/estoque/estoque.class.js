/**
 * =============================================================================
 * CLASSE: Estoque (composição + polimorfismo)
 * =============================================================================
 *
 * COMPOSIÇÃO:
 *   Estoque "tem" uma lista de items (produtos) — não herda de Produto.
 *   constructor(items) recebe objetos já criados (Digital, Fisico, etc.).
 *
 * POLIMORFISMO em getValorTotal():
 *   O loop chama item.get() em cada elemento.
 *   • Se item for Digital → retorno com link
 *   • Se item for Fisico   → retorno com endereco, total, etc.
 *   Estoque só precisa de .get().preco — contrato mínimo entre os tipos.
 *
 * Fluxo no index.js:
 *   new Estoque([zelda, xbox]) → getValorTotal() soma zelda.get().preco + xbox.get().preco
 * =============================================================================
 */

class Estoque {
  /**
   * @param {Array} items - array de INSTÂNCIAS (objetos), não de classes.
   *                        Ex.: [ instância Digital, instância Fisico ]
   */
  constructor(items) { // 
    this.items = items;
  }

  getValorTotal() {
    let total = 0;
    for (const item of this.items) {
      // Polimorfismo: item pode ser Digital ou Fisico; ambos implementam get()
      const preco = item.get().preco;
      total += preco;
    }
    return total;
  }
}

module.exports = Estoque;
