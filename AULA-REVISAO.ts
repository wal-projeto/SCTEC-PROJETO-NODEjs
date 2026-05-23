// Carro precisa ser azul E
// Carro precisa ser sedan
// E -> &&
// OU -> ||
// NOT -> !

// O que o computador entende:
// TEXTO -> String -> "" OU '' OU ``
// NUMEROS -> number -> 1 ou 2 ... 2.50
// BOOLEANO -> boolean -> TRUE OU FALSE = 1 OU 0

// ONDE guardar a informação -> Qual variável
// COMO representar a informação

// let carro = {
//
//     cor: "vermelho",
//     tipo: "sedan"
// }

// COMO
type Carro = {
  cor: string;
  tipo: string;
};

// ONDE
const carros: Carro[] = [
  {
    cor: "azul",
    tipo: "sedan",
  },
  {
    cor: "vermelho",
    tipo: "sedan",
  },
  {
    cor: "azul",
    tipo: "hatch",
  },
  {
    cor: "vermelho",
    tipo: "SUV",
  },
];

function validaCarroConjuncao(carro: Carro) {
  // COMO comparar
  // carro.cor === "azul" -> 1 ou 0
  //            0         &&              1
  if (carro.cor === "azul" && carro.tipo === "sedan") {
    console.log(`O carro de cor ${carro.cor} e tipo ${carro.tipo} é válido!`);
  } else {
    console.log(`O carro de cor ${carro.cor} e tipo ${carro.tipo} é inválido!`);
  }
}

function validaCarroDisjuncao(carro: Carro) {
  if (carro.cor === "azul" || carro.tipo === "sedan") {
    console.log(`O carro de cor ${carro.cor} e tipo ${carro.tipo} é válido!`);
  } else {
    console.log(`O carro de cor ${carro.cor} e tipo ${carro.tipo} é inválido!`);
  }
}

// loop -> FOR -> WHILE -> DO/while ->

for (let index = 0; index < carros.length; index++) {
  console.log(index);
  const element = carros[index];

  validaCarroConjuncao(element);
  validaCarroDisjuncao(element);
}
