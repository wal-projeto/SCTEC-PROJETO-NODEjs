// RODE: node passos/passo-01-produto.js

console.log('\n=== PASSO 1: Produto ===\n');

const Produto = require('../src/module/produto/produto.class');

const jogo = new Produto('Mario', 10);

console.log('Objeto criado:', jogo);
console.log('Nome:', jogo.nome);
console.log('Preço:', jogo.preco);
console.log('get():', jogo.get());
console.log('ligar():', jogo.ligar());
console.log('Promocional:', jogo.valorPromocional());

console.log('\n✓ Passo 1 OK. Próximo: passo-02-digital.js\n');
