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
            pause()
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



let feedbackactive = false

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
            getRandomPokemon();
            break;
    }
}

let pontos = 0

function getRandomPokemon() {
    if (selectedDifficulty === "Fácil") {
        document.getElementById("guessbox").oninput = buscar;
    }
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const randomPokemonId = getRandomInt(min, max)

            fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                    const pokebox = document.getElementById('pokebox');
                    pokebox.style.display = 'flex';

                    if (randomPokemonId === 1011) {
                        document.getElementById('poke-picture').src = "../images/1011-Dipplin.png"
                    } else if (randomPokemonId === 1012) {
                        document.getElementById('poke-picture').src = "../images/1012-poltchageist.jpg"
                    } else if (randomPokemonId === 1013) {
                        document.getElementById('poke-picture').src = "../images/1013-sinistcha.png"
                    } else if (randomPokemonId === 1014) {
                        document.getElementById('poke-picture').src = "../images/1014-Okidogi.webp"
                    } else if (randomPokemonId === 1015) {
                        document.getElementById('poke-picture').src = "../images/1015-munkidori.jpg"
                    } else if (randomPokemonId === 1016) {
                        document.getElementById('poke-picture').src = "../images/1016-Fezandipiti.png"
                    } else if (randomPokemonId === 1017) {
                        document.getElementById('poke-picture').src = "../images/1017-ogerpon.jpg"
                    } else {
                        document.getElementById('poke-picture').src = response.sprites.front_default;
                    }
                    currentPokemonName = response.name;
                })
                .catch(function (error) {
                    console.error('Ocorreu um erro:', error);
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

    start()
}

function keep() {
    let randomPokemonId = getRandomInt(min, max)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);

            if (randomPokemonId === 1011) {
                document.getElementById('poke-picture').src = "../images/1011-Dipplin.png"
            } else if (randomPokemonId === 1012) {
                document.getElementById('poke-picture').src = "../images/1012-poltchageist.jpg"
            } else if (randomPokemonId === 1013) {
                document.getElementById('poke-picture').src = "../images/1013-sinistcha.png"
            } else if (randomPokemonId === 1014) {
                document.getElementById('poke-picture').src = "../images/1014-Okidogi.webp"
            } else if (randomPokemonId === 1015) {
                document.getElementById('poke-picture').src = "../images/1015-munkidori.jpg"
            } else if (randomPokemonId === 1016) {
                document.getElementById('poke-picture').src = "../images/1016-Fezandipiti.png"
            } else if (randomPokemonId === 1017) {
                document.getElementById('poke-picture').src = "../images/1017-ogerpon.jpg"
            } else {
                document.getElementById('poke-picture').src = response.sprites.front_default;
            }

            currentPokemonName = response.name
        })
        .catch(function (error) {
            console.error('Ocorreu um erro:', error);
        });
    document.getElementById('correction').innerHTML = ''
}

const guessBox = document.getElementById('guessbox');
function check() {
    const userGuess = guessBox.value.toLowerCase();
    let nome = currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1);

    let crono = document.getElementById('cronometro').innerText;
    let tempofinal = crono.replace('Tempo: ', '');

    if (userGuess === currentPokemonName) {
        document.getElementById('poke-picture').src = "../images/GAM-correto.png"
        document.getElementById('loading').style.display = "block"
        document.getElementById('pokebox').style.paddingBottom = "1%";
        pause();
        feedbackactive = true
        document.getElementById('enviar').disabled = true
        pontos = pontos + 3
    } else {
        if (pontos > 0) {
            document.getElementById('poke-picture').src = "../images/GAM-errado.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            document.getElementById('loading').style.display = "block"
            document.getElementById('pokebox').style.paddingBottom = "20px"
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            pontos = pontos - 1
        } else {
            document.getElementById('poke-picture').src = "../images/GAM-endgame.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            pause();
            feedbackactive = true
            document.getElementById('enviar').disabled = true
            guessBox.value = '';
            setTimeout(function () {
                location.reload();
            }, 3000);
            return;
        }
    }
    guessBox.value = '';
    document.getElementById('points').innerHTML = "Pontuação: " + pontos + " / 20"

    if (pontos >= 20) {
        document.getElementById('poke-picture').src = "../images/win-GAM.png"
        document.getElementById('loading').style.display = "none"
        pause();
        feedbackactive = true
        document.getElementById('enviar').disabled = true
        document.getElementById('time-feedback').innerHTML = "Seu tempo foi de " + tempofinal
        document.getElementById('pokebox').style.paddingBottom = "20px"
        setTimeout(function () {
            location.reload();
        }, 6000);
        return;
    }

    setTimeout(function () {
        document.getElementById('loading').style.display = "none"
        document.getElementById('pokebox').style.paddingBottom = "3%"
        document.getElementById('enviar').disabled = false
        keep();
        start();
        feedbackactive = false
    }, 4000);
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
}

function backfilter() {
    document.getElementById('startbutton').style.display = 'block'
    document.getElementById('actions').style.display = 'flex'
    document.getElementById('filterbar').style.display = 'none'
    document.getElementById('level').style.display = 'block'
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
        document
            .querySelectorAll('.resultado-botao')
        [resultadoSelecionadoIndex].classList.remove('resultado-selecionado');
    }

    resultadoSelecionadoIndex = index;

    if (resultadoSelecionadoIndex >= 0) {
        document
            .querySelectorAll('.resultado-botao')
        [resultadoSelecionadoIndex].classList.add('resultado-selecionado');
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
                if (resultadoSelecionadoIndex >= 0) {
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
    }
});

