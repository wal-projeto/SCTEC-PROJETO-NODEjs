/**Ctrol + F - Buscar texto no código:
- Ctrol + c : Libera o  terminal
- Ctrol + Shift + P = abra a paleta de comandos
- Ctrol + ' = abre o terminal

GIT:
- Ao salvar alterações no VS Code subir no GitHub:
 - git add .
 - git commit -m " xxxx "
 - git push origin featureSCTEC

git fetch upstream : Garanta que as informações dO repositorio estão atualizadas

MINHAS BRANCHs
git checkout main
git checkout featureSCTEC
git checkout EstudoJavaScript

Para limpar a rede do seu terminal, execute estes dois comandos no terminal
do Ubuntu antes de rodar o programa:
# 1. Limpa o cache de DNS do Linux
sudo resolvectl flush-caches

# 2. Desliga o cache de requisições temporárias do Node
export NODE_OPTIONS=""


MINHA TERCEIRA BRANCH COM MATERIAIS DE ESTUDO:
git push -u origin EstudoJavaScript
 * O termo -u origin serve para conectar a sua branch local diretamente com o GitHub.
 * Nas próximas vezes que quiser enviar alterações dessa branch, bastará digitar apenas:
 * > git push.
 * git checkout EstudoJavaScript <-COMANDO PARA IR A ELA

git branch <-lista as branch
git stash <- Guarde suas alterações atuais
git switch nome-da-branch <- Mude para a branch desejada
git stash pop <- git stash pop


npm run dev → roda direto o TypeScript e recompila automaticamente ao salvar: tsx --watch src/api.ts
npm run build → só compila: gera os arquivos em dist.
npm start → compila tudo e roda o proj.principal em dist/src/api.js. "start": "tsc && node dist/src/api.js",

*/
export {};
//# sourceMappingURL=api.d.ts.map