/** FETCH: O COMANDO PARA FALAR COM A INTERNET:
 * O que é o fetch?
 * O fetch é uma ferramenta nativa do JavaScript (uma "API do navegador" e também presente 
 * no Node.js moderno) usada para fazer requisições HTTP.
 * Em termos simples: é o comando que o seu código usa para ir até a internet buscar ou 
 * enviar dados de um servidor.
 * 
 * Por que ele é importante?
 * Antigamente, para carregar dados sem atualizar a página, o código era muito complexo. 
 * O fetch veio para simplificar isso  usando Promises. Quando você usa o fetch, ele sempre 
 * te devolve uma "promessa" de que, em algum momento, a resposta do servidor chegará.
 */

//Exemplo Prático: Buscando um endereço pelo CEP. Vamos usar uma API real (https://viacep.com.br/) 
// para você ver o fetch em ação com a estrutura que você já aprendeu:
//Acessando o webservice de CEP. Exemplo de consulta de CEP: viacep.com.br/ws/88090030/json/


async function buscarEndereco(cep) {
    try {
        // 1. O fetch vai até a URL e "bate na porta" do servidor
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // Aqui você pode ver o objeto de resposta completo, """"esta na ultima linha do codigo"""
        console.log('Resposta do servidor:', resposta); 
        /*
        [
        'Resposta do servidor:',
        {
            type: 'basic',
            url: 'https://viacep.com.br/ws/88032099/json/',
            redirected: false,
            status: 200,
            ok: true,
            statusText: 'OK',
            headers: {},
            body: { locked: false },
            bodyUsed: false
        }
        ]*/

        // 2. Verificamos se a conexão deu certo (status 200)
        if (!resposta.ok) { // Se a resposta não for "ok" (status diferente de 200-299), lançamos um erro
            throw new Error('Não foi possível conectar ao servidor');
        }

        // 3. O servidor responde em formato bruto; precisamos transformar em JSON (objeto JS)
        const dados = await resposta.json();

        // Aqui você pode ver o objeto completo retornado pela API
        console.log(dados); 
        
        if (dados.erro) {
            console.log('CEP não encontrado!');
        } else {
            console.log(`Cidade: ${dados.localidade} - ${dados.uf}`);
        }


    } catch (erro) {
        // Trata erros de rede (ex: internet caiu)
        console.error('Erro na requisição:', erro);
    }
}

//buscarEndereco('88032090'); // Meu endereço em Florianópolis
buscarEndereco('88032099');


/*
O que acontece aqui:
1. fetch(url): Inicia a busca. Enquanto o servidor não responde, o await segura a execução.
2. resposta.json(): O fetch não entrega os dados prontos de imediato. Ele entrega um objeto de resposta. Você precisa desse segundo await para "converter" o texto vindo do servidor em um objeto que o JavaScript entenda.
3. JSON: É o formato padrão de dados na web (parece muito com um objeto do próprio JS).

Diferença entre o seu código anterior e este:
No seu código anterior, você criou a Promise manualmente (new Promise).
Com o fetch, o próprio JavaScript já criou a Promise para você. Você só precisa "consumi-la".
Quer tentar rodar esse código no seu VS Code com o Quokka para ver os dados do endereço aparecendo 
na hora?



*/