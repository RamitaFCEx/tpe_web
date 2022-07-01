/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

var botonEnviar = document.querySelector("#boton_enviar");
botonEnviar.addEventListener('click', imprimir);

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
botonReiniciar.addEventListener("click", async function(){
    document.querySelectorAll(".fila_dinamica").forEach(x => x.remove());
    let arregloIdes = [];
    try{
        let listaUsuarios = await fetch(`https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios`);
        if (listaUsuarios.ok) {
            let objetoUsuarios = await listaUsuarios.json();
            for(let individuo of (objetoUsuarios)){
                arregloIdes.push(individuo.id);
            }
            console.log(arregloIdes);
        }
    }catch(error){
            console.log("Falla de Base de datos eliminada");
    }
    try{
        let r=0;
        while(r<arregloIdes.length){
            let response = await fetch(`https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios/${arregloIdes[r]}`, {
            "method" : "DELETE"
            });
            if (response.ok) {
                console.log("Base de datos eliminada");
            }
            r++
        }
        
    }catch(error){
        console.log("Falla de Base de datos eliminada");
    }   
});//trae todas las filas, las borra una por una

function imprimir(e){
    e.preventDefault();
    let formulario = document.querySelector("#formulario");
    //let tablaDinamica = document.querySelector(".cuerpo_tablaD");//NO USAR
    let comprobacion = comprobarCaptcha();
    let formData = new FormData(formulario);
    //Captura de datos:
    let nombre = formData.get("nombre");
    let correo = formData.get("correo");
    let diaria = document.querySelector("#diaria");//cambiable
    let favorito = "";//Atributo del usuario
    
    (diaria.checked == true) ? favorito = "true" : favorito = "false";

    if(comprobacion === 1){
        //crearUsuario(usuariosRegistrados, nombre, correo, favorito);//agrega un objeto
        let datosUsuarioNuevo = {
            "nombre" : nombre,
            "correo" : correo,
            "fav" : favorito
        }
        agregarUsuario(datosUsuarioNuevo);
    }
}

async function agregarUsuario(datosUsuarioNuevo){
    try{
        let response = await fetch(`https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios`, {
            "method" : "POST",
            "headers" : {"Content-type" : "application/json"},
            "body" : JSON.stringify(datosUsuarioNuevo)
        });
        if(response.ok){
            console.log("Usuario agregado con exito");
            cargaTabla();
        }
    }catch(error){
        console.log("Falla de edicion");
    }
}

///Datos precargados en tabla dinamica   
async function cargaTabla(){
    try{
        let tablaDinamica = document.querySelector(".cuerpo_tablaD");
        let response = await fetch("https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios");
        if (response.ok) {
            let objetoUsuarios = await response.json();
            tablaDinamica.innerHTML = "";
            for(let individuo of (objetoUsuarios)){
                const fila = document.createElement("tr"); //dice que es una fila y pone nombre
                fila.setAttribute('id', `${individuo.id}`); 
                tablaDinamica.append(fila);//crea la fila
                fila.classList.add("fila_dinamica");//esta clase sirve para borrarla tabla
        
                for(let j in individuo){
                    const espacio = document.createElement('td');//dice que es una celda y pone nombre
                    let contenido = document.createTextNode(`${individuo[j]}`);//crea el contenido
                    if(j != "id"){
                        fila.appendChild(espacio);//crea la celda
                        espacio.appendChild(contenido);//escribe la celda
                        if(individuo.fav == true||individuo.fav == "true"){
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
                    if(espacio.previousSibling.classList[0] === `favoritos`){
                        espacio.classList.add(`favoritos`);//pone clase favorito
                    }
                }
            }
            asignarEventoBorrar();
            asignarEventoEditar();
        }
    }
    catch(error){
        console.log("<h1>Connection error</h1>");
    }
}


function asignarEventoBorrar(){
    let botonBorrar = document.querySelectorAll(".Borrar");
    for(let b=0; b<botonBorrar.length;b++){
       botonBorrar[b].addEventListener('click', async function(){
        botonBorrar[b].parentElement.parentElement.remove();
        try{
            let response = await fetch(`https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios/${botonBorrar[b].parentElement.parentElement.id}`, {
                "method" : "DELETE"
            });
            if (response.ok) {
                console.log("Item Eliminado");
            }
        }catch(error){
            console.log("Falla de borrado");
        }

       });
    }
}

function asignarEventoEditar(){
    let botonEditar = document.querySelectorAll(".Editar");
    for(let v=0; v<botonEditar.length;v++){
       botonEditar[v].addEventListener('click', async function(){
        botonEditar[v].innerHTML = "Editando";
        let nomreEditado = document.querySelector("#nombre_editado").value;
        let correoEditado = document.querySelector("#correo_editado").value;
        let frecuencia = document.querySelector("#frecuencia_editada").value;
        let usarioEditado = {
            "nombre" : nomreEditado,
            "correo" : correoEditado,
            "fav" : frecuencia
        }
        try{
            let response = await fetch(`https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios/${botonEditar[v].parentElement.parentElement.id}`, {
                "method" : "PUT",
                "headers" : {"Content-type" : "application/json"},
                "body" : JSON.stringify(usarioEditado)
            });
            if(response.ok){
                console.log("editado con exito");
                cargaTabla();
            }
        }catch(error){
            console.log("Falla de edicion");
        }
       });
    }
}

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
    let captcha = document.querySelector("#texto_captcha");//Captcha generado
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


cargaTabla();
generador();




