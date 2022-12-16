import {diccionario} from "https://cdn.jsdelivr.net/gh/fran-dawbaza/spanish-dictionary/diccionario.js";

let contador = makeCounter(1);// Controla el tiempo
let limite = 60;// Maximo tiempo de partida 60 => 1min
let puntos = 0;// Puntos conseguidos durante la partida
let timer;
let partida;
// let letra = document.getElementById("letra");
let letra; // Primera letra de la palabra
let listaPalabras = new Array();// Lista de palabras correctas

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

// Controla la entrada de palabras
document.getElementById('formulario').addEventListener('submit',(e)=> {
    e.preventDefault();
    let centinela = true;
    // Control de datos de entrada (Palabra)
    // TODO: Cambiar la estructura para que sea mas facil | 1 caracteres > 2 letra inicial > 3 busca diccionario > 4 repetida
    for (let i = 0; i< palabra.value.length; i++) {
        if (palabra.value[i].toUpperCase() < "A" || palabra.value[i].toUpperCase() > "Z") {// Comprueba que los caracter sean letras
            centinela = false;
        }
    }
    if (centinela == false) {
        document.getElementById("pista").innerHTML = "Caracteres incorrectos";
    }
    // if (contador() >= limite) {// Limite de tiempo
    //     // alert("Se termino el juego: " + puntos + " puntos");
    //     document.getElementById("pista").innerHTML = "Se termino el juego: " + puntos + " puntos";
    //     centinela = false;
    // }

    else if (palabra.value[0].toUpperCase() === letra[0].toUpperCase()) {// Primera letra de la palabra
        
        if (diccionario.includes(palabra.value.toLowerCase())) {// Si la palabra esta repetida
            if (listaPalabras.includes(palabra.value.toLowerCase())) {
                // alert("Palabra repetida");
                document.getElementById("pista").innerHTML = "Palabra repetida";
            }
            else {
                // Introduce la palabra en la lista de palabras
                listaPalabras.push(palabra.value.toLowerCase());
                puntos += puntuacion(palabra);
                // puntos += palabra.value.length;
                clearInput();
            }
        }
        else {// La palabra se encuentra en la lista de palabras
            // alert("Palabra repetida");
            document.getElementById("pista").innerHTML = "Palabra no encontrada";
        }
    } 
    else {// La primera letra no coincide con la solicitada
        // alert("Letra inicial incorrecta")
        document.getElementById("pista").innerHTML = "Letra inicial incorrecta";
    }

    document.getElementById('puntos').innerHTML = puntos.toString();
    // muestraLista();
    centinela= true;
    
});

// Boton de reinicio
document.getElementById("restart").addEventListener("click",(e) => {
    reset();
    //Reinicia las pistas
});

// Resetea el contador y los puntos
function reset() {
    // Resetea los puntos
    document.getElementById("pista").innerHTML= "Introduce una palabra";
    puntos = 0;
    document.getElementById('puntos').innerHTML = puntos.toString();
    // Resetea la letra
    letra = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
    document.getElementById("letra").innerHTML = letra;
    document.getElementById("palabra").placeholder = letra;
    // Resetea el contador de tiempo
    contador = makeCounter(0);
    clearInterval(timer);
    // Indica el tiempo de partida
    timer = setInterval(() => {
        document.getElementById('contador').innerHTML = contador();
    }, 1000);
    // Para el juego cuando llega al limite de tiempo
    clearInterval(partida);
    partida = setTimeout(() =>{
        clearInterval(timer),
        muestraLista(),// Muestra la lista de palabras introducidas
        document.getElementById("palabra").disabled = true,// Deshabilita el input de texto
        alert("Se termino el juego: " + puntos + " puntos")
    }, (limite*1000)+100);
    
    
    // Limpia la lista de palabras mostrada
    document.getElementById("lista").innerHTML = " ";
    // Limpia el array donde se guardan las palabras introducidas
    listaPalabras = [];
    // Habilita el input de texto
    document.getElementById("palabra").disabled = false;
}
// Muestra la lista de palabras usadas
function muestraLista() {
    for (let i = 0; i< listaPalabras.length; i++) { 
        document.getElementById("lista").innerHTML += listaPalabras[i]+"\n";
    }
}

//Funcion puntuacion
// TODO: Separa en 3 funciones "puntosLetra(), puntosLongitud(), puntosEspecialChar()"

function puntuacion(palabra) {

    let puntos = 0;

    // Puntos	Letra inicial
    // 1	A, C, D y E
    // 2	M, P, R, S y T
    // 3	B, F, G, H, I y V
    // 4	J, L, N, O y Z
    // 5	K, Ñ, Q, U, W, X e Y
    console.log ("Letra: " + palabra.value[0].toUpperCase())

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

    // Puntos	Longitud
    // 1	8, 9, 10, 11 y 12
    // 2	6, 7, 13 y 14
    // 3	5 y 15
    // 4	4, 16 y 17
    // 5	1, 2, 3, 18 y mayores de 18
    console.log("Longitud: " + palabra.value.length)

    switch(palabra.value.length) {
        case 8 || 9 || 10 || 11 || 12:
            puntos += 1;
            break;
        case 6 || 7 || 13 || 14:
            puntos += 2;
            break;
        case 5 || 15:
            puntos += 3;
            break;
        case 4 || 16 || 17:
            puntos += 4;
            break;
        case 1 || 2 || 3 || 18:
            puntos += 5;
            break;
    }
    console.log("Puntos por longitud " + puntos)

    return puntos;
}
//Limpia el input
function clearInput() {;// ? usar .value
    if (palabra.value != "") {
        palabra.value = "";
    }
}
// Muestra una letra aleatoria en cada ejecución de la funcion
function letraAleatoria() {
    let letra = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
    return letra;
    
}

// Crea un contador con un valor dado y lo aumenta cada vez que es llamado
function makeCounter(counter) {
    return function (){
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

