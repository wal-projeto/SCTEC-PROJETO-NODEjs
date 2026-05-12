// JSON

let pessoa = {
    nome: "João",
    profissao: "Engenheiro",
    hobbies: ["leitura", "ciclismo", "fotografia"]
  }

function jsonStringfy(pessoa){
    let str = ""
    str += "{"
    // 1. Usamos o Object.entries para criar um array de strings formatadas
    Object.entries(pessoa).forEach(([chave, valor]) => { // 
        if(chave && valor){
            str += `"${chave}": "${valor}",`  // Aqui ele ainda coloca a vírgula em todos
        } 
    })
    //Remove a ÚLTIMA vírgula antes de fechar
    if (str.length > 1) { 
        str = str.slice(0, -1);  // o slice remove o último caractere da string que no caso é a vírgula
    }

    str +='}'
    return str
 }
 
 // Usando a função jsonStringfy para converter o objeto em uma string JSON - CRIAMOS NA MÃO A FUNÇÃO JSON.stringify:
  const jsonString = jsonStringfy(pessoa);
  console.log(jsonString); 
 
  // Usando JSON.stringify para converter o objeto em uma string JSON
  console.log(JSON.stringify(pessoa));

  console.log(JSON.parse(jsonString));
