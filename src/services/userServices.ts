/** userService  não faz só salvar, ela valida se o usuário já existe (usuarioJaExiste). Processamento de regras de validação é papel do Service. Ela apenas importa o lerArquivo do repositório para obter os dados de que precisa
 src/services/userService.js 
 
 Ela tem regras de negócio: valida se o usuário já existe (usuarioJaExiste) e decide se deve salvar ou exibir um aviso. Isso é responsabilidade do Service.
 */

import { writeFile } from "node:fs/promises";
import { lerArquivo } from "../repositories/fileRepository.js";

export async function salvarArquivo(novoUsuario) { 
    const usuariosExistentes = await lerArquivo(); 
  // chamando larArquivo (Encapsulamento) para carregar a Lista atual do aquivo

    //  Validação para NÃO salvar usuários repetidos
    const usuarioJaExiste = usuariosExistentes.some(u => u && u.login && u.login.toLowerCase() === novoUsuario.login.toLowerCase());
    
    if (usuarioJaExiste) {
    console.log(`\n⚠️ Atenção: O usuário "${novoUsuario.login}" já está salvo no banco de dados!`);
    return;  }
    // Retorna para a execução e não salva de novo

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

/**
 * As funções readFile e writeFile do módulo node:fs/promises são de  alto nível. Elas abrem o arquivo, transferem os dados e fecham o arquivo 
 * sozinhas de forma automática assim que terminam a operação. Por isso não precisam de um finally
 */

