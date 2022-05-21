/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/

"use strict";
const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];

let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
let textoClave = "";//ACA SE GUARDA EL CAPTCHA EN FORMA DE STRING

let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla

let resultado_captcha = document.querySelector("#resultado_captcha");//h4 que dice si se valido o no

let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha

let boton_captcha = document.querySelector("#boton_captcha");

boton_captcha.addEventListener('click', comprobarCaptcha);


let formulario = document.querySelector("#formulario");
formulario.addEventListener('submit', imprimir);

let tablaDinamica = document.querySelector(".cuerpo_tablaD");


function generador(textoClave){//ACA SE CREA EL CAPTCHA
    let textoClaveGenerador = textoClave;
    for (let i=0; i<5; i++){
        //console.log("-----");
        let indice = Math.floor(Math.random()*11);
        //console.log(posiblesCaracteres[indice]);
        clave.push(posiblesCaracteres[indice])
    }
    textoClaveGenerador = clave.join("");
    return textoClaveGenerador;
}

function comprobarCaptcha(){
    if(respuestaCaptcha.value == textoClave){//compara
        resultado_captcha.innerHTML = "Validado";
        resultado_captcha.classList.add("validandoCaptcha");
        resultado_captcha.classList.remove("esperandoCaptha","rechazandoCaptcha");
    } else{
        resultado_captcha.innerHTML = "Rechazado";
        resultado_captcha.classList.add("rechazandoCaptcha");
        resultado_captcha.classList.remove("esperandoCaptha","validandoCaptcha");
    }
}

/////////////////Arriba estable

let usuarioPorDefecto1 = ["Fidel Castro", "elFideee@gmail.com"];
let usuarioPorDefecto2 = ["Benedicto XVI", "beniGGWP@gmail.com"];
let usuarioPorDefecto3 = ["Aristobulo Delvalle", "delvalle_ahri@gmail.com"];

tablaDinamica.innerHTML = `<tr><td>${usuarioPorDefecto1[0]}</td><td>${usuarioPorDefecto1[1]}</td><td>True</td></tr><tr><td>${usuarioPorDefecto2[0]}</td><td>${usuarioPorDefecto2[1]}</td><td>True</td></tr><tr><td>${usuarioPorDefecto3[0]}</td><td>${usuarioPorDefecto3[1]}</td><td>True</td></tr>`;


let botonReiniciar = document.querySelector("#boton_reiniciar");
botonReiniciar.addEventListener("click", function(){
    tablaDinamica.innerHTML = "";
    usuarioPorDefecto1 = [];
    usuarioPorDefecto2 = [];
    usuarioPorDefecto3 = [];
    console.log("reinicio");
});

let botonEnviar3 = document.querySelector("#boton_enviar_3");
botonEnviar3.addEventListener("click", function(){
    console.log("por 3")
    for(let i = 0; i<3;i++){
    let formData = new FormData(formulario);

    //Captura de datos:
    let nombre = formData.get("nombre");
    let correo = formData.get("correo");

    if(respuestaCaptcha.value == textoClave){
        tablaDinamica.innerHTML += `<tr><td>${nombre}</td><td>${correo}</td><td>True</td></tr>`
        console.log(`El usuario ${nombre} tiene el correo ${correo}`);
    }
    }
});


function imprimir(e){
    e.preventDefault();
    let formData = new FormData(formulario);

    //Captura de datos:
    let nombre = formData.get("nombre");
    let correo = formData.get("correo");

    if(respuestaCaptcha.value == textoClave){
        tablaDinamica.innerHTML += `<tr><td>${nombre}</td><td>${correo}</td><td>True</td></tr>`
        console.log(`El usuario ${nombre} tiene el correo ${correo}`);
    }
}


textoClave = generador(textoClave);
titulo.innerHTML = textoClave;



