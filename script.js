const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');


focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
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

        default:
            break;
    }

}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        parar()
        alert('Tempo finalizado!')
        return
    }

    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador' + tempoDecorridoEmSegundos)
};

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId){
        parar()
        return
    };
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function parar() {
    clearInterval(intervaloId)
    intervaloId = null
}
