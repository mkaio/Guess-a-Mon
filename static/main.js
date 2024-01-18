// Cronômetro:

var mm = 0;
var ss = 0;

var tempo = 1000;
var cron;

function start() {
    cron = setInterval(() => { timer(); }, tempo);
}

function pause() {
    clearInterval(cron);
}

function timer() {
    ss++;

    if (ss == 60) {
        ss = 0;
        mm++;
        if (mm == 60) {
            pause();
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-endgame.png"
            document.getElementById('correction').innerHTML = "Você ultrapassou o limite de tempo"
            setTimeout(function () {
                location.reload();
            }, 6000);
        }

    }

    var format = 'Tempo: ' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

    document.getElementById('cronometro').innerText = format;

    return format;
}

// Funcionamento do jogo:

let selectedDifficulty = "Médio";
const selectButton = document.getElementById("level");
const dropdown = document.getElementById("dropdown");

function toggleDropdown() {
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    selectButton.textContent = `Dificuldade`;
    selectButton.blur();
    dropdown.style.display = "none";
    updateSelectedStyle(difficulty);
    document.getElementById("selected-difficulty").textContent = difficulty;
}

function updateSelectedStyle(difficulty) {
    const options = document.querySelectorAll(".dropdown li");
    options.forEach(option => option.classList.remove("selected-option"));
    options.forEach(option => {
        if (option.textContent === difficulty) {
            option.classList.add("selected-option");
        }
    });
}

window.addEventListener("click", function (event) {
    if (!selectButton.contains(event.target) && event.target !== selectButton) {
        dropdown.style.display = "none";
    }
});

window.onload = function () {
    updateSelectedStyle("Médio");
};

let padrao = false;
let g1 = false;
let g2 = false;
let g3 = false;
let g4 = false;
let g5 = false;
let g6 = false;
let g7 = false;
let g8 = false;
let g9 = false;

let feedbackactive = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function gen(number) {
    switch (number) {
        case 1:
            min = 1;
            max = 151;
            g1 = true
            getRandomPokemon();
            break;
        case 2:
            min = 152;
            max = 251;
            g2 = true
            getRandomPokemon();
            break;
        case 3:
            min = 252;
            max = 386;
            g3 = true
            getRandomPokemon();
            break;
        case 4:
            min = 387;
            max = 493;
            g4 = true
            getRandomPokemon();
            break;
        case 5:
            min = 494;
            max = 649;
            g5 = true
            getRandomPokemon();
            break;
        case 6:
            min = 650;
            max = 721;
            g6 = true
            getRandomPokemon();
            break;
        case 7:
            min = 722;
            max = 809;
            g7 = true
            getRandomPokemon();
            break;
        case 8:
            min = 810;
            max = 905;
            g8 = true
            getRandomPokemon();
            break;
        case 9:
            min = 906;
            max = 1017;
            g9 = true
            getRandomPokemon();
            break;
        default:
            min = 1;
            max = 1017;
            padrao = true;
            getRandomPokemon();
            break;
    }
}

let pontos = 0
let randomPokemonId;
var musicPreference = localStorage.getItem('musicPreference');
var soundPreference = localStorage.getItem('soundPreference');
function getRandomPokemon() {
    if (localStorage.musicPreference === "Off") {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }

    if (selectedDifficulty === "Fácil") {
        document.getElementById("guessbox").oninput = buscar;
        document.getElementById("tip-bar").onclick = tip;
    }
    if (selectedDifficulty === "Médio") {
        document.getElementById("tip-bar").onclick = tip;
    }
    if (selectedDifficulty === "Difícil") {
        document.getElementById("tip-bar").onclick = tipAlert;
    }
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            randomPokemonId = getRandomInt(min, max)

            fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                    const pokebox = document.getElementById('pokebox');
                    pokebox.style.display = 'flex';

                    if (randomPokemonId === 1011) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1011-Dipplin.png"
                    } else if (randomPokemonId === 1012) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1012-poltchageist.jpg"
                    } else if (randomPokemonId === 1013) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1013-sinistcha.png"
                    } else if (randomPokemonId === 1014) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1014-Okidogi.webp"
                    } else if (randomPokemonId === 1015) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1015-munkidori.png"
                    } else if (randomPokemonId === 1016) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1016-Fezandipiti.png"
                    } else if (randomPokemonId === 1017) {
                        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1017-ogerpon.png"
                    } else {
                        document.getElementById('poke-picture').src = response.sprites.front_default;
                    }
                    currentPokemonName = response.name;
                })
                .catch(function (error) {
                    console.error('Ocorreu um erro:', error);
                    document.getElementById('overlay2').style.display = 'block';
                    document.getElementById('network').style.display = 'flex';
                    document.getElementById('netbutton').style.display = 'block';
                    backgroundMusic.pause();
                    document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume-mute.png"
                });
        });

    document.getElementById('bar').style.display = 'flex'
    const botao = document.getElementById('startbutton')
    const guessform = document.getElementById('guessform')
    botao.style.display = 'none'
    guessform.style.display = 'flex'
    document.getElementById('actions').style.display = 'none'
    document.getElementById('filterbar').style.display = 'none'
    document.getElementById('level').style.display = 'none'
    document.getElementById('info').style.display = 'none'
    document.getElementById('leave-button').style.display = 'block';
    document.getElementById('volume').style.display = 'block';
    document.getElementById('config').style.display = 'none';
    document.getElementById('configBox').style.left = '-210px';

    start()
}

