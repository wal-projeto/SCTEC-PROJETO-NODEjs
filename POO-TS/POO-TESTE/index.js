// =============================================================================
// PASSO 6 de 6 — PROJETO COMPLETO (igual POO-202307)
// =============================================================================
//
// RODE na pasta POO-TESTE:  node index.js
//
// ORDEM DE EXECUÇÃO DO NODE NESTE ARQUIVO:
//   1) Lê linha por linha de cima para baixo
//   2) Executa todos os require() — carrega classes (ainda não cria objetos)
//   3) Cria app do Express
//   4) Define classe DigitalComposition (exemplo extra de composição)
//   5) app.listen(5000) — sobe servidor
//   6) Quando servidor estiver pronto, roda a função () => { ... } (callback)
//
// IMPORT vs EXPORT (resumo):
//   produto.class.js faz:  module.exports = Produto   (EXPORTA)
//   index.js faz:          const X = require('...')   (IMPORTA)
//
// =============================================================================

const express = require('express');
const Digital = require('./src/module/digital/digital.class');
const Fisico = require('./src/module/fisico/fisico.class');
const Estoque = require('./src/module/estoque/estoque.class');
const ItemEstoque = require('./src/module/estoque/item-estoque.class');

const app = express();

class DigitalComposition {
  constructor(produto) {
    this.produto = produto;
  }

  get() {
    return {
      ...this.produto,
      link: `https://www.escoladnc.com.br/${this.produto.nome}`,
    };
  }
}

app.listen(5000, () => {
  console.log('\n=== PASSO 6: Sistema online (projeto completo) ===\n');

  const smartphone = new Digital('smartphone samsung', 1000);
  console.log('Digital:', smartphone.get());

  const notebook = new Fisico('notebook dell', 3000);
  console.log('Fisico:', notebook.get());

  const estoque = new Estoque([smartphone, notebook]);
  console.log('Estoque total:', estoque.getValorTotal());

  const notebookEstoque = new ItemEstoque(notebook, 3);
  console.log('Item estoque:', notebookEstoque.get());

  console.log('\n✓ Parabéns! Você montou o mesmo fluxo do POO-202307.\n');
});

// =============================================================================
/**
 O que cada passo ensina
Passo	  JavaScript	                                          POO	Relação
1        class, constructor, this, module.exports             Classe, objeto, new
2        require, ../ caminhos                                 Herança (extends)
3        chamada de métodos                                    Polimorfismo
4        for...of, arrays                                      Composição
5        spread ...                                            Composição (produto + qtd)
6        require de vários arquivos, Express                    Tudo junto
 
IMPORT vs EXPORT (resumo):
// EXPORTAR (no final do arquivo da classe):
module.exports = Produto;

// IMPORTAR (em outro arquivo):
const Produto = require('./src/module/produto/produto.class');
*/