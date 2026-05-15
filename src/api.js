/** npm run api <-- para rodar o programa
 * OU 
 * SE EU MUDAR O SCRIPTS DO PACKAGE.JSON PARA :
 * "scripts": {
    "start": "node ./src/api.js"
}
RODAR COM: npm start 
OU 
RODAR DIRETO PELO TERMINAL:
node ./src/service/api.js

Para limpar a rede do seu terminal, execute estes dois comandos no terminal 
do Ubuntu antes de rodar o programa:
# 1. Limpa o cache de DNS do Linux
sudo resolvectl flush-caches

# 2. Desliga o cache de requisições temporárias do Node
export NODE_OPTIONS=""
 */
setDefaultAutoSelectFamilyAttemptTimeout
import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { createInterface } from "node:readline/promises";
import { writeFile, readFile } from "node:fs/promises"; // file-system

import { setDefaultAutoSelectFamilyAttemptTimeout } from 'node:net';
setDefaultAutoSelectFamilyAttemptTimeout(500); // Força o fetch a pular o IPv6 travado do WSL em 500ms



async function buscarUsuario(username) {
  const urlBase = "https://api.github.com/users/";

  // 1. Cria um controlador para conseguir cancelar a requisição
  // Se a rede do WSL travar a requisição, o AbortController corta 
  // a conexão em 5 segundos em vez de deixar o terminal congelado por 10 ou mais segundos.
  const controlador = new AbortController();
  
  // 2. Define um timer para cancelar após 5 segundos (5000 milissegundos)
  const timerTimeout = setTimeout(() => controlador.abort(), 5000);


  try {
     // Faz a requisição passando o sinal de cancelamento e o User-Agent obrigatório
    // O GitHub exige um User-Agent para requisições de API; sem ele, pode gerar lentidão ou bloqueio
    const response = await fetch(`${urlBase}${username}`, {
    
      // O cabeçalho User-Agent evita que o GitHub bloqueie ou atrase a requisição.
    method: 'GET',
    signal: controlador.signal, // Adicionado o signal para o AbortController funcionar
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Simula um navegador real
    }
    });

    // Limpa o timer se a resposta chegou a tempo
    clearTimeout(timerTimeout);

    // Trata o erro de usuário não encontrado (404)  
    if(response.status === 404) {
      throw new Error ("Este usuário não existe no GitHub");
    }
    if (!response.ok) {
      throw new Error(`Erro na API: Status ${response.status}`);
    }

    const body = await response.json();

    return body;
 
} catch (erro) {
    clearTimeout(timerTimeout);
    
    // 5. Captura especificamente se o erro aconteceu porque nós cancelamos por demora
    if (erro.name === 'AbortError') {
      throw new Error("A API do GitHub demorou demais para responder (Tempo Limite Atingido).");
    }
    
    // Repassa qualquer outro erro (como a falta de internet) para o catch da main
    throw erro;
  }
}




async function lerArquivo() {
  try {
    // Busca os dados com segurança da Heap
    const usuariosText = await readFile("./database.json", {encoding: "utf-8",});
  
    // Se o arquivo estiver vazio, JSON.parse pode falhar ou retornar null/undefined
    if (!usuariosText.trim()) {
      console.log(" 📭 Nenhum usuário salvo no banco de dados ainda.");
      return [];
    }
   
    const dados= JSON.parse(usuariosText);

    // Se for um array, o .filter() remove os elementos null e limpa o seu arquivo automaticamente
    if (Array.isArray(dados)) {
      return dados.filter(u => u !== null && u !== undefined);
    }
    
    return [];


  } catch (error) {
    //  Se o arquivo não existir (ENOENT), retorna um array vazio de forma segura
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error("LENDO O ARQUIVE: Arquivo corrompido, não foi possível ler os dados.");
    return [];
  }
}

/**
 * As funções readFile e writeFile do módulo node:fs/promises são de 
 * alto nível. Elas abrem o arquivo, transferem os dados e fecham o arquivo 
 * sozinhas de forma automática assim que terminam a operação. Por isso não
 * precisam de um finally
 */




