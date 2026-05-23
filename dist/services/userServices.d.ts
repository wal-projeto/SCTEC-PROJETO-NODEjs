/** userService  não faz só salvar, ela valida se o usuário já existe (usuarioJaExiste). Processamento de regras de validação é papel do Service. Ela apenas importa o lerArquivo do repositório para obter os dados de que precisa
 src/services/userService.js
 
 Ela tem regras de negócio: valida se o usuário já existe (usuarioJaExiste) e decide se deve salvar ou exibir um aviso. Isso é responsabilidade do Service.
 */
export declare function salvarArquivo(novoUsuario: any): Promise<void>;
/**
 * As funções readFile e writeFile do módulo node:fs/promises são de  alto nível. Elas abrem o arquivo, transferem os dados e fecham o arquivo
 * sozinhas de forma automática assim que terminam a operação. Por isso não precisam de um finally
 */
//# sourceMappingURL=userServices.d.ts.map