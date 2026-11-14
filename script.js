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
    document.getElementById("pesquisaNave").innerHTML = "Research Points: " + pesquisaTotal
    document.getElementById("saudeTripulacao").innerHTML = "Crew Health: " + saudeTripulacao
    document.getElementById("bateriaNave").innerHTML = "Spaceship Energy: " + bateriaTotal
    document.getElementById("oxigenNave").innerHTML = "Spaceship Oxygen: " + oxigenTotal
    document.getElementById("diasPassados").innerHTML = "Current Day: " + dia

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
                titulo: "Life Support System Calibration (ECLSS)",
                descricao: "The ECLSS (Environmental Control and Life Support System) is the system responsible for purifying the air, recycling water, and maintaining ideal cabin pressure and temperature inside the spacecraft.",
                opcaoATexto: "Full Repair (-15 Energy, +5 Health)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 5 },
                opcaoBTexto: "Economy Mode (0 Energy, -10 Health)",
                acaoB: { bateriaTotal: 0, saudeTripulacao: -10 },
                fonte: "NASA – Artemis II Life Support Systems Overview / OSDR (Open Science Data Repository)."
            },
            {
                id: "fixa2",
                titulo: "Solar Radiation Shield Check",
                descricao: "Monitor ionizing radiation levels in deep space through astronaut dosimetry to prevent cellular damage caused by cosmic rays.",
                opcaoATexto: "Activate Maximum Shielding (-20 Energy, +10 Health)",
                acaoA: { bateriaTotal: -20, saudeTripulacao: 10 },
                opcaoBTexto: "Monitor Only (0 Energy, +15 Research)",
                acaoB: {pesquisaTotal: 15 },
                fonte: "Space Radiation Analysis Group (SRAG) and OSDR data."
            }
        ];
    } 
    else if (dia === 2) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Return Trajectory Alignment",
                descricao: "The free-return gravitational trajectory uses the Moon's gravity to automatically pull the capsule back toward Earth in the event of a main engine failure.",
                opcaoATexto: "Precise Correction (-10 Energy, +10 Research)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 10 },
                opcaoBTexto: "Wait for the Next Orbit (-5 Oxygen, -5 Health)",
                acaoB: { oxigenTotal: -5, saudeTripulacao: -5 },
                fonte: "NASA – Artemis II Mission Trajectory Design."
            },
            {
                id: "fixa2",
                titulo: "Heat Shield Inspection",
                descricao: "Inspect the integrity of the Orion capsule's thermal protection system, which is essential for withstanding extreme temperatures during atmospheric reentry.",
                opcaoATexto: "Deep Scan (-15 Energy, +5 Research)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 5 },
                opcaoBTexto: "Quick Visual Check (0 Resources)",
                acaoB: {},
                fonte: "NASA – Orion Heat Shield Engineering Reports."
            }
        ];
    } else if (dia === 3) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "DSN Communication Report",
                descricao: "The DSN (Deep Space Network) is NASA's international network of radio antennas that communicates with spacecraft in deep space.",
                opcaoATexto: "Full Transmission (-15 Energy, +10 Research)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 10 },
                opcaoBTexto: "Basic Transmission (-5 Energy, +5 Research)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – Deep Space Network (DSN) Mission Operations."
            },
            {
                id: "fixa2",
                titulo: "Main Battery Redundancy Test",
                descricao: "Check the lithium-ion cells that provide backup power for critical navigation and life support systems.",
                opcaoATexto: "Full Recharge (-10 Oxygen, +15 Energy)",
                acaoA: { oxigenTotal: -10, bateriaTotal: 15 },
                opcaoBTexto: "Use Partial Charge (0 Resources)",
                acaoB: {},
                fonte: "NASA – Orion Power Systems Specifications."
            }
        ];
    } else if (dia === 4) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Biological Sample Analysis (OSDR)",
                descricao: "The OSDR (Open Science Data Repository) stores biological research data on how the human body and microorganisms react to microgravity.",
                opcaoATexto: "Detailed Study (-10 Energy, +25 Research)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 25 },
                opcaoBTexto: "Discard Sample (0 Energy, 0 Resources)",
                acaoB: {},
                fonte: "NASA – Open Science Data Repository (OSDR)."
            },
            {
                id: "fixa2",
                titulo: "Cabin Water Recycling",
                descricao: "A reverse osmosis and catalytic oxidation filtration process that turns moisture from the air and sweat into drinking water.",
                opcaoATexto: "Advanced Purification (-10 Energy, +10 Health)",
                acaoA: { bateriaTotal: -10, saudeTripulacao: 10 },
                opcaoBTexto: "Use Emergency Reserves (-15 Oxygen, 0 Energy)",
                acaoB: { oxigenTotal: -15 },
                fonte: "NASA – Water Recovery System (WRS) Technical Brief."
            }
        ];
    } else if (dia === 5) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Module Leak Inspection",
                descricao: "Continuous internal pressure monitoring to detect microcracks caused by thermal variations and micrometeorites.",
                opcaoATexto: "Reinforced Sealing (-15 Energy, +10 Health)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "Ignore Minor Warning (0 Energy, -15 Health)",
                acaoB: { saudeTripulacao: -15 },
                fonte: "NASA – Cabin Pressure and Leak Detection Protocols."
            },
            {
                id: "fixa2",
                titulo: "Navigation Software Update",
                descricao: "Code packages sent from Houston to optimize the onboard computers and autonomous guidance system.",
                opcaoATexto: "Download Full Package (-20 Energy, +15 Research)",
                acaoA: { bateriaTotal: -20, pesquisaTotal: 15 },
                opcaoBTexto: "Bug Fixes Only (-5 Energy, +5 Research)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – Flight Software Engineering Standards."
            }
        ];
    } else if (dia === 6) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Micrometeorite Scan",
                descricao: "Use short-range radar to detect space debris and high-speed dust along the spacecraft's route.",
                opcaoATexto: "Evasive Maneuver (-15 Energy, +10 Health)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "Maintain Course (0 Energy, -10 Health)",
                acaoB: { saudeTripulacao: -10 },
                fonte: "NASA – Orbital Debris Program Office."
            },
            {
                id: "fixa2",
                titulo: "RCS Thruster Ignition Test",
                descricao: "The RCS (Reaction Control System) uses small maneuvering thrusters to orient and stabilize the capsule in the vacuum of space.",
                opcaoATexto: "Full Test (-20 Energy, +10 Research)",
                acaoA: { bateriaTotal: -20, pesquisaTotal: 10 },
                opcaoBTexto: "Partial Test (-5 Energy, 0 Resources)",
                acaoB: { bateriaTotal: -5 },
                fonte: "NASA – Orion Reaction Control System Manual."
            }
        ];
    } else if (dia === 7) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Psychological Stress Report",
                descricao: "Behavioral and psychological monitoring of the crew, who have been isolated in deep space for several consecutive days.",
                opcaoATexto: "Crew Rest Session (-10 Oxygen, +20 Health)",
                acaoA: { oxigenTotal: -10, saudeTripulacao: 20 },
                opcaoBTexto: "Stay Focused on Work (0 Oxygen, +10 Research)",
                acaoB: { pesquisaTotal: 10 },
                fonte: "NASA – Behavioral Health and Performance (BHP) Guidelines."
            },
            {
                id: "fixa2",
                titulo: "Atomic Clock Synchronization",
                descricao: "Use extremely precise clocks based on atomic transitions to calculate ephemerides and trajectories in space.",
                opcaoATexto: "Fine Calibration (-10 Energy, +5 Research)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 5 },
                opcaoBTexto: "Use Standard Time (0 Energy, 0 Resources)",
                acaoB: {},
                fonte: "NASA – Deep Space Atomic Clock (DSAC) Project."
            }
        ];
    } else if (dia === 8) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Pressure Relief Valve Maintenance",
                descricao: "Mechanical safety valves that prevent excessive internal pressure from building up in the hatch and tanks.",
                opcaoATexto: "Complete Cleaning (-15 Energy, +10 Health)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "Postpone Maintenance (0 Energy, -5 Health)",
                acaoB: { saudeTripulacao: -5 },
                fonte: "NASA – Pressure Relief Mechanisms Engineering."
            },
            {
                id: "fixa2",
                titulo: "Computer Thermal Check",
                descricao: "Management of the heat generated by the spacecraft's central processors through liquid cooling loops.",
                opcaoATexto: "Restart with Cooling (-10 Energy, +5 Research)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 5 },
                opcaoBTexto: "Keep Running Hot (0 Energy, 0 Resources)",
                acaoB: {},
                fonte: "NASA – Avionics Thermal Control System."
            }
        ];
    } else if (dia === 9) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "Emergency Lighting Test",
                descricao: "Check the secondary lighting circuits powered by isolated electrical buses.",
                opcaoATexto: "Replace Bulbs (-5 Energy, +5 Health)",
                acaoA: { bateriaTotal: -5, saudeTripulacao: 5 },
                opcaoBTexto: "Save Battery Power (0 Energy, 0 Resources)",
                acaoB: {},
                fonte: "NASA – Emergency Lighting Systems Specification."
            },
            {
                id: "fixa2",
                titulo: "Liquid Hydrogen Monitoring",
                descricao: "Cryogenic control of fuel stored at temperatures close to absolute zero.",
                opcaoATexto: "Release Gas Pockets (-15 Energy, +10 Health)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "Leave It As It Is (-10 Energy)",
                acaoB: { bateriaTotal: -10 },
                fonte: "NASA – Cryogenic Propellant Storage Management."
            }
        ];
    } else if (dia === 10) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "External Camera Calibration",
                descricao: "Adjustment of high-resolution optical lenses used to record lunar geology and visual mission data.",
                opcaoATexto: "Capture High-Resolution Photos (-10 Energy, +20 Research)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 20 },
                opcaoBTexto: "Economy Mode (-5 Energy, +5 Research)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – Artemis Optical Navigation and Imagery."
            },
            {
                id: "fixa2",
                titulo: "Ration Audit (Food Supply)",
                descricao: "Calorie and nutritional monitoring of the crew's freeze-dried food packages.",
                opcaoATexto: "Full Nutritious Ration (-10 Oxygen, +15 Health)",
                acaoA: { oxigenTotal: -10, saudeTripulacao: 15 },
                opcaoBTexto: " ration Food (0 Oxygen, -10 Health)",
                acaoB: { saudeTripulacao: -10 },
                fonte: "NASA – Space Food Systems Laboratory Guidelines."
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
        <small>Font: ${missaoSelecionada.fonte}</small>
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

    document.getElementById("detalheMissao").innerHTML = "Mission Done!";
    atualizarBotoesMissoes();
    verificarDia();
}

