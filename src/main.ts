/**
 * Estrutura do Projeto
Model: Responsável por definir a estrutura dos dados e as operações básicas de manipulação de dados.
Service: Responsável por conter a lógica de negócios e interagir com o Model e a API externa.
Controller: Responsável por receber as requisições, chamar os métodos apropriados no Service e retornar as respostas.
 
walao@DESKTOP-AOPOU8I:~/dev$ tsc
Versão 6.0.3
tsc: O Compilador TypeScript - Versão 6.0.3                                                           
                                                                                                    TS 
COMANDOS COMUNS
  tsc
  Compila o projeto atual (tsconfig.json no diretório de trabalho atual.)

  tsc app.ts util.ts
  Ignora o tsconfig.json e compila os arquivos especificados com as opções padrão do compilador.

  tsc -b
  Constrói um projeto composto no diretório de trabalho atual.

  tsc --init
  Cria um arquivo tsconfig.json com as configurações recomendadas no diretório de trabalho atual.

  tsc -p ./caminho/para/tsconfig.json
  Compila o projeto TypeScript localizado no caminho especificado.

  tsc --help --all
  Uma versão expandida desta informação, mostrando todas as opções possíveis do compilador.

  tsc --noEmit
  tsc --target esnext
  Compila o projeto atual com configurações adicionais.

FLAGS DE LINHA DE COMANDO
      --help, -h  Exibe esta mensagem.

     --watch, -w  Monitora os arquivos de entrada.

           --all  Mostra todas as opções do compilador.

   --version, -v  Exibe a versão do compilador.

          --init  Inicializa un projeto TypeScript e cria um arquivo tsconfig.json.

   --project, -p  Compila o projeto dado o caminho para seu arquivo de configuração ou para uma pasta com um 'tsconfig.json'.

    --showConfig  Exibe a configuração final em vez de construir o projeto.

  --ignoreConfig  Ignora o tsconfig encontrado e constrói com os arquivos e opções da linha de comando.

     --build, -b  Constrói um ou mais projetos e suas dependências, caso estejam desatualizados.

OPÇÕES COMUNS DO COMPILADOR
               --pretty  Ativa cores e formatação na saída do TypeScript para tornar os erros do compilador mais fáceis de ler.
                  tipo:  boolean
                 padrão:  true

      --declaration, -d  Gera arquivos .d.ts a partir dos arquivos TypeScript e JavaScript no seu projeto.
                  tipo:  boolean
                 padrão:  `false`, a menos que `composite` esteja definido

       --declarationMap  Cria mapas de fontes (sourcemaps) para arquivos d.ts.
                  tipo:  boolean
                 padrão:  false

  --emitDeclarationOnly  Gera apenas arquivos d.ts e não arquivos JavaScript.
                  tipo:  boolean
                 padrão:  false

            --sourceMap  Cria arquivos de mapa de fontes (source map) para os arquivos JavaScript gerados.
                  tipo:  boolean
                 padrão:  false

               --noEmit  Desativa a geração de arquivos a partir de uma compilação.
                  tipo:  boolean
                 padrão:  false

           --target, -t  Define a versão da linguagem JavaScript para o JavaScript gerado e inclui declarações de biblioteca compatíveis.
                um de:  es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, es2025, esnext
                 padrão:  es2025

           --module, -m  Especifica qual código de módulo é gerado.
                um de:  commonjs, es6/es2015, es2020, es2022, esnext, node16, node18, node20, nodenext, preserve
                 padrão:  undefined

                  --lib  Especifica um conjunto de arquivos de declaração de biblioteca integrados que descrevem o ambiente de execução alvo.
           um ou mais:  es5, es6/es2015, es7/es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, es2024, es2025, esnext, dom, dom.iterable, dom.asynciterable, webworker, webworker.importscripts, webworker.iterable, webworker.asynciterable, scripthost, es2015.core, es2015.collection, es2015.generator, es2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.array.include, es2016.intl, es2017.arraybuffer, es2017.date, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyncgenerator, es2018.asynciterable/esnext.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es2019.string, es2019.symbol/esnext.symbol, es2019.intl, es2020.bigint/esnext.bigint, es2020.date, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.wellknown, es2020.intl, es2020.number, es2021.promise, es2021.string, es2021.weakref/esnext.weakref, es2021.intl, es2022.array, es2022.error, es2022.intl, es2022.object, es2022.string, es2022.regexp, es2023.array, es2023.collection, es2023.intl, es2024.arraybuffer, es2024.collection, es2024.object/esnext.object, es2024.promise, es2024.regexp/esnext.regexp, es2024.sharedmemory, es2024.string/esnext.string, es2025.collection, es2025.float16/esnext.float16, es2025.intl, es2025.iterator/esnext.iterator, es2025.promise/esnext.promise, es2025.regexp, esnext.array, esnext.collection, esnext.date, esnext.decorators, esnext.disposable, esnext.error, esnext.intl, esnext.sharedmemory, esnext.temporal, esnext.typedarrays, decorators, decorators.legacy
                 padrão:  undefined

              --allowJs  Permite que arquivos JavaScript façam parte do seu programa. Use a opção 'checkJs' para receber erros desses arquivos.
                  tipo:  boolean
                 padrão:  `false`, a menos que `checkJs` esteja definido

              --checkJs  Ativa a exibição de erros em arquivos JavaScript com checagem de tipo.
                  tipo:  boolean
                 padrão:  false

                  --jsx  Especifica qual código JSX é gerado.
                um de:  preserve, react, react-native, react-jsx, react-jsxdev
                 padrão:  undefined

              --outFile  Especifica um arquivo que agrupa todas as saídas em um único arquivo JavaScript. Se 'declaration' for true, também designa um arquivo que agrupa todas as saídas .d.ts.

               --outDir  Especifica uma pasta de saída para todos os arquivos gerados.

       --removeComments  Desativa a geração de comentários.
                  tipo:  boolean
                 padrão:  false

               --strict  Ativa todas as opções estritas de checagem de tipo.
                  tipo:  boolean
                 padrão:  true

                --types  Especifica nomes de pacotes de tipos para serem incluídos sem serem referenciados em um arquivo fonte.

      --esModuleInterop  Gera JavaScript adicional para facilitar o suporte à importação de módulos CommonJS. Isso ativa 'allowSyntheticDefaultImports' para compatibilidade de tipos.
                  tipo:  boolean
                 padrão:  true

Você pode aprender sobre todas as opções do compilador em https://aka.ms/tsc

walao@DESKTOP-AOPOU8I:~/dev$ cd SCTEC-PROJETO-NODEjs


O tsx permite rodar TypeScript diretamente sem compilar, ótimo para desenvolvimento. Instale-o:
npm install tsx --save-dev

"scripts": {
  "build": "tsc",
  "start": "node dist/main.js",
  "dev": "npx tsx src/main.ts" <-- esta correto mas "dev": "npx tsx ..." também funciona, mas é mais lento — o npx procura o pacote na internet toda vez. Como você já instalou o tsx localmente, MUDAMOS PARA: "tsx src/main.ts".}
  "dev": "tsx src/main.ts" <- AGORA PODEMOS EXECUTAR COM: npm run dev  <<--- Isso vai executar o src/main.ts diretamente — e quando você salvar alterações, basta rodar o comando de novo

  -------
Durante o desenvolvimento (mais rápido): O tsx executa o TypeScript diretamente, sem precisar compilar. É o que você vai usar enquanto está desenvolvendo — salva, roda, vê o resultado na hora.
npx tsx src/main.ts -> 
-------
Para produção (modo final): Isso gera a pasta dist/ com os arquivos .js prontos. É o que você usaria se fosse entregar o projeto.
# Passo 1 — compila TypeScript → JavaScript
npm run build
# Passo 2 — executa o JavaScript compilado
npm start






*/

import { PokemonController } from "./controllers/PokemonController.js";

const pokemonController = new PokemonController();

async function main() {
    await pokemonController.fetchPokemon('pikachu');
    await pokemonController.fetchPokemon('charmander');
    await pokemonController.fetchPokemon("bulbasaur");
    pokemonController.listaPokemonsOrdenada();
}
main();