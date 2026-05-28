// 1.0 - O Manual do TypeScript

// 1.1 - O básico:

// Para alguns valores, como os tipos primitivos `int` stringe `string` number, podemos identificar seu tipo em tempo de execução
// usando o operador `type` typeof . Mas para outras coisas, como funções, não existe um mecanismo de tempo de execução correspondente
// para identificar seus tipos. Por exemplo, considere esta função:
function fn(x: any) {
  // return x.flip();   <- Vai dar esse ERRO ! x.flip não é uma função
}
// fn(2);
console.log(fn);

// Aqui o TypeScript avisará que message não é uma função, é uma variável, não pode ser chamada como uma função.
const message = 'hello!';
// message();  <- ERRO! Essa expressão não pode ser chamada, O tipo String não tem assinatura de função.

const user = {
  name: 'Daniel',
  age: 26,
};

//user.location; // <- ERRO! O Type Script avisa que a propriedade location não existe no tipo '{nome:string; idade:numero;}'

// OBS: O TYPE SCRIPT DETECTA ERROS: de digitação, de fuções não chamadas, ou erros básicos de lógica, além de ter ferramenta para
// editar código(autocompletar codigo enquanto digitamos, ou seja, sugere quais propriedades vc pode querer usar)

// tsc - O compilador TypeScript - O VERIFICADOR DE TIPOS : Primeiro instamos via npm
// npm install -g typescript <-- Isso instala o compilador TypeScript tscglobalmente. Você pode usar npx ferramentas similares, se preferir executar
// tsc  a partir de um pacote local node_modules.

// depois de intalar o TypeScrip executamos um arquivo assim: tsc hello.ts:
// Aruivo hello.ts : Esta é uma função de saudação de uso geral de nível industrial:
function greet(person: string, date: undefined) {
  console.log(`Hello ${person}, today is ${date}!`);
}
// O TS stá nos avisará que esquecemos de passar um argumento para a greet função
//greet("Brendan");

// com o tempo, você pode querer ser um pouco mais cauteloso contra erros e fazer com que o TypeScript se comporte de maneira mais rigorosa. Nesse caso, você pode usar a
// noEmitOnErroropção do compilador. Tente alterar seu arquivo hello.ts  e executar tsc com essa flag:
//tsc --noEmitOnError hello.ts  <- Você vai perceber que hello.js nunca é atualizado.

// TIPOS EXPLÍCITOS

// O que fizemos foi adicionar anotações de tipo em person e date
function greet1(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
// greet1('Maddison', Date());  <-ERRO! O argumento do tipo 'string' não pode ser atribuído ao parâmetro do tipo 'Data'.

// Corrigindo o código 
greet1('Maddison', new Date());

// PBS:  nem sempre precisamos escrever anotações de tipo explícitas. Em muitos casos, o TypeScript pode até inferir (ou "descobrir") os tipos para nós, mesmo que os omitamos.

// Processo downleveling : O TypeScript tem a capacidade de reescrever código de versões mais recentes(COMO ECMAScript 6, ES2015, ES6) para versões mais antigas, como o ECMAScript 3 ou o ECMAScript 5
// Executar --target es2015  escolhemos uma versão mais recente
// Portanto, ao executar o TypeScript com `--recent`:  tsc --target es2015 hello.ts  obtemos a seguinte saída:
function greet3(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet3('Maddison', new Date());

/** 
// RIGIDEZ: 
os tipos são opcionais, a inferência utiliza os tipos mais permissivos e não há verificação para valores potencialmente 
nulos null   ou undefined  inválidos. Assim como o TypeScript tsc emite alertas em caso de erros, esses padrões são 
implementados para não interferir no seu código. Se você estiver migrando código JavaScript existente, essa pode ser uma 
boa primeira opção.

O TypeScript possui várias opções de rigor na verificação de tipos que podem ser ativadas ou desativadas, e todos os nossos 
exemplos serão escritos com todas elas ativadas, a menos que seja especificado o contrário. A opção na CLI strict, ou "strict": true 
em um arquivo .bashrc como o tsconfig.js, ativa todas elas simultaneamente, mas podemos desativá-las individualmente. 
As duas mais importantes que você deve conhecer são `type-strict` noImplicitAny  e   `type-strict` strictNullChecks: 

>> noImplicitAny : O noImplicitAny é uma configuração do TypeScript que controla quando o compilador permite que variáveis ou parâmetros 
 fiquem com o tipo any sem você declarar explicitamente.

O que acontece sem noImplicitAny (false):
a) Se você não especificar o tipo de uma variável ou parâmetro, o TypeScript assume automaticamente que é any.
b) Isso significa que você pode usar a variável de qualquer forma, sem checagem de tipo.
c) É como voltar ao JavaScript puro: flexível, mas perigoso, porque perde as garantias de tipagem.

function soma(a, b) {
  return a + b;
}
-> Aqui, a e b são implicitamente any. O compilador não reclama, mas você pode acabar passando valores errados


O que muda com noImplicitAny: true
a) O compilador gera erro se encontrar uma variável ou parâmetro sem tipo definido.
b) Isso força você a declarar os tipos, deixando o código mais seguro e claro.

function soma(a: number, b: number): number {
  return a + b;
}
-> Agora o compilador garante que a e b são números, e o retorno também.

Resumindo
Sem noImplicitAny (false)→ o TypeScript deixa passar variáveis sem tipo, viram any.
Com noImplicitAny (true)→ você é obrigado a declarar tipos, evitando que o TypeScript vire “JavaScript disfarçado”.
É uma das flags mais importantes para manter a tipagem forte e realmente aproveitar o TypeScript.



>> strictNullChecks :  O strictNullChecks no TypeScript obriga você a tratar null e undefined como tipos distintos, evitando 
 que eles sejam usados sem verificação e prevenindo erros em tempo de execução. Sem essa flag, o compilador permite que valores
nulos ou indefinidos sejam usados como se fossem válidos, o que gera bugs difíceis de detectar.

O que acontece sem strictNullChecks - Desativado(false):
a) null e undefined podem ser atribuídos a qualquer tipo. 
b) O compilador não reclama se você acessar propriedades de algo que pode ser null.
c) Isso gera erros em runtime, como Cannot read property 'x' of undefined.

function getUserName(user: { name: string } | null) {
  return user.name;  <- compila, mas quebra se user for null
}

O que muda com strictNullChecks: true:
a) null e undefined são tratados como tipos próprios. 
b) Se uma variável pode ser nula, você precisa declarar explicitamente (string | null).
c) O compilador exige que você trate esses casos antes de usar o valor.

function getUserName(user: { name: string } | null) {
  return user ? user.name : "anônimo";
}

// ou usando optional chaining
function getUserName(user: { name: string } | null) {
  return user?.name ?? "anônimo";
}

Resumindo
Sem strictNullChecks (false) → permissivo, mas arriscado.
Com strictNullChecks(true) → mais rigoroso, mas garante que você trate null e undefined corretamente.
É considerado uma das opções mais importantes para tornar o TypeScript “seguro” e robusto.
*/