// missão sorteada/aleatória que o jogador tem que cumprir 1 por dia
function sortearMissao() {
    if (sorteadaFeita || missaoAtual !== null) return;

    let missoesA = [
        {
            titulo: "Coronal Mass Ejection Alert (CME - DONKI)",
            descricao: "DONKI (Space Weather Database Of Notifications, Knowledge, Information) monitors solar storms and plasma emissions from the Sun that generate dangerous radiation.",
            opcaoATexto: "Full Shielding <strong>(-25 Energy, +15 Health)</strong>",
            acaoA: { bateriaTotal: -25, saudeTripulacao: 15, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "Take a Chance <strong>(0 Energy, -30 Health)</strong>",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -30, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – DONKI"
        },
        {
            titulo: "Power Loss in the Lunar Shadow",
            descricao: "A period when the Moon blocks direct sunlight, drastically reducing the energy collected by the photovoltaic panels.",
            opcaoATexto: "Activate Auxiliary Generator <strong>(-20 Oxygen, +15 Energy)</strong>",
            acaoA: { bateriaTotal: 15, saudeTripulacao: 0, oxigenTotal: -20, pesquisaTotal: 0 },
            opcaoBTexto: "Maximum Energy Conservation <strong>(0 Energy, -15 Health)</strong>",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -15, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Lunar Orbital Mechanics"
        },
        {
            titulo: "EVA Suit Pressure Fluctuation",
            descricao: "An EVA (Extravehicular Activity) is any activity performed outside the spacecraft; pressure failures in the suit put the astronaut at risk of hypoxia.",
            opcaoATexto: "Emergency Repair (-15 Energy, +10 Health)",
            acaoA: { bateriaTotal: -15, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "Manually Adjust Valve (-5 Oxygen, -10 Health)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -10, oxigenTotal: -5, pesquisaTotal: 0 },
            fonte: "NASA – Extravehicular Mobility Unit (EMU) Safety Protocols."
        },
        {
            titulo: "Minor Micrometeorite Impact",
            descricao: "A small rocky fragment from space colliding with the spacecraft's structure at extremely high speed.",
            opcaoATexto: "Seal with Resin (-10 Energy, +5 Health)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 5, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "Leave a Minor Leak (-15 Oxygen, 0 Energy)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: -15, pesquisaTotal: 0 },
            fonte: "NASA – Hypervelocity Impact Technology (HVIT)."
        },
        {
            titulo: "False Fire Alarm",
            descricao: "Accidental activation of optical smoke sensors due to dust particles suspended in zero gravity.",
            opcaoATexto: "Emergency Forced Ventilation (-15 Oxygen, +5 Health)",
            acaoA: { bateriaTotal: 0, saudeTripulacao: 5, oxigenTotal: -15, pesquisaTotal: 0 },
            opcaoBTexto: "Disable Alarm (0 Resources)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Spacecraft Fire Safety Demonstration (Saffire)."
        },
        {
            titulo: "Cosmic Data Opportunity (GCR)",
            descricao: "GCRs (Galactic Cosmic Rays) are high-energy particles originating from outside the Solar System that bombard deep space.",
            opcaoATexto: "Collect Extensive Data (-20 Energy, +35 Research)",
            acaoA: { bateriaTotal: -20, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 35 },
            opcaoBTexto: "Decline to Protect the Crew (0 Energy, +10 Health)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Galactic Cosmic Ray Measurements and Shielding."
        },
        {
            titulo: "Video Link Failure with Houston",
            descricao: "Temporary loss of satellite broadband communication, requiring the use of alternative text-based frequencies.",
            opcaoATexto: "Restart Main Antenna (-15 Energy, +10 Research)",
            acaoA: { bateriaTotal: -15, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 10 },
            opcaoBTexto: "Use Text Channel (-5 Energy, 0 Resources)",
            acaoB: { bateriaTotal: -5, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Spacecraft Communications and Navigation (SCaN)."
        },
        {
            titulo: "Overheating in the X-Band Module",
            descricao: "The X-Band is a radio frequency range used to transmit large volumes of scientific data to Earth, generating significant heat.",
            opcaoATexto: "Shut Down Secondary Systems (-10 Energy, +5 Research)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 5 },
            opcaoBTexto: "Force Cryogenic Cooling (-20 Energy, +10 Health)",
            acaoB: { bateriaTotal: -20, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Deep Space Communications Radio Systems."
        },
        {
            titulo: "Gravitational Course Deviation",
            descricao: "A subtle trajectory change caused by local gravitational anomalies when passing near celestial bodies.",
            opcaoATexto: "Extra Propulsion Burn (-30 Energy, +15 Research)",
            acaoA: { bateriaTotal: -30, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 15 },
            opcaoBTexto: "Slow Adjustment Using Inertia (-10 Oxygen, 0 Energy)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: -10, pesquisaTotal: 0 },
            fonte: "NASA – Orbital Mechanics and Perturbation Analysis."
        },
        {
            titulo: "Waste Line Freezing",
            descricao: "Blockage of disposal pipes due to the extreme temperature difference between the side exposed to sunlight and the side in shadow.",
            opcaoATexto: "Electric Heating (-15 Energy, +5 Health)",
            acaoA: { bateriaTotal: -15, saudeTripulacao: 5, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "Manual Thawing (-5 Oxygen, 0 Energy)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: -5, pesquisaTotal: 0 },
            fonte: "NASA – Environmental Control Thermal Analysis."
        },
        {
            titulo: "Surprise Solar Efficiency Boost!",
            descricao: "Fluctuations in solar winds temporarily increase the energy generated by the Orion's photovoltaic panels.",
            opcaoATexto: "Store Energy in Batteries (+25 Energy, 0 Wear)",
            acaoA: { bateriaTotal: 25, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "Redirect Energy to Research (+15 Energy, +20 Research)",
            acaoB: { bateriaTotal: 15, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 20 },
            fonte: "NASA – Solar Array Performance Reports."
        },
        {
            titulo: "Structural Noise Alert in the Stern",
            descricao: "Metallic sounds caused by the rapid thermal expansion and contraction of the spacecraft's structural materials.",
            opcaoATexto: "Robotic Camera Inspection (-10 Energy, +10 Research)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 10 },
            opcaoBTexto: "Ignore Thermal Noise (0 Resources, -10 Health)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – Spacecraft Structural Dynamics and Acoustics."
        }
    ];

    let indice = Math.floor(Math.random() * missoesA.length);
    missaoAtual = missoesA[indice];
    let textoHTML = `
        <strong>${missaoAtual.titulo}</strong><br>
        <em>What it is:</em> ${missaoAtual.descricao}<br><br>
        <strong>[A]</strong> ${missaoAtual.opcaoATexto}<br>
        <strong>[B]</strong> ${missaoAtual.opcaoBTexto}<br>
        <small>Font: ${missaoAtual.fonte}</small>
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
        document.getElementById("missaoSorteada").innerHTML = "Mission Accomplished Successfully!";
        document.getElementById("botoesDecisao").classList.add("escondido");
        atualizarBotoesMissoes();
        verificarDia();
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
        recomecar()
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
        if (bateriaTotal = 0) {
            alert("The spaceship doesn't have enough energy to pass the day")
        } else if (oxigenTotal = 0) {
            alert("The spaceship ran out of oxygen")
        } else {
            alert("The crew is all sick!")
        }
        document.getElementById("telaJogo").classList.add("escondido");
        document.getElementById("telaMissoes").classList.add("escondido");
        document.getElementById("telaPerdeu").classList.remove("escondido");
        return;
    }
    
    if (dia > 10) {
        if (pesquisaTotal <= 45) {
            alert("You survived the 10 days, but you've done too little researches. Researches are the primary focus of a mission like this, so research more on next.")
        } else {
            alert("Congratulations! You survived the 10 days and did a lot of research!")
        }
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