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
let acaoPendente = null;
let origemPendente = null; 

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
                titulo: "CHECKING THE AIR AND WATER SYSTEM (ECLSS)",
                descricao: "THE ECLSS IS THE SYSTEM THAT KEEPS ASTRONAUTS ALIVE. IT CLEANS THE AIR, RECYCLES WATER, AND KEEPS THE SPACESHIP AT A GOOD TEMPERATURE AND AIR PRESSURE.",
                opcaoATexto: "FIX EVERYTHING (-15 ENERGY, +5 HEALTH)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 5 },
                opcaoBTexto: "SAVE ENERGY MODE (0 ENERGY, -10 HEALTH)",
                acaoB: { bateriaTotal: 0, saudeTripulacao: -10 },
                fonte: "NASA – ARTEMIS II LIFE SUPPORT SYSTEMS OVERVIEW / OSDR (OPEN SCIENCE DATA REPOSITORY)."
            },
            {
                id: "fixa2",
                titulo: "SUN RAYS SHIELD CHECK",
                descricao: "WATCH THE DANGEROUS RAYS IN DEEP SPACE USING SPECIAL METERS WORN BY ASTRONAUTS. THIS HELPS PROTECT THE BODY FROM SPACE RAYS.",
                opcaoATexto: "TURN ON THE SHIELD (-20 ENERGY, +10 HEALTH)",
                acaoA: { bateriaTotal: -20, saudeTripulacao: 10 },
                opcaoBTexto: "ONLY WATCH THE RAYS (0 ENERGY, +15 RESEARCH)",
                acaoB: {pesquisaTotal: 15 },
                fonte: "SPACE RADIATION ANALYSIS GROUP (SRAG) AND OSDR DATA."
            }
        ];
    } 
    else if (dia === 2) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "FIXING THE WAY BACK HOME",
                descricao: "THE MOON'S GRAVITY CAN GENTLY PULL THE CAPSULE BACK TOWARD EARTH, EVEN IF THE MAIN ENGINE STOPS WORKING.",
                opcaoATexto: "CAREFUL FIX (-10 ENERGY, +10 RESEARCH)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 10 },
                opcaoBTexto: "WAIT FOR THE NEXT LOOP AROUND (-5 OXYGEN, -5 HEALTH)",
                acaoB: { oxigenTotal: -5, saudeTripulacao: -5 },
                fonte: "NASA – ARTEMIS II MISSION TRAJECTORY DESIGN."
            },
            {
                id: "fixa2",
                titulo: "HEAT SHIELD CHECK",
                descricao: "CHECK THE SPECIAL SHIELD ON THE ORION CAPSULE. IT PROTECTS THE SHIP FROM SUPER HOT TEMPERATURES WHEN IT COMES BACK INTO EARTH'S AIR.",
                opcaoATexto: "DEEP SCAN (-15 ENERGY, +5 RESEARCH)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 5 },
                opcaoBTexto: "QUICK LOOK WITH YOUR EYES (0 RESOURCES)",
                acaoB: {},
                fonte: "NASA – ORION HEAT SHIELD ENGINEERING REPORTS."
            }
        ];
    } else if (dia === 3) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "REPORT TO EARTH (DSN)",
                descricao: "THE DSN IS NASA'S WORLDWIDE GROUP OF BIG RADIO ANTENNAS. THEY TALK TO SPACESHIPS FAR AWAY IN DEEP SPACE.",
                opcaoATexto: "SEND EVERYTHING (-15 ENERGY, +10 RESEARCH)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 10 },
                opcaoBTexto: "SEND ONLY THE BASICS (-5 ENERGY, +5 RESEARCH)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – DEEP SPACE NETWORK (DSN) MISSION OPERATIONS."
            },
            {
                id: "fixa2",
                titulo: "MAIN BATTERY BACKUP TEST",
                descricao: "ORION'S BATTERIES STORE ELECTRICITY. THEY KEEP THE SPACESHIP RUNNING WHEN THE SOLAR PANELS CAN'T MAKE POWER.",
                opcaoATexto: "CHARGE IT ALL THE WAY (-10 OXYGEN, +15 ENERGY)",
                acaoA: { oxigenTotal: -10, bateriaTotal: 15 },
                opcaoBTexto: "CHARGE IT A LITTLE (0 RESOURCES)",
                acaoB: {},
                fonte: "NASA – ORION POWER SYSTEMS SPECIFICATIONS."
            }
        ];
    } else if (dia === 4) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "STUDYING LIVING SAMPLES (OSDR)",
                descricao: "THE OSDR IS A BIG LIBRARY OF SCIENCE DATA. IT SHOWS HOW THE HUMAN BODY AND TINY LIVING THINGS REACT WHEN THERE IS ALMOST NO GRAVITY.",
                opcaoATexto: "STUDY IT CLOSELY (-10 ENERGY, +25 RESEARCH)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 25 },
                opcaoBTexto: "THROW THE SAMPLE AWAY (0 ENERGY, 0 RESOURCES)",
                acaoB: {},
                fonte: "NASA – OPEN SCIENCE DATA REPOSITORY (OSDR)."
            },
            {
                id: "fixa2",
                titulo: "DRINKING WATER SUPPLY CHECK",
                descricao: "ORION CARRIES WATER IN SPECIAL TANKS. THE WATER IS USED FOR DRINKING, PREPARING FOOD, AND THE CREW'S NEEDS.",
                opcaoATexto: "CHECK AND ORGANIZE THE WATER SUPPLY (-10 ENERGY, +10 HEALTH)",
                acaoA: { bateriaTotal: -10, saudeTripulacao: 10 },
                opcaoBTexto: "SAVE WATER FOR LATER (0 ENERGY, -5 HEALTH)",
                acaoB: { saudeTripulacao: -5 },
                fonte: "NASA – ORION CREW SYSTEMS."
            }
        ];
    } else if (dia === 5) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "LOOKING FOR LEAKS IN THE MODULE",
                descricao: "THE SHIP'S AIR PRESSURE IS WATCHED ALL THE TIME TO FIND TINY CRACKS. THEY CAN BE CAUSED BY HEAT CHANGES AND TINY SPACE ROCKS.",
                opcaoATexto: "SEAL IT EXTRA STRONG (-15 ENERGY, +10 HEALTH)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "IGNORE THE SMALL WARNING (0 ENERGY, -15 HEALTH)",
                acaoB: { saudeTripulacao: -15 },
                fonte: "NASA – CABIN PRESSURE AND LEAK DETECTION PROTOCOLS."
            },
            {
                id: "fixa2",
                titulo: "CHECKING THE NAVIGATION SYSTEMS",
                descricao: "HOUSTON SENDS COMPUTER CODE TO THE SHIP. IT MAKES THE ONBOARD COMPUTERS AND THE SELF-STEERING SYSTEM WORK BETTER.",
                opcaoATexto: "DOWNLOAD THE WHOLE PACKAGE (-20 ENERGY, +15 RESEARCH)",
                acaoA: { bateriaTotal: -20, pesquisaTotal: 15 },
                opcaoBTexto: "ONLY FIX THE BUGS (-5 ENERGY, +5 RESEARCH)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – FLIGHT SOFTWARE ENGINEERING STANDARDS."
            }
        ];
    } else if (dia === 6) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "CHECKING THE SHIP'S STRUCTURAL INTEGRITY",
                descricao: "CHECK THE OUTSIDE AND THE FRAME OF THE SPACESHIP TO FIND POSSIBLE DAMAGE CAUSED BY THE SPACE ENVIRONMENT.",
                opcaoATexto: "PERFORM A DETAILED INSPECTION (-15 ENERGY, +10 HEALTH)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "PERFORM A BASIC INSPECTION (0 ENERGY, +5 RESEARCH)",
                acaoB: { pesquisaTotal: 5 },
                fonte: "NASA – ORION REFERENCE GUIDE."
            },
            {
                id: "fixa2",
                titulo: "SMALL THRUSTER TEST (RCS)",
                descricao: "THE RCS USES SMALL ROCKET PUSHERS TO TURN THE CAPSULE AND KEEP IT STEADY IN EMPTY SPACE.",
                opcaoATexto: "TEST EVERYTHING (-20 ENERGY, +10 RESEARCH)",
                acaoA: { bateriaTotal: -20, pesquisaTotal: 10 },
                opcaoBTexto: "TEST JUST A PART (-5 ENERGY, 0 RESOURCES)",
                acaoB: { bateriaTotal: -5 },
                fonte: "NASA – ORION REACTION CONTROL SYSTEM MANUAL."
            }
        ];
    } else if (dia === 7) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "CREW STRESS REPORT",
                descricao: "WATCHING HOW THE CREW FEELS AND ACTS. THEY HAVE BEEN FAR FROM HOME IN DEEP SPACE FOR MANY DAYS IN A ROW.",
                opcaoATexto: "TIME TO REST FOR THE CREW (-10 OXYGEN, +20 HEALTH)",
                acaoA: { oxigenTotal: -10, saudeTripulacao: 20 },
                opcaoBTexto: "KEEP WORKING HARD (0 OXYGEN, +10 RESEARCH)",
                acaoB: { pesquisaTotal: 10 },
                fonte: "NASA – BEHAVIORAL HEALTH AND PERFORMANCE (BHP) GUIDELINES."
            },
            {
                id: "fixa2",
                titulo: "CALIBRATING THE NAVIGATION SENSORS",
                descricao: "ORION USES SENSORS AND COMPUTERS TO DETERMINE ITS POSITION AND DIRECTION DURING THE JOURNEY THROUGH SPACE.",
                opcaoATexto: "FULL SENSOR CALIBRATION (-10 ENERGY, +10 RESEARCH)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 10 },
                opcaoBTexto: "BASIC SYSTEM CHECK (0 ENERGY, +5 RESEARCH)",
                acaoB: { pesquisaTotal: 5 },
                fonte: "NASA – ORION GUIDANCE, NAVIGATION AND CONTROL SYSTEMS."

            }
        ];
    } else if (dia === 8) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "CHECKING THE AIR PRESSURE CONTROL SYSTEM.",
                descricao: "SAFETY VALVES THAT LET OUT EXTRA AIR. THEY STOP THE PRESSURE FROM GETTING TOO HIGH INSIDE THE DOOR AND THE TANKS.",
                opcaoATexto: "CLEAN EVERYTHING (-15 ENERGY, +10 HEALTH)",
                acaoA: { bateriaTotal: -15, saudeTripulacao: 10 },
                opcaoBTexto: "DO THE REPAIR LATER (0 ENERGY, -5 HEALTH)",
                acaoB: { saudeTripulacao: -5 },
                fonte: "NASA – PRESSURE RELIEF MECHANISMS ENGINEERING."
            },
            {
                id: "fixa2",
                titulo: "COMPUTER HEAT CHECK",
                descricao: "THE SHIP'S MAIN COMPUTER BRAINS GET HOT. LOOPS OF COOLING LIQUID CARRY THE HEAT AWAY.",
                opcaoATexto: "RESTART WITH COOLING (-10 ENERGY, +5 RESEARCH)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 5 },
                opcaoBTexto: "KEEP RUNNING HOT (0 ENERGY, 0 RESOURCES)",
                acaoB: {},
                fonte: "NASA – AVIONICS THERMAL CONTROL SYSTEM."
            }
        ];
    } else if (dia === 9) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "EMERGENCY LIGHTS TEST",
                descricao: "CHECK THE BACKUP LIGHTS. THEY GET THEIR POWER FROM SEPARATE ELECTRIC LINES.",
                opcaoATexto: "CHANGE THE BULBS (-5 ENERGY, +5 HEALTH)",
                acaoA: { bateriaTotal: -5, saudeTripulacao: 5 },
                opcaoBTexto: "SAVE BATTERY POWER (0 ENERGY, 0 RESOURCES)",
                acaoB: {},
                fonte: "NASA – EMERGENCY LIGHTING SYSTEMS SPECIFICATION."
            },
            {
                id: "fixa2",
                titulo: "PROPELLANT TANK MONITORING",
                descricao: "ORION USES SPECIAL PROPELLANTS TO POWER ITS ENGINES. THEIR PRESSURE AND STORAGE CONDITIONS MUST BE MONITORED DURING THE MISSION.",
                opcaoATexto: "PERFORM A COMPLETE TANK CHECK (-15 ENERGY, +10 RESEARCH)",
                acaoA: { bateriaTotal: -15, pesquisaTotal: 10 },
                opcaoBTexto: "MONITOR THE PRESSURE LEVELS (-5 ENERGY, 0 RESOURCES)",
                acaoB: { bateriaTotal: -5 },
                fonte: "NASA – ARTEMIS II REFERENCE GUIDE."
            }
        ];
    } else if (dia === 10) {
        missoesFixasAtuais = [
            {
                id: "fixa1",
                titulo: "OUTSIDE CAMERA SETUP",
                descricao: "ADJUSTING THE SUPER SHARP CAMERA LENSES. THEY TAKE PICTURES OF THE MOON'S ROCKS AND OTHER MISSION VIEWS.",
                opcaoATexto: "TAKE SUPER SHARP PHOTOS (-10 ENERGY, +20 RESEARCH)",
                acaoA: { bateriaTotal: -10, pesquisaTotal: 20 },
                opcaoBTexto: "SAVE ENERGY MODE (-5 ENERGY, +5 RESEARCH)",
                acaoB: { bateriaTotal: -5, pesquisaTotal: 5 },
                fonte: "NASA – ARTEMIS OPTICAL NAVIGATION AND IMAGERY."
            },
            {
                id: "fixa2",
                titulo: "FOOD SUPPLY AND NUTRITION CHECK",
                descricao: "CHECKING THE CREW'S FOOD SUPPLY TO MAKE SURE THERE IS ENOUGH FOOD AND THAT THE MEALS PROVIDE THE NUTRIENTS NEEDED DURING THE MISSION.",
                opcaoATexto: "ORGANIZE THE FOOD SUPPLY (-10 ENERGY, +15 HEALTH)",
                acaoA: { bateriaTotal: -10, saudeTripulacao: 15 },
                opcaoBTexto: "PERFORM A BASIC FOOD INVENTORY (0 ENERGY, +5 RESEARCH)",
                acaoB: { pesquisaTotal: 5 },
                fonte: "NASA – SPACE FOOD SYSTEMS."
            }
        ];
    }
}

let missaoSelecionada = null;

// abre e mostra de fatp a missão fixa diária
function abrirMissaoFixa(index) {
    if (fixasFeitas[index]) return;
    esconderSorteadaPendente();
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
    iniciarMinigame(acoes, 'fixa');
}

// missão sorteada/aleatória que o jogador tem que cumprir 1 por dia
function sortearMissao() {
    if (sorteadaFeita || missaoAtual !== null) return;

    // fecha qualquer missão fixa que esteja aberta, para não ter duas ao mesmo tempo
    missaoSelecionada = null;
    indiceFixaAtual = null;
    document.getElementById("detalheMissao").innerHTML = "";

    document.getElementById("missao1").classList.add("escondido");
    document.getElementById("missao2").classList.add("escondido");

    let missoesA = [
        {
            titulo: "SUN STORM ALERT (CME - DONKI)",
            descricao: "DONKI IS A NASA TOOL THAT WATCHES THE SUN. SOMETIMES THE SUN THROWS OUT HUGE CLOUDS OF HOT GAS, CALLED SOLAR STORMS. THEY CAN SEND DANGEROUS RAYS TOWARD THE SPACESHIP.",
            opcaoATexto: "BUILD A SAFE SHELTER FROM THE RAYS <strong>(-25 ENERGY, +15 CREW HEALTH.)</strong>",
            acaoA: { bateriaTotal: -25, saudeTripulacao: 15, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "TAKE A CHANCE <strong>(0 ENERGY, -30 HEALTH)</strong>",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -30, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – DONKI"
        },
        {
            titulo: "LOSING POWER IN THE MOON'S SHADOW",
            descricao: "THIS HAPPENS WHEN THE SPACESHIP FLIES INTO THE SHADOW OF A MOON OR PLANET. THE SUNLIGHT IS BLOCKED, SO THE SOLAR PANELS MAKE LESS POWER. THE BATTERIES MUST HELP FOR A WHILE.",
            opcaoATexto: "TURN ON THE BACKUP GENERATOR <strong>(-20 OXYGEN, +15 ENERGY)</strong>",
            acaoA: { bateriaTotal: 15, saudeTripulacao: 0, oxigenTotal: -20, pesquisaTotal: 0 },
            opcaoBTexto: "SAVE AS MUCH ENERGY AS POSSIBLE <strong>(0 ENERGY, -15 HEALTH)</strong>",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -15, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – LUNAR ORBITAL MECHANICS"
        },
        {
            titulo: "CABIN AIR PRESSURE ALERT",
            descricao: "THE AIR PRESSURE INSIDE THE ORION CAPSULE DROPPED SUDDENLY. THIS CAN BE DANGEROUS FOR THE CREW. SPECIAL PRESSURE SUITS KEEP ASTRONAUTS SAFE IN EMERGENCIES.",
            opcaoATexto: "FIX IT FAST (-15 ENERGY, +10 HEALTH)",
            acaoA: { bateriaTotal: -15, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "TURN THE VALVE BY HAND (-5 OXYGEN, -10 HEALTH)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -10, oxigenTotal: -5, pesquisaTotal: 0 },
            fonte: "NASA – CREW SYSTEMS"
        },
        {
            titulo: "TINY SPACE ROCK HIT",
            descricao: "A TINY PIECE OF ROCK FROM SPACE HITS THE SPACESHIP SUPER FAST.",
            opcaoATexto: "SEAL THE HOLE WITH RESIN (-10 ENERGY, +5 HEALTH)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 5, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "LEAVE A SMALL LEAK (-15 OXYGEN, 0 ENERGY)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: -15, pesquisaTotal: 0 },
            fonte: "NASA – HYPERVELOCITY IMPACT TECHNOLOGY (HVIT)."
        },
        {
            titulo: "FALSE FIRE ALARM",
            descricao: "THE SMOKE ALARM WENT OFF BY MISTAKE. TINY DUST BITS FLOATING IN ZERO GRAVITY TRICKED THE SENSORS.",
            opcaoATexto: "BLOW FRESH AIR THROUGH THE CABIN (-15 OXYGEN, +5 HEALTH)",
            acaoA: { bateriaTotal: 0, saudeTripulacao: 5, oxigenTotal: -15, pesquisaTotal: 0 },
            opcaoBTexto: "TURN OFF THE ALARM AND CHECK IT (0 RESOURCES)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – SPACECRAFT FIRE SAFETY DEMONSTRATION (SAFFIRE)."
        },
        {
            titulo: "SPACE RAYS DATA CHANCE (GCR)",
            descricao: "GCRS (GALACTIC COSMIC RAYS) ARE SUPER FAST TINY PARTICLES. THEY COME FROM FAR OUTSIDE OUR SOLAR SYSTEM AND FLY ALL AROUND DEEP SPACE.",
            opcaoATexto: "COLLECT LOTS OF DATA (-20 ENERGY, +35 RESEARCH)",
            acaoA: { bateriaTotal: -20, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 35 },
            opcaoBTexto: "SAY NO TO KEEP THE CREW SAFE (0 ENERGY, +10 HEALTH)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – GALACTIC COSMIC RAY MEASUREMENTS AND SHIELDING."
        },
        {
            titulo: "VIDEO CALL BROKEN WITH HOUSTON",
            descricao: "THE RADIO LINK FOR VIDEO STOPPED WORKING FOR A WHILE. THE CREW MUST USE TEXT MESSAGES INSTEAD.",
            opcaoATexto: "RESTART THE MAIN ANTENNA (-15 ENERGY, +10 RESEARCH)",
            acaoA: { bateriaTotal: -15, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 10 },
            opcaoBTexto: "USE THE TEXT CHANNEL (-5 ENERGY, 0 RESOURCES)",
            acaoB: { bateriaTotal: -5, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – SPACECRAFT COMMUNICATIONS AND NAVIGATION (SCAN)."
        },
        {
            titulo: "THE X-BAND MACHINE IS TOO HOT",
            descricao: "THE X-BAND IS A RADIO SIGNAL USED TO SEND BIG SCIENCE FILES TO EARTH. SENDING SO MUCH DATA MAKES THE MACHINE VERY HOT.",
            opcaoATexto: "TURN OFF EXTRA SYSTEMS (-10 ENERGY, +5 RESEARCH)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 5 },
            opcaoBTexto: "USE SUPER COLD COOLING (-20 ENERGY, +10 HEALTH)",
            acaoB: { bateriaTotal: -20, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – DEEP SPACE COMMUNICATIONS RADIO SYSTEMS."
        },
        {
            titulo: "SPACESHIP PULLED OFF COURSE",
            descricao: "WHEN THE SPACESHIP FLIES NEAR A MOON OR PLANET, ITS GRAVITY CAN PULL IT A LITTLE OFF ITS PATH.",
            opcaoATexto: "FIRE THE ENGINES AGAIN (-30 ENERGY, +15 RESEARCH)",
            acaoA: { bateriaTotal: -30, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 15 },
            opcaoBTexto: "SLOWLY FIX THE PATH (-10 OXYGEN, 0 ENERGY)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: 0, oxigenTotal: -10, pesquisaTotal: 0 },
            fonte: "NASA – ORBITAL MECHANICS AND PERTURBATION ANALYSIS."
        },
        {
            titulo: "TROUBLE WITH THE TRASH SYSTEM",
            descricao: "THE SYSTEM THAT COLLECTS AND STORES TRASH IS BROKEN. THIS CAN MAKE THE CABIN DIRTY AND HARD TO LIVE IN.",
            opcaoATexto: "ISOLATE THE DAMAGED SYSTEM AND USE EMERGENCY STORAGE (-10 ENERGY, +5 HEALTH)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 5, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "MANUALLY ORGANIZE AND STORE THE WASTE (-5 ENERGY, +10 HEALTH)",
            acaoB: { bateriaTotal: -5, saudeTripulacao: 10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – ORION CREW SYSTEMS"
        },
        {
            titulo: "BEST DIRECTION FOR THE SOLAR PANELS",
            descricao: "THE SOLAR PANELS ON ORION CAN TURN TOWARD THE SUN. THE BETTER THEY FACE THE SUNLIGHT, THE MORE ELECTRICITY THEY MAKE.",
            opcaoATexto: "SAVE ENERGY IN THE BATTERIES (+25 ENERGY, 0 WEAR)",
            acaoA: { bateriaTotal: 25, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 0 },
            opcaoBTexto: "SEND ENERGY TO RESEARCH (+15 ENERGY, +20 RESEARCH)",
            acaoB: { bateriaTotal: 15, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 20 },
            fonte: "NASA – SOLAR ARRAY PERFORMANCE REPORTS."
        },
        {
            titulo: "STRANGE NOISE AT THE BACK OF THE SHIP",
            descricao: "THE SPACESHIP IS MAKING CREAKY SOUNDS. THEY MIGHT COME FROM HEAT CHANGES OR FROM PARTS MOVING.",
            opcaoATexto: "CHECK WITH A ROBOT CAMERA (-10 ENERGY, +10 RESEARCH)",
            acaoA: { bateriaTotal: -10, saudeTripulacao: 0, oxigenTotal: 0, pesquisaTotal: 10 },
            opcaoBTexto: "IGNORE THE HEAT NOISE (0 RESOURCES, -10 HEALTH)",
            acaoB: { bateriaTotal: 0, saudeTripulacao: -10, oxigenTotal: 0, pesquisaTotal: 0 },
            fonte: "NASA – SPACECRAFT STRUCTURAL DYNAMICS AND ACOUSTICS."
        }
    ];

    let indice = Math.floor(Math.random() * missoesA.length);
    missaoAtual = missoesA[indice];
    mostrarSorteadaPendente();
    document.getElementById("sortear").classList.add("escondido");
}

// a missão sorteada está esperando o jogador escolher A ou B?
function sorteadaPendente() {
    return missaoAtual !== null && !sorteadaFeita;
}

// mostra na tela a missão sorteada que ainda não foi resolvida
function mostrarSorteadaPendente() {
    if (!sorteadaPendente()) return;
    document.getElementById("missaoSorteada").innerHTML = `
        <strong>${missaoAtual.titulo}</strong><br>
        <em>What it is:</em> ${missaoAtual.descricao}<br><br>
        <strong>[A]</strong> ${missaoAtual.opcaoATexto}<br>
        <strong>[B]</strong> ${missaoAtual.opcaoBTexto}<br>
        <small>Font: ${missaoAtual.fonte}</small>
    `;
    document.getElementById("botoesDecisao").classList.remove("escondido");
}

// esconde a missão sorteada pendente (ela continua guardada em missaoAtual)
function esconderSorteadaPendente() {
    if (!sorteadaPendente()) return;
    document.getElementById("missaoSorteada").innerHTML = "";
    document.getElementById("botoesDecisao").classList.add("escondido");
}


function escolherSorteada(opcaoEscolhida) {
    if (!missaoAtual || sorteadaFeita) return;
    let acoes = (opcaoEscolhida === 'A') ? missaoAtual.acaoA : missaoAtual.acaoB;
    document.getElementById("botoesDecisao").classList.add("escondido");
    iniciarMinigame(acoes, 'sorteada');
}

// soma os efeitos nos status
function aplicarAcoes(acoes) {
    if (acoes.bateriaTotal) bateriaTotal += acoes.bateriaTotal;
    if (acoes.oxigenTotal) oxigenTotal += acoes.oxigenTotal;
    if (acoes.saudeTripulacao) saudeTripulacao += acoes.saudeTripulacao;
    if (acoes.pesquisaTotal) pesquisaTotal += acoes.pesquisaTotal;
}

// falhou: os valores negativos ficam 20% piores (-10 vira -12)
function penalizarAcoes(acoes) {
    let nova = {};
    for (let chave in acoes) {
        let v = acoes[chave];
        nova[chave] = v < 0 ? Math.round(v * 1.2) : v;
    }
    return nova;
}

// conclui a missão depois do minigame
function finalizarMinigame(passou) {
    let acoes = passou ? acaoPendente : penalizarAcoes(acaoPendente);
    aplicarAcoes(acoes);
    verificar();
    atualizarPainel();

    let msg = passou ? "Mission Done!" : "Mission completed with problems... (-20% penalty)";

    if (origemPendente === 'fixa') {
        fixasFeitas[indiceFixaAtual] = true;
        missaoSelecionada = null;
        indiceFixaAtual = null;
        document.getElementById("detalheMissao").innerHTML = msg;
    } else {
        sorteadaFeita = true;
        document.getElementById("missaoSorteada").innerHTML = msg;
    }

    acaoPendente = null;
    origemPendente = null;

    document.getElementById("telaMinigame").classList.add("escondido");
    document.getElementById("telaMissoes").classList.remove("escondido");
    atualizarBotoesMissoes();
    mostrarSorteadaPendente();
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
    cancelAnimationFrame(mgAnim);
    if (mg) mg.ativo = false;
    acaoPendente = null;
    origemPendente = null;
    document.getElementById("telaMinigame").classList.add("escondido");
    
    dia = 1;
    bateriaTotal = 100;
    oxigenTotal = 100;
    pesquisaTotal = 0;
    saudeTripulacao = 100;

    resetarMissoes();
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
        if (bateriaTotal === 0) {
            alert("The spaceship doesn't have enough energy to pass the day")
        } else if (oxigenTotal === 0) {
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
    mostrarSorteadaPendente();
}

//botao de voltar para a tela do jogo e sair das missões
function voltar() {
    missaoSelecionada = null;
    indiceFixaAtual = null;
    document.getElementById("detalheMissao").innerHTML = "";
    document.getElementById("telaMissoes").classList.add("escondido");
    document.getElementById("telaJogo").classList.remove("escondido");
}

const MG = {
    W: 800, H: 300,
    chao: 250,            // y do chão
    velocidade: 260,      // px/s (rolagem do cenário)
    gravidade: 1800,
    forcaPulo: 640,
    totalCaixas: 11,      // entre 10 e 12
    maxBatidas: 2
};

let mg = null;
let mgAnim = null;

function iniciarMinigame(acoes, origem) {
    acaoPendente = acoes;
    origemPendente = origem;

    document.getElementById("telaMissoes").classList.add("escondido");
    document.getElementById("telaMinigame").classList.remove("escondido");
    document.getElementById("minigameResultado").classList.add("escondido");

    criarMinigame();
    mg.ultimo = performance.now();
    mgAnim = requestAnimationFrame(loopMinigame);
}

function criarMinigame() {
    let caixas = [];
    let alturas = [40, 50, 60];
    for (let i = 0; i < MG.totalCaixas; i++) {
        caixas.push({
            x: 700 + i * 340 + Math.random() * 60,
            w: 40,
            h: alturas[Math.floor(Math.random() * alturas.length)],
            batida: false
        });
    }
    mg = {
        camera: 0,                                   // quanto o cenário já andou
        caixas: caixas,
        chegadaX: caixas[caixas.length - 1].x + 500, // linha de chegada (mundo)
        jogador: { x: 120, y: MG.chao - 50, w: 34, h: 50, vy: 0, noChao: true },
        batidas: 0,
        invulneravel: 0,
        ativo: true,
        passou: false,
        ultimo: 0
    };
}

function pularMinigame() {
    if (!mg || !mg.ativo) return;
    let j = mg.jogador;
    if (j.noChao) {
        j.vy = -MG.forcaPulo;
        j.noChao = false;
    }
}

function loopMinigame(agora) {
    if (!mg || !mg.ativo) return;
    let dt = Math.min((agora - mg.ultimo) / 1000, 0.05);
    mg.ultimo = agora;

    atualizarMinigame(dt);
    desenharMinigame();

    if (mg.ativo) mgAnim = requestAnimationFrame(loopMinigame);
}

function atualizarMinigame(dt) {
    let j = mg.jogador;

    // cenário anda da direita para a esquerda
    mg.camera += MG.velocidade * dt;

    // física do pulo
    j.vy += MG.gravidade * dt;
    j.y += j.vy * dt;
    if (j.y >= MG.chao - j.h) {
        j.y = MG.chao - j.h;
        j.vy = 0;
        j.noChao = true;
    }

    if (mg.invulneravel > 0) mg.invulneravel -= dt;

    // colisão com as caixas (hitbox um pouco menor pra ser justo)
    let jx = mg.camera + j.x;
    for (let c of mg.caixas) {
        if (c.batida) continue;
        let colide =
            jx + j.w - 4 > c.x + 2 &&
            jx + 4 < c.x + c.w - 2 &&
            j.y + j.h - 2 > MG.chao - c.h;
        if (colide) {
            c.batida = true;
            mg.batidas++;
            mg.invulneravel = 1;
            if (mg.batidas > MG.maxBatidas) {   // 3ª batida = falhou
                return terminarMinigame(false);
            }
        }
    }

    // chegou na linha de chegada
    if (jx >= mg.chegadaX) terminarMinigame(true);

    let passadas = mg.caixas.filter(c => c.x + c.w < jx).length;
    document.getElementById("minigameInfo").innerHTML =
        "Hits: " + mg.batidas + "/" + MG.maxBatidas + " | Boxes: " + passadas + "/" + MG.totalCaixas;
}

function terminarMinigame(passou) {
    mg.ativo = false;
    mg.passou = passou;
    cancelAnimationFrame(mgAnim);
    desenharMinigame();

    document.getElementById("minigameMsg").innerHTML = passou
        ? "YOU MADE IT! YOUR DECISION WAS SUCCESSFUL!"
        : "TOO MANY HITS! NEGATIVE EFFECTS WILL BE 20% WORSE.";
    document.getElementById("minigameResultado").classList.remove("escondido");
}

function fecharMinigame() {
    finalizarMinigame(mg.passou);
}

// ---------- desenho ----------
function desenharMinigame() {
    const canvas = document.getElementById("minigameCanvas");
    const ctx = canvas.getContext("2d");
    const cam = mg.camera;

    // fundo da nave
    ctx.fillStyle = "#1b2333";
    ctx.fillRect(0, 0, MG.W, MG.H);

    // janelas com a Lua (parallax lento)
    for (let i = -1; i < 6; i++) {
        let x = i * 220 - (cam * 0.25) % 220;
        ctx.fillStyle = "#0a0f1c";
        ctx.fillRect(x + 40, 40, 110, 80);
        ctx.fillStyle = "#cfd3da";                // superfície lunar
        ctx.fillRect(x + 40, 100, 110, 20);
        ctx.fillStyle = "#fff";                   // estrelas
        ctx.fillRect(x + 60, 60, 2, 2);
        ctx.fillRect(x + 110, 75, 2, 2);
        ctx.strokeStyle = "#5b6b8a";
        ctx.lineWidth = 4;
        ctx.strokeRect(x + 40, 40, 110, 80);
    }

    // painéis da parede (parallax médio)
    ctx.strokeStyle = "#2c3a55";
    ctx.lineWidth = 2;
    for (let i = -1; i < 12; i++) {
        let x = i * 110 - (cam * 0.6) % 110;
        ctx.strokeRect(x, 150, 110, 100);
    }

    // chão (rolagem total)
    ctx.fillStyle = "#59647c";
    ctx.fillRect(0, MG.chao, MG.W, MG.H - MG.chao);
    ctx.strokeStyle = "#3a445a";
    for (let i = -1; i < 20; i++) {
        let x = i * 60 - cam % 60;
        ctx.beginPath();
        ctx.moveTo(x, MG.chao);
        ctx.lineTo(x - 20, MG.H);
        ctx.stroke();
    }

    // linha de chegada (xadrez)
    let fx = mg.chegadaX - cam;
    if (fx < MG.W + 40) {
        for (let y = 0; y < MG.chao; y += 20) {
            for (let k = 0; k < 2; k++) {
                ctx.fillStyle = ((y / 20 + k) % 2 === 0) ? "#fff" : "#000";
                ctx.fillRect(fx + k * 20, y, 20, 20);
            }
        }
    }

    // caixas
    for (let c of mg.caixas) {
        let x = c.x - cam;
        if (x > MG.W || x + c.w < 0) continue;
        let y = MG.chao - c.h;
        ctx.fillStyle = c.batida ? "#7a4a3a" : "#b8793e";
        ctx.fillRect(x, y, c.w, c.h);
        ctx.strokeStyle = "#5a3a1a";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, c.w, c.h);
        ctx.beginPath();
        ctx.moveTo(x, y); ctx.lineTo(x + c.w, y + c.h);
        ctx.moveTo(x + c.w, y); ctx.lineTo(x, y + c.h);
        ctx.stroke();
    }

    // astronauta (pisca quando está invulnerável)
    let j = mg.jogador;
    if (mg.invulneravel <= 0 || Math.floor(mg.invulneravel * 10) % 2 === 0) {
        ctx.fillStyle = "#f2f2f2";
        ctx.fillRect(j.x, j.y + 16, j.w, j.h - 16);       // corpo
        ctx.fillRect(j.x + 4, j.y, j.w - 8, 20);          // capacete
        ctx.fillStyle = "#3aa0ff";
        ctx.fillRect(j.x + 12, j.y + 5, j.w - 16, 10);    // visor
        ctx.fillStyle = "#c9c9c9";
        ctx.fillRect(j.x - 6, j.y + 20, 8, 22);           // mochila
    }
}

// ---------- controles ----------
document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (mg && mg.ativo) {
            e.preventDefault();
            pularMinigame();
        }
    }
});

const canvasMG = document.getElementById("minigameCanvas");
if (canvasMG) canvasMG.addEventListener("pointerdown", pularMinigame);


atualizarPainel()