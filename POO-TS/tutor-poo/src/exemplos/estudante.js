// Estudante é a classe - classe filha - herança
class Estudante {
  constructor(nome, matricula, curso) {
    this.nome = nome;
    this.matricula = matricula;
    this.curso = curso;
    this.disciplinas = [];
  }

  // Método para matricular um aluno em uma disciplina - encapsulamento
  matricular(disciplina) {
    this.disciplinas.push(disciplina);
    return `${this.nome} matriculado em ${disciplina}`;
  }

  // Método para consultar o histórico de um aluno - encapsulamento
  consultarHistorico() {
    return {
      estudante: this.nome,
      matricula: this.matricula,
      curso: this.curso,
      disciplinas: [...this.disciplinas],
    };
  }
}

// Função para executar o exemplo
function executar() {
  console.log('\n--- Exemplo: Estudante (objeto + classe + instância) ---\n');

  // Cria instâncias das classes
  const ana = new Estudante('Ana Silva', '2026001', 'Engenharia de Software');
  const bruno = new Estudante('Bruno Costa', '2026002', 'Engenharia de Software');

  // Exibe os resultados
  console.log(ana.matricular('POO'));
  console.log(ana.matricular('Banco de Dados'));
  console.log('\nInstância Ana:', ana.consultarHistorico());
  console.log('\nInstância Bruno (mesma classe, estado diferente):', bruno.consultarHistorico());
  console.log('\nMensagem entre objetos: Ana pede histórico →', JSON.stringify(ana.consultarHistorico(), null, 2));
}

// Exporta a função executar para ser usada em outros arquivos
module.exports = { executar };
