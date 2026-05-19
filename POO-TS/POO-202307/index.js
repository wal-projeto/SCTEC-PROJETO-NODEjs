/**
 * =============================================================================
 * PONTO DE ENTRADA DO PROJETO (index.js)
 * =============================================================================
 *
 * FLUXO DE EXECUÇÃO (ordem em que o Node.js roda este arquivo):
 *
 *   1. Carrega dependências (require) — ainda NÃO executa o código das classes
 *   2. Cria a aplicação Express
 *   3. Define a classe DigitalComposition (exemplo de COMPOSIÇÃO)
 *   4. Chama app.listen(5000) — inicia o servidor na porta 5000
 *   5. Quando o servidor estiver pronto, executa a função callback (linha 23+)
 *   6. Dentro do callback: cria objetos, usa Estoque e ItemEstoque, imprime no console
 *
 * Para rodar: node index.js
 * O terminal ficará "parado" porque o Express mantém o processo vivo (servidor ativo).
 * =============================================================================
 */

const express = require('express');
const Digital = require('./src/module/digital/digital.class');
const Fisico = require('./src/module/fisico/fisico.class');
const Estoque = require('./src/module/estoque/estoque.class');
const ItemEstoque = require('./src/module/estoque/item-estoque.class');

const app = express();

/**
 * COMPOSIÇÃO (alternativa à herança) COMO UM EXEMPLO, NÃO ESTA NO PROGRAM:
 * ----------------------------------
 * Em vez de "Digital extends Produto", esta classe RECEBE um produto pronto
 * e adiciona comportamento (link) sem herdar de Produto.
 *
 * Relação: DigitalComposition "tem um" produto (has-a), não "é um" produto (is-a).
 *
 *  Esta classe fica aqui só como comparação didática — não é usada no fluxo abaixo -  ninguém chama new DigitalComposition(...).
 * Mostra outra forma de fazer algo parecido com Digital, usando composição em vez de herança:
*/
class DigitalComposition { // Cria uma classe chamada DigitalComposition
  constructor(produto) { //Ao criar o objeto, recebe um produto já pronto
    this.produto = produto; // Guarda esse produto dentro do objeto (relação “tem um”)
  }

  get() { //Método que devolve um resumo
    return {
      ...this.produto, // Copia as propriedades do produto para um objeto novo
      link: `https://www.escoladnc.com.br/${this.produto.nome}`, //Adiciona o link usando o nome do produto
    };
  }
}
/**  Composição  vs  herança (a ideia principal) **

 *-> Forma do DigitalComposition (composição): DigitalComposition TEM UM produto
 * class DigitalComposition {
   constructor(produto) { 
        this.produto = produto 
      } 
  const figitalComp.get();
  // Tentaria algo como: {nome: 'TV samsung', preco: 4000, link: 'https://...'}
 
  * Ou seja: em vez de herdar de Produto, 
você recebe um produto pronto e só adiciona o link em cima.




* No projeto principal usamos HERANÇA:
 class Digital extends Produto { }
 class Fisico extends Produto { }
 
 OU SEJA, Digital e Fisico É UM PRODUTO
 */
app.listen(3001, () => { // Callback do listen — só roda DEPOIS que a porta 5000 estiver aberta.
  console.log('Sistema online');


  // --- PASSO 1: HERANÇA + INSTÂNCIA ---
  // new Digital() chama constructor de Produto (super implícito via extends)
  // instaciando o objeto sansung
  const samsung = new Digital('TV samsung', 4000);
  console.log(samsung.get()); // polimorfismo: get() é o da classe Digital


  // --- PASSO 2: HERANÇA + INSTÂNCIA ---
  const notebook = new Fisico('notebook dell', 4000);
  console.log(notebook.get()); // polimorfismo: get() é o da classe Fisico (diferente de Digital)

  const microondas = new Fisico('Microondas 10T', 1000);
  console.log(microondas.get()); // polimorfismo: get() é o da classe Fisico (diferente de Digital)



  // --- PASSO 3: COMPOSIÇÃO ---
  // Estoque não herda de Produto; ele "tem uma lista" de produtos (items)
  const estoque = new Estoque([samsung, notebook, microondas]); // LISTA [ ]
  console.log('estoque total em produtos R$:', estoque.getValorTotal(),'\n');
  // getValorTotal() chama item.get() em cada um — mesma mensagem, respostas diferentes (polimorfismo)

  // --- PASSO 4: ItemEstoque — cada produto do estoque com sua quantidade ---
  // estoque.items = lista de produtos [samsung, notebook, microondas]
  const quantidades = [1, 6, 2]; // quantidade de cada produto (mesma ordem da lista)

  console.log('\n--- Itens do estoque ---');
  for (let i = 0; i < estoque.items.length; i++) {
    const produto = estoque.items[i];
    const itemEstoque = new ItemEstoque(produto, quantidades[i]);
    console.log(itemEstoque.get());
  }
});
