/**
 * Implementação da classe base para todos os erros personalizados
 * 
 * O JavaScript já tem Error nativo, mas ele é genérico. Com classes customizadas você consegue identificar o tipo do erro e 
 * reagir de forma diferente para cada um:
 */
import { urlToHttpOptions } from "node:url";


// Classe base , estende a classe Error nativa do JavaScript
export class ErroCustomizado extends Error {
  // O construtor recebe uma mensagem de erro e define o nome do erro como o nome da classe.
  constructor(message: string, options?: ErrorOptions) {
    super(message, options); // repassa options para o Error nativo
    this.name = this.constructor.name;
    // Error.captureStackTrace é usado para capturar a pilha de chamadas, o que ajuda na depuração.
    Error.captureStackTrace(this, this.constructor);
  }
}
// Por que ErrorOptions? É o tipo nativo do TypeScript para o segundo parâmetro de Error:
// (A) super(message, options) — chama o construtor do Error nativo, que define this.message
// (B) this.name = this.constructor.name — sem isso, todo erro apareceria como "Error" no log. Com isso:
// ErroConexao: falha ao conectar   ✅
// Error: falha ao conectar         ❌ (sem o this.name)
// (C) Error.captureStackTrace — captura exatamente onde o erro foi criado, removendo ruído interno da pilha:
// ErroConexao: falha ao conectar
// at conectarBanco (banco.ts:10)   ✅ aponta para seu código
//  at main (index.ts:5)




// As classes Específicas ErroConexao, ErroArquivo e ErroUsuario estendem ErroCustomizado e são usadas para erros específicos.

// o parâmetro cause usa o mesmo nome de uma propriedade nativa do Error (adicionada no ES2022) e pode causar conflito. Nome alterado para causaConexao ou tipar explicitamente
// O cause carrega detalhes extras do erro — por exemplo { code: "ECONNREFUSED" } quando o banco recusa a conexão.
export class ErroConexao extends ErroCustomizado {
    constructor(message: string, public readonly cause?: {code: string}) {
      super(message, { cause }); // passa para Error nativo também
    }
}

//O code indica o tipo do problema — ex: "ENOENT" (arquivo não encontrado), "EACCES" (sem permissão).
export class ErroArquivo extends ErroCustomizado {
    constructor(message: string, public code?: string) {
        super(message);
    }
}

//Mais simples — só precisa da mensagem, como "Email inválido".
export class ErroUsuario extends ErroCustomizado {
    constructor(message: string) {
        super(message);
    }
}


/** Exemplo completo de uso:
function conectarBanco(host: string) {
  if (!host) {
    throw new ErroUsuario("Host não informado");
  }
  
try {
    // tentativa de conexão...
  } 
catch (e) {
    throw new ErroConexao("Falha ao conectar", { code: "ECONNREFUSED" });
  }
}

// capturando os erros
try {
  conectarBanco("");
} 
catch (erro) {
  if (erro instanceof ErroUsuario) {
    console.log("Dado inválido:", erro.message);
    // → "Dado inválido: Host não informado"
  } else if (erro instanceof ErroConexao) {
    console.log("Sem conexão, código:", erro.cause?.code);
    // → "Sem conexão, código: ECONNREFUSED"
  } else if (erro instanceof ErroArquivo) {
    console.log("Problema no arquivo:", erro.code);
  }
}

Error (nativo JS)
└── ErroCustomizado  → adiciona: name correto + stack trace limpo
    ├── ErroConexao  → adiciona: cause { code }  (ex: ECONNREFUSED)
    ├── ErroArquivo  → adiciona: code             (ex: ENOENT)
    └── ErroUsuario  → só mensagem                (ex: "Email inválido")





 */









