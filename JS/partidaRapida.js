localStorage.setItem('userPoints', 0)
localStorage.setItem('robotPoints', 0)

let url = window.location.toString()
let limiteJogadas = Number.parseInt(url.slice(url.indexOf('=') + 1, url.length))

document.getElementsByClassName('limiteJogadas')[0].innerText = 'Limite: ' + limiteJogadas


let counter = 5;
let userOption = 0;
let enableToPlay = false;

let stonePath = '../IMG/spa.svg';
let paperPath = '../IMG/portable-document-format.svg';
let scissorPath = '../IMG/scissors.svg';

let scoreBoardRobot = document.querySelector('#robotPoints p');
let scoreBoardUser = document.querySelector('#userPoints p');

scoreBoardUser.innerText = localStorage.getItem('userPoints');
scoreBoardRobot.innerText = localStorage.getItem('robotPoints');

let jogadaUser = document.createElement('img');
jogadaUser.setAttribute('id', 'jogadaUser');
jogadaUser.setAttribute('class', 'jogada');

let jogadaRobot = document.createElement('img');
jogadaRobot.setAttribute('id', 'jogadaRobot');
jogadaRobot.setAttribute('class', 'jogada');

let gameResponse = null;

let stone = document.querySelector('#user .stone');
let paper = document.querySelector('#user .paper');
let scissor = document.querySelector('#user .scissor');


function generateRobotChoose() {
    var numberGenerated = 10

    while (numberGenerated != 0 && numberGenerated != 1 && numberGenerated != 2) {
        numberGenerated = Math.round(Math.random() * 10);
    }
    return numberGenerated
}

function cronometro() {
    if (enableToPlay == false) {
        var divCentral = document.getElementById('mainPainelGame');
        var decreaserCounter = document.createElement('p');

        if (counter >= 0) {
            decreaserCounter.setAttribute('id', 'decreaserCounter');
            decreaserCounter.setAttribute('class', 'desactive')

            decreaserCounter.innerText = counter.toString();

            decreaserCounter.removeAttribute('class')
            decreaserCounter.setAttribute('class', 'active')

            divCentral.appendChild(decreaserCounter)
            counter--;
            setTimeout(cronometro, 1000);
            divCentral.removeChild(divCentral.childNodes[0])
        } else {
            if (divCentral.childNodes[0] != null) {
                divCentral.removeChild(divCentral.childNodes[0])
            }

            gameResponse = document.createElement('p')
            gameResponse.setAttribute('class', 'gameResponse')
            divCentral.appendChild(gameResponse)
            divCentral.appendChild(jogadaUser)
            divCentral.appendChild(jogadaRobot)
            enableToPlay = true;
        }
        document.getElementById('play').style.backgroundColor = '#00aeff7c';
    } else {
        window.alert('Você já está jogando, escolha uma das opção! Se quiser recomeçar clique em reiniciar.')
    }
}

function play(userOption) {
    if (enableToPlay == true) {
        robotOption = generateRobotChoose();
        gameResponse.removeAttribute('class');

        displayChooseOfPlayers(userOption, robotOption);

        if (userOption == robotOption) {
            gameResponse.innerText = 'Empatou'.toUpperCase();
            gameResponse.setAttribute('class', 'gameResponse tie');
            setTimeout(delay, 3000);
        }
        else {
            let robotPoints = Number.parseInt(localStorage.getItem('robotPoints'));
            let userPoints = Number.parseInt(localStorage.getItem('userPoints'));

            if (userOption == 0) {
                if (robotOption == 1) {
                    gameResponse.innerText = 'Perdeu'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse lose');
                    localStorage.setItem('robotPoints', robotPoints + 1);
                }
                else {
                    gameResponse.innerText = 'Venceu'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse win');
                    localStorage.setItem('userPoints', userPoints + 1);
                }
            }
            else if (userOption == 1) {
                if (robotOption == 0) {
                    gameResponse.innerText = 'Venceu'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse win');
                    localStorage.setItem('userPoints', userPoints + 1);
                }
                else {
                    gameResponse.innerText = 'Perdeu'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse lose');
                    localStorage.setItem('robotPoints', robotPoints + 1);
                }
            }
            else {
                if (robotOption == 0) {
                    gameResponse.innerText = 'Perdeu'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse lose');
                    localStorage.setItem('robotPoints', robotPoints + 1);
                }
                else {
                    gameResponse.innerText = 'Venceu'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse win');
                    localStorage.setItem('userPoints', userPoints + 1);
                }
            }
            setTimeout(delay, 3000);
            scoreBoardRobot.innerText = localStorage.getItem('robotPoints');
            scoreBoardUser.innerText = localStorage.getItem('userPoints');

            robotPoints = Number.parseInt(localStorage.getItem('robotPoints'))
            userPoints = Number.parseInt(localStorage.getItem('userPoints'))

            if(robotPoints == limiteJogadas){
                window.location.assign('robotWinner.html')
            } else if(userPoints == limiteJogadas){
                window.location.assign('userWinner.html')
            }
        }
    }
    else {
        window.alert('Clique no botão jogar para começar a jogar!')
    }
}

function delay() {
    gameResponse.removeAttribute('class')
    gameResponse.setAttribute('class', 'gameResponse')
}

function displayChooseOfPlayers(userOption, robotOption) {
    if (userOption == 0) {
        jogadaUser.style.backgroundImage = `url("${stonePath}")`
    }
    else if (userOption == 1) {
        jogadaUser.style.backgroundImage = `url("${paperPath}")`
    }
    else {
        jogadaUser.style.backgroundImage = `url("${scissorPath}")`
    }

    if (robotOption == 0) {
        jogadaRobot.style.backgroundImage = `url("${stonePath}")`
    }
    else if (robotOption == 1) {
        jogadaRobot.style.backgroundImage = `url("${paperPath}")`
    }
    else {
        jogadaRobot.style.backgroundImage = `url("${scissorPath}")`
    }
}


function help() {
    window.location.assign('Stone-Paper-Scissor/HTML/help.html')
}

document.getElementById('play').addEventListener('click', cronometro);


stone.addEventListener('click', () => {
    userOption = 0;
    play(userOption);
});
paper.addEventListener('click', () => {
    userOption = 1;
    play(userOption);
});
scissor.addEventListener('click', () => {
    userOption = 2;
    play(userOption);
});
