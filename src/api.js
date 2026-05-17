/** npm run api <-- para rodar o programa
 * OU 
 * SE EU MUDAR O SCRIPTS DO PACKAGE.JSON PARA :
 * "scripts": {
    "start": "node ./src/api.js"
}
- Ctrol + c : Libera o  terminal 
- Ctrol + Shift + P = abra a paleta de comandos
- Ctrol + ' = abre o terminal
- Ao salvar alterações no VS Code subir no GitHub:
 - git add .
 - git commit -m " xxxx "
 - git push origin featureSCTEC
 
 1. Garanta que as informações dele estão atualizadas
git fetch upstream

2. Vá para a sua branch onde quer colocar os arquivos
git checkout main
git checkout featureSCTEC
git checkout EstudoJavaScript

RODAR COM: npm start 
OU 
RODAR DIRETO PELO TERMINAL:
node ./src/api.js

Para limpar a rede do seu terminal, execute estes dois comandos no terminal 
do Ubuntu antes de rodar o programa:
# 1. Limpa o cache de DNS do Linux
sudo resolvectl flush-caches

# 2. Desliga o cache de requisições temporárias do Node
export NODE_OPTIONS=""

📂 SCTEC-PROJETO-NODEjs/
├── 📂 src/
│   ├── 📂 repositories/
│   │   ├── githubRepository.js
│   │   └── fileRepository.js
│   ├── 📂 services/
│   │   └── userService.js
│   └── 📂 controllers/
│       └── cliController.js
├── api.js (Este será meu arquivo principal/main)
└── database.json


arquivo raiz original agora só serve para iniciar o terminal e direcionar para as funções corretas conforme a escolha do menu
Ficou no arquivo principal apenas para ligar o terminal e chamar o Controller de acordo com a opção (1, 2 ou 3). 
*/

// api.js
import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { createInterface } from "node:readline/promises";
import { clienteController } from "./src/controllers";


// Importações dos pedaços de código de outras pastas
import { buscarUsuario} from "./repositories/githubRepository.js"
import { salvarArquivo } from "./services/userServices.js";
import { usuarioEspecifico } from "./controllers/clienteController.js";
import { lerArquivo } from "./repositories/fileRepository.js";



async function main() { const interfaceConsole = createInterface({
   input: stdin,  
  output: stdout,  
});

  try {
    // INTERFACE DE USUÁRIO (CLI)
    console.log("===================================================");
    console.log("                  MENU                             ");
    console.log("===================================================");
    console.log("            INSTRUÇÕES DE USO:                     ");
    console.log("  [ 1 ] Buscar Usuário no GitHub e Salvar no Banco ");
    console.log("  [ 2 ] Listar Usuários Salvos no Banco            ");
    console.log("  [ 3 ] Buscar um usuário especifico no Banco      ");
    console.log("=================================================\n");

    const opcao = await interfaceConsole.question("Escolha uma opção ( 1 , 2 , 3):\n ");


    // Busca usuário no GitHub e Salva no arquivo database.json
    if(opcao === "1") {
      const respostaOperação = await interfaceConsole.question("Digite o usuário:\n");

    // Chama a função buscarUsuario: O fetch Faz a busca (se não tiver internet, o código pula DIRETO para o CATCH)
    const usuario = await buscarUsuario(respostaOperação);

     //Se usuario recebeu resposta da Função buscrUsuario, Mostrará na tela o Nome e o Username dele
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
 
}
main()



/**
  - Se você não fechar esse canal manualmente com interfaceConsole.close(),
    o terminal do Linux ficará congelado para sempre, esperando que o usuário digite algo.
  - O finally na main garante que, mesmo se o programa quebrar no meio do 
    caminho, o teclado seja liberado e o terminal seja encerrado com segurança.
  - As funções buscarUsuario, lerArquivo e salvarArquivo não precisam de
   um bloco finally porque elas não deixam recursos do sistema abertos 
  na memória após terminarem de rodar.


  Por que dividimos dessa forma? (A Explicação)
  * Princípio de Responsabilidade Única (SRP): Antes, sua função main ou suas 
  funções misturavam interface (console.log), lógica (if usuarioJaExiste) 
  e infraestrutura (fetch / writeFile). Agora, cada arquivo faz apenas uma coisa.
  * Facilidade de Manutenção: Se amanhã você decidir parar de salvar os 
  usuários em arquivo JSON e salvá-los em um Banco de Dados real (como 
  MongoDB ou MySQL), você só precisará alterar o arquivo fileRepository.js. 
  O resto do sistema (Service e Controller) continuará funcionando sem 
  saber que o banco mudou.
  * Transição para Web facilitada: Se você quiser transformar essa 
  ferramenta de terminal em uma API com Express futuramente, bastará criar 
  um novo controller chamado userHttpController.js. Toda a inteligência 
  de buscar no GitHub e validar duplicados (userService.js) será 
  reaproveitada 100%.
  */









