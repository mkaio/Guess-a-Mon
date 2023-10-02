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

                    document.getElementById('poke-picture').src = response.sprites.front_default;

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

    start()
}

function keep() {
    let randomPokemonId = getRandomInt(min,max)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            document.getElementById('poke-picture').src = response.sprites.front_default

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
        pontos = pontos + 3
    } else {
        if (pontos > 0) {
            document.getElementById('poke-picture').src = "../images/GAM-errado.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            document.getElementById('loading').style.display = "block"
            document.getElementById('pokebox').style.paddingBottom = "20px"
            pause();
            pontos = pontos - 1
        } else {
            document.getElementById('poke-picture').src = "../images/GAM-endgame.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: " + nome
            pause();
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
        keep();
        start();
    }, 4000);
}

guessBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        check();
    }
})

function filters() {
    document.getElementById('startbutton').style.display = 'none'
    document.getElementById('actions').style.display = 'none'
    document.getElementById('filterbar').style.display = 'flex'
}