/**
 * Essa função é uma implementação manual de como 
 * o método .filter() funciona por baixo dos panos.
 *  Ela usa o conceito de Callback (passar uma 
 * função como argumento para outra).
 * 
 * 2. O passo a passo da lógica (O Loop)
 * A função começa a percorrer a lista [10, 23]:
 * A) Primeira volta (elemento = 10):
 * O código faz a pergunta: funcaoFiltradora(10)?
 * Traduzindo a regra: 10 % 2 === 0? Sim (True).
 * Ação: novaLista.push(10). Agora a novaLista tem [10].
 * B) Segunda volta (elemento = 23): 
 * O código faz a pergunta: funcaoFiltradora(23)?
 * Traduzindo a regra: 23 % 2 === 0? Não (False).
 * Ação: O if ignora esse elemento e não faz o .push().
 * 
 * 3. O ResultadoO loop termina, e a função executa o 
 * return novaLista. O console vai imprimir: [10].
 * 
 * Por que isso é poderoso?
 * A mágica aqui é que a função nossoFilter não sabe o que ela 
 * está filtrando. Ela é genérica. Se você mudar a linha do console
 * para:
 * nossoFilter([10, 23], elemento => elemento > 20)
 * Ela passaria a filtrar números maiores que 20, sem você 
 * precisar mexer em uma linha sequer da lógica do for.
 * 
 * Ficou claro como a funcaoFiltradora "decide" quem entra na 
 * lista nova? E como o nossoFilter é flexível para qualquer tipo 
 * de filtro, desde que você entregue a regra certa?
 * 
 */

const nossoFilter = (lista, funcaoFiltradora) => { 
	const novaLista = [];
	for (const elemento of lista) {
		if (funcaoFiltradora(elemento)) {
			novaLista.push(elemento);
		}
	}
	return novaLista;
}
/**
 * Vamos decompor a linha do console.log para ficar claro:
 1. Os argumentos passados:
 Você está chamando nossoFilter e entregando dois "ingredientes":
 A Lista: [10, 23] e 
 A Regra (funcaoFiltradora): (elemento) => elemento % 2 === 0 (uma função que retorna true se o número for par).
*/
console.log(nossoFilter([10,23], (elemento) => elemento % 2 === 0)); 

