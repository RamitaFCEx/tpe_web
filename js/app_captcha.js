/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";
const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];
let textoClave = "";//ACA SE GUARDA EL CAPTCHA EN FORMA DE STRING

let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla

let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha

let botonEnviar = document.querySelector("#boton_enviar");
botonEnviar.addEventListener('click', imprimir);

let formulario = document.querySelector("#formulario");

let tablaDinamica = document.querySelector(".cuerpo_tablaD");

let usuario = [];

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

let botonReiniciar = document.querySelector("#boton_reiniciar");
botonReiniciar.addEventListener("click", function(){
    tablaDinamica.innerHTML = "";
    usuarioPorDefecto1 = [];
    usuarioPorDefecto2 = [];
    usuarioPorDefecto3 = [];
    usuario = [];
    //console.log("reinicio");
});

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
        resultado_captcha.classList.remove("rechazandoCaptcha");
        return 1;
    } else{
        resultado_captcha.innerHTML = "Rechazado";
        resultado_captcha.classList.add("rechazandoCaptcha");
        resultado_captcha.classList.remove("validandoCaptcha");
        return -1;
    }
}

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
    ((comprobacion === 1) && (favorito == "Si"))? claseFavorito = `favoritos` : claseFavorito = ``;

    if(comprobacion === 1){
        // tablaDinamica.innerHTML += `
        // <tr>
        // <td class=${claseFavorito}>${nombre}</td>
        // <td class=${claseFavorito}>${correo}</td>
        // <td class=${claseFavorito}>True</td>
        // <td class=${claseFavorito}>${favorito}</td>
        // </tr>`;
        crearUsuario(usuario, nombre, correo, favorito);//agrega un objeto

        const fila = document.createElement("tr"); //dice que es una fila y pone nombre
        tablaDinamica.appendChild(fila);//crea la fila
        let datosUsuario = [nombre, correo, "True", favorito]//reune los datos

        for(let j=0; j<4; j++){//imprime los datos 
        const espacio = document.createElement("td");//dice que es una celda y pone nombre
        let contenido = document.createTextNode(`${datosUsuario[j]}`);//crea el contenido
        fila.appendChild(espacio);//crea la celda
        espacio.appendChild(contenido);//escribe la celda
        if(claseFavorito == `favoritos`){
            espacio.classList.add(`${claseFavorito}`);//pone clase favorito
        }
        }
        
    
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

///Datos precargados en tabla dinamica
tablaDinamica.innerHTML = 
`
<tr class="color-form1">
<td class="favoritos">Fidel Castro</td>
<td class="favoritos">elFideee@gmail.com</td>
<td class="favoritos">True</td>
<td class="favoritos">Si</td>
</tr>
<tr>
<td>Benedicto XVI</td>
<td>beniGGWP@gmail.com</td>
<td>True</td>
<td>No</td>
</tr>
<tr>
<td class="favoritos">Aristobulo Delvalle</td>
<td class="favoritos">delvalle_ahri@gmail.com</td>
<td class="favoritos">True</td>
<td class="favoritos">Si</td>
</tr>
`;///Datos precargados en tabla dinamica

textoClave = generador(textoClave);
titulo.innerHTML = textoClave;



