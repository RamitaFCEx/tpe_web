/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";
let textoClave = "";//ACA SE GUARDA EL CAPTCHA EN FORMA DE STRING

let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla

let usuario = [];

let botonEnviar = document.querySelector("#boton_enviar");
botonEnviar.addEventListener('click', imprimir);

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
    document.querySelectorAll(".fila_dinamica").forEach(x => x.remove());
    // tablaDinamica.innerHTML = "";
    usuario = [];
    //console.log("reinicio");
});

function generador(textoClave){//ACA SE CREA EL CAPTCHA
    const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];
    let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
    let textoClaveGenerador = textoClave;
    for (let i=0; i<5; i++){
        let indice = Math.floor(Math.random()*11);
        clave.push(posiblesCaracteres[indice])
    }
    textoClaveGenerador = clave.join("");
    return textoClaveGenerador;
}

function comprobarCaptcha(){
    let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha
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

function imprimir(e){
    e.preventDefault();
    comprobarCaptcha();
    let formulario = document.querySelector("#formulario");
    let tablaDinamica = document.querySelector(".cuerpo_tablaD");
    let comprobacion = comprobarCaptcha();
    let formData = new FormData(formulario);
    //Captura de datos:
    let nombre = formData.get("nombre");
    let correo = formData.get("correo");
    let diaria = document.querySelector("#diaria");
    let favorito = "";

    (diaria.checked == true) ? favorito = "Si" : favorito = "No";
    //   class="favoritos"
    let claseFavorito = ``;
    ((comprobacion === 1) && (favorito == "Si"))? claseFavorito = `favoritos` : claseFavorito = ``;

    if(comprobacion === 1){
        crearUsuario(usuario, nombre, correo, favorito);//agrega un objeto

        const fila = document.createElement("tr"); //dice que es una fila y pone nombre
        tablaDinamica.appendChild(fila);//crea la fila
        fila.classList.add("fila_dinamica");
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
function cargaPorDefectoTabla(){
    const usuarios = [
        {
            0 : "Fidel Castro",
            1 : "elFideee@gmail.com",
            2 : "True",
            3 : "True",
        },
        {
            0 : "Benedicto XVI",
            1 : "beniGGWP@gmail.com",
            2 : "True",
            3 : "False"
        },
        {
            0 : "Aristobulo Delvalle",
            1 : "delvalle_ahri@gmail.com",
            2 : "True",
            3 : "True"
        }
    ];

    let tablaDinamica = document.querySelector(".cuerpo_tablaD");
    

        for(let h=0; h<3; h++){//cada usuario
            const fila = document.createElement("tr"); //dice que es una fila y pone nombre
            tablaDinamica.append(fila);//crea la fila
            fila.classList.add("fila_dinamica");
            
            for(let j=0; j<4; j++){
                const espacio = document.createElement('td');//dice que es una celda y pone nombre
                console.log(usuarios[h][j]);
                let contenido = document.createTextNode(`${usuarios[h][j]}`);//crea el contenido
                fila.appendChild(espacio);//crea la celda
                espacio.appendChild(contenido);//escribe la celda
                
            }
        }
           
    

    // tablaDinamica.innerHTML = 
    // `
    // <tr class="color-form1 fila_dinamica">
    // <td class="favoritos">True</td>
    // <td class="favoritos">Si</td>
    // </tr>

    // <tr class="fila_dinamica">
    // <td>True</td>
    // <td>No</td>
    // </tr>

    // <tr class="fila_dinamica">
    // <td class="favoritos">True</td>
    // <td class="favoritos">Si</td>
    // </tr>
    // `;///Datos precargados en tabla dinamica
}

cargaPorDefectoTabla();
    

textoClave = generador(textoClave);
titulo.innerHTML = textoClave;



