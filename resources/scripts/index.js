let pokemon = []; // declaring pokemon array
let pokeName; // declaring variable to store selected pokemon name
let pokeUrl; // declaring variable to store selected pokemon url;
const apiUrl = "https://pokeapi.co/api/v2/pokemon/"; // api urls

function handleOnLoad() { 
    getPokemon(); // getting all pokemon on load of site
}

function getPokemon() {
    fetch(apiUrl) // api fetch to get pokemon from api's url
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            makePokeTable(data); // calling make table to display pokemon from api fetch
        })
}

function makePokeTable(pokemon) {
    let table = document.createElement('TABLE'); // buncha code for creating HTML table in JavaScript to be dynamic
    table.id = 'pokemonTable';
    table.className = 'table';
    let tableBody = document.createElement('TBODY');
    tableBody.id = 'pokemonTableBody';
    table.appendChild(tableBody);

    let tr = document.createElement('TR');
    tr.id = 'tb-headers';
    tableBody.appendChild(tr);

    let th2 = document.createElement('TH');
    th2.id = 'PokemonHeader';
    th2.appendChild(document.createTextNode('Pokemon'));
    tr.appendChild(th2);

    let th3 = document.createElement('TH');
    th3.id = 'SelectHeadBtn';
    th3.appendChild(document.createTextNode('Choose your pokemon! (scroll for more)'));
    tr.appendChild(th3);

    pokemon.results.forEach(p => {
        let tr = document.createElement('TR');
        tableBody.appendChild(tr);
    
        let td2 = document.createElement('TD');
        td2.id = 'PokeNameRow'
        td2.appendChild(document.createTextNode(`${capitalizeFirstLetter(p.name)}`));
        tr.appendChild(td2);

        let selectBtn = document.createElement('BUTTON');
            selectBtn.className = "btn btn-success";
            selectBtn.style = 'margin: 5px';
            selectBtn.id = `${p.url}`; // giving select button id of pokemon so we know which is targeted
            selectBtn.onclick = () => {
                handleSelectClick(p.name, p.url); // clicking button runs the select function
            }
            selectBtn.appendChild(document.createTextNode('Select'));
            tr.appendChild(selectBtn);
    });
    myTable.appendChild(table);
}

async function handleSelectClick(pname, purl) {
    document.body.style.cursor = 'url("resources/images/master-ball-cursor.png"), auto'; // changing cursor to master ball
    document.body.style.backgroundImage = 'url("resources/images/background-hero.webp")'; // setting background environment
    document.body.style.backgroundSize = 'cover'; // resizing new background
    pokeName = capitalizeFirstLetter(pname); // capitalizing the first letter of pokemon name 
    pokeUrl = purl;
    getSelectedData(pokeUrl, pokeName); // getting data of selected pokemon
}

function getSelectedData(pokeUrl, pokeName) {
    fetch(pokeUrl) // fetching selected poke data
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            makePokeCard(data, pokeName); // displaying selected pokes data
        })
}

function makePokeCard(pokeData, pokeName) {
    const abilitiesList = pokeData.abilities.map((ability) => `<h4>${ability.ability.name}</h4>`); // creating an html tag for all abilities of pokemon
    const abilitiesHTML = abilitiesList.join('');
    // next is setting the html for the selected pokes info
    document.getElementById("app").innerHTML = `
    <button id="goBack" class="btn btn-success" onclick="handleGoBack()">Go Back</button>
    <h1 id="selectHeader">Your Pokemon Pal !</h1>
    <h2 id="pokeName">${pokeName}</h2>
    <h3 id="moves">Moves:</h3>
    <div id="abilities">
        ${abilitiesHTML}
    </div>
    <img id="sprite" src="${pokeData.sprites.front_default}" alt="sprite image" width="500" height="600"/>
`;
}

function handleGoBack() {
    location.reload(); // go back click refreshes the page to restore html and show all pokemon
}

function capitalizeFirstLetter(string) {
    // check if the string is not empty
    if (string.length === 0) {
        return string;
    }

    // Capitalize the first letter and concatenate it with the rest of the string
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function play() {
    var audio = document.getElementById("audio");
    audio.play();
}