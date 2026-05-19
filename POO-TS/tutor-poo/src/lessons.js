const exemplos = {
  conceitos: () => require('./exemplos/estudante'), // Introdução à POO
  encapsulamento: () => require('./exemplos/conta-bancaria'), // Encapsulamento
  heranca: () => require('./exemplos/animal'),
  polimorfismo: () => require('./exemplos/funcionario'), // Polimorfismo
  pagamento: () => require('./exemplos/pagamento'), // Interfaces e classes abstratas
  excecoes: () => require('./exemplos/excecoes'), // Tratamento de exceções
  pedidos: () => require('./exemplos/pedido'), // Aplicação prática: sistema de pedidos
  ecommerce: () => require('./exemplos/ecommerce'), // POO no seu projeto (POO-202307)
};

const lessons = [ // Lições
  { // Introdução à POO
    id: 1,
    titulo: 'Introdução à POO',
    teoria: `
A POO organiza o software em entidades com responsabilidades definidas, em vez de
apenas sequências de funções. Objetos interagem entre si — como no mundo real.

Por que importa?
• Manutenibilidade: sistemas mais fáceis de evoluir
• Reutilização: modelos (classes) reaproveitáveis
• Complexidade: escala melhor que scripts procedimentais

Reflexão do ebook: "O software deixa de ser só instruções em sequência e passa a
ser um conjunto de objetos que colaboram."
`,
    exemplo: null,
    quiz: {
      pergunta: 'Na POO, o foco principal é:',
      opcoes: ['A) Apenas o fluxo de execução', 'B) Entidades e suas interações', 'C) Variáveis globais'],
      resposta: 'B',
    },
  },
  { // Conceitos básicos: objeto, classe e instância
    id: 2, 
    titulo: 'Conceitos básicos: objeto, classe e instância',
    teoria: `
OBJETO = dados + comportamentos reunidos (identidade, estado, comportamento).
• Estado → atributos (nome, matrícula, curso)
• Comportamento → métodos (matricular, consultar histórico)

CLASSE = molde para criar objetos.
INSTÂNCIA = objeto criado a partir de uma classe.

Exemplo do ebook: "Estudante" não é só variáveis soltas — é uma entidade com ações.
Mensagens: objetos se comunicam pedindo comportamentos uns aos outros.
`,
    exemplo: exemplos.conceitos, // Conceitos básicos: objeto, classe e instância
    quiz: {
      pergunta: 'Uma instância é:',
      opcoes: ['A) O molde da classe', 'B) Um objeto concreto criado da classe', 'C) Um método estático'],
      resposta: 'B',
    },
  },
  {
    id: 3, // Abstração
    titulo: 'Abstração',
    teoria: `
Abstração = focar no que importa e esconder detalhes desnecessários.

Define O QUE o objeto faz, não necessariamente COMO (inicialmente).
Reduz complexidade em sistemas grandes.

No código: classes e interfaces expõem apenas o necessário ao restante do sistema.
`,
    exemplo: null, // Abstração
    quiz: {
      pergunta: 'Abstração ajuda principalmente a:',
      opcoes: ['A) Aumentar detalhes internos', 'B) Reduzir complexidade focando no essencial', 'C) Eliminar classes'],
      resposta: 'B',
    },
  },
  {
    id: 4, // Encapsulamento
    titulo: 'Encapsulamento',
    teoria: `
Protege dados internos: atributos não são alterados diretamente, e sim por métodos
com validação (getters/setters ou métodos de negócio).

Exemplo do ebook: ContaBancaria — o saldo não pode ser mudado livremente.
Acesso direto ignora regras e gera inconsistências.

Em JavaScript moderno: campos privados com #saldo.
Encapsular ≠ só esconder: define responsabilidades e limites do objeto.
`,
    exemplo: exemplos.encapsulamento,
    quiz: {
      pergunta: 'Encapsulamento correto significa:',
      opcoes: [
        'A) Qualquer parte do sistema altera atributos direto',
        'B) Estado interno muda só por comportamentos definidos',
        'C) Não usar métodos',
      ],
      resposta: 'B',
    },
  },
  {
    id: 5, // Herança
    titulo: 'Herança',
    teoria: `
Uma classe reutiliza atributos e comportamentos de outra (relação "é um").

Exemplo do ebook: Animal → Cachorro e Gato herdam nome e emitirSom(),
mas cada um especializa (latir / miar).

Cuidado: herança excessiva cria hierarquias rígidas. Prefira composição quando
"a relação é um" não for clara.
`,
    exemplo: exemplos.heranca,
    quiz: {
      pergunta: 'Herança serve principalmente para:',
      opcoes: ['A) Reutilizar e especializar classes', 'B) Substituir funções globais', 'C) Evitar objetos'],
      resposta: 'A',
    },
  },
  {
    id: 6, // Polimorfismo
    titulo: 'Polimorfismo',
    teoria: `
Objetos diferentes respondem de forma distinta à mesma mensagem (mesmo método).

Exemplo PraticAI do ebook: Funcionario.calcularSalario() — Gerente e Desenvolvedor
implementam de formas diferentes, mas a lista trata todos como Funcionario.

Benefício: elimina longos if/switch por tipo e facilita extensão do sistema.
`,
    exemplo: exemplos.polimorfismo,
    quiz: {
      pergunta: 'Polimorfismo permite:',
      opcoes: [
        'A) Mesma chamada, comportamentos diferentes por objeto',
        'B) Apenas uma implementação fixa',
        'C) Proibir herança',
      ],
      resposta: 'A',
    },
  },
  {
    id: 7, // POO vs programação estruturada
    titulo: 'POO vs programação estruturada',
    teoria: `
Estruturada: funções + dados espalhados → risco de efeitos colaterais ao crescer.

POO: Produto, Cliente, Pedido — cada um com seus dados e regras → menos acoplamento.

A POO NÃO elimina if/for; muda o nível de abstração e a organização.

Benefícios (ebook): organização, manutenibilidade, reutilização, modelagem do domínio.
`,
    exemplo: exemplos.ecommerce,
    quiz: {
      pergunta: 'Na loja do ebook, a POO organiza por:',
      opcoes: ['A) Entidades com responsabilidades', 'B) Apenas funções soltas', 'C) Arquivos aleatórios'],
      resposta: 'A',
    },
  },
  {
    id: 8, // Interfaces e classes abstratas
    titulo: 'Interfaces e classes abstratas',
    teoria: `
INTERFACE (contrato): define O QUE deve existir, não COMO implementar.
Classe abstrata: compartilha comportamento comum + força especialização.

Exemplo PraticAI: MeioDePagamento com pagar() e emitirComprovante().
CartaoCredito e PIX implementam regras próprias; o sistema trata todos igual.

Dica do ebook: interface para contratos; abstração para código comum.
`,
    exemplo: exemplos.pagamento, // Interfaces e classes abstratas
    quiz: {
      pergunta: 'Uma interface define principalmente:',
      opcoes: ['A) Contrato de comportamentos', 'B) Apenas variáveis globais', 'C) O banco de dados'],
      resposta: 'A',
    },
  },
  {
    id: 9, // Tratamento de exceções
    titulo: 'Tratamento de exceções',
    teoria: `
Exceções = situações inesperadas (dados inválidos, regra de negócio violada).

Em POO, erros viram objetos (classes de erro) — tratamento organizado com try/catch.

Boas práticas: não usar exceção como fluxo normal; não engolir erro sem tratar.
Exceções fazem parte do contrato da classe.
`,
    exemplo: exemplos.excecoes, // Tratamento de exceções
    quiz: {
      pergunta: 'Exceções devem ser usadas para:',
      opcoes: ['A) Situações realmente excepcionais', 'B) Todo if do programa', 'C) Substituir nomes de métodos'],
      resposta: 'A',
    },
  },
  {
    id: 10, // Aplicação prática: sistema de pedidos
    titulo: 'Aplicação prática: sistema de pedidos',
    teoria: `
Modelagem antes do código: identifique entidades do domínio.

Pedido interage com Cliente e Produto pelos comportamentos — sem conhecer detalhes
internos (encapsulamento + abstração).

Aplicável em: e-commerce (Produto, Carrinho, Pedido), APIs REST, apps mobile.
`,
    exemplo: exemplos.pedidos, // Aplicação prática: sistema de pedidos
    quiz: {
      pergunta: 'Pedido deve conhecer detalhes internos de Cliente?',
      opcoes: ['A) Sim, tudo', 'B) Não — só interagir por comportamentos', 'C) Apenas variáveis globais'],
      resposta: 'B',
    },
  },
  {
    id: 11, // Boas práticas
    titulo: 'Boas práticas',
    teoria: `
• Responsabilidade única: uma classe, um motivo para mudar
• Baixo acoplamento: dependa de abstrações (interfaces)
• Nomes claros: classes e métodos autoexplicativos
• Composição vs herança: prefira composição quando não for "é um"
• Exceções só para casos excepcionais

Domínio da POO = teoria + reflexão + prática constante (conclusão do ebook).
`,
    exemplo: null, // Boas práticas
    quiz: {
      pergunta: 'Responsabilidade única sugere:',
      opcoes: [
        'A) Uma classe faz tudo',
        'B) Cada classe tem um motivo claro para mudar',
        'C) Não usar classes',
      ],
      resposta: 'B',
    },
  },
];

// Exporta as lições e exemplos para serem usados em outros arquivos
module.exports = { lessons, exemplos };
