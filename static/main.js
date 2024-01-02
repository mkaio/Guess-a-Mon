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

let feedbackactive = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function gen(number) {
    switch (number) {
        case 1:
            min = 1;
            max = 151;
            getRandomPokemon();
            break;
        case 2:
            min = 152;
            max = 251;
            getRandomPokemon();
            break;
        case 3:
            min = 252;
            max = 386;
            getRandomPokemon();
            break;
        case 4:
            min = 387;
            max = 493;
            getRandomPokemon();
            break;
        case 5:
            min = 494;
            max = 649;
            getRandomPokemon();
            break;
        case 6:
            min = 650;
            max = 721;
            getRandomPokemon();
            break;
        case 7:
            min = 722;
            max = 809;
            getRandomPokemon();
            break;
        case 8:
            min = 810;
            max = 905;
            getRandomPokemon();
            break;
        case 9:
            min = 906;
            max = 1017;
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
function getRandomPokemon() {
    if (localStorage.musicPreference === "On" || localStorage.length === 0) {
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

const guessBox = document.getElementById('guessbox');
function check() {
    const userGuess = guessBox.value.toLowerCase();
    let nome = currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1);

    let crono = document.getElementById('cronometro').innerText;
    let tempofinal = crono.replace('Tempo: ', '');

    let feedbackPontos = document.getElementById('point-back')

    if (userGuess === currentPokemonName) {
        document.getElementById('loading').style.display = "block"
        document.getElementById('pokebox').style.paddingBottom = "1%";
        pause();
        feedbackactive = true
        document.getElementById('enviar').disabled = true
        document.getElementById("tip-bar").onclick = '';
        document.getElementById('popup-tip1').style.transition = 'right 0.8s';
        document.getElementById('popup-tip1').style.right = '-400px';
        document.getElementById('popup-tip2').style.right = '-400px';
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

        if (pontos >= 20) {
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/win-GAM.png"
            document.getElementById('loading').style.display = "none"
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('popup-tip1').style.transition = 'right 0.8s';
            document.getElementById('popup-tip1').style.right = '-400px';
            document.getElementById('popup-tip2').style.right = '-400px';
            document.getElementById('time-feedback').innerHTML = "Seu tempo foi de " + tempofinal
            document.getElementById('pokebox').style.paddingBottom = "20px"
            document.getElementById('leave-button').onclick = ''
            guessBox.value = '';
            setTimeout(function () {
                location.reload();
            }, 6000);
            return;
        }
        document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-correto.png"
        setTimeout(function () {
            feedbackPontos.style.display = 'none'
        }, 2300);
    } else {
        if (pontos > 0) {
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-errado.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            document.getElementById('loading').style.display = "block"
            document.getElementById('pokebox').style.paddingBottom = "20px"
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('popup-tip1').style.transition = 'right 0.8s';
            document.getElementById('popup-tip1').style.right = '-400px';
            document.getElementById('popup-tip2').style.right = '-400px';
            pontos = pontos - 1

            feedbackPontos.innerHTML = "-1"
            feedbackPontos.style.color = "red"
            feedbackPontos.style.display = 'block'
            setTimeout(function () {
                feedbackPontos.style.display = 'none'
            }, 2300);
        } else {
            document.getElementById('poke-picture').src = "../Guess-a-Mon/static/images/GAM-endgame.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            document.getElementById("tip-bar").onclick = '';
            document.getElementById('popup-tip1').style.transition = 'right 0.8s';
            document.getElementById('popup-tip1').style.right = '-400px';
            document.getElementById('popup-tip2').style.right = '-400px';
            document.getElementById('leave-button').onclick = ''
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
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('pop-up').style.display = 'block';
}

function closepopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('pop-up').style.display = 'none';
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
function tip() {
    const popupTip1 = document.getElementById('popup-tip1');
    const popupTip2 = document.getElementById('popup-tip2');
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

    if (window.matchMedia("(max-width:600px)").matches) {
        if (tipMax) {
            if (popupTip1.style.right === '190px') {
                popupTip1.style.right = '-400px';
                popupTip2.style.right = '-400px';
            } else {
                popupTip1.style.right = '190px';
                popupTip2.style.right = '5px';
            }
        } else {
            if (tipActive) {
                popupTip1.style.right = '190px';

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

                setTimeout(function () {
                    popupTip2.style.right = '5px';
                }, 800);
                tipMax = true;
            } else {
                popupTip1.style.bottom = '20px';
                popupTip1.style.right = '5px';
                tipActive = true;
                dica2.innerHTML = ''
            }
        }
    } else {
        if (tipMax) {
            if (popupTip1.style.right === '20px') {
                popupTip1.style.transition = 'right 0.8s';
                popupTip1.style.right = '-400px';
                popupTip2.style.right = '-400px';
            } else {
                popupTip1.style.right = '20px';
                popupTip2.style.right = '20px';
            }
        } else {
            if (tipActive) {
                popupTip1.style.transition = 'bottom 1s';
                popupTip1.style.bottom = '150px';

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

                setTimeout(function () {
                    popupTip2.style.right = '20px';
                }, 800);
                tipMax = true;
            } else {
                popupTip1.style.bottom = '20px';
                popupTip1.style.right = '20px';
                tipActive = true;
                dica2.innerHTML = ''
            }
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
        document.getElementById('volume').style.cursor = 'not-allowed'
    } else {
        document.getElementById('on-off').innerHTML = '&nbsp; On';
        document.getElementById('on-off').style.color = 'green';
        localStorage.setItem('musicPreference', "On");
        document.getElementById('volume').src = "../Guess-a-Mon/static/images/volume.png";
        document.getElementById('volume').onclick = toggle;
        document.getElementById('volume').style.cursor = 'pointer';
    }
}