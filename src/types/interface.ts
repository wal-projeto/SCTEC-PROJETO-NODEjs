/** as interfaces que criamos tratam erros de rede/conexão (propriedades .message e .cause.code) ou
 * erros de sistema de arquivos (propriedade .code).
 * O AbortError é um erro de fluxo/controle do próprio JavaScript e do Node.js.
 *
 */
export interface Usuario {
  id: number;
  login: string;
  name?: string;
  //url: string;
  //bio: string;
  //email: string;
  //public_repos?: number;
}

export interface ErroConexao {
  name?: string; // Adcionado para o erro AbortError
  message: string;
  cause?: {
    code: string;
  };
}

export interface ErroArquivo {
  code?: string;
  message: string;
}
