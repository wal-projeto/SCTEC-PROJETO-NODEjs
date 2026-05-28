
export class CustomError extends Error {
    constructor(message: string){
        super(message);
        this.name =  this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}



/**
 * npm i --save-dev @types/node (pacote de depend. de desenvolvimento)
 * Atualizar o arquivo tsconfig.json : o compilador carregue os tipos globais
 * "compilerOptions": {
    // ... outras configurações
    "types": ["node"]

* ocê pode remover essa linha de importação e usar apenas console.error() diretamente no seu código
 * Erro no CustomError.ts: O método Error.captureStackTrace é exclusivo da V8 (motor do Node.js/Chrome) e serve para customizar o rastreamento de pilha de erros. Sem o pacote @types/node, o TypeScript assume apenas os recursos padrão do JavaScript puro para navegadores, onde essa propriedade não existe
 */