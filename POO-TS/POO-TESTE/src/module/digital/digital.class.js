// =============================================================================
// PASSO 2 de 6 — HERANÇA (A Classe Digital É UMA Classe Filha de Produto)
// =============================================================================

// Importa a classe Produto
const Produto = require('../produto/produto.class');

// Define a classe Digital que herda da classe Produto
class Digital extends Produto {
  
  // Sobrescreve o método get() da classe pai (Produto)
  get() {
    // Retorna um objeto com os dados do produto digital
    return {
      // Inclui os dados do produto digital
      nome: this.nome,
      // Inclui o preço do produto digital
      preco: this.preco,
      // Inclui o link do produto digital - URL fictícia para exemplo
      link: `https://www.escoladnc.com.br/${this.nome}`,
      // Inclui o valor promocional do produto digital - usa o método herdado de Produto
      promocional: this.valorPromocional(),
      
    }; // Fecha o objeto literal
  } // Fecha o método get()
} // Fecha a classe Digital

// Exporta a classe Digital para ser usada em outro arquivo
module.exports = Digital; 
