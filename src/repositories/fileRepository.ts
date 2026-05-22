/** Camada Repository (Acesso a Dados): Serve unicamente para ler ou gravar dados externos. Ela nao sabe o que o sistema faz com esses dados.
 * 
 * Dividido em 2 arquivos: esse consome/lê dados de um arquivo local database.json
 * 
 * src/repositories/fileRepository.js
 * 
 * Ela acessa diretamente o arquivo local database.json. 
 * Tudo que acessa dados locais é Repository.
 */
import { writeFile, readFile } from "node:fs/promises"; // file-system


export async function lerArquivo() {
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


  } catch (error:any) {
    //  Se o arquivo não existir (ENOENT), retorna um array vazio de forma segura
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error("LENDO O ARQUIVE: Arquivo corrompido, não foi possível ler os dados.");
    return [];
  }
}








