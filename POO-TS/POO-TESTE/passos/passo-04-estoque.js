// RODE: node passos/passo-04-estoque.js

console.log('\n=== PASSO 4: Estoque (composição) ===\n');

// Importa as classes Digital, Fisico e Estoque
const Digital = require('../src/module/digital/digital.class');
const Fisico = require('../src/module/fisico/fisico.class');
const Estoque = require('../src/module/estoque/estoque.class');

// Cria instâncias das classes Digital, Fisico e Estoque
const zelda = new Digital('Zelda', 4);
const xbox = new Fisico('X-Box', 30);
const tv = new Fisico('TV 40', 300);

// Cria uma instância da classe Estoque com a lista de produtos
const estoque = new Estoque([zelda, xbox, tv]);


// Exibe o valor total do estoque
console.log('Valor total do estoque em produtos R$:', estoque.getValorTotal());

console.log('\n✓ Passo 4 OK. Próximo: passo-05-item-estoque.js\n');
