import { diccionario } from "https://cdn.jsdelivr.net/gh/fran-dawbaza/spanish-dictionary/diccionario.js";

let contador = makeCounter(1);// Controla el tiempo
const limite = 60;// Maximo tiempo de partida 60 => 1min
let puntos = 0;// Puntos conseguidos durante la partida
let nombreJugador = "";
let timer;
let partida;
let letra; // Primera letra de la palabra
let listaPalabras = new Array();// Lista de palabras correctas

const tablaRanking = document.getElementById('tablaRanking');

const inputPalabras = document.getElementById("palabra");
inputPalabras.dataset.jugador = "nuevo";

const datosRanking = localStorage.getItem('Jugador');   
let jugadores = [];
    if (datosRanking) {
        jugadores = JSON.parse(datosRanking);
    }

const botonRanking = document.getElementById('botonRanking');
botonRanking.dataset.activo = "";
//Boton que controla la visibilidad de la tabla
botonRanking.addEventListener('click',() => {
    if (botonRanking.dataset.activo) {
        botonRanking.dataset.activo = "";
        tablaRanking.style.display = "none";
        // tablaRanking.hidden = true;
        botonRanking.classList.remove("btn-outline-success");
        botonRanking.classList.add("btn-success");
    }
    else {
        muestraRanking();
        botonRanking.dataset.activo = "true";
        tablaRanking.style.display = "table";
        // tablaRanking.hidden = false;
        botonRanking.classList.remove("btn-success");
        botonRanking.classList.add("btn-outline-success");
        
    }
}); 

//Muestra una tabla con los datos de los jugadores
function muestraRanking() {
    
    const tbody = tablaRanking.getElementsByTagName('tbody')[0];
    let qualy = ["🥇","🥈","🥉"];
    let i = 0;

    tbody.innerHTML = "";

    jugadores.forEach(jugador => {
        let fila = document.createElement('tr');
        let posicion = document.createElement('th');
        let nombre = document.createElement('td');
        let puntosRanking = document.createElement('td');
        i++;
        if (i<4) {
            posicion.textContent = qualy[i-1];
        }
        else posicion.textContent = i;
        posicion.scope = "row";
        fila.appendChild(posicion)

        nombre.textContent = jugador.nombreJugador;
        fila.appendChild(nombre)

        puntosRanking.textContent = jugador.puntos;
        fila.appendChild(puntosRanking)
        tbody.appendChild(fila);
    });
    // tablaRanking.hidden = false;
}

//Guarda los datos ordenados de los jugadores en localstorage
function guardaRanking(nombreJugador, puntos) {
    const nuevoJugador = { nombreJugador, puntos };
    jugadores.push(nuevoJugador);

    jugadores.sort((a, b) => b.puntos - a.puntos);

    localStorage.setItem('Jugador', JSON.stringify(jugadores));
}

// Controla la entrada de palabras
document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault();
    // const palabra = inputPalabras.value;
    console.log(palabra.value);
    // Control de datos de entrada (Palabra)
    if (inputPalabras.dataset.jugador === "nuevo") {
        nombreJugador = inputPalabras.value;

        inputPalabras.dataset.jugador = "partida";
        clearInput();
        reset();
    }
    else {
        if (compruebaChars(palabra, letra)) {

            if (diccionario.includes(palabra.value.toLowerCase())) {// Si la palabra esta repetida
                if (listaPalabras.includes(palabra.value.toLowerCase())) {
                    // alert("Palabra repetida");
                    muestraPista("Palabra repetida");
                }
                else {
                    // Introduce la palabra en la lista de palabras y suma puntos
                    listaPalabras.push(palabra.value.toLowerCase());
                    puntos += (puntosLetra(palabra) + puntosLongitud(palabra) + puntosExtra(palabra));
                    clearInput();
                }
            }
            else {// La palabra no se encuentra en la lista de palabras
                muestraPista("Palabra no encontrada");
            }
        }

        document.getElementById('puntos').innerHTML = puntos;

    }

});

// Boton de reinicio
document.getElementById("restart").addEventListener("click", (e) => {
    reset();
});

// Inicia el juego
// document.getElementById("iniciar").addEventListener('click', (e) => {
//     e.preventDefault();
//     // Inicia el contador
//     contador = makeCounter(0);
//     timer = setInterval(() => {
//         document.getElementById('contador').innerHTML = contador();
//     }, 1000);
//     //Inicia la letra aleatoria
//     letra = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
//     document.getElementById("letra").innerHTML = letra;
//     // Para el contador
//     setTimeout(() =>{clearInterval(timer), alert("Se termino el juego: " + puntos + " puntos")}, (limite*1000)+100);

// })

// let timer = setInterval(() => {
//     document.getElementById('contador').innerHTML = contador();
// }, 1000);