function keep() {
    randomPokemonId = getRandomInt(min, max)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);

            if (randomPokemonId === 1011) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1011-Dipplin.png"
            } else if (randomPokemonId === 1012) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1012-poltchageist.jpg"
            } else if (randomPokemonId === 1013) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1013-sinistcha.png"
            } else if (randomPokemonId === 1014) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1014-Okidogi.webp"
            } else if (randomPokemonId === 1015) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1015-munkidori.png"
            } else if (randomPokemonId === 1016) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1016-Fezandipiti.png"
            } else if (randomPokemonId === 1017) {
                document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/1017-ogerpon.png"
            } else {
                document.getElementById('poke-picture').src = response.sprites.front_default;
            }

            currentPokemonName = response.name
        })
        .catch(function (error) {
            console.error('Ocorreu um erro:', error);
            document.getElementById('overlay2').style.display = 'block';
            document.getElementById('network').style.display = 'flex';
            document.getElementById('netbutton').style.display = 'block';
        });
    document.getElementById('correction').innerHTML = ''
}


var besTime = localStorage.getItem('besTime');
var besTime1 = localStorage.getItem('besTime1');
var besTime2 = localStorage.getItem('besTime2');
var besTime3 = localStorage.getItem('besTime3');
var besTime4 = localStorage.getItem('besTime4');
var besTime5 = localStorage.getItem('besTime5');
var besTime6 = localStorage.getItem('besTime6');
var besTime7 = localStorage.getItem('besTime7');
var besTime8 = localStorage.getItem('besTime8');
var besTime9 = localStorage.getItem('besTime9');

