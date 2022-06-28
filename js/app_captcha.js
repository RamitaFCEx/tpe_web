/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

var botonEnviar = document.querySelector("#boton_enviar");
botonEnviar.addEventListener('click', imprimir);
var usuariosRegistrados = [];

var botonEnviar3 = document.querySelector("#boton_enviar_3");
botonEnviar3.addEventListener("click", function(e){
    let comprobacion = comprobarCaptcha();
    if (comprobacion === 1){
        for(let i = 0; i<3;i++){
            imprimir(e);
        }
    }
});

var botonReiniciar = document.querySelector("#boton_reiniciar");
botonReiniciar.addEventListener("click", function(){
    document.querySelectorAll(".fila_dinamica").forEach(x => x.remove());
    usuariosRegistrados = [];
    console.log(usuariosRegistrados);
});//trae todas las filas, las borra una por una



function generador(){//ACA SE CREA EL CAPTCHA
    const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];
    let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
    let textoClaveGenerador = "";
    let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla
    for (let i=0; i<5; i++){
        let indice = Math.floor(Math.random()*posiblesCaracteres.length);
        clave.push(posiblesCaracteres[indice])
    }
    textoClaveGenerador = clave.join("");
    titulo.innerHTML = textoClaveGenerador;

    ///QUITAR
    let respuestaCodeada = document.querySelector("#respuestaCaptcha");
    respuestaCodeada.value = textoClaveGenerador;
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
    let tablaDinamica = document.querySelector(".cuerpo_tablaD");
    let comprobacion = comprobarCaptcha();
    let formData = new FormData(formulario);
    //Captura de datos:
    let nombre = formData.get("nombre");
    let correo = formData.get("correo");
    let diaria = document.querySelector("#diaria");//cambiable
    let favorito = "";
    
    (diaria.checked == true) ? favorito = "true" : favorito = "false";

    let claseFavorito = ``;
    ((comprobacion === 1) && (favorito == "true"))? claseFavorito = `favoritos` : claseFavorito = ``;

    if(comprobacion === 1){
        crearUsuario(usuariosRegistrados, nombre, correo, favorito);//agrega un objeto

        const fila = document.createElement("tr"); //dice que es una fila y pone nombre
        tablaDinamica.appendChild(fila);//crea la fila
        fila.classList.add("fila_dinamica");
        let datosUsuario = [nombre, correo, favorito, "Editar", "Borrar"]//reune los datos

        for(let j=0; j<datosUsuario.length; j++){//imprime los datos 
            const espacio = document.createElement("td");//dice que es una celda y pone nombre
            let contenido;
            if(j<3){
                contenido = document.createTextNode(`${datosUsuario[j]}`);//crea el contenido
            }else{
                contenido =  document.createElement("button");//Crea botones
                contenido.innerHTML = datosUsuario[j];
                contenido.classList.add(`${datosUsuario[j]}`);
            }
            
            fila.appendChild(espacio);//crea la celda
            espacio.appendChild(contenido);//escribe la celda
            if(claseFavorito == `favoritos`){
                espacio.classList.add(`${claseFavorito}`);//pone clase favorito
            }
        }
        asignarEvento();
    }
}

function asignarEvento(){
    let botonBorrar = document.querySelectorAll(".Borrar");
    for(let b=0; b<botonBorrar.length;b++){
       botonBorrar[b].addEventListener('click', function(){
        botonBorrar[b].parentElement.parentElement.remove();
       });
    }



    let botonEditar = document.querySelectorAll(".Editar");
    for(let v=0; v<botonEditar.length;v++){
       botonEditar[v].addEventListener('click', function(){
        botonEditar[v].innerHTML = "CCCC";
       });
    }
}

function crearUsuario(usuariosRegistrados, nombre, correo, favorito){
    let usuarioC = {
        "nombre" : nombre,
        "correo" : correo,
        "fav": favorito
    }
    usuariosRegistrados.push(usuarioC);
   // console.log(usuariosRegistrados);
}

///Datos precargados en tabla dinamica
function cargaPorDefectoTabla(){
    let tablaDinamica = document.querySelector(".cuerpo_tablaD");
    async function traeDatos(){
        try{
            let response = await fetch("https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios");
            if (response.ok) {
                let objetoUsuarios = await response.json();
                for(let individuo of (objetoUsuarios)){
                    console.log(individuo.fav);
                    const fila = document.createElement("tr"); //dice que es una fila y pone nombre
                    tablaDinamica.append(fila);//crea la fila
                     fila.classList.add("fila_dinamica");//esta clase sirve para borrarla tabla
            
                    for(let j in individuo){
                        const espacio = document.createElement('td');//dice que es una celda y pone nombre
                        let contenido = document.createTextNode(`${individuo[j]}`);//crea el contenido
                        if(j != "id"){
                            fila.appendChild(espacio);//crea la celda
                            espacio.appendChild(contenido);//escribe la celda
                            if(individuo.fav === true){
                                espacio.classList.add(`favoritos`);//pinta las celdas favoritas
                            }
                        }
                        
                    }
                    for(let j=0; j<2; j++){//imprime los botones
                        const espacio = document.createElement("td");//dice que es una celda y pone nombre
                        let contenido =  document.createElement("button");//Crea botones
                        contenido.innerHTML = (j==0)? "Editar":"Borrar";
                        contenido.classList.add(`${contenido.innerHTML}`);
                        
                        
                        fila.appendChild(espacio);//crea la celda
                        espacio.appendChild(contenido);//escribe la celda
                        console.log(espacio.previousSibling.classList[0]);
                        if(espacio.previousSibling.classList[0] === `favoritos`){
                            espacio.classList.add(`favoritos`);//pone clase favorito
                        }
                    }
                }
                asignarEvento();
            }
        }
        catch(error){
            console.log("<h1>Connection error</h1>");
        }
    }
    traeDatos();
}

cargaPorDefectoTabla();
generador();




