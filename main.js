//READLINE PROMISES: https://nodejs.org/api/readline.html#readlinepromises
const readlinePromises = require("node:readline/promises"); // Importação correta para Promises
const { stdin, stdout } = require("node:process"); // Importa a entrada e saída padrão do processo

/**
 *  - Exemplo de uso do `readlinePromises`:
 * 
async function main() {
  // Criamos a interface
  const rl = readlinePromises.createInterface({ input: stdin, output: stdout });

const idade = await rl.question("qual é sua idade ?  ");
console.log(idade);


rl.close();

}

main();
 */





//  node main.js <- PARA EXECULAR O ARQUIVO main.js

// stty sane <-- Reseta as configurações de exibição do teclado
//Uma dica de terminal para restaurar configurações de teclado se algo sair estranho



// CONSUMINDO UMA API DO GITHUB ONDE VAI NOS FORNECER OS DADOS DE USUÁRIO : 

async function main() {
    const rl = readlinePromises.createInterface({ 
        input: process.stdin, 
        output: process.stdout,
 });


try {
const nome = await rl.question("qual é seu usuário no Git ?  ");

// fabioctetsuo , acenelio , wal-projeto
const response = await fetch(`https://api.github.com/users/${nome}`,{
    hearders: {'User-Agent': 'Node-Fetch-App'}
});

 if (!response.ok){
  throw new Error(`Erro: ${response.status} - Talvez o usuário não exista`);
 }

const json = await response.json();


// Mudei aqui para você ver o resultado real!
console.log("Dados recebidos do GitHub");
console.log(`Nome: ${json.name}`);
console.log(`Seguidores: ${json.followers}`);

if (json.bio === null) {
    console.log(`Bio: Usuário misterioso (sem bio)`);
} else {
  console.log(`Bio: ${json.bio}`);
}

} catch (erro) {
  console.error("Ops! Nao consiguimos acessar a API: ", erro.message);
} finally{
  rl.close();
}

}

main()


/**
 * Parabéns! Funcionou perfeitamente. 🚀O código acessou a API, cruzou a internet, buscou os dados do 
 * usuário wal-projeto e trouxe as informações de volta.
 * 
 * Aqui está o que os dados nos dizem:
 * 
 * Nome: Encontrou "Walquiria Oliveira".
 * Seguidores: Está 0 (provavelmente uma conta nova ou com foco em estudos).
 * Bio: null: 
 * 
 * Isso não é um erro do código! Significa apenas que, lá no perfil do GitHub, o campo "Bio" (biografia) está vazio.
 * 
 * 
 * Por que funcionou agora?
 * Async/Await nos lugares certos: Você esperou a resposta da rede (fetch) e também esperou a conversão do texto para objeto (json).
 * Lógica de Fluxo: Você usou a variável nome para montar a URL dinamicamente. 
 * 
 * 
 * O próximo nível:
 * Agora que você já domina o async/await para buscar dados, que tal um pequeno desafio de lógica?
 * Tente modificar o console.log da Bio para que, caso seja null, ele mostre uma mensagem amigável como "Usuário misterioso (sem bio)".
 * ____________________________________________
 * 
//  * 
//  * EXPLICAÇÃO DO CÓDIGO PELO CHAT GPT: CTROL + ALT +I:

// EXPLICAÇÃO DO (file:///home/walao/dev/SCTEC-PROJETO-NODEjs/main.js)

// ### Topo do arquivo

// 1. const readlinePromises = require("node:readline/promises");
//    - Importa o módulo do Node que permite ler perguntas no terminal usando `async/await`.
//    - Isso facilita perguntar algo ao usuário e esperar a resposta.


// 2. const { stdin, stdout } = require("node:process");
//    - Usa a entrada e saída padrão do Node.
//    - `stdin` é onde o usuário digita, `stdout` é onde o programa escreve.


// ### Função principal

// 5. `async function main() {`
//    - Declara uma função chamada `main`.
//    - `async` significa que você pode usar `await` dentro dela para esperar operações assíncronas.

// 6. `const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout, });`
//    - Cria a interface de leitura de perguntas no terminal.
//    - `rl` será usado para perguntar algo ao usuário e receber a resposta.

// ---

// ### Bloco `try`

// 7. `try {`
//    - Inicia um bloco de execução que tenta rodar o código.
//    - Se algum erro ocorrer, vai para o `catch`.

// 8. `const nome = await rl.question("qual é seu usuário no Git ?  ");`
//    - Exibe a pergunta no terminal.
//    - Espera o usuário digitar o nome do usuário do GitHub.
//    - Guarda essa resposta na variável `nome`.

// 9. `const response = await fetch(`https://api.github.com/users/${nome}`,{ hearders: {'User-Agent': 'Node-Fetch-App'} });`
//    - Faz uma requisição para a API do GitHub usando o nome digitado.
//    - Monta a URL dinamicamente com `${nome}`.
//    - Observação: aqui há um pequeno erro de digitação em `hearders`; o correto é `headers`.
//    - Mesmo assim, a requisição pode funcionar sem esse cabeçalho em muitos casos.

// 10. `if (!response.ok){ throw new Error(\`Erro: ${response.status} - Talvez o usuário não exista\`); }`
//     - Verifica se a resposta da API foi bem-sucedida.
//     - Se não for (`response.ok` falso), lança um erro com o código de status HTTP.

// 11. `const json = await response.json();`
//     - Converte a resposta da API em um objeto JavaScript.
//     - `await` espera a conversão terminar.

// ---

// ### Mostrar os dados do GitHub

// 12. `console.log("Dados recebidos do GitHub");`
//     - Imprime uma mensagem no terminal para avisar que os dados chegaram.

// 13. `console.log(\`Nome: ${json.name}\`);`
//     - Mostra o nome do usuário retornado pela API.

// 14. `console.log(\`Seguidores: ${json.followers}\`);`
//     - Mostra a quantidade de seguidores do usuário.

// 15. `if (json.bio === null) { console.log(\`Bio: Usuário misterioso (sem bio)\`); } else { console.log(\`Bio: ${json.bio}\`); }`
//     - Verifica se o campo `bio` está vazio.
//     - Se estiver `null`, imprime uma mensagem amigável.
//     - Caso contrário, mostra a biografia real do usuário.

// ---

// ### Tratamento de erro

// 16. `} catch (erro) {`
//     - Se algo der errado dentro do `try`, o código chega aqui.

// 17. `console.error("Ops! Nao consiguimos acessar a API: ", erro.message);`
//     - Imprime no terminal uma mensagem de erro.
//     - `erro.message` traz a descrição do problema.

// ---

// ### Limpeza final

// 18. `} finally{ rl.close(); }`
//     - Sempre fecha a interface de leitura, mesmo se der erro.
//     - Isso evita que o programa fique travado esperando algo.

// 19. `}`
//     - Fecha a função `main`.

// 20. `main();`
//     - Chama a função `main` para iniciar o programa.

// ---

// ### Resumo do que o programa faz

// - Pergunta o usuário do GitHub.
// - Busca os dados desse usuário na API do GitHub.
// - Exibe nome, número de seguidores e biografia.
// - Trata erro se o usuário não existir ou se a requisição falhar.
// - Fecha corretamente a leitura de terminal no final.

// Se quiser, posso também explicar linha a linha do index.js.
//  * 
//  * 
//  * 
//  *
//  */