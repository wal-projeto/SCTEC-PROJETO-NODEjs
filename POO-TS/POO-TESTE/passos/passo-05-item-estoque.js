// RODE: node passos/passo-05-item-estoque.js

console.log('\n=== PASSO 5: ItemEstoque ===\n');

const Fisico = require('../src/module/fisico/fisico.class');
const ItemEstoque = require('../src/module/estoque/item-estoque.class');

// Cria uma instância da classe Fisico
const xbox = new Fisico('X-Box', 30);

// Cria uma instância da classe ItemEstoque
const xboxEstoque = new ItemEstoque(xbox, 3);

// Exibe o item no estoque
console.log('Item no estoque:', xboxEstoque.get());


console.log('\n✓ Passo 5 OK. Próximo: node index.js\n');
