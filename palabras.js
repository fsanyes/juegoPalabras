import {diccionario} from "https://cdn.jsdelivr.net/gh/fran-dawbaza/spanish-dictionary/diccionario.js";

let contador = makeCounter(1);// Controla el tiempo
let limite = 16;// Maximo tiempo de partida
let puntos = 0;// Puntos conseguidos durante la partida
let timer;
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
    // if (contador() >= limite) {// Limite de tiempo
    //     // alert("Se termino el juego: " + puntos + " puntos");
    //     document.getElementById("pista").innerHTML = "Se termino el juego: " + puntos + " puntos";
    //     centinela = false;
    // }
    if (centinela == false) {
        document.getElementById("pista").innerHTML = "Caracteres incorrectos";
    }
    else if (palabra.value[0].toUpperCase() === letra[0].toUpperCase()) {// Primera letra de la palabra
        
        if (diccionario.includes(palabra.value.toLowerCase())) {// Si la palabra esta repetida
            if (listaPalabras.includes(palabra.value.toLowerCase())) {
                // alert("Palabra repetida");
                document.getElementById("pista").innerHTML = "Palabra repetida";
                puntos -= palabra.value.length;
            }
            else {
                // Introduce la palabra en la lista de palabras
                listaPalabras.push(palabra.value.toLowerCase());
            }
        }
        else {// La palabra se encuentra en la lista de palabras
            // alert("Palabra repetida");
            document.getElementById("pista").innerHTML = "Palabra no encontrada";
            puntos -= palabra.value.length;
        }
    } 
    else {// La primera letra no coincide con la solicitada
        // alert("Letra inicial incorrecta")
        document.getElementById("pista").innerHTML = "Letra inicial incorrecta";
        puntos -= palabra.value.length;
    }
    puntos += palabra.value.length;
    document.getElementById('puntos').innerHTML = puntos.toString();
    // muestraLista();
    centinela= true;
    clearInput();
});

// Boton de reinicio
document.getElementById("restart").addEventListener("click",(e) => {
    reset();
    //Reinicia las pistas
    document.getElementById("pista").innerHTML= "Introduce una palabra";
});

// Resetea el contador y los puntos
function reset() {
    // Resetea los puntos
    puntos = 0;
    document.getElementById('puntos').innerHTML = puntos.toString();
    // Resetea la letra
    letra = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
    document.getElementById("letra").innerHTML = letra;
    document.getElementById("palabra").placeholder = letra;
    // Resetea el contador de tiempo
    contador = makeCounter(0);
    clearInterval(timer);
    timer = setInterval(() => {
        document.getElementById('contador').innerHTML = contador();
    }, 1000);
    // Para el juego cuando llega al limite de tiempo
    setTimeout(() =>{
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
// TODO: Hacer la funcion que controla los puntos

//Limpia el input
function clearInput() {
    let inputPalabra = document.getElementById("palabra").value;// ? usar .value
    if (inputPalabra.value != "") {
        inputPalabra.value = "";
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