// Resetea el juego
function reset() {

    muestraPista("Introduce una palabra");
    puntos = 0;
    document.getElementById('puntos').innerHTML = puntos;
    // Resetea la letra
    letra = letraAleatoria();
    // Resetea el contador de tiempo
    contador = makeCounter(0);
    clearInterval(timer);
    // Indica el tiempo de partida
    timer = setInterval(() => {
        document.getElementById('contador').innerHTML = contador();
    }, 1000);
    // Para el juego cuando llega al limite de tiempo
    clearInterval(partida);
    partida = setTimeout(() => {
        clearInterval(timer),
            muestraLista(),// Muestra la lista de palabras introducidas
            inputPalabras.disabled = true,// Deshabilita el input de texto
            alert("Se termino el juego: " + puntos + " puntos")
            guardaRanking(nombreJugador, puntos);
    }, (limite * 1000) + 100);


    // Limpia la lista de palabras mostrada
    document.getElementById("lista").innerHTML = " ";
    // Limpia el array donde se guardan las palabras introducidas
    listaPalabras = [];
    // Habilita el input de texto
    inputPalabras.disabled = false;
}
// Muestra la lista de palabras usadas
function muestraLista() {
    for (let i = 0; i < listaPalabras.length; i++) {
        document.getElementById("lista").innerHTML += listaPalabras[i] + "\n";
    }
}
//Muestra una pista por pantalla
function muestraPista(pista) {
    document.getElementById("pista").innerHTML = pista;
}

function compruebaChars(palabra, letra) {
    let centinela = true;
    const especiales = ["Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú", "Ñ", "ñ"];

    for (let i = 0; i < palabra.value.length; i++) {
        if (palabra.value[i].toUpperCase() < "A" || palabra.value[i].toUpperCase() > "Z") {// Comprueba que los caracter sean letras
            centinela = false;

        }
        if (especiales.includes(palabra.value[i])) {
            centinela = true;
        }

    }
    if (centinela == false) {
        muestraPista("Caracteres incorrectos");
    }
    if (palabra.value[0].toUpperCase() !== letra.toUpperCase()) {// Primera letra de la palabra
        muestraPista("Letra inicial incorrecta");
        centinela = false;
    }

    return centinela
}

//Funciones de puntuacion
function puntosLetra(palabra) {
    let puntos = 0;
    // Puntos	Letra inicial
    // 1	    A, C, D y E
    // 2	    M, P, R, S y T
    // 3	    B, F, G, H, I y V
    // 4	    J, L, N, O y Z
    // 5	    K, Ñ, Q, U, W, X e Y
    console.log("Letra: " + palabra.value[0].toUpperCase())

    switch (palabra.value[0].toUpperCase()) {

        case "A":
        case "C":
        case "D":
        case "E":
            puntos += 1;
            break;

        case "M":
        case "P":
        case "R":
        case "S":
        case "T":
            puntos += 2;
            break;

        case "B":
        case "F":
        case "G":
        case "H":
        case "I":
        case "V":
            puntos += 3;
            break;

        case "J":
        case "L":
        case "N":
        case "O":
        case "Z":
            puntos += 4;
            break;

        case "K":
        case "Ñ":
        case "Q":
        case "U":
        case "W":
        case "X":
        case "Y":
            puntos += 5;
            break;
    }
    console.log("Puntos por letra " + puntos)
    return puntos;
}

function puntosLongitud(palabra) {

    let puntos = 0;
    // Puntos	Longitud
    // 1	    8, 9, 10, 11 y 12
    // 2	    6, 7, 13 y 14
    // 3	    5 y 15
    // 4	    4, 16 y 17
    // 5	    1, 2, 3, 18 y mayores de 18
    console.log("Longitud: " + palabra.value.length)

    switch (palabra.value.length) {

        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            puntos += 1;
            break;

        case 6:
        case 7:
        case 13:
        case 14:
            puntos += 2;
            break;

        case 5:
        case 15:
            puntos += 3;
            break;

        case 4:
        case 16:
        case 17:
            puntos += 4;
            break;

        case 1:
        case 2:
        case 3:
        case 18:
            puntos += 5;
            break;
    }
    console.log("Puntos longitud: " + puntos)

    return puntos;
}

// puntos += puntosExtra(palabra);
function puntosExtra(palabra) {
    let puntos = 0;
    // letra K, Ñ, Q, W, X e Y => +1 punto
    const extra = ["K", "Ñ", "Q", "W", "X", "Y"];

    for (let i = 0; i < palabra.value.length; i++) {
        if (extra.includes(palabra.value[i].toUpperCase())) {
            puntos++;
        }
    }
    console.log("Puntos Extra: " + puntos);
    return puntos;
}
//Limpia el input
function clearInput() {
    ;// ? usar .value
    if (palabra.value != "") {
        palabra.value = "";
    }
}
// Muestra una letra aleatoria en cada ejecución de la funcion
function letraAleatoria() {
    let letra = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
    document.getElementById("letra").innerHTML = letra;
    inputPalabras.placeholder = letra;
    return letra;
}

// Crea un contador con un valor dado y lo aumenta cada vez que es llamado
function makeCounter(counter) {
    return function () {
        // document.getElementById("contador").innerHTML = counter;
        return counter++;
    }
}

// Crea un contador que va desde el valor dado hasta 0
function makeTimeout(time) {
    return function () {
        return time--;
    }
}