async function salvarArquivo(novoUsuario) {
  const usuariosExistentes = await lerArquivo(); // chamando larArquivo (Encapsulamento) para carregar a Lista atual do aquivo

    //  Validação para NÃO salvar usuários repetidos
    const usuarioJaExiste = usuariosExistentes.some(u => u && u.login && u.login.toLowerCase() === novoUsuario.login.toLowerCase());
    if (usuarioJaExiste) {
    console.log(`\n⚠️ Atenção: O usuário "${novoUsuario.login}" já está salvo no banco de dados!`);
    return; // Retorna para a execução e não salva de novo
  }
  //adicionando um novo usuário no final da lista e grava essa lista atualizada
  //Esta alteração acontece apenas na memória RAM do computador até este momento
  usuariosExistentes.push(novoUsuario);

  // Gravação física no arquivo
  //JSON.stringify(usuarios, null, 2): Converte o array de objetos JavaScript em texto formato JSON
  //O null, 2 serve para quebrar linhas e aplicar 2 espaços de indentação, deixando o arquivo database.json organizado e fácil de ler
  await writeFile(`./database.json`, JSON.stringify(usuariosExistentes, null, 2), {encoding: "utf-8", });
  //await writeFile(...): Substitui todo o conteúdo antigo do arquivo database.json pelo novo texto atualizado
  
  console.log(`\n💾 Usuário "${novoUsuario.login}" salvo com sucesso!`);
  
}




async function usuarioEspecifico(interfaceConsole) {
      const lerAquivo = await lerArquivo();

      if (lerAquivo.length === 0) {
        console.log("\n📭 Não há usuários salvos no banco de dados para buscar.");
      } else {
        console.log("\n=================================");
        console.log("  SELECIONE UM USUÁRIO DA LISTA  ");
        console.log("=================================");
        
        // Exibe apenas a lista de logins numerada para o usuário escolher
        // o .forEach mapeando apenas a propriedade u.login associada a um índice 
        // amigável (index + 1). Descarta varreduras de texto complexas na memória.
        lerAquivo.forEach((u, index) => {
          if (u && u.login) {
            console.log(`  [ ${index + 1} ] ${u.login}`);
          }
        });
        console.log("=================================");


        const escolhaNumero = await interfaceConsole.question("\nDigite o número do usuário que deseja buscar:\n");
        // Converte a string digitada para número inteiro
        const indiceSelecionado = parseInt(escolhaNumero, 10) - 1;

        // Valida se o índice existe dentro das posições válidas do array
        if (isNaN(indiceSelecionado) || indiceSelecionado < 0 || indiceSelecionado >= lerAquivo.length) {
          console.log("\n❌ Opção inválida! Selecione um número válido da lista.");
        } else {
          const usuarioEncontrado = lerAquivo[indiceSelecionado];

          console.log("\n=================================");
          console.log(`  DADOS DE: ${usuarioEncontrado.login.toUpperCase()} `);
          console.log("=================================");
          
          // Filtra para exibir em formato JSON chave/valor limpo
          const dadosExibicao = {
            id: usuarioEncontrado.id,
            login: usuarioEncontrado.login,
            name: usuarioEncontrado.name || "Não informado!"
          };

          console.log(JSON.stringify(dadosExibicao, null, 2));
          console.log("=================================");
        }
      }
    }




