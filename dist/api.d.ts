/** npm run api <-- para rodar o programa
 * OU
 * SE EU MUDAR O SCRIPTS DO PACKAGE.JSON PARA :
 * "scripts": {
    "start": "node ./src/api.js"
}
- Ctrol + c : Libera o  terminal
- Ctrol + Shift + P = abra a paleta de comandos
- Ctrol + ' = abre o terminal
- Ao salvar alterações no VS Code subir no GitHub:
 - git add .
 - git commit -m " xxxx "
 - git push origin featureSCTEC
 
 1. Garanta que as informações dele estão atualizadas
git fetch upstream

2. Vá para a sua branch onde quer colocar os arquivos
git checkout main
git checkout featureSCTEC
git checkout EstudoJavaScript

RODAR COM: npm start
OU
RODAR DIRETO PELO TERMINAL:
node ./src/api.js

Para limpar a rede do seu terminal, execute estes dois comandos no terminal
do Ubuntu antes de rodar o programa:
# 1. Limpa o cache de DNS do Linux
sudo resolvectl flush-caches

# 2. Desliga o cache de requisições temporárias do Node
export NODE_OPTIONS=""

textSCTEC-PROJETO-NODEjs/    <-- Raiz do seu projeto
├── node_modules/   <-- Pasta de dependências (gerada automaticamente)
├── src/      <-- APENAS seus arquivos de código original
│   ├── api.ts
│   └── (outros arquivos .ts)
├── package.json     <-- Na raiz do projeto
├── package-lock.json <-- Na raiz do projeto
└── tsconfig.json    <-- Na raiz do projeto

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

api.js RODAR COM: npm start

Buscar texto no código: Ctrol + F

COM TYPESCRIPT : npm run dev
*/
export {};
//# sourceMappingURL=api.d.ts.map