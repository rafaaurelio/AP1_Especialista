// Sistema Especialista - O QUE JOGAR? projeto desenvolvido com a finalidade de encontrar um jogo ideal para se divertir com base nas perguntas.

//Base de conhecimento
let possiveisRespostas = [
    "Elden Ring ou Dark Souls",
    "The Last Of Us ou Horizon Zero Dawn",
    "Counter Strike ou Call Of Duty",
    "League of Legends ou Rocket League",
    "Minecraft ou 7 Days to Die",
    "Left 4 Dead ou Roblox",
];

// Array das possíveis perguntas
let arrayPerguntas = [
    {
        "id": "index",
        "pergunta": "Você pretende jogar sozinho? ",
        "sim": {"redireciona": "solo"},
        "nao": {"redireciona": "competitive"}
        
    },
    {
        "id": "solo",
        "pergunta": "Você quer uma experiência com história e progresso? ",
        "sim": {"redireciona": "soulslike"},
        "nao": {"redireciona": "competitive"}
    },
    {
        "id": "soulslike",
        "pergunta": "Gostaria de jogar um Soulslike? ",
        "sim": {"resposta": "Elden Ring ou Dark Souls" },
        "nao": {"resposta": "The Last Of Us ou Horizon Zero Dawn"}
    },

    {
        "id": "competitive",
        "pergunta": "Gostaria de jogar jogos competitivos? ",
        "sim": {"redireciona": "fps"},
        "nao": {"redireciona": "4fun"}
    },
    {
        "id": "fps",
        "pergunta": "Que tal jogar um fps/tático? ",
        "sim": {"resposta": "Counter Strike ou Call Of Duty"},
        "nao": {"resposta": "League of Legends ou Rocket League"}
    },
    {
        "id": "4fun",
        "pergunta": "Gostaria de jogar mundo Aberto? ",
        "sim": {"resposta": "Minecraft ou 7 Days to Die"},
        "nao": {"resposta": "Left 4 Dead ou Roblox"}
    },
];

// Função de leitura das respostas semelhante ao da aula
async function lerEntrada(mensagem) {
    process.stdout.write(mensagem);
    let buffer = "";
    const stdin = process.stdin;
    stdin.resume();
    stdin.setEncoding('utf8');
    
    return new Promise((resolve) => {
        stdin.on('data', function(data) {
            buffer += data;
            stdin.pause();
            resolve(buffer.trim());
        });
    });
}


// Apresentação do Projeto
console.log("\n///---///---///---///---///---///---///\n");
console.log("  SISTEMA ESPECIALISTA — O QUE JOGAR? ");
console.log("Encontre o jogo ideal para se divertir!");
console.log("\n///---///---///---///---///---///---///");



// Motor de inferência semelhante ao da aula com pequenos ajustes visuais
let descobriuAResposta = false;
let indicePergunta = "index";

while (descobriuAResposta == false){
    for (const pergunta of arrayPerguntas) {
        if(pergunta.id == indicePergunta){
            console.log("\n");
            console.log("(---- Digite 1 = sim | Digite 2 = não ----)");

            let resposta = await lerEntrada(pergunta.pergunta);

            if (resposta == 1 || resposta == "1" || resposta == "sim"){
                if('resposta' in pergunta.sim){
                    console.log("\n");
                    console.log("\nÓtima escolha! você pode jogar: " + pergunta.sim.resposta);
                    console.log("\n");
                    descobriuAResposta = true;
                }
                indicePergunta = pergunta.sim.redireciona;
            }else {
                if('resposta' in pergunta.nao){
                    console.log("\n");
                    console.log("\nÓtima escolha! você pode jogar: " + pergunta.nao.resposta);
                    console.log("\n");
                    descobriuAResposta = true;
                }
                indicePergunta = pergunta.nao.redireciona;
            }
        }
    }
}