async function main() {
  const interfaceConsole = createInterface(stdin, stdout);
  
  try {
    // INTERFACE DE USUÁRIO (CLI): Cabeçalho informativo
    console.log("===============================");
    console.log("           MENU                ");
    console.log("===============================");
    console.log("       INSTRUÇÕES DE USO:      ");
    console.log("  [ 1 ] Buscar e Salvar Usuário ");
    console.log("  [ 2 ] Listar Usuários Salvos ");
    console.log("  [ 3 ] Buscar um usuário especifico ");
    console.log("=============================\n");

    const opcao = await interfaceConsole.question("Escola uma opção ( 1 , 2 , 3):\n ");


    // Busca usuário no GitHub e Salva no arquivo database.json
    if(opcao === "1") {
      const respostaOperação = await interfaceConsole.question("Digite o usuário:\n");

    // Chama a função buscarUsuario: O fetch Faz a busca (se não tiver internet, o código pula DIRETO para o CATCH)
    const usuario = await buscarUsuario(respostaOperação);

     //Só executa estas linhas se a busca acima der 100% certo
    // Mostra na tela o Nome e o Username 
    console.log(`\nUsuário encontrado`);
    console.log(`Nome: ${usuario.name  || "Não informado!"}`);
    console.log(`Username: ${usuario.login}`);

    // Pergunta se deseja salvar
    const desejaSalvar = await interfaceConsole.question("Deseja salvar o usuário? (s / n):\n");
    if(desejaSalvar.toLocaleLowerCase() ==='s') {
      await salvarArquivo(usuario); 
      // callstack -> stacktrace
    } else{
      return
    }
    }


    if (opcao === "2"){
      const lerAquivoTerminal = await lerArquivo();
      
      if (lerAquivoTerminal.length === 0) {
        console.log("\n📭 O arquivo database.json está vazio.");
      } else {
        console.log("\nLista de Usuários no Arquivo database.json:");
        // JSON.stringify(dados, substituto, espaços) transforma o array em texto formatado
        console.log(JSON.stringify(lerAquivoTerminal, null, 2));
      }
    }


    // DENTRO DA FUNÇÃO MAIN:
    if (opcao === "3") {
      // O 'await' impede o 'pending' e passamos a interfaceConsole para dentro da função
      await usuarioEspecifico(interfaceConsole); 
    }



  // Central de tratamento de erros reais da função main()
  } catch (erro) {
    console.log("\n=========================");
    
    // Se for o erro de timeout padrão do Node ou o nosso personalizado
    if (erro.message.includes("demorou demais") || (erro.cause && erro.cause.code === 'UND_ERR_CONNECT_TIMEOUT')) {
      console.error("❌ Erro de Rede: Tempo limite esgotado. Verifique sua conexão ou tente novamente.");
    } else {
      // Este usuário não existe no GitHub  ou outras falhas
      console.error("❌ Falha no Sistema :  "  + erro.message);
    }
    
    console.log("=========================");

    // Finalização do programa dentro da função main()
  }finally {
    // É obrigatório para encerrar manualmente a interface, independente do código ter funcionado ou não
      interfaceConsole.close();
      console.log("\n Sessão encerrada.");
  }
 /**
  - Se você não fechar esse canal manualmente com interfaceConsole.close(),
    o terminal do Linux ficará congelado para sempre, esperando que o usuário digite algo.
  - O finally na main garante que, mesmo se o programa quebrar no meio do 
    caminho, o teclado seja liberado e o terminal seja encerrado com segurança.
  - As funções buscarUsuario, lerArquivo e salvarArquivo não precisam de
   um bloco finally porque elas não deixam recursos do sistema abertos 
  na memória após terminarem de rodar.
  */
}
main()

/**- Estrutura unificada: Todo o fluxo acontece ordenadamente dentro do main().
 * - Captura real de erros: Como buscarUsuario é um processo assíncrono (await),
 * o try/catch interno consegue capturar a falha caso o GitHub retorne um erro 404 (Não Entrado).
 * - Fechamento seguro: o interfaceConsole.close() dentro do finally funciona perfeitamente
 * porque a variável está visível no mesmo escopo
 * 
 */

// O programa deve pedir um usuário
// Caso o usuário Não exista, ou a requisição de busca falhe, o programa deve tratar os erros corretamente e mostrar ao usuário a mensagem adequada
// Se o usuário for encontrado, deve ser mostrado na tela (terminal), o nome e o username
// Perguntar ao usuário se deseja salvar
// Não poderá salvar usuários repetidos
// Não deverá sobrescrever usuários já existentes
