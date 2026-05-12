
// caso queira sem abstrações como o Array.prototype.push
const nossoFilterDois = (lista, funcaoFiltradora) => {
  const novaLista = [];
  let j = 0;
	for (let i = 0; i < lista.length; i++) {
		if (funcaoFiltradora(lista[i])) { // se true, adiciona na novaLista
			novaLista[j] = lista[i];
      j++
		}
	}
	return novaLista;
}
console.log(nossoFilterDois([10,23], (elemento) => elemento % 2 === 0));

/**
 * Este código faz exatamente a mesma coisa que o anterior, AULARepasso2.js,
 * (filtra números pares), mas a lógica de construção da lista mudou.
 *  Em vez de usar métodos prontos como o .push(), ele faz tudo 
 * "na mão" usando índices manuais.
 * 
 * Aqui está a análise detalhada da linha do console.log:
 * 
 * 1. As Variáveis de Controlei (Contador da Lista Original): 
 * Serve para percorrer cada posição do array [10, 23].
 * j (Contador da Nova Lista): Serve para controlar em qual 
 * posição da novaLista o próximo número aceito deve ser guardado. 
 * Ele só aumenta quando um número passa no teste.
 * 
 * 2. O Passo a Passo no Loop
 * A) Primeira volta (i = 0, elemento = 10):
 * Teste: funcaoFiltradora(10) (10 é par?). Resultado: Sim (True).
 * Ação: novaLista[j] = 10. Como j vale 0, o 10 é guardado na posição 0.
 * Incremento: O j++ faz o j passar a valer 1.
 * 
 * B)Segunda volta (i = 1, elemento = 23):
 * Teste: funcaoFiltradora(23) (23 é par?). Resultado: Não (False).
 * Ação: O bloco if é ignorado.
 * Pulo do Gato: O j continua valendo 1. Isso é importante porque, 
 * se o próximo número fosse par, ele ocuparia a vaga 1, 
 * sem deixar buracos na lista.
 * 
 * 3. O Resultado FinalA função retorna novaLista, que é [10].
 * 
 * Qual a diferença principal entre os dois códigos?
 * O primeiro (.push): É mais "moderno" (JavaScript de alto nível). 
 * Você não se preocupa com índices; apenas empurra o item para o 
 * final da fila.
 * O segundo (novaLista[j]): É uma lógica de "baixo nível", 
 * parecida com a linguagem C. É útil para entender como a memória 
 * é preenchida manualmente, mas é mais fácil de cometer 
 * erros (como esquecer de aumentar o j).
 * 
 * Percebeu como o j só "anda" quando o if é verdadeiro, enquanto 
 * o i anda sempre? Ficou clara essa separação dos dois contadores?
 * 
 */