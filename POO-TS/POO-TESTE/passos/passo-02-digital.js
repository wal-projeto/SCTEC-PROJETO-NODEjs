// RODE: node passos/passo-02-digital.js


console.log('\n=== PASSO 2: Digital (herança) ===\n');

// Importa a classe Digital
const Digital = require('../src/module/digital/digital.class');

// Cria um novo objeto Digital
const fernando = new Digital('Fernando', 4);

// Exibe os dados do produto digital - polimorfismo
console.log('get() do Digital:', fernando.get());

// Exibe o método herdado ligar() - polimorfismo - retorna true ou false
console.log('Método herdado ligar():', fernando.ligar());


console.log('\n✓ Passo 2 OK. Próximo: passo-03-fisico.js\n');
