// variáveis globais usadas durante todo o código
let dia = 1
let bateriaTotal = 100
let oxigenTotal = 100
let pesquisaTotal = 0
let saudeTripulacao = 100
let missaoAtual = null;
let missoesFixasAtuais = [];
let fixasFeitas = [false, false];
let sorteadaFeita = false;
let indiceFixaAtual = null;

// altera os cenários a cada dia que passa
const cenarios = [
    { fase: "Cena 1",         fundo: "url('cenarios/dia1.png')" }, // dia 1
    { fase: "Cena 2",         fundo: "url('cenarios/dia2.png')"  }, // dia 2
    { fase: "Cena 3",         fundo: "url('cenarios/dia3.png')"  }, // dia 3
    { fase: "Cena 4",         fundo: "url('cenarios/dia4.png')" }, // dia 4
    { fase: "Cena 5",         fundo: "url('cenarios/dia5.png')"  }, // dia 5
    { fase: "Cena 6",         fundo: "url('cenarios/dia6.png')"  }, // dia 6
    { fase: "Cena 7",         fundo: "url('cenarios/dia7.png')"  }, // dia 7
    { fase: "Cena 8",         fundo: "url('cenarios/dia8.png')"  }, // dia 8
    { fase: "Cena 9",         fundo: "url('cenarios/dia9.png')"  }, // dia 9
    { fase: "Cena 10",        fundo: "url('cenarios/dia10.png')"  }  // dia 10
];

//atualiza para que o cenário seja de fato alterado
function atualizarCenario() {
    let posicao = Math.min(dia, cenarios.length) - 1;
    document.body.style.backgroundImage = cenarios[posicao].fundo;
}

// atualiza as informações/variáveis no "painel" diariamente
function atualizarPainel() {
    document.getElementById("pesquisaNave").innerHTML = "Pesquisa da Nave: " + pesquisaTotal
    document.getElementById("saudeTripulacao").innerHTML = "Saúde da Tripulação: " + saudeTripulacao
    document.getElementById("bateriaNave").innerHTML = "Energia da Nave: " + bateriaTotal
    document.getElementById("oxigenNave").innerHTML = "Oxigênio da Nave: " + oxigenTotal
    document.getElementById("diasPassados").innerHTML = "Dias Passados: " + dia

    atualizarCenario();
}

// quando o botao "start" é clicado, começa o jogo de fato
function startGame() {
    document.getElementById("telaMenu").classList.add("escondido");
    document.getElementById("telaJogo").classList.remove("escondido");
}

// verificação do estado das variáveis para mante-las entre 0 e 100
function verificar() {
    if (bateriaTotal > 100) bateriaTotal = 100;
    if (bateriaTotal < 0) bateriaTotal = 0;

    if (oxigenTotal > 100) oxigenTotal = 100;
    if (oxigenTotal < 0) oxigenTotal = 0;

    if (saudeTripulacao > 100) saudeTripulacao = 100;
    if (saudeTripulacao < 0) saudeTripulacao = 0;

    if (pesquisaTotal > 100) pesquisaTotal = 100;
    if (pesquisaTotal < 0) pesquisaTotal = 0;
}

