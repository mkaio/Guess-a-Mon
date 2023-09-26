function getRandomPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const maxPokemonCount = data.count;
            const randomPokemonId = Math.floor(Math.random() * maxPokemonCount) + 1;
            
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

    const botao = document.getElementById('startbutton')
    const guessform = document.getElementById('guessform')
    botao.style.display = 'none'
    guessform.style.display = 'flex'

}

function loadNewPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const maxPokemonCount = data.count;
            const randomPokemonId = Math.floor(Math.random() * maxPokemonCount) + 1;

            return fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        })
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
}

function check(){
    const guessBox = document.getElementById('guessbox');
    const userGuess = guessBox.value.toLowerCase();

    if (userGuess === currentPokemonName) {
        alert('Você acertou!');
    } else {
        alert('Errado!'); 
    }

    loadNewPokemon();
}

