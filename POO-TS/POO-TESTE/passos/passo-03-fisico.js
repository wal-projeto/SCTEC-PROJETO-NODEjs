// RODE: node passos/passo-03-fisico.js

console.log('\n=== PASSO 3: Fisico (polimorfismo) ===\n');

// Importa as classes Digital e Fisico
const Digital = require('../src/module/digital/digital.class');
const Fisico = require('../src/module/fisico/fisico.class');

// Cria instâncias das classes Digital e Fisico - polimorfismo
const zelda = new Digital('Zelda', 4);
const xbox = new Fisico('X-Box', 30);

// Exibe os resultados - polimorfismo
console.log('Digital promocional:', zelda.valorPromocional());
console.log('Fisico get():', zelda.get());
console.log('Fisico promocional:', xbox.valorPromocional());
console.log('Fisico get():', xbox.get());

console.log('\n✓ Passo 3 OK. Próximo: passo-04-estoque.js\n');
