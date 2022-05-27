/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";
const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];
let textoClave = "";//ACA SE GUARDA EL CAPTCHA EN FORMA DE STRING

let usuarioPorDefecto1 = ["Fidel Castro", "elFideee@gmail.com"];
let usuarioPorDefecto2 = ["Benedicto XVI", "beniGGWP@gmail.com"];
let usuarioPorDefecto3 = ["Aristobulo Delvalle", "delvalle_ahri@gmail.com"];

// let cuerpoTablaContacto = document.querySelector(".tabla_contacto");

// cuerpoTablaContacto.innerHTML =`
// <tr class="color-form1">
// <td>+54 9 011 457 147</td>
// <td>+598 9 011 457 148</td>
// </tr>
// <tr class="color-form2">
// <td>+54 9 011 457 149</td>
// <td>+598 9 011 457 150</td>
// </tr>
// <tr class="color-form1">
// <td>+54 9 011 457 151</td>
// <td>+598 9 011 457 152</td>
// </tr>
// <tr class="color-form2">
// <td>+54 9 011 457 153</td>
// <td>+598 9 011 457 154</td>
// </tr>
// `;

let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla

let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha

let botonEnviar = document.querySelector("#boton_enviar");
botonEnviar.addEventListener('click', imprimir);

let formulario = document.querySelector("#formulario");

let tablaDinamica = document.querySelector(".cuerpo_tablaD");

let usuario = [];

function generador(textoClave){//ACA SE CREA EL CAPTCHA
    let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
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
    let resultado_captcha = document.querySelector("#resultado_captcha");//h4 que dice si se valido o no
    if(respuestaCaptcha.value == textoClave){//compara
        resultado_captcha.innerHTML = "Validado";
        resultado_captcha.classList.add("validandoCaptcha");
        resultado_captcha.classList.remove("esperandoCaptha","rechazandoCaptcha");
        return 1;
    } else{
        resultado_captcha.innerHTML = "Rechazado";
        resultado_captcha.classList.add("rechazandoCaptcha");
        resultado_captcha.classList.remove("esperandoCaptha","validandoCaptcha");
        return -1;
    }
}
/////////////////Arriba estable

///Datos precargados en tabla dinamica
tablaDinamica.innerHTML = 
`
<tr class="color-form1">
<td>${usuarioPorDefecto1[0]}</td>
<td>${usuarioPorDefecto1[1]}</td>
<td>True</td>
<td>Si</td>
</tr>
<tr>
<td>${usuarioPorDefecto2[0]}</td>
<td>${usuarioPorDefecto2[1]}</td>
<td>True</td>
<td>No</td>
</tr>
<tr>
<td>${usuarioPorDefecto3[0]}</td>
<td>${usuarioPorDefecto3[1]}</td>
<td>True</td>
<td>Si</td>
</tr>
`;///Datos precargados en tabla dinamica


// let ulMenuResponsive = document.querySelector(".menu_responsive");
// let liMenuResponsive = document.querySelector(".ul_menu_responsive_li");
// let aMenuResponsive = document.querySelector(".ul_menu_responsive_li_a");

 let botonMenuResponsive = document.querySelector(".button_toggle");
 botonMenuResponsive.addEventListener("click", function(){
    alert("nedeah");
//     ulMenuResponsive.classList.toggle("ul_responsive_display");
//     liMenuResponsive.classList.toggle("");
//     aMenuResponsive.classList.toggle("");
 });

let botonReiniciar = document.querySelector("#boton_reiniciar");
botonReiniciar.addEventListener("click", function(){
    tablaDinamica.innerHTML = "";
    usuarioPorDefecto1 = [];
    usuarioPorDefecto2 = [];
    usuarioPorDefecto3 = [];
    usuario = [];
    //console.log("reinicio");
});

let botonEnviar3 = document.querySelector("#boton_enviar_3");
botonEnviar3.addEventListener("click", function(e){
    comprobarCaptcha();
    let comprobacion = comprobarCaptcha();
    if (comprobacion === 1){
    for(let i = 0; i<3;i++){
    // let formData = new FormData(formulario);
    imprimir(e);
    }
    }
});

function verificarFavorito(diaria){
    if(diaria.checked == true){

        return "Si";
    }else{
        return "No";
    }
}

function imprimir(e){
    e.preventDefault();
    comprobarCaptcha();
    let comprobacion = comprobarCaptcha();
    let formData = new FormData(formulario);
    //Captura de datos:
    let nombre = formData.get("nombre");
    let correo = formData.get("correo");
    let diaria = document.querySelector("#diaria");
    let favorito = verificarFavorito(diaria);
    //   class="favoritos"
    let claseFavorito = ``;
    if((comprobacion === 1) && (favorito == "Si")){
        claseFavorito = `"favoritos"`
    }
    if(comprobacion === 1){
        tablaDinamica.innerHTML += `
        <tr>
        <td class=${claseFavorito}>${nombre}</td>
        <td class=${claseFavorito}>${correo}</td>
        <td class=${claseFavorito}>True</td>
        <td class=${claseFavorito}>${favorito}</td>
        </tr>`;
        crearUsuario(usuario, nombre, correo, favorito);
    }
}

function crearUsuario(usuario, nombre, correo, favorito){
    let usuarioC = {
        "nombre" : nombre,
        "correo" : correo,
        "favorito": favorito
    }
    usuario.push(usuarioC);
    // for(let i = 0; i<usuario.length; i++){
    //     console.log(usuario[i]);
    // }
}

textoClave = generador(textoClave);
titulo.innerHTML = textoClave;



