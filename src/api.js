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

 * 
 */

import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { createInterface } from "node:readline/promises";
import { writeFile, readFile } from "node:fs/promises"; // file-system



async function buscarUsuario(username) {
  const urlBase = "https://api.github.com/users/";

  // 1. Cria um controlador para conseguir cancelar a requisição
  // Se a rede do WSL travar a requisição, o AbortController corta 
  // a conexão em 5 segundos em vez de deixar o terminal congelado por 10 ou mais segundos.
  const controlador = new AbortController();
  
  // 2. Define um timer para cancelar após 5 segundos (5000 milissegundos)
  const timerTimeout = setTimeout(() => controlador.abort(), 30000);


  try {
     // Faz a requisição passando o sinal de cancelamento e o User-Agent obrigatório
    // O GitHub exige um User-Agent para requisições de API; sem ele, pode gerar lentidão ou bloqueio
    const response = await fetch(`${urlBase}${username}`, {
    
      // O cabeçalho User-Agent evita que o GitHub bloqueie ou atrase a requisição.
    method: 'GET',
    signal: controlador.signal, // Adicionado o signal para o AbortController funcionar
    headers: {
      'User-Agent': 'Node-Fetch-App'
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
    const usuariosText = await readFile("./database.json", {encoding: "utf-8",});
    return JSON.parse(usuariosText);

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


async function salvarArquivo(usuario) {
  const usuarios = await lerArquivo();

  //  Validação para NÃO salvar usuários repetidos (Regra do projeto)
  const usuarioJaExiste = usuarios.some(u => u.login.toLowerCase() === usuario.login.toLowerCase());

    if (usuarioJaExiste) {
    console.log(`\n⚠️ Atenção: O usuário "${usuario.login}" já está salvo no banco de dados!`);
    return; // Para a execução e não salva de novo
  }

  usuarios.push(usuario);

  if (!usuarios) {
    await writeFile(`./database.json`, JSON.stringify([usuario]), {
      encoding: "utf-8",
    });
  }

  usuarios.push(usuario)
 await writeFile(`./database.json`, JSON.stringify(usuarios, null, 2), {encoding: "utf-8", });

  console.log(`\n💾 Usuário "${usuario.login}" salvo com sucesso!`);

}






async function main() {
  const interfaceConsole = createInterface(stdin, stdout);
  
  try {
    // INTERFACE DE USUÁRIO (CLI): Cabeçalho informativo
    console.log("=========================");
    console.log("           MENU         ");
    console.log("=========================");
    console.log(" INSTRUÇÕES DE USO:");
    console.log(" • Digite um username válido do GitHub");
    console.log(" • ");
    console.log("==========================\n");

    const respostaOperação = await interfaceConsole.question(
      "Digite o usuário:\n", // \n - Quebra de linha
    );

    // O fetch Faz a busca (se não tiver internet, o código pula DIRETO para o CATCH)
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
    }

  // Central de tratamento de erros reais
  } catch (erro) {
    console.log("\n=========================");
    
    // Se for o erro de timeout padrão do Node ou o nosso personalizado
    if (erro.message.includes("demorou demais") || (erro.cause && erro.cause.code === 'UND_ERR_CONNECT_TIMEOUT')) {
      console.error("❌ Erro de Rede: Tempo limite esgotado. Verifique sua conexão ou tente novamente.");
    } else {
      // Exibe "Este usuário não existe no GitHub." ou outras falhas
      console.error("❌ Falha no Sistema: " + erro.message);
    }
    
    console.log("=========================");


  }finally {
    // É obrigatório para encerrar manualmente a interface, independente do código ter funcionado ou não
      interfaceConsole.close();
      console.log("\n Sessão encerrada.");

  } 
  /**
  - Se você não fechar esse canal manualmente com interfaceConsole.close(),
    o terminal do Linux ficará congelado para sempre, esperando que o 
    usuário digite algo.
  - O finally na main garante que, mesmo se o programa quebrar no meio do 
    caminho, o teclado seja liberado e o terminal seja encerrado com 
    segurança.
  - As funções buscarUsuario, lerArquivo e salvarArquivo não precisam de
   um bloco finally porque elas não deixam recursos do sistema abertos 
  na memória após terminarem de rodar.
  */
}

main()
//.catch(console.log);

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
