localStorage.setItem('userPoints', 0)
localStorage.setItem('robotPoints', 0)

var counter = 5;
var userOption = 0;
var enableToPlay = false;

var stonePath = '../IMG/spa.svg';
var paperPath = '../IMG/portable-document-format.svg';
var scissorPath = '../IMG/scissors.svg';

var scoreBoardRobot = document.querySelector('#robotPoints p');
var scoreBoardUser = document.querySelector('#userPoints p');

var jogadaUser = document.createElement('img');
jogadaUser.setAttribute('id', 'jogadaUser');
jogadaUser.setAttribute('class', 'jogada');

var jogadaRobot = document.createElement('img');
jogadaRobot.setAttribute('id', 'jogadaRobot');
jogadaRobot.setAttribute('class', 'jogada');

scoreBoardUser.innerText = localStorage.getItem('userPoints');
scoreBoardRobot.innerText = localStorage.getItem('robotPoints');

var gameResponse = null;

var stone = document.querySelector('#user .stone');
var paper = document.querySelector('#user .paper');
var scissor = document.querySelector('#user .scissor');


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
            divCentral.removeChild(divCentral.childNodes[0])
            setTimeout(cronometro, 1000);
        } else {
            divCentral.removeChild(divCentral.childNodes[0])

            gameResponse = document.createElement('p')
            gameResponse.setAttribute('class', 'gameResponse')
            divCentral.appendChild(gameResponse)
            divCentral.appendChild(jogadaUser)
            divCentral.appendChild(jogadaRobot)
            counter = 5;
            enableToPlay = true;
        }
        document.getElementById('play').style.backgroundColor = '#00aeff7c';
    } else {
        window.alert('You are in match now! If do you wanna restart press the restart button')
    }
}

function play(userOption) {
    if (enableToPlay == true) {
        robotOption = generateRobotChoose();
        gameResponse.removeAttribute('class');

        displayChooseOfPlayers(userOption, robotOption);

        if (userOption == robotOption) {
            gameResponse.innerText = 'You Tied'.toUpperCase();
            gameResponse.setAttribute('class', 'gameResponse tie');
            setTimeout(delay, 3000);
        }
        else{
            robotPoints = Number.parseInt(localStorage.getItem('robotPoints'));
            userPoints = Number.parseInt(localStorage.getItem('userPoints'));

            if (userOption == 0){
                if (robotOption == 1){
                    gameResponse.innerText = 'You Lose'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse lose');
                    localStorage.setItem('robotPoints', robotPoints + 1);
                }
                else{
                    gameResponse.innerText = 'You Win'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse win');
                    localStorage.setItem('userPoints', userPoints + 1);
                }
                setTimeout(delay, 3000);
            }
            else if (userOption == 1){
                if (robotOption == 0) {
                    gameResponse.innerText = 'You Win'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse win');
                    localStorage.setItem('userPoints', userPoints + 1);
                }
                else{
                    gameResponse.innerText = 'You Lose'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse lose');
                    localStorage.setItem('robotPoints', userPoints + 1);
                }
                setTimeout(delay, 3000);
            }
            else{
                if (robotOption == 0){
                    gameResponse.innerText = 'You Lose'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse lose');
                    localStorage.setItem('robotPoints', robotPoints + 1);
                }
                else{
                    gameResponse.innerText = 'You Win'.toUpperCase();
                    gameResponse.setAttribute('class', 'gameResponse win');
                    localStorage.setItem('userPoints', userPoints + 1);
                }
                setTimeout(delay, 3000);
            }
            scoreBoardRobot.innerText = localStorage.getItem('robotPoints');
            scoreBoardUser.innerText = localStorage.getItem('userPoints');
        }
    }
    else{
        window.alert('You can\'t play! Please Press the Play Button')
    }
}

function delay(){
    gameResponse.removeAttribute('class')
    gameResponse.setAttribute('class', 'gameResponse')
}

function displayChooseOfPlayers(userOption, robotOption){
    if (userOption == 0){
        jogadaUser.style.backgroundImage = `url("${stonePath}")`
    }
    else if(userOption == 1){
        jogadaUser.style.backgroundImage = `url("${paperPath}")`
    }
    else{
        jogadaUser.style.backgroundImage = `url("${scissorPath}")`
    }

    if(robotOption == 0){
        jogadaRobot.style.backgroundImage = `url("${stonePath}")`
    }
    else if(robotOption == 1) {
        jogadaRobot.style.backgroundImage = `url("${paperPath}")`
    }
    else{
        jogadaRobot.style.backgroundImage = `url("${scissorPath}")`
    }
}

function restart(){
    localStorage.setItem('robotPoints', 0);
    localStorage.setItem('userPoints', 0);
    window.removeChild(gameResponse);
    window.removeChild(jogadaUser);
    window.removeChild(jogadaRobot);
    enableToPlay = false;

    scoreBoardRobot.innerText = localStorage.getItem('robotPoints');
    scoreBoardUser.innerText = localStorage.getItem('userPoints');
    document.getElementById('play').style.backgroundColor = '#00aeff';
}

function exit(){
    close();
}

document.getElementById('play').addEventListener('click', cronometro);

document.getElementById('restart').addEventListener('click', restart);

document.getElementById('exit').addEventListener('click', exit);


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
