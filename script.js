const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;

function pegaEspaco(event) {
    if(event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 120) {
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px' ;
                }
            }, 20);
        } else { 

            //Subindo
            position += 20;
            dino.style.bottom = position + 'px' ;
        }
    }, 20);
}

function createCactus() {
    let min = 1;
    let max = 3;
    let numberCactus = Math.random() * (max - min) + min;

    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() + 6000;

    cactus.classList.add('cactus');
    cactus.style.backgroundImage = `url(imagens/cactus${parseInt(numberCactus)}.png)`;
    /*if(numberCactus > 1) {
        cactus.style.height = "80px";
    }*/

    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);

        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {          
            gameOver(leftInterval);
            
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

function gameOver(leftInterval) {
    
    //Game over
    clearInterval(leftInterval);
    document.body.innerHTML = `
        <div class="game-over">
            <h1>Fim de Jogo</h1> <br>
            <p> Aperte qualquer tecla para reiniciar </p>
        </div>`;
    
    //reiniciar jogo
    document.addEventListener('keyup', function() {
        window.location.reload();
    });
}

createCactus();
document.addEventListener('keyup', pegaEspaco);
