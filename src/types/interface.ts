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

interface ErrorOptions {
  cause?: unknown;
}
// Assim { cause } bate exatamente com esse tipo, e a propriedade fica acessível via erro.cause nativamente — sem conflito com 
// a API padrão do Error do ES2022.