var correctRate = parseInt(localStorage.getItem('cRate'));
var wrongRate = parseInt(localStorage.getItem('wRate'));
const rightSound = document.getElementById('right_sound');
const wrongSound = document.getElementById('wrong_sound');
const victorySong = document.getElementById('victory_song');
const endgameSound = document.getElementById('endgame_sound');
const guessBox = document.getElementById('guessbox');
function check() {
    var correctRate = parseInt(localStorage.getItem('cRate'));
    var wrongRate = parseInt(localStorage.getItem('wRate'));

    const userGuess = guessBox.value.toLowerCase();
    let nome = currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1);

    let crono = document.getElementById('cronometro').innerText;
    let tempofinal = crono.replace('Tempo: ', '');

    let feedbackPontos = document.getElementById('point-back')

    if (userGuess === currentPokemonName) {
        if (padrao) {
            if (correctRate >= 1) {
                localStorage.setItem('cRate', (correctRate + 1));
            } else {
                localStorage.setItem('cRate', 1);
            }
        }

        document.getElementById('loading').style.display = "block"
        document.getElementById('pokebox').style.paddingBottom = "1%";
        pause();
        feedbackactive = true
        document.getElementById('enviar').disabled = true
        document.getElementById("tip-bar").onclick = '';
        if (tipActive === true && tipMax === false) {
            pontos = pontos + 2
            feedbackPontos.innerHTML = "+2"
            feedbackPontos.style.color = "yellow"
        }
        else if (tipActive && tipMax) {
            pontos = pontos + 1
            feedbackPontos.innerHTML = "+1"
            feedbackPontos.style.color = "yellow"
        }
        else {
            pontos = pontos + 3
            feedbackPontos.innerHTML = "+3"
            feedbackPontos.style.color = "green"
        }

        feedbackPontos.style.display = 'block'

        if (pontos >= 20) { // VITÓRIA (ultrapassou os 20 pontos)
            document.body.style.cursor = 'wait';
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/win-GAM.png"
            document.getElementById('loading').style.display = "none";
            document.getElementById('points').innerHTML = "Pontuação: " + pontos + " / 20"
            if (localStorage.soundPreference === "Off") {
                rightSound.pause()
            } else {
                rightSound.play()
            }
            if (localStorage.musicPreference === "Off") {

            } else {
                backgroundMusic.pause();
                victorySong.play();
            }
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('time-feedback').innerHTML = "Seu tempo foi de " + tempofinal
            document.getElementById('pokebox').style.paddingBottom = "20px"
            document.getElementById('leave-button').onclick = ''
            document.getElementById('tip-button1').style.display = "none";
            document.getElementById('tip-button2').style.display = "none";
            guessBox.value = '';

            // sistema de salvamento de pontuação:
            function convertToSec(tempo) {
                var partes = tempo.split(":");
                return parseInt(partes[0]) * 60 + parseInt(partes[1]);
            }

            var finalTime = convertToSec(tempofinal)
            console.log("Tempo final - " + finalTime)
            if (padrao) { // sem filtro (geral)
                if (localStorage.besTime == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime', tempofinal);
                    }
                }
            } else if (g1) {
                if (localStorage.besTime1 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime1', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime1)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime1', tempofinal);
                    }
                }
            } else if (g2) {
                if (localStorage.besTime2 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime2', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime2)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime2', tempofinal);
                    }
                }
            } else if (g3) {
                if (localStorage.besTime3 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime3', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime3)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime3', tempofinal);
                    }
                }
            } else if (g4) {
                if (localStorage.besTime4 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime4', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime4)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime4', tempofinal);
                    }
                }
            } else if (g5) {
                if (localStorage.besTime5 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime5', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime5)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime5', tempofinal);
                    }
                }
            } else if (g6) {
                if (localStorage.besTime6 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime6', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime6)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime6', tempofinal);
                    }
                }
            } else if (g7) {
                if (localStorage.besTime7 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime7', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime7)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime7', tempofinal);
                    }
                }
            } else if (g8) {
                if (localStorage.besTime8 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime8', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime8)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime8', tempofinal);
                    }
                }
            } else if (g9) {
                if (localStorage.besTime9 == null) {
                    console.log("nada ainda")
                    localStorage.setItem('besTime9', tempofinal);
                } else {
                    var timeReg = convertToSec(localStorage.besTime9)
                    console.log("Tempo registrado - " + timeReg)
                    if (finalTime < timeReg) {
                        localStorage.setItem('besTime9', tempofinal);
                    }
                }
            }


            setTimeout(function () {
                feedbackPontos.style.display = 'none'
            }, 2500);
            if (localStorage.musicPreference === "Off") {
                setTimeout(function () {
                    location.reload();
                }, 5000);
            } else {
                setTimeout(function () {
                    location.reload();
                }, 13000);
            }
            return;
        }
        // CORRETO
        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-correto.png"
        if (localStorage.soundPreference === "Off") {
            rightSound.pause()
        } else {
            rightSound.play()
        }
        document.getElementById('tip-button1').style.display = "none";
        document.getElementById('tip-button2').style.display = "none";
        setTimeout(function () {
            feedbackPontos.style.display = 'none'
        }, 2300);
    } else { //ERRADO (O JOGO CONTINUA)
        if (padrao) {
            if (wrongRate >= 1) {
                localStorage.setItem('wRate', (wrongRate + 1));
            } else {
                localStorage.setItem('wRate', 1);
            }
        }

        if (pontos > 0) {
            if (localStorage.soundPreference === "Off") {
                wrongSound.pause();
            } else {
                wrongSound.play();
            }
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-errado.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            document.getElementById('loading').style.display = "block"
            document.getElementById('pokebox').style.paddingBottom = "20px"
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('tip-button1').style.display = "none";
            document.getElementById('tip-button2').style.display = "none";
            pontos = pontos - 1

            feedbackPontos.innerHTML = "-1"
            feedbackPontos.style.color = "red"
            feedbackPontos.style.display = 'block'
            setTimeout(function () {
                feedbackPontos.style.display = 'none'
            }, 2300);
        } else { // FIM DE JOGO (DERROTA)
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-endgame.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            if (localStorage.soundPreference === "Off") {
                wrongSound.pause();
            } else {
                wrongSound.play();
            }
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('leave-button').onclick = ''
            document.getElementById('tip-button1').style.display = "none";
            document.getElementById('tip-button2').style.display = "none";
            guessBox.value = '';

            feedbackPontos.innerHTML = "-1"
            feedbackPontos.style.color = "red"
            feedbackPontos.style.display = 'block'
            setTimeout(function () {
                feedbackPontos.style.display = 'none'
            }, 2300);

            setTimeout(function () {
                location.reload();
            }, 3000);
            return;
        }
    }
    guessBox.value = '';
    document.getElementById('points').innerHTML = "Pontuação: " + pontos + " / 20"

    setTimeout(function () {
        document.getElementById('loading').style.display = "none"
        document.getElementById('pokebox').style.paddingBottom = "3%"
        document.getElementById('enviar').disabled = false
        if (selectedDifficulty === "Médio" || selectedDifficulty === "Fácil") {
            document.getElementById("tip-bar").onclick = tip;
        }
        keep();
        start();
        feedbackactive = false
    }, 4000);

    tipActive = false;
    tipMax = false;
}

guessBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (!feedbackactive) {
            event.preventDefault();
            check();
        }
    }
})

function filters() {
    document.getElementById('startbutton').style.display = 'none'
    document.getElementById('actions').style.display = 'none'
    document.getElementById('filterbar').style.display = 'flex'
    document.getElementById('level').style.display = 'none'
    document.getElementById('info').style.display = 'none'
    document.getElementById('config').style.display = 'none';
    document.getElementById('configBox').style.left = '-210px';
}

function backfilter() {
    document.getElementById('startbutton').style.display = 'block';
    document.getElementById('actions').style.display = 'flex';
    document.getElementById('filterbar').style.display = 'none';
    document.getElementById('level').style.display = 'block';
    document.getElementById('info').style.display = 'flex';
    document.getElementById('config').style.display = 'block';
}

function howtoplay() {
    if (window.matchMedia("(max-width:600px)").matches) {
        document.getElementById("config").style.zIndex = '0'
    }
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('pop-up').style.display = 'block';
}

function closepopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('pop-up').style.display = 'none';
    if (window.matchMedia("(max-width:600px)").matches) {
        document.getElementById("config").style.zIndex = '2'
    }
}

let resultadosFiltrados = [];
let resultadoSelecionadoIndex = -1;

async function buscar() {
    var pkName = document.querySelector('#guessbox').value.trim().toLowerCase();

    if (pkName === "") {
        document.querySelector('#resultados').innerHTML = "";
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1018`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results) {
            resultadosFiltrados = data.results.filter(pokemon =>
                pokemon.name.startsWith(pkName)
            ).slice(0, 3);

            const resultados = document.querySelector('#resultados');
            resultados.innerHTML = ""; // Limpar as recomendações anteriores

            resultadosFiltrados.forEach((pokemon, index) => {
                const resultadoBotao = document.createElement('div');
                resultadoBotao.textContent = pokemon.name;
                resultadoBotao.classList.add('resultado-botao');
                resultadoBotao.addEventListener('click', () => {
                    selecionarResultado(index);
                    document.querySelector('#guessbox').value = resultadosFiltrados[index].name;
                    resultados.innerHTML = ""; // Limpar as recomendações após a seleção
                });
                resultados.appendChild(resultadoBotao);
            });

            resultados.style.display = "block"; // Mostrar caixa de recomendações
            document.addEventListener('keydown', handleKeyDown);
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

function selecionarResultado(index) {
    if (resultadoSelecionadoIndex >= 0) {
        const resultadoAnterior = document.querySelectorAll('.resultado-botao')[resultadoSelecionadoIndex];
        if (resultadoAnterior) {
            resultadoAnterior.classList.remove('resultado-selecionado');
        }
    }

    resultadoSelecionadoIndex = index;

    if (resultadoSelecionadoIndex >= 0) {
        const resultadoSelecionado = document.querySelectorAll('.resultado-botao')[resultadoSelecionadoIndex];
        if (resultadoSelecionado) {
            resultadoSelecionado.classList.add('resultado-selecionado');
        }
    }
}


function handleKeyDown(event) {
    if (resultadosFiltrados.length === 0) {
        return;
    }

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            if (resultadoSelecionadoIndex < resultadosFiltrados.length - 1) {
                selecionarResultado(resultadoSelecionadoIndex + 1);
            } else {
                selecionarResultado(0);
            }
            break;
        case 'ArrowUp':
            event.preventDefault();
            if (resultadoSelecionadoIndex > 0) {
                selecionarResultado(resultadoSelecionadoIndex - 1);
            } else {
                selecionarResultado(resultadosFiltrados.length - 1);
            }
            break;
        case 'Enter':
            event.preventDefault();
            if (document.querySelector('#resultados').style.display === 'block') {
                if (resultadosFiltrados.length > 0 && resultadoSelecionadoIndex >= 0) {
                    document.querySelector('#guessbox').value = resultadosFiltrados[resultadoSelecionadoIndex].name;
                    document.querySelector('#resultados').style.display = 'none';
                    document.querySelector('#guessbox').focus(); // Focar na caixa de entrada após a seleção
                }
            } else {
                if (!feedbackactive) {
                    check();
                }
            }
            break;
    }
}


document.addEventListener('click', function (event) {
    const searchContainer = document.querySelector('#search-container');
    if (!searchContainer.contains(event.target)) {
        document.querySelector('#resultados').innerHTML = '';
        document.querySelector('#resultados').style.display = 'none';
    }
});

function getAllIndexes(arr, val) {
    const indexes = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indexes.push(i);
        }
    }
    return indexes;
}

let tipName2 = '';
let tipMax = false;
let tipActive = false;
var dicas = localStorage.getItem('tipRate');
function tip() {
    const dica1 = document.getElementById('dica1');
    const dica2 = document.getElementById('dica2');

    let underscores = '';
    for (let i = 0; i < currentPokemonName.length - 1; i++) {
        underscores += ' _';
    }

    let tipName = currentPokemonName.charAt(0).toUpperCase() + underscores

    if (currentPokemonName.includes("-")) {
        const indexHifen = getAllIndexes(currentPokemonName, "-");

        indexHifen.forEach(index => {
            const underscoreIndex = 2 * index;

            if (underscoreIndex < tipName.length) {
                tipName = tipName.substring(0, underscoreIndex) + "-" + tipName.substring(underscoreIndex + 1);
            }
        })
    }

    if (tipMax) { // 2 dicas já ativas
        document.getElementById("tip-bar").onclick = '';
    } else {
        if (tipActive) { //2ª DICA
            var dicas = localStorage.getItem('tipRate');
            if (parseInt(dicas) >= 1) {
                localStorage.setItem('tipRate', (parseInt(dicas) + 1))
            } else {
                localStorage.setItem('tipRate', 1)
            }

            let randomN = () => {
                let respostaN = 2 * (Math.floor(Math.random() * (currentPokemonName.length - 1)) + 1);
                return respostaN;
            };
            let m = randomN()

            let extraLetter = currentPokemonName[m / 2]
            if (!currentPokemonName.includes("-")) {
                tipName2 = tipName.substring(0, m) + extraLetter + tipName.substring(m + 1)
            } else {
                indexHifen = getAllIndexes(currentPokemonName, "-")
                if (indexHifen.length === 1) {
                    if (m === indexHifen[0] * 2) {
                        extraLetter = currentPokemonName[m / 2 + 1];
                        tipName2 = tipName.substring(0, m + 2) + extraLetter + tipName.substring(m + 3);
                    } else {
                        tipName2 = tipName.substring(0, m) + extraLetter + tipName.substring(m + 1)
                    }
                }
                else if (indexHifen.length === 2) {
                    if (m === indexHifen[0] * 2 || m === indexHifen[1] * 2) {
                        extraLetter = currentPokemonName[m / 2 + 1];
                        tipName2 = tipName.substring(0, m + 2) + extraLetter + tipName.substring(m + 3);
                    } else {
                        tipName2 = tipName.substring(0, m) + extraLetter + tipName.substring(m + 1)
                    }
                }
            }

            document.getElementById('poke-picture').style.display = 'none';
            document.getElementById('tip-content2').style.display = 'flex';
            document.getElementById('pokebox').style.height = "200px";
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('tip-button1').style.display = "none";
            document.getElementById('enviar').disabled = true;
            if (window.matchMedia("(max-width:600px)").matches) {
                document.getElementById('pokebox').style.paddingBottom = "10%";
                document.getElementById('pokebox').style.height = "230px";
            } else {
                document.getElementById('pokebox').style.paddingBottom = "6%";
            }
            setTimeout(function () {
                document.getElementById('tip-content2').style.animation = 'op .5s';
                document.getElementById('tip-content2').style.display = 'none';
                document.getElementById('poke-picture').style.display = 'block';
                document.getElementById("tip-bar").onclick = tip;
                document.getElementById('pokebox').style.height = "";
                document.getElementById('tip-button1').style.display = "block";
                document.getElementById('tip-button2').style.display = "block";
                document.getElementById('pokebox').style.paddingBottom = "0px";
                document.getElementById('pokebox').style.height = "";
                document.getElementById('enviar').disabled = false;
            }, 3000);
            tipMax = true;
        } else { //1ª DICA
            var dicas = localStorage.getItem('tipRate');
            if (parseInt(dicas) >= 1) {
                localStorage.setItem('tipRate', (parseInt(dicas) + 1))
            } else {
                localStorage.setItem('tipRate', 1)
            }
            
            document.getElementById('poke-picture').style.display = 'none';
            document.getElementById('tip-content').style.display = 'flex';
            document.getElementById('pokebox').style.height = "200px";
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('enviar').disabled = true;
            if (window.matchMedia("(max-width:600px)").matches) {
                document.getElementById('pokebox').style.paddingBottom = "10%";
                document.getElementById('pokebox').style.height = "230px";
            } else {
                document.getElementById('pokebox').style.paddingBottom = "6%";
            }
            setTimeout(function () {
                document.getElementById('tip-content').style.animation = 'op .5s';
                document.getElementById('tip-content').style.display = 'none';
                document.getElementById('poke-picture').style.display = 'block';
                document.getElementById("tip-bar").onclick = tip;
                document.getElementById('pokebox').style.height = "";
                document.getElementById('tip-button1').style.display = "block";
                document.getElementById('pokebox').style.paddingBottom = "0px";
                document.getElementById('pokebox').style.height = "";
                document.getElementById('enviar').disabled = false;
            }, 3000);
            tipActive = true;
        }
    }

    let genTip = ''
    if (padrao) { //sem filtro de geração
        if (randomPokemonId >= 1 && randomPokemonId <= 151) {
            genTip = "O Pokémon é da 1ª geração..."
        } else if (randomPokemonId >= 152 && randomPokemonId <= 251) {
            genTip = "O Pokémon é da 2ª geração..."
        } else if (randomPokemonId >= 252 && randomPokemonId <= 386) {
            genTip = "O Pokémon é da 3ª geração..."
        } else if (randomPokemonId >= 387 && randomPokemonId <= 493) {
            genTip = "O Pokémon é da 4ª geração..."
        } else if (randomPokemonId >= 494 && randomPokemonId <= 649) {
            genTip = "O Pokémon é da 5ª geração..."
        } else if (randomPokemonId >= 650 && randomPokemonId <= 721) {
            genTip = "O Pokémon é da 6ª geração..."
        } else if (randomPokemonId >= 722 && randomPokemonId <= 809) {
            genTip = "O Pokémon é da 7ª geração..."
        } else if (randomPokemonId >= 810 && randomPokemonId <= 905) {
            genTip = "O Pokémon é da 8ª geração..."
        } else {
            genTip = "O Pokémon é da 9ª geração..."
        }

        dica1.innerHTML = genTip;
        dica2.innerHTML = "Nome: " + tipName
    } else { //com filtro de geração
        dica1.innerHTML = "Nome: " + tipName
        dica2.innerHTML = "Nome: " + tipName2
    }
}
function reqTip1() {
    document.getElementById('poke-picture').style.display = 'none';
    document.getElementById('tip-content').style.display = 'flex';
    document.getElementById('pokebox').style.height = "200px";
    document.getElementById("tip-bar").onclick = '';
    document.getElementById('tip-button1').style.display = "none";
    document.getElementById('tip-button2').style.display = "none";
    document.getElementById('enviar').disabled = true;
    if (window.matchMedia("(max-width:600px)").matches) {
        document.getElementById('pokebox').style.paddingBottom = "10%";
        document.getElementById('pokebox').style.height = "230px";
    } else {
        document.getElementById('pokebox').style.paddingBottom = "6%";
    }
    setTimeout(function () {
        document.getElementById('tip-content').style.animation = 'op .5s';
        document.getElementById('tip-content').style.display = 'none';
        document.getElementById('poke-picture').style.display = 'block';
        document.getElementById("tip-bar").onclick = tip;
        document.getElementById('pokebox').style.height = "";
        document.getElementById('tip-button1').style.display = "";
        document.getElementById('tip-button1').style.display = "block";
        document.getElementById('pokebox').style.paddingBottom = "0px";
        document.getElementById('pokebox').style.height = "";
        document.getElementById('enviar').disabled = false;
        if (tipMax) {
            document.getElementById('tip-button2').style.display = "block";
        }
    }, 3000);
}
function reqTip2() {
    document.getElementById('poke-picture').style.display = 'none';
    document.getElementById('tip-content2').style.display = 'flex';
    document.getElementById('pokebox').style.height = "200px";
    document.getElementById("tip-bar").onclick = '';
    document.getElementById('tip-button1').style.display = "none";
    document.getElementById('tip-button2').style.display = "none";
    document.getElementById('enviar').disabled = true;
    if (window.matchMedia("(max-width:600px)").matches) {
        document.getElementById('pokebox').style.paddingBottom = "10%";
        document.getElementById('pokebox').style.height = "230px";
    } else {
        document.getElementById('pokebox').style.paddingBottom = "6%";
    }
    setTimeout(function () {
        document.getElementById('tip-content2').style.animation = 'op .5s';
        document.getElementById('tip-content2').style.display = 'none';
        document.getElementById('poke-picture').style.display = 'block';
        document.getElementById("tip-bar").onclick = tip;
        document.getElementById('pokebox').style.height = "";
        document.getElementById('tip-button2').style.display = "";
        document.getElementById('tip-button1').style.display = "block";
        document.getElementById('tip-button2').style.display = "block";
        document.getElementById('pokebox').style.paddingBottom = "0px";
        document.getElementById('pokebox').style.height = "";
        document.getElementById('enviar').disabled = false;
    }, 3000);
}

function tipAlert() {
    let tipalerta = document.getElementById('tipAlertBox');

    tipalerta.classList.remove('disappear');
    tipalerta.style.display = 'block';
    tipalerta.classList.add('appear');

    setTimeout(function () {
        tipalerta.classList.remove('appear');
        tipalerta.classList.add('disappear');
    }, 2500);
}

function reconect() {
    location.reload();
}

function gotogit() {
    window.open("https://github.com/mkaio/Guess-a-Mon.git", "_blank")
}
function emailme() {
    window.open("mailto:marcosb1@outlook.com", "_blank")
}

function leave() {
    document.getElementById('overlay2').style.animation = 'overlay-opacity .9s';
    document.getElementById('confirmBox').style.left = '30px';
    document.getElementById('overlay2').style.display = 'block';
}
function closeLC() {
    document.getElementById('confirmBox').style.left = '-300px';
    document.getElementById('overlay2').style.display = 'none';
    document.getElementById('overlay2').style.animation = '';
}

const backgroundMusic = document.getElementById('backgroundMusic');
function toggle() {
    backgroundMusic.muted = !backgroundMusic.muted
    if (!backgroundMusic.muted) {
        document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume.png"
        backgroundMusic.play();
    } else {
        document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume-mute.png"
    }
}

function settings() {
    if (window.matchMedia("(max-width:600px)").matches) {
        if (document.getElementById('configBox').style.left === '20px') {
            document.getElementById('configBox').style.left = '-210px';
            document.getElementById('overlay2').style.display = 'none';
        } else {
            document.getElementById('configBox').style.left = '20px';
            document.getElementById('overlay2').style.animation = 'overlay-opacity .9s';
            document.getElementById('overlay2').style.display = 'block';
        }
    } else {
        if (document.getElementById('configBox').style.left === '25px') {
            document.getElementById('configBox').style.left = '-210px';
        } else {
            document.getElementById('configBox').style.left = '25px';
        }
    }
}

if (localStorage.musicPreference === "Off") {
    document.getElementById('on-off').innerHTML = '&nbsp; Off';
    document.getElementById('on-off').style.color = 'red';
    document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume-mute.png";
    document.getElementById('volume').onclick = '';
    document.getElementById('volume').style.cursor = 'not-allowed'
}
function musichange() {
    if (document.getElementById('on-off').innerHTML === '&nbsp; On') {
        document.getElementById('on-off').innerHTML = '&nbsp; Off';
        document.getElementById('on-off').style.color = 'red';
        localStorage.setItem('musicPreference', "Off");
        document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume-mute.png";
        document.getElementById('volume').onclick = '';
        document.getElementById('volume').style.cursor = 'not-allowed';
    } else {
        document.getElementById('on-off').innerHTML = '&nbsp; On';
        document.getElementById('on-off').style.color = 'green';
        localStorage.setItem('musicPreference', "On");
        document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume.png";
        document.getElementById('volume').onclick = toggle;
        document.getElementById('volume').style.cursor = 'pointer';
    }
}

if (localStorage.soundPreference === "Off") {
    document.getElementById('sound_on-off').innerHTML = '&nbsp; Off';
    document.getElementById('sound_on-off').style.color = 'red';
}
function soundChange() {
    if (document.getElementById('sound_on-off').innerHTML === '&nbsp; On') {
        document.getElementById('sound_on-off').innerHTML = '&nbsp; Off';
        document.getElementById('sound_on-off').style.color = 'red';
        localStorage.setItem('soundPreference', "Off");
    } else {
        document.getElementById('sound_on-off').innerHTML = '&nbsp; On';
        document.getElementById('sound_on-off').style.color = 'green';
        localStorage.setItem('soundPreference', "On");
    }
}

var rate = Math.floor((correctRate / (correctRate + wrongRate)) * 100);
const pcRate = document.getElementById('pcRate');
if (rate <= 35) {
    pcRate.style.color = 'red';
} else if (rate > 35 && rate <= 65) {
    pcRate.style.color = 'yellow'
} else if (rate > 65) {
    pcRate.style.color = 'rgb(82, 255, 82)'
} else{
    pcRate.style.textShadow = 'none'
}

const userInfoBox = document.getElementById('user-container');
function recordPage() {
    if(rate>=0){
        pcRate.innerHTML = rate + "%";
    } else{
        pcRate.innerHTML = "-";
    }

    if (parseInt(dicas) >= 1) {
        document.getElementById('tipNum').innerHTML = dicas;
    } else {
        document.getElementById('tipNum').innerHTML = '0';
    }


    document.getElementById('overlay2').style.display = 'none';
    document.getElementById('startbutton').style.display = 'none';
    document.getElementById('actions').style.display = 'none';
    document.getElementById('level').style.display = 'none';
    document.getElementById('configBox').style.left = '-210px';
    document.getElementById('info').style.display = 'none'
    userInfoBox.style.display = 'flex';
    selection()
}

const recordSelect = document.getElementById('gen-select');
function backRecord() {
    document.getElementById('startbutton').style.display = 'block';
    document.getElementById('actions').style.display = 'flex';
    document.getElementById('level').style.display = 'block';
    userInfoBox.style.display = 'none';
    document.getElementById('info').style.display = 'flex'
    recordSelect.value = '0';
}
function selection() {
    const recordInfo = document.getElementById('numbers');

    if (recordSelect.value === "0") {
        if (localStorage.besTime == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime
        }
    } else if (recordSelect.value === "1") {
        if (localStorage.besTime1 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime1
        }
    } else if (recordSelect.value === "2") {
        if (localStorage.besTime2 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime2
        }
    } else if (recordSelect.value === "3") {
        if (localStorage.besTime3 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime3
        }
    } else if (recordSelect.value === "4") {
        if (localStorage.besTime4 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime4
        }
    } else if (recordSelect.value === "5") {
        if (localStorage.besTime5 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime5
        }
    } else if (recordSelect.value === "6") {
        if (localStorage.besTime6 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime6
        }
    } else if (recordSelect.value === "7") {
        if (localStorage.besTime7 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime7
        }
    } else if (recordSelect.value === "8") {
        if (localStorage.besTime8 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime8
        }
    } else if (recordSelect.value === "9") {
        if (localStorage.besTime9 == null) {
            recordInfo.innerHTML = "Você ainda não possui um tempo recorde registrado nessa modalidade."
        } else {
            recordInfo.innerHTML = "Seu melhor tempo foi de " + besTime9
        }
    }
}

var trainerName = localStorage.getItem('name');
function updateName() {
    var nameInput = document.getElementById('name-input').value;
    localStorage.setItem('name', nameInput);
    nameInput = ''
}

var gender = localStorage.getItem('gender');
if (gender === "F") {
    document.getElementById('character').src = "../Guess-a-Mon/static/images/character_leaf.png";
    document.getElementById('trainer').style.backgroundColor = 'rgb(255, 183, 241)';
    if (!trainerName) {
        document.getElementById('cDesc').innerHTML = 'Treinadora Pokémon';
    } else {
        document.getElementById('cDesc').innerHTML = 'Treinadora ' + trainerName;
    }
} else {
    document.getElementById('character').src = "../Guess-a-Mon/static/images/character_red.png"
    document.getElementById('trainer').style.backgroundColor = 'rgb(133, 161, 255)';
    if (!trainerName) {
        document.getElementById('cDesc').innerHTML = 'Treinador Pokémon';
    } else {
        document.getElementById('cDesc').innerHTML = 'Treinador ' + trainerName;
    }
}
function changender() {
    var trainerName = localStorage.getItem('name');
    var gender = localStorage.getItem('gender');
    if (gender === 'F') {
        document.getElementById('character').src = "../Guess-a-Mon/static/images/character_red.png"
        document.getElementById('trainer').style.backgroundColor = 'rgb(133, 161, 255)';
        localStorage.setItem('gender', "M");
        if (!trainerName) {
            document.getElementById('cDesc').innerHTML = 'Treinador Pokémon';
        } else {
            document.getElementById('cDesc').innerHTML = 'Treinador ' + trainerName;
        }
    } else {
        document.getElementById('character').src = "../Guess-a-Mon/static/images/character_leaf.png"
        document.getElementById('trainer').style.backgroundColor = 'rgb(255, 183, 241)';
        localStorage.setItem('gender', "F");
        if (!trainerName) {
            document.getElementById('cDesc').innerHTML = 'Treinadora Pokémon';
        } else {
            document.getElementById('cDesc').innerHTML = 'Treinadora ' + trainerName;
        }
    }
}