/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

document.addEventListener('DOMContentLoaded', function captcha(){
    let botonEnviar = document.querySelector("#boton_enviar");
    botonEnviar.addEventListener('click', imprimir);
    let usuariosRegistrados = [];
    
    let botonEnviar3 = document.querySelector("#boton_enviar_3");
    botonEnviar3.addEventListener("click", function(e){
        let comprobacion = comprobarCaptcha();
        if (comprobacion === 1){
        for(let i = 0; i<3;i++){
        imprimir(e);
        }
        }
    });
    
    let botonReiniciar = document.querySelector("#boton_reiniciar");
    botonReiniciar.addEventListener("click", function(){
        document.querySelectorAll(".fila_dinamica").forEach(x => x.remove());
    });//trae todas las filas, las borra una por una
    
    function generador(){//ACA SE CREA EL CAPTCHA
        const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];
        let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
        let textoClaveGenerador = "";
        let captcha = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla
        let respuestaDefecto = document.querySelector("#respuestaCaptcha");
    
        for (let i=0; i<5; i++){
            let indice = Math.floor(Math.random()*posiblesCaracteres.length);
            clave.push(posiblesCaracteres[indice])
        }
        textoClaveGenerador = clave.join("");
        captcha.innerHTML = textoClaveGenerador;
        respuestaDefecto.value = textoClaveGenerador;//carga el captcha auto, para testeo rapido
    }
    
    function comprobarCaptcha(){
        let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha
        let resultado_captcha = document.querySelector("#resultado_captcha");//h4 que dice si se valido o no
        let captcha = document.querySelector("#texto_captcha");
        if((respuestaCaptcha.value == captcha.innerHTML)){//compara
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
        let formulario = document.querySelector("#formulario");
        let comprobacion = comprobarCaptcha();
        let formData = new FormData(formulario);
        //Captura de datos:
        let nombre = formData.get("nombre");
        let correo = formData.get("correo");
        let diaria = document.querySelector("#diaria");//cambiable
        let favorito = "";
        
        (diaria.checked == true) ? favorito = "Si" : favorito = "No";
    
        let claseFavorito = ``;
        ((comprobacion === 1) && (favorito == "Si"))? claseFavorito = `favoritos` : claseFavorito = ``;
    
        let datosUsuario = [nombre, correo, favorito]//reune los datos
    
        if(comprobacion === 1){
            crearUsuario(usuariosRegistrados, datosUsuario);//agrega un objeto
            escribirTabla(datosUsuario, claseFavorito);
        }
    }
    
    function escribirTabla(datosUsuario, claseFavorito){
        let tablaDinamica = document.querySelector(".cuerpo_tablaD");
        const fila = document.createElement("tr"); //dice que es una fila y pone nombre
        tablaDinamica.appendChild(fila);//crea la fila
        fila.classList.add("fila_dinamica");
    
        for(let j=0; j<datosUsuario.length; j++){//imprime los datos 
            const espacio = document.createElement("td");//dice que es una celda y pone nombre
            let contenido = document.createTextNode(`${datosUsuario[j]}`);//crea el contenido
            fila.appendChild(espacio);//crea la celda
            espacio.appendChild(contenido);//escribe la celda
            if(claseFavorito == `favoritos`){
                espacio.classList.add(`${claseFavorito}`);//pone clase favorito
            }
        }
    }
    
    
    
    function crearUsuario(usuariosRegistrados, datosUsuario){
        let usuarioC = {
            "nombre" : datosUsuario[0],
            "correo" : datosUsuario[1],
            "favorito": datosUsuario[2]
        }
        usuariosRegistrados.push(usuarioC);
    }
    
    ///Datos precargados en tabla dinamica
    function cargaPorDefectoTabla(){
        const datosPorDefecto = [
            {
                nombre : "Fidel Castro",
                correo : "elFideee@gmail.com",
                fav : "Si",
            },
            {
                nombre : "Benedicto XVI",
                correo : "beniGGWP@gmail.com",
                fav : "No"
            },
            {
                nombre : "Aristobulo Delvalle",
                correo1 : "delvalle_ahri@gmail.com",
                fav : "Si"
            }
        ];
        let tablaDinamica = document.querySelector(".cuerpo_tablaD");
            for(let h=0; h<datosPorDefecto.length; h++){//cada udsuario
                const fila = document.createElement("tr"); //dice que es una fila y pone nombre
                tablaDinamica.append(fila);//crea la fila
                fila.classList.add("fila_dinamica");//esta clase sirve para borrar la tabla
                
                for(let j in datosPorDefecto[h]){
                    const espacio = document.createElement('td');//dice que es una celda y pone nombre
                    let contenido = document.createTextNode(`${datosPorDefecto[h][j]}`);//crea el contenido
                    fila.appendChild(espacio);//crea la celda
                    espacio.appendChild(contenido);//escribe la celda
                    if(datosPorDefecto[h].fav == "Si"){
                        espacio.classList.add(`favoritos`);//pinta las celdas favoritas
                    }
                }
            }
    }
    
    cargaPorDefectoTabla();
    generador();
});







