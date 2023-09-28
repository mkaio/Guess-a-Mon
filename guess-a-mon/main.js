function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

let pontos = 0

function getRandomPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const maxPokemonCount = 1018;
            const randomPokemonId = getRandomInt(maxPokemonCount)

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

            console.log(randomPokemonId)
        });

    const botao = document.getElementById('startbutton')
    const guessform = document.getElementById('guessform')
    botao.style.display = 'none'
    guessform.style.display = 'flex'

}

function keep() {
    const maxPokemonCount = 1018;
    let randomPokemonId = getRandomInt(maxPokemonCount)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            document.getElementById('poke-picture').src = response.sprites.front_default

            currentPokemonName =  response.name
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

    if (userGuess === currentPokemonName) {
        document.getElementById('poke-picture').src = "../images/GAM-correto.png"
        document.getElementById('loading').style.display = "block"
        pontos=pontos+3
    } else {
        if(pontos>0){
            document.getElementById('poke-picture').src = "../images/GAM-errado.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: "+nome
            document.getElementById('loading').style.display = "block"
            pontos = pontos-1
        } else{
            document.getElementById('poke-picture').src = "../images/GAM-endgame.png"
            document.getElementById('correction').innerHTML = "O Pokémon era: "+nome
            setTimeout(function () {
                location.reload();
            }, 3000);
            return;
        }
    }
    guessBox.value = '';
    document.getElementById('points').innerHTML = "Pontos: "+pontos

    if(pontos>=20){
        document.getElementById('poke-picture').src = "../images/win-GAM.png"
        document.getElementById('loading').style.display = "none"
        setTimeout(function () {
            location.reload();
        }, 4000);
        return;
    }

    setTimeout(function () {
        document.getElementById('loading').style.display = "none"
        keep();
    }, 5000);
}

guessBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        check();
    }
})
