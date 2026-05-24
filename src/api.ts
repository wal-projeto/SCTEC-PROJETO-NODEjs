/**Ctrol + F - Buscar texto no código: 
- Ctrol + c : Libera o  terminal 
- Ctrol + Shift + P = abra a paleta de comandos
- Ctrol + ' = abre o terminal

GIT:
- Ao salvar alterações no VS Code subir no GitHub:
 - git add .
 - git commit -m " xxxx "
 - git push origin featureSCTEC

git fetch upstream : Garanta que as informações dO repositorio estão atualizadas

MINHAS BRANCHs
git checkout main
git checkout featureSCTEC
git checkout EstudoJavaScript

Para limpar a rede do seu terminal, execute estes dois comandos no terminal 
do Ubuntu antes de rodar o programa:
# 1. Limpa o cache de DNS do Linux
sudo resolvectl flush-caches

# 2. Desliga o cache de requisições temporárias do Node
export NODE_OPTIONS=""


MINHA TERCEIRA BRANCH COM MATERIAIS DE ESTUDO: 
git push -u origin EstudoJavaScript
 * O termo -u origin serve para conectar a sua branch local diretamente com o GitHub. 
 * Nas próximas vezes que quiser enviar alterações dessa branch, bastará digitar apenas:
 * > git push.
 * git checkout EstudoJavaScript <-COMANDO PARA IR A ELA

git branch <-lista as branch
git stash <- Guarde suas alterações atuais
git switch nome-da-branch <- Mude para a branch desejada
git stash pop <- git stash pop


npm run dev → roda direto o TypeScript e recompila automaticamente ao salvar: Usa  tsx --watch src/api.ts
npm run build → só compila: gera os arquivos em dist.
npm start  -> sem ficar 'watch' . compila tudo e roda o dist/api.js. "start": "tsc && node dist/src/api.js",

npx tsx src/api.ts → roda só uma vez!! Executa o arquivo direto, sem compilar para dist.
Útil para testes rápidos ou rodar apenas uma vez sem watch.
Não gera arquivos .js no dist.
npx executa binario tsx que esta dentro de node_modules
*/

import { stdin, stdout } from 'process';
import { createInterface } from 'node:readline/promises';


import { buscarUsuario } from "./repositories/githubRepository.js";
import { salvarArquivo } from "./services/userServices.js";
import { usuarioEspecifico } from "./controllers/clienteController.js";
import { lerArquivo } from "./repositories/fileRepository.js";


//const URL_DATABASE = `../database.json`;

async function main(): Promise<void> {
  const interfaceConsole = createInterface({input:stdin, output:stdout});
  

let escolha = true;
  while (escolha) {
    // INTERFACE DE USUÁRIO (CLI)
    console.log('===================================================');
    console.log('                  MENU                             ');
    console.log('===================================================');
    console.log('            INSTRUÇÕES DE USO:                     ');
    console.log('  [ 1 ] Buscar Usuário no GitHub e Salvar no Banco ');
    console.log('  [ 2 ] Listar Usuários Salvos no Banco            ');
    console.log('  [ 3 ] Buscar um usuário especifico no Banco      ');
    console.log('  [ 4 ] Sair                                        ');
    console.log('=================================================\n');

    const opcao = await interfaceConsole.question(
      'Escolha uma opção ( 1 , 2 , 3, 4):\n'
    );

    try {
      // Busca usuário no GitHub e Salva no arquivo database.json

      if (opcao === '1') {
        const respostaOperação = await interfaceConsole.question(
          'Digite o usuário:\n'
        );

        const usuario = await buscarUsuario(respostaOperação);

        console.log(`\nUsuário encontrado`);
        console.log(`Nome: ${usuario.name || 'Não informado!'}`);
        console.log(`Username: ${usuario.login}`);

        const desejaSalvar = await interfaceConsole.question(
          'Deseja salvar o usuário? (s / n):\n'
        );
        if (desejaSalvar.toLowerCase() === 's') {
          await salvarArquivo(usuario);
        }
      } else if (opcao === '2') {
        const lerAquivoTerminal = await lerArquivo();
        if (lerAquivoTerminal.length === 0) {
          console.log('\n📭 O arquivo database.json está vazio.');
        } else {
          console.log('\nLista de Usuários no Arquivo database.json:');
          console.log(JSON.stringify(lerAquivoTerminal, null, 2));
        }
      } else if (opcao === '3') {
        await usuarioEspecifico(interfaceConsole);
      } else if (opcao === '4') {
        console.log('\n Encerrando o programa...');
        escolha = false;
      } else {
        console.log('Opção inválida. Por favor, escolha uma opção válida.');
      }
    } catch (erro: any) {
      if (
        erro.message.includes('demorou demais') ||
        (erro.cause && erro.cause.code === 'UND_ERR_CONNECT_TIMEOUT')
      ) {
        console.error(
          '❌ Erro de Rede: Tempo limite esgotado. Verifique sua conexão ou tente novamente.'
        );
      } else {
        console.error('❌ Falha no Sistema : ' + erro.message);
      }
    }
  }

  interfaceConsole.close();
  process.exit(0);
}

main();