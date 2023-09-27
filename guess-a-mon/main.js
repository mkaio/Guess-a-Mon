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
}


function check() {
    const guessBox = document.getElementById('guessbox');
    const userGuess = guessBox.value.toLowerCase();

    if (userGuess === currentPokemonName) {
        alert("Você acertou")
        pontos=pontos+3
        keep()
    } else {
        if(pontos>0){
            alert("Errado! Tente novamente. Nome correto: "+currentPokemonName)
            pontos = pontos-1 
            keep()
        } else{
            alert("Errado! Fim de jogo. Tente novamente. Nome correto: "+currentPokemonName)
            location.reload()
        }
        
    }
    document.getElementById('points').innerHTML = "Pontos: "+pontos
}