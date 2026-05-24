/** QUANDO USAR CADA COMANDO DE FLUXO DE EXECUÇÃO para o PROJETO:
 npm run dev
 Usa tsx --watch src/api.ts.
 Roda o projeto em modo desenvolvimento.
 Mantém o processo aberto e recompila automaticamente quando você salva alterações.
 Ideal para quando você está codando e quer ver mudanças instantâneas.
 Para sair, pressione Ctrl + C.
 
 npm start
 Faz tsc && node dist/src/api.js.
 Primeiro compila todo o projeto para dist.
 Depois roda a versão compilada do seu projeto principal.
 Esse é o fluxo de produção: roda uma vez e termina.
 Não fica em watch, então o terminal volta ao prompt normalmente.


npx tsx AULA-TS.ts
Executa o arquivo direto, sem compilar para dist.
Útil para testes rápidos ou rodar apenas uma vez sem watch.
Não gera arquivos .js no dist. npx executa binario tsx que esta dentro de node_modules
*/


// 
// O parâmentro x implicitamente tem um tipo any
function fn(x: any) {
  return x.flip();
}
fn(2);

const x = {
  nome: 'wal',
  id: 2,
};

function fn1(x: any) {
  return x.flip();
}
fn1(x);

const message = 'hello!';
//message();  <- Essa expressão não pode ser chamada, O tipo String não tem assinatura de função.
