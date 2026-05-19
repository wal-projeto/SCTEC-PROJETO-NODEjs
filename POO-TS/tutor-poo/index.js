// Importa o módulo readline para ler a entrada do usuário
const readline = require('readline');
// Importa as lições e exemplos
const { lessons } = require('./src/lessons');

// Cria a interface de leitura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Cria o conjunto de progresso
const progresso = new Set();

// Função para fazer uma pergunta ao usuário
function pergunta(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

// Função para limpar a tela
function limparTela() {
  console.clear();
}

// Função para criar um separador
function separador() {
  console.log('\n' + '─'.repeat(60) + '\n');
}

// Função para exibir o banner
function banner() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║           TUTOR DE POO — SCTEC / Carreira Tech           ║
║  Baseado no ebook: Fundamentos, princípios e práticas    ║
╚══════════════════════════════════════════════════════════╝
`);
  console.log(`Progresso: ${progresso.size}/${lessons.length} lições visitadas\n`);
}

// Função para listar as lições
function listarLicoes() {
  lessons.forEach((l) => {
    const ok = progresso.has(l.id) ? '✓' : ' ';
    const demo = l.exemplo ? '📟' : '  ';
    console.log(`  [${l.id.toString().padStart(2)}] ${ok} ${demo} ${l.titulo}`);
  });
  console.log('\n  📟 = tem exemplo executável');
  console.log('  [T] Trilha completa (todas as lições em ordem)');
  console.log('  [0] Sair\n');
}

// Função para fazer um quiz
async function quiz(licao) {
  if (!licao.quiz) return;

  separador();
  console.log('📝 Quiz rápido\n');
  console.log(licao.quiz.pergunta + '\n');
  licao.quiz.opcoes.forEach((op) => console.log(`   ${op}`));

  const resp = (await pergunta('\nSua resposta (A/B/C): ')).trim().toUpperCase();
  const letra = resp.charAt(0);

  if (letra === licao.quiz.resposta) {
    console.log('\n✅ Correto! Muito bem.\n');
  } else {
    console.log(`\n❌ Resposta correta: ${licao.quiz.resposta}\n`);
  }
}

// Função para exibir uma lição
async function exibirLicao(licao) {
  limparTela();
  progresso.add(licao.id);

  console.log(`\n📖 Lição ${licao.id}: ${licao.titulo}\n`);
  console.log(licao.teoria.trim());

  if (licao.exemplo) {
    separador();
    const rodar = (await pergunta('Executar exemplo prático? (S/n): ')).trim().toLowerCase();
    if (rodar !== 'n' && rodar !== 'nao' && rodar !== 'não') {
      try {
        licao.exemplo().executar();
      } catch (erro) {
        console.error('\nErro ao executar exemplo:', erro.message);
      }
    }
  }

  await quiz(licao);
  await pergunta('\nPressione Enter para voltar ao menu...');
}

// Função para executar a trilha completa
async function trilhaCompleta() {
  limparTela();
  console.log('\n🚀 Iniciando trilha completa (11 lições)...\n');

  for (const licao of lessons) {
    await exibirLicao(licao);
  }

  console.log('\n🎉 Parabéns! Você concluiu a trilha do ebook.\n');
  console.log('Próximo passo: explore e modifique os arquivos em POO-202307/src/\n');
  await pergunta('Pressione Enter para voltar ao menu...');
}

// Função para executar o menu principal
async function menuPrincipal() { // Menu principal - encapsulamento
  limparTela();
  banner();
  listarLicoes();

  const escolha = (await pergunta('Escolha o número da lição, T ou 0: ')).trim().toUpperCase();

  if (escolha === '0') { // Sair
    console.log('\nAté logo! Continue praticando POO no seu projeto.\n');
    rl.close();
    return;
  }

  if (escolha === 'T') { // Trilha completa
    await trilhaCompleta();
    return menuPrincipal();
  }

  const id = parseInt(escolha, 10); // ID da lição
  const licao = lessons.find((l) => l.id === id);

  if (!licao) { // Lição inválida
    console.log('\nOpção inválida.\n');
    await pergunta('Pressione Enter...');
    return menuPrincipal();
  }

  await exibirLicao(licao); // Exibir lição
  return menuPrincipal();
}

// Função para executar o menu principal - encapsulamento
menuPrincipal().catch((erro) => { // Tratamento de erros
  console.error(erro); // Exibir erro no console
  rl.close(); // Fechar a interface de leitura - encapsulamento
});
