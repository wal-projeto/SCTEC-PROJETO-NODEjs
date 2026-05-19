// Funcionario é a classe base - classe pai
class Funcionario {
  constructor(nome, matricula, salarioBase) {
    this.nome = nome;
    this.matricula = matricula;
    this.salarioBase = salarioBase;
  }

  calcularSalario() {
    return this.salarioBase;
  }
}


// Gerente herda de Funcionario - herança
class Gerente extends Funcionario {
  constructor(nome, matricula, salarioBase, bonus) {
    super(nome, matricula, salarioBase);
    this.bonus = bonus;
  }

  calcularSalario() {
    return this.salarioBase + this.bonus;
  }
}


// Desenvolvedor herda de Funcionario - herança
class Desenvolvedor extends Funcionario {
  constructor(nome, matricula, salarioBase, horasExtras, valorHoraExtra) {
    super(nome, matricula, salarioBase);
    this.horasExtras = horasExtras;
    this.valorHoraExtra = valorHoraExtra;
  }

  calcularSalario() {
    return this.salarioBase + this.horasExtras * this.valorHoraExtra;
  }
}

// Função para executar o exemplo
function executar() {
  console.log('\n--- Exemplo: Polimorfismo (PraticAI do ebook) ---\n');

  const equipe = [
    new Gerente('Carla', 'G001', 8000, 2000),
    new Desenvolvedor('Diego', 'D001', 6000, 10, 80),
    new Funcionario('Elena', 'F001', 4500),
  ];

  let folhaTotal = 0;
  for (const funcionario of equipe) {
    const salario = funcionario.calcularSalario();
    folhaTotal += salario;
    console.log(
      `${funcionario.nome} (${funcionario.constructor.name}): R$ ${salario.toFixed(2)}`
    );
  }

  console.log(`\nFolha total (mesma chamada calcularSalario()): R$ ${folhaTotal.toFixed(2)}`);
}

// Exporta a função executar para ser usada em outros arquivos
module.exports = { executar };