// missões fixas que alteram diariamente
function missoesFixas() {
    if (dia === 1) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Calibração do Sistema de Suporte de Vida (ECLSS)",
                descricao: "O ECLSS (Environmental Control and Life Support System) é o sistema responsável por purificar o ar, reciclar água e manter a pressão e temperatura ideais na cabine da espaçonave.",
                opcaoATexto: "Reparo Completo (-15 Energia, +5 Saúde)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 5 },
                opcaoBTexto: "Modo Econômico (0 Energia, -10 Saúde)",
                acaoB: { bateriaTotal: 0, saudeTripulacao: -10 },
                fonte: "NASA – Artemis II Life Support Systems Overview / OSDR (Open Science Data Repository)."
            },
            {
                id: "fixa2",
                titulo: "Checagem de Radiação dos Painéis",
                descricao: " Monitorar os níveis de radiação ionizante no espaço profundo através da dosimetria dos astronautas para evitar danos celulares causados por raios cósmicos.",
                opcaoATexto: "Ativar Escudo Máximo (-20 Energia, +10 Saúde)",
                acaoA: { bateriaTotal: -20, saudeTripulacao: 10 },
                opcaoBTexto: "Apenas Monitorar (0 Energia, +15 Pesquisa)",
                acaoB: {pesquisaTotal: 15 },
                fonte: "Space Radiation Analysis Group (SRAG) e dados do OSDR."
            }
        ];
    } 
    else if (dia === 2) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Alinhamento da Trajetória de Retorno",
                descricao: "O traçado gravitacional de retorno livre usa a gravidade da Lua para puxar a cápsula de volta à Terra automaticamente em caso de falha nos motores principais.",
                opcaoATexto: "Correção Precisa (-10 Energia, +10 Pesquisa)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 10 },
                opcaoBTexto: "Aguardar Próxima Órbita (-5 Oxigênio, -5 Saúde)",
                acaoB: { oxigenTotal: -5, saudeTripulacao: -5 },
                fonte: "NASA – Artemis II Mission Trajectory Design."
            },
            {
                id: "fixa2",
                titulo: "Verificação dos Escudos Térmicos",
                descricao: "Inspecionar a integridade da proteção térmica da cápsula Orion, essencial para suportar temperaturas extremas ao reentrar na atmosfera terrestre.",
                opcaoATexto: "Varredura Profunda (-15 Energia, +5 Pesquisa)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 5 },
                opcaoBTexto: "Checagem Visual Rápida (0 Recursos)",
                acaoB: {},
                fonte: "NASA – Orion Heat Shield Engineering Reports."
            }
        ];
    } else if (dia === 3) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Relatório de Comunicação com o DSN",
                descricao: "O DSN (Deep Space Network) é a rede internacional de antenas de rádio da NASA que comunica com naves no espaço profundo.",
                opcaoATexto: "Transmissão Completa (-15 Energia, +10 Pesquisa)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 10 },
                opcaoBTexto: "Transmissão Básica (-5 Energia, +5 Pesquisa)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – Deep Space Network (DSN) Mission Operations."
            },
            {
                id: "fixa2",
                titulo: "Teste de Redundância das Baterias Principais",
                descricao: "Checar as células de íon-lítio que fornecem energia de backup para sistemas críticos de navegação e suporte vital.",
                opcaoATexto: "Recarga Total (-10 Oxigênio, +15 Energia)",
                acaoA: { oxigenTotal: -10, bateriaTotal: 15 },
                opcaoBTexto: "Usar Carga Parcial (0 Recursos)",
                acaoB: {},
                fonte: "NASA – Orion Power Systems Specifications."
            }
        ];
    }
}

let missaoSelecionada = null;

// abre e mostra de fatp a missão fixa diária
function abrirMissaoFixa(index) {
    if (fixasFeitas[index]) return;
    indiceFixaAtual = index;
    missaoSelecionada = missoesFixasAtuais[index];
    document.getElementById("missao1").classList.add("escondido");
    document.getElementById("missao2").classList.add("escondido");

    document.getElementById("detalheMissao").innerHTML = `
        <h4>${missaoSelecionada.titulo}</h4>
        <p>${missaoSelecionada.descricao}</p>
        <button class="botaoMissao" onclick="escolherOpcaoFixa('A')">${missaoSelecionada.opcaoATexto}</button>
        <button class="botaoMissao" onclick="escolherOpcaoFixa('B')">${missaoSelecionada.opcaoBTexto}</button>
        <small>Fonte: ${missaoSelecionada.fonte}</small>
    `;
}

