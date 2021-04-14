const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let pulando = false;
let posicao = 0;
let pontuacao = 0;

/*INTERAÇÃO DO DINOSSAURO*/ 

document.addEventListener('touchend', movimento);

function tecla(event) { //Ao apertar espaço ou seta para cima o objeto irá pular
    if(event.keyCode === 32 || event.keyCode ===38) {
        if(!pulando){
        movimento();
    }}
}



function movimento() { //movimento de pular e descer
    pulando = true;

    let pular = setInterval(() => {
        if(posicao >= 150){
            clearInterval(pular); //para de subir

            //descendo
            let descer = setInterval(() => {
                if(posicao <= 0) {
                    clearInterval(descer);
                    pulando = false;
                } else{
                    posicao -= 20;
                    dino.style.bottom = posicao + 'px';
            }
        }, 20);

        }else {
            //subindo
            posicao += 20;
            dino.style.bottom = posicao + 'px';
        }
    }, 20); //o código será executado a cada 20 milisegundos

    
}

/* CACTOS */
function criarCactos() {
    const cactos = document.createElement('div'); //utiliza JS para criar HTML
    let aleatorio = Math.random() * 5000; //random serve para gerar um número aleatório
    let posicaoCactos = 1500;

    if(window.matchMedia("(max-width:800px)").matches){
        posicaoCactos = 600;
    }

    if (aleatorio < 1000){
        aleatorio = 1000;
    }

    cactos.classList.add('cactos');
    cactos.style.left = posicaoCactos + 'px';

    background.appendChild(cactos); //adicionar um filho
    
    let movimentoCactos= setInterval(() => {
        if(posicaoCactos <= -60) {
           clearInterval(movimentoCactos);
            background.removeChild(cactos);
            
        } else if (posicaoCactos > 0 && posicaoCactos < 60 && posicao < 60) {
            //Game over
            clearInterval(movimentoCactos);
           sessionStorage.setItem('pont', total);
            window.location.href = 'gameOver.html';
        } else {
            posicaoCactos -= 10;
            cactos.style.left = posicaoCactos + 'px';
            pontuacao += 0.2;

            total =  Math.round(pontuacao);
            document.getElementById('pontos').innerHTML =  total;
        }
    }, 20);

    setTimeout(criarCactos, aleatorio); //sitTimeout para executarmos uma determinada função

}


//let pont = sessionStorage.getItem('pont')
//document.getElementById('score').innerHTML =  pont;
criarCactos();
document.addEventListener('keyup', tecla);
