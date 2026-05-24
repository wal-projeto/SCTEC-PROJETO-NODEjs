/** src/controllers/clienteController.js
 * O Controller gerencia o que o usuário vê e digita. Ela importa o lerArquivo para montar a listagem na tela.

Ela desenha menus na tela (console.log("===")) e faz perguntas ao usuário usando a interface do console.
Interação com o usuário é Controller.
*/
import { lerArquivo } from "../repositories/fileRepository.js";
export async function usuarioEspecifico(interfaceConsole) {
    const lerAquivo = await lerArquivo();
    if (lerAquivo.length === 0) {
        console.log("\n📭 Não há usuários salvos no banco de dados para buscar.");
    }
    else {
        console.log("\n=================================");
        console.log("  SELECIONE UM USUÁRIO DA LISTA  ");
        console.log("=================================");
        // Exibe apenas a lista de logins numerada para o usuário escolher
        // o .forEach mapeando apenas a propriedade u.login associada a um índice 
        // amigável (index + 1). Descarta varreduras de texto complexas na memória.
        lerAquivo.forEach((u, index) => {
            if (u && u.login) {
                console.log(` [ ${index + 1} ] ${u.login} `);
            }
        });
        console.log("=================================");
        const escolhaNumero = await interfaceConsole.question("\nDigite o número do usuário que deseja buscar:\n");
        // Converte a string digitada para número inteiro
        const indiceSelecionado = parseInt(escolhaNumero, 10) - 1;
        // Valida se o índice existe dentro das posições válidas do array
        if (isNaN(indiceSelecionado) || indiceSelecionado < 0 || indiceSelecionado >= lerAquivo.length) {
            console.log("\n❌ Opção inválida! Selecione um número válido da lista.");
        }
        else {
            const usuarioEncontrado = lerAquivo[indiceSelecionado];
            console.log("\n=================================");
            console.log(`  DADOS DE: ${usuarioEncontrado.login.toUpperCase()} `);
            console.log("=================================");
            // Filtra para exibir em formato JSON chave/valor limpo
            const dadosExibicao = {
                id: usuarioEncontrado.id,
                login: usuarioEncontrado.login,
                name: usuarioEncontrado.name || "Não informado!"
            };
            console.log(JSON.stringify(dadosExibicao, null, 2));
        }
    }
}
//# sourceMappingURL=clienteController.js.map