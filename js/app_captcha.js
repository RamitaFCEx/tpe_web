/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/

"use strict";
const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];

let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
let textoClave = "";//ACA SE GUARDA EL CAPTCHA EN FORMA DE STRING

let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla

let resultado_captcha = document.querySelector("#resultado_captcha");//h4 que dice si se valido o no

let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha

let boton_captcha = document.querySelector("#boton_captcha");

boton_captcha.addEventListener("click", comprobarCaptcha);

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

function comprobarCaptcha(e){
    e.preventDefault();
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






textoClave = generador(textoClave);
titulo.innerHTML = textoClave;



