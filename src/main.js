
/** 
 - instalar o Node.js (no WSL/Linux): sudo apt install nodejs npm
- Verifique se funcionou: node -v  e  npm -v
- Instalação: Após instalar o Node, rodar este comando dentro 
da pasta do seu projeto:  npm install
- package.json - "start": "node ./src/main.js" : 
- Para executar o código: npm start

- Ctrol + c : Libera o  terminal 
- Ctrol + Shift + P = abra a paleta de comandos
- Ctrol + ' = abre o terminal
- Ao salvar alterações no VS Code subir no GitHub:
 - git add .
 - git commit -m " xxxx "
 - git push origin featureSCTEC
*/
import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { createInterface } from "node:readline/promises";
import { adicao } from "./services/adicao.js";
import { subtracao } from "./services/subtracao.js";
import { multiplicacao } from "./services/multiplicacao.js";
import { divisao } from "./services/divisao.js";

async function main() {
  const interfaceConsole = createInterface(stdin, stdout);

  try {
    const respostaOperacao = await interfaceConsole.question(
      "Digite a operação:  \n");

    const operacoesValidas = ["+","-","*","/"];
    if(!operacoesValidas.includes(respostaOperacao.trim())) {
      throw new Error(`Operação inválida: ${respostaOperacao} ` + ` Operações admitidas -->>>  + , - , * , /  `);
    } // esta invertendo a resposta de for false para que entre no if(){ executa se for verdade}
 
    const aString = await  interfaceConsole.question("Digite o primeiro número: \n");
    const bString = await interfaceConsole.question("Digite o segundo número: \n");

    const a = Number(aString );
    const b = Number(bString); 

    // Lançando um erro manualmente se o Number() retornar NaN
    if(isNaN(a) || isNaN(b)) {
      throw new Error("Digite apenas números válidos.");
    };

  switch (respostaOperacao.trim()) {
      case "+":
        const resultado = adicao(a,b) // passando os num. já convertidos
        console.log(`O resultado da operação é: ${resultado}`);
        break;

      case "-":
        const resultado1 = subtracao(a,b) 
        console.log(`O resultado da operação é: ${resultado1}`);
        break;

      case "*":
        const resultado2 = multiplicacao(a,b)
        console.log(resultado2)
        break;

      case "/":
        const resultado3 = divisao(a,b)
        console.log(resultado3)
        break;

      default:
        throw new Error("Operação admitidas: + , - , * , /");
  }
  } catch (error){
    // Tratamento de erro, captura qualquer erro que aconteça no bloco try
    // console.error("ERRO DURANTE A EXECUÇÃO!");
    console.error(`${error.message}`); 
    // Template Strings: as variáveis só funcionam dentro de textos se você utilizamos as crases ( ` ` )


  } finally {
    interfaceConsole.close();
  } // BÔNUS: Resolver o problema do console preso quando a aplicação dá erro.
}


main().catch(console.log);
/**1. main(): Invoca a função principal que é async e faz com que retorne automaticamente uma
 * Promise(promessa de que o código vai rodar no futuro)
 * 2 .catch(...) : método nativo usado exclusivamente para lidar com Promises rejeitadas
 * (que falharam). Se qualquer erro acontecer dentro da função main(), e não for tratado lá dentro, 
 * a Promise é "rejeitada" e o .catch entra em ação imediatamente para capturar essa falha.
 3. . (console.log) : Aqui há um truque de escrita curta do JavaScript (chamado de passagem por referência). Em vez de escrever a forma longa:
 .catch(function(error) {
  console.log(error);
})

*/






/** Problema do Console Preso:
 * A estrutura atual do seu código utiliza o trio completo de tratamento 
 * de erros: try, catch e finally.
 
 * try {
  // Código que pode dar erro...
} catch (error) {
  // Trata o erro se ele acontecer...
} finally {
  // ESTE BLOCO SEMPRE EXECUTA!
  interfaceConsole.close(); 
}

 * O bloco finally possui uma regra absoluta no JavaScript: ele sempre 
 * será executado, não importa o que aconteça antes.
 * 
 * 1. Se o código do try rodar perfeitamente até o fim -> o finally executa e fecha o console.
 * 
 * 2. Se o código do try falhar e disparar um erro -> o código pula para o catch, exibe a 
 * mensagem de erro e, logo em seguida, entra no finally para fechar o console.
 * 
 * Colocar o .close() dentro do finally garantiu uma blindagem para a aplicação. Independentemente 
 * de o usuário digitar os números certos ou causar um erro grave, o Node.js sempre receberá a 
 * instrução de encerrar a interface de entrada e saída, liberando o terminal do usuário imediatamente.
 */