// faz com que a ação escolhida na missão aconteça
function escolherOpcaoFixa(opcao) {
    if (!missaoSelecionada) return;
    let acoes = (opcao === 'A') ? missaoSelecionada.acaoA : missaoSelecionada.acaoB;

    if (acoes.bateriaTotal) bateriaTotal += acoes.bateriaTotal;
    if (acoes.oxigenTotal) oxigenTotal += acoes.oxigenTotal;
    if (acoes.saudeTripulacao) saudeTripulacao += acoes.saudeTripulacao;
    if (acoes.pesquisaTotal) pesquisaTotal += acoes.pesquisaTotal;

    verificar();
    atualizarPainel();

    fixasFeitas[indiceFixaAtual] = true;
    missaoSelecionada = null;
    indiceFixaAtual = null;

    document.getElementById("detalheMissao").innerHTML = "Missão realizada!";
    atualizarBotoesMissoes();
    verificarDia();

    alert("Missão concluída com sucesso!");
}

// missão sorteada/aleatória que o jogador tem que cumprir 1 por dia
function sortearMissao() {
    if (sorteadaFeita || missaoAtual !== null) return;

    let missoesA = [
        {
            titulo: "Alerta de Ejeção de Massa Coronal (CME - DONKI)",
            descricao: "O DONKI (Space Weather Database Of Notifications, Knowledge, Information) monitora tempestades solares e emissões de plasma do Sol que geram radiação perigosa.",
            opcaoATexto: "Blindagem Total <strong>(-25 Energia, +15 Saúde)</strong>",
            acaoA: { bateriaTotal: -25, saudeTripulacao: 15, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "Apostar na Sorte <strong>(0 Energia, -30 Saúde)</strong>",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -30, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – DONKI"
        },
        {
            titulo: "Queda de Energia na Sombra Lunar",
            descricao: "Momento em que a Lua bloqueia a luz solar direta, reduzindo drasticamente a captação dos painéis fotovoltaicos.",
            opcaoATexto: "Ligar Gerador Auxiliar <strong>(-20 Oxigênio, +15 Energia)</strong>",
            acaoA: { bateriaTotal: 15, saudeTripulacao: 0, oxigenTotal: -20, pesquisaTotal: 0 },
            opcaoBTexto: "Economizar ao Máximo <strong>(0 Energia, -15 Saúde)</strong>",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -15, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Lunar Orbital Mechanics"
        }
    ];

    let indice = Math.floor(Math.random() * missoesA.length);
    missaoAtual = missoesA[indice];
    let textoHTML = `
        <strong>${missaoAtual.titulo}</strong><br>
        <em>O que é:</em> ${missaoAtual.descricao}<br><br>
        <strong>[A]</strong> ${missaoAtual.opcaoATexto}<br>
        <strong>[B]</strong> ${missaoAtual.opcaoBTexto}<br>
        <small>Fonte: ${missaoAtual.fonte}</small>
    `;
    document.getElementById("missaoSorteada").innerHTML = textoHTML;
    document.getElementById("botoesDecisao").classList.remove("escondido");
    document.getElementById("sortear").classList.add("escondido");
    }

    // escolhe de fato e executa a missao sortida
    function escolherSorteada(opcaoEscolhida) {
        let resultado = "";

        if (!missaoAtual || sorteadaFeita) return;

        let acoes = (opcaoEscolhida === 'A') ? missaoAtual.acaoA : missaoAtual.acaoB;

        bateriaTotal += acoes.bateriaTotal;
        saudeTripulacao += acoes.saudeTripulacao;
        oxigenTotal += acoes.oxigenTotal;
        pesquisaTotal += acoes.pesquisaTotal;

        verificar()
        atualizarPainel();

        sorteadaFeita = true;
        document.getElementById("missaoSorteada").innerHTML = "Missão concluída com sucesso!";
        document.getElementById("botoesDecisao").classList.add("escondido");
        atualizarBotoesMissoes();
        verificarDia();

        alert("Você escolheu a Opção " + opcaoEscolhida + "!");
    }

// faz os botoes das missões serem atualizados (sumirem e aparecerem)
function atualizarBotoesMissoes() {
    document.getElementById("missao1").classList.toggle("escondido", fixasFeitas[0]);
    document.getElementById("missao2").classList.toggle("escondido", fixasFeitas[1]);

    document.getElementById("sortear").classList.toggle("escondido", sorteadaFeita);
    document.getElementById("sortear").classList.toggle("escondido", sorteadaFeita || missaoAtual !== null);
}

// verificação se as missões foram cumpridas para a pasagem dos dias
function verificarDia() {
    if (fixasFeitas[0] && fixasFeitas[1] && sorteadaFeita) {
        document.getElementById("btnPassagemDias").classList.remove("escondido");
    }
}

//reinicia sa missões diariamente
function resetarMissoes() {
    fixasFeitas = [false, false];
    sorteadaFeita = false;
    missaoAtual = null;
    missaoSelecionada = null;
    indiceFixaAtual = null;

    document.getElementById("missaoSorteada").innerHTML = "";
    document.getElementById("detalheMissao").innerHTML = "";
    document.getElementById("botoesDecisao").classList.add("escondido");
    document.getElementById("btnPassagemDias").classList.add("escondido");
}

//botão para saída do jogo e retorno a tela inicial de menu
function sair() {
    let confirmar = prompt("Deseja sair do jogo? (Caso decida sair o seu progresso será perdido!) sim|não")
    if (confirmar === "sim") {
        recomecar()
    }
}

//quando o jogador perder e escolher recomaças o jogo, reincia as variáveis e missões
function recomecar() {
    dia = 1;
    bateriaTotal = 100;
    oxigenTotal = 100;
    pesquisaTotal = 0;
    saudeTripulacao = 100;

    resetarMissoes ();
    atualizarPainel();

    document.getElementById("telaPerdeu").classList.add("escondido");
    document.getElementById("telaVenceu").classList.add("escondido");
    document.getElementById("telaMissoes").classList.add("escondido");
    document.getElementById("telaJogo").classList.add("escondido");
    document.getElementById("telaMenu").classList.remove("escondido");
}

//controla a passagem dos dias apenas se as missões forem cumpridas e o jogador não tiver zerado nenhuma das variáveis
function passagemDias() {
    if (bateriaTotal > 0 && oxigenTotal > 0 && saudeTripulacao > 0) {
        bateriaTotal -= 5
        oxigenTotal -= 5
        saudeTripulacao -= 5
        pesquisaTotal += 5
        dia += 1
        resetarMissoes()
        verificar()
        atualizarPainel()
    } else {
        alert("A nave não tem energia ou oxigênio suficiente para passar o dia!")
        document.getElementById("telaJogo").classList.add("escondido");
        document.getElementById("telaMissoes").classList.add("escondido");
        document.getElementById("telaPerdeu").classList.remove("escondido");
    }
     if (dia > 10 && pesquisaTotal <= 45) {
        alert("Você completou os 10 dias de missão, porém fez poucas pesquisas! Pesquisas são fundamentais e o ponto principal de uma expedição como essa, atente-se da próxima vez!")
        document.getElementById("telaJogo").classList.add("escondido");
        document.getElementById("telaMissoes").classList.add("escondido");
        document.getElementById("telaVenceu").classList.remove("escondido");
    } else if (dia > 10) {
        alert("Você completou os 10 dias de missão! Parabéns!")
        document.getElementById("telaJogo").classList.add("escondido");
        document.getElementById("telaMissoes").classList.add("escondido");
        document.getElementById("telaVenceu").classList.remove("escondido");
    }
}

// exibe as missões fixas na tela
function missoes() {
    missoesFixas();
    document.getElementById("detalheMissao").innerHTML = "";
    document.getElementById("telaJogo").classList.add("escondido");
    document.getElementById("telaMissoes").classList.remove("escondido");
    atualizarBotoesMissoes();
}

//botao de voltar para a tela do jogo e sair das missões
function voltar() {
    missaoSelecionada = null;
    indiceFixaAtual = null;
    document.getElementById("detalheMissao").innerHTML = "";
    document.getElementById("telaMissoes").classList.add("escondido");
    document.getElementById("telaJogo").classList.remove("escondido");
}

atualizarPainel()