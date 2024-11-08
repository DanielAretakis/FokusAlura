const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const startPauseBtImg = document.querySelector('.app__card-primary-butto-icon');
const startPauseBtTxt = document.querySelector('#start-pause span');

const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const final = new Audio('/sons/beep.mp3');
musica.loop = true;

play.volume = 0.5
pause.volume = 0.5
final.volume = 0.5

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
});

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(botoes => botoes.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            title.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            break;
    
        case 'descanso-curto':
            title.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
            break;

        case 'descanso-longo':
            title.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            break;

        default:
            break;
    }

}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        alert('Tempo finalizado!')
        parar()
        // final.play()
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
};

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    startPauseBtImg.setAttribute('src', '/imagens/pause.png');
    startPauseBtTxt.textContent = 'Parar'
    if (intervaloId){
        parar()
        pause.play()
        return
    };
    intervaloId = setInterval(contagemRegressiva, 1000)
    play.play()
}

function parar() {
    clearInterval(intervaloId)
    intervaloId = null
    startPauseBtTxt.textContent = 'Começar'
    startPauseBtImg.setAttribute('src', '/imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()