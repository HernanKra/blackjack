let btnMenu = document.getElementById('ingresar');
const menu = document.getElementById('menu');
let nombre = document.getElementById('nombre');
let edad = document.getElementById('edad');

console.log(nombre.value);
console.log(edad.value);

btnMenu.addEventListener('click', e => {
    if(e.target === btnMenu) {
            menu.classList.toggle('active')
            
    }
})

let mesa = 0;
let jugador = 0;

let mesaAces = 0;
let jugadorAces = 0;

let hidden;
let mazo;

let canHit = true;

window.onload = function () {
    armarMazo();
    mezclarMazo();
    iniciarJuego();
}

function armarMazo() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    mazo = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            mazo.push(values[j] + "-" + types[i]);
        }
    }
    // console.log(mazo);
}

function mezclarMazo() {
    for (let i = 0; i < mazo.length; i++) {
        let j = Math.floor(Math.random() * mazo.length);
        let temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }
    console.log(mazo);
}

function iniciarJuego() {
    hidden = mazo.pop();
    mesa += getValue(hidden);
    mesaAces += checkAce(hidden);
    // console.log(hidden);
    // console.log(mesa);
    while (mesa < 17) {
        let cardImg = document.createElement("img");
        let card = mazo.pop();
        cardImg.src = "./cards/" + card + ".png";
        mesa += getValue(card);
        mesaAces += checkAce(card);
        document.getElementById("mesa-cards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = mazo.pop();
        cardImg.src = "./cards/" + card + ".png";
        jugador += getValue(card);
        jugadorAces += checkAce(card);
        document.getElementById("jugador-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = mazo.pop();
    cardImg.src = "./cards/" + card + ".png";
    jugador += getValue(card);
    jugadorAces += checkAce(card);
    document.getElementById("jugador-cards").append(cardImg);

    if (reduceAce(jugador, jugadorAces) > 21) {
        canHit = false;
    }

}

function stay() {
    mesa = reduceAce(mesa, mesaAces);
    jugador = reduceAce(jugador, jugadorAces);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (jugador > 21) {
        message = "Perdiste!";
    }
    else if (mesa > 21) {
        message = "Ganaste!";
    }
    //both you and dealer <= 21
    else if (jugador == mesa) {
        message = "Empate!";
    }
    else if (jugador > mesa) {
        message = "Ganaste!";
    }
    else if (jugador < mesa) {
        message = "Perdiste!";
    }

    document.getElementById("mesa").innerText = mesa;
    document.getElementById("jugador").innerText = jugador;
    document.getElementById("resultado").innerText = message;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(jugador, jugadorAces) {
    while (jugador > 21 && jugadorAces > 0) {
        jugador -= 10;
        jugadorAces -= 1;
    }
    return jugador;
}