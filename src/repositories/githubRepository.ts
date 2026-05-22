/** Camada Repository (Acesso a Dados): Serve unicamente para ler ou gravar dados externos. Ela nao sabe o que o sistema faz com esses dados.
 * 
 * Dividido em 2 arquivos: esse consome dados de uma API do GitHub
 * 
 * 
 * Ela faz uma requisição para a API externa do GitHub. 
 * Tudo que busca dados externos é Repository.
 */


// É uma configuração de rede que afeta diretamente o fetch (chamada externa).
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'node:net';
setDefaultAutoSelectFamilyAttemptTimeout(500); // Força o fetch a pular o IPv6 travado do WSL em 500ms


export async function buscarUsuario(username: string) { 
  const urlBase = "https://api.github.com/users/";

  //  ADICIONE ESTA LINHA ABAIXO:
  const controlador = new AbortController();

  // 1. Cria um controlador para conseguir cancelar a requisição
  // Se a rede do WSL travar a requisição, o AbortController corta a conexão em 5 segundos em vez de deixar o terminal congelado por 10 ou mais segundos.
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
 
} catch (erro:any) {
    clearTimeout(timerTimeout);
    
    // 5. Captura especificamente se o erro aconteceu porque nós cancelamos por demora
    if (erro.name === 'AbortError') {
      throw new Error("A API do GitHub demorou demais para responder (Tempo Limite Atingido).");
    }
    
    // Repassa qualquer outro erro (como a falta de internet) para o catch da main
    throw erro;
  }
}

