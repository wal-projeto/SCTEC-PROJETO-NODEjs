// Importa o módulo path para unir caminhos de arquivos - Composição
const path = require('path');

// Função para executar o exemplo - Polimorfismo
function executar() {
  console.log('\n--- Exemplo: POO no seu projeto (POO-202307) ---\n');
  console.log('Este exemplo conecta a teoria ao código que você já tem na pasta POO-202307:\n');
  console.log('  Produto (classe base)');
  console.log('    ├── Digital  → link de download');
  console.log('    └── Fisico   → frete e endereço');
  console.log('  Estoque      → composição com lista de produtos');
  console.log('  ItemEstoque  → produto + quantidade\n');

  try {
    // Junta o caminho do arquivo com o caminho do arquivo POO-202307 - Composição
    const base = path.join(__dirname, '../../../POO-202307');
    const Produto = require(path.join(base, 'src/module/produto/produto.class'));
    const Digital = require(path.join(base, 'src/module/digital/digital.class'));
    const Fisico = require(path.join(base, 'src/module/fisico/fisico.class'));
    const Estoque = require(path.join(base, 'src/module/estoque/estoque.class'));

    // Cria instâncias das classes - Polimorfismo
    const curso = new Digital('Curso POO', 297);
    const livro = new Fisico('Livro POO', 89);

    // Exibe os resultados - Polimorfismo
    console.log('Digital:', curso.get());
    console.log('Físico:', livro.get());
    console.log('Valor total em estoque:', new Estoque([curso, livro]).getValorTotal());
    console.log('\nPolimorfismo: valorPromocional() comporta-se diferente em Fisico (usa frete).');
  
  } catch { // Tratamento de exceções - Exceções - Composição
    console.log('(Execute a partir da pasta tutor-poo para carregar POO-202307 automaticamente.)');
  }
}

// Exporta a função executar para ser usada em outros arquivos
module.exports = { executar };
