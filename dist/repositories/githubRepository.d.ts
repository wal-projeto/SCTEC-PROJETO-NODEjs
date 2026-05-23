/** Camada Repository (Acesso a Dados): Serve unicamente para ler ou gravar dados externos. Ela nao sabe o que o sistema faz com esses dados.
 *
 * Dividido em 2 arquivos: esse consome dados de uma API do GitHub
 *
 *
 * Ela faz uma requisição para a API externa do GitHub.
 * Tudo que busca dados externos é Repository.
 */
export declare function buscarUsuario(username: string): Promise<any>;
//# sourceMappingURL=githubRepository.d.ts.map