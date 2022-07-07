/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

function formulario_tabla(){
    const url = `https://62b8b677f4cb8d63df61b878.mockapi.io/api/R-OS/usuarios`;//se usa var porque de otra manera, hay errores al volver a definir las constantes o variables "globales" tipo let

    let filtroFav = document.querySelector("#filtro-fav");
    filtroFav.addEventListener("change",  filtroConjunto);
    
    let filtroGmail = document.querySelector("#filtro-gmail");
    filtroGmail.addEventListener("change",  filtroConjunto);

    let botonEnviar = document.querySelector("#boton_enviar");
    
    let formularioAEnviar = document.querySelector("#formulario");
    formularioAEnviar.addEventListener('submit', imprimir);
    
    let botonEnviar3 = document.querySelector("#boton_enviar_3");
    botonEnviar3.addEventListener("click", function(e){
        let comprobacion = comprobarCaptcha();
        if (comprobacion === 1){
            for(let i = 0; i<3;i++){
                botonEnviar.click();//simula clickear 3 veces en el boton enviar
            }
        }
    });
    
    let botonReiniciar = document.querySelector("#boton_reiniciar");
    botonReiniciar.addEventListener("click", async function(){
        let arregloIdes = [];
        let resultadoReinicio = document.querySelector("#resultado-reinicio");
        try{
            resultadoReinicio.innerHTML = "BORRANDO, esto puede demorar unos segundos, no salga de la pagina mientras se realiza la operacion"
            let listaUsuarios = await fetch(url);
            if (listaUsuarios.ok) {//traigo todos los usuarios
                let objetoUsuarios = await listaUsuarios.json();
                for(let individuo of (objetoUsuarios)){
                    arregloIdes.push(individuo.id);//guardo todas las id correspondientes
                }
                try{
                    let r=0;
                    while(r<arregloIdes.length){//recorro todas las ID y voy borrando
                        let response = await fetch(`${url}/${arregloIdes[r]}`, {
                        "method" : "DELETE"
                        });
                        r++;
                    }
                    resultadoReinicio.innerHTML = "Base de datos eliminada con exito";
                    console.log("Base de datos eliminada");
                    cargaTabla();
                }catch(error){
                    console.log("Falla de Base de datos eliminada");
                }  
               // console.log(arregloIdes);
            }
        }catch(error){
                console.log("Falla de Base de datos eliminada");
        }
         
    });//trae todas las filas, las borra una por una
    
    function imprimir(e){
        e.preventDefault();
        let formulario = document.querySelector("#formulario");
        let comprobacion = comprobarCaptcha();
        let formData = new FormData(formulario);
        //Captura de datos:
        let nombre = formData.get("nombre");
        let correo = formData.get("correo");
        let diaria = document.querySelector("#diaria");//cambiable
        let favorito = true;//Atributo del usuario
        
        (diaria.checked === true) ? favorito = true : favorito = false;
    
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
            let response = await fetch(`${url}`, {
                "method" : "POST",
                "headers" : {"Content-type" : "application/json"},
                "body" : JSON.stringify(datosUsuarioNuevo)
            });
            if(response.ok){
                //console.log("Usuario agregado con exito");
                cargaTabla();
                generador();
            }
        }catch(error){
            console.log("Falla de edicion");
        }
    }
    
    ///Datos precargados en tabla dinamica   
    async function cargaTabla(){
        try{
            let tablaDinamica = document.querySelector(".cuerpo_tablaD");//elige donde escribir
            tablaDinamica.innerHTML = "------------------Loading...------------------";
            let response = await fetch(url);
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
                            if(individuo.fav === true){
                                espacio.classList.add(`favoritos`);//pinta las celdas favoritas
                            }
                        }
                    }
                    for(let j=0; j<2; j++){//imprime los botones
                        const espacio = document.createElement("td");//dice que es una celda y pone nombre
                        let contenido =  document.createElement("button");//Crea botones
                        contenido.innerHTML = (j===0)? "Editar":"Borrar";
                        contenido.classList.add(`${contenido.innerHTML}`);//clase del boton
                        
                        
                        fila.appendChild(espacio);//crea la celda
                        espacio.appendChild(contenido);//escribe la celda
                        if(espacio.previousSibling.classList[0] === `favoritos`){//Si la celda anterior, es amarilla, yo tambien
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
            try{
                let idUsuario = botonBorrar[b].parentElement.parentElement.id;
                let response = await fetch(`${url}/${idUsuario}`, {
                    "method" : "DELETE"
                });
                if (response.ok) {
                    botonBorrar[b].parentElement.parentElement.remove();
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
        let resultadoEdicion = document.querySelector("#resultado-edicion");
        for(let v=0; v<botonEditar.length;v++){
           botonEditar[v].addEventListener('click', async function(){
            botonEditar[v].innerHTML = "Editando";
            let nomreEditado = document.querySelector("#nombre_editado").value;
            let correoEditado = document.querySelector("#correo_editado").value;
            let frecuencia = true;
            (document.querySelector("#frecuencia_editada").value === "true") ? frecuencia = true : frecuencia = false;
            let usarioEditado = {
                "nombre" : nomreEditado,
                "correo" : correoEditado,
                "fav" : frecuencia
            }
            if((nomreEditado.charAt(0) >= "A" && nomreEditado.charAt(0) <= "z") && (correoEditado.charAt(0) >= "A" && correoEditado.charAt(0) <= "z")&&(correoEditado.includes("@"))){
                try{
                    let idUsuario = botonEditar[v].parentElement.parentElement.id;
                    let response = await fetch(`${url}/${idUsuario}`, {
                        "method" : "PUT",
                        "headers" : {"Content-type" : "application/json"},
                        "body" : JSON.stringify(usarioEditado)
                    });
                    if(response.ok){
                        console.log("editado con exito");
                        resultadoEdicion.innerHTML = "Editado con exito (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";
                        cargaTabla();
                    }
                }catch(error){
                    console.log("Falla de edicion");
                }
            }else{
                botonEditar[v].innerHTML = "Error!!";
                resultadoEdicion.innerHTML = "**Error de edicion, complete los campos(Solo letras en primer caracter)**";
            }
           });
        }
    
    }
    
    function generador(){//ACA SE CREA EL CAPTCHA
        const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];
        let clave = [];//ACA SE GUARDAN LOS CARACTERES DEL CAPTCHA POR SEPARADO
        let textoClaveGenerador = "";
        let muestraCaptcha = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla
        for (let i=0; i<5; i++){
            let indice = Math.floor(Math.random()*posiblesCaracteres.length);
            clave.push(posiblesCaracteres[indice])
        }
        textoClaveGenerador = clave.join("");
        muestraCaptcha.innerHTML = textoClaveGenerador;
    
        ///QUITAR
        let respuestaCodeada = document.querySelector("#respuestaCaptcha");
        respuestaCodeada.value = textoClaveGenerador;
        ///QUITAR
    }
    
    function comprobarCaptcha(){
        let captcha = document.querySelector("#texto_captcha");//Captcha generado
        let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha
        let resultado_captcha = document.querySelector("#resultado_captcha");//h4 que dice si se valido o no
        if((respuestaCaptcha.value === captcha.innerHTML)){//compara
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
    
    function filtroConjunto(){
        let filas = document.querySelectorAll(".fila_dinamica");
        //console.log("filtro gmail "+filtroGmail.value);//valor que filtra
        //console.log("filtro fav "+filtroFav.value);//valor que filtra
        if(filtroGmail.value != "sinUsar" && filtroFav.value != "sinUsar"){
            // console.log("filtro doble");
            for (let itera of filas) {
                let frecuencia = itera.children[2].innerHTML;//valor de los sujetos
                let gmail = (itera.children[1].innerHTML).includes("gmail");
    
                if(filtroGmail.value === "gmail" && filtroFav.value === frecuencia){
                    gmail ? itera.classList.remove("noPasaFiltro"):itera.classList.add("noPasaFiltro");
                }else{
                    (!gmail && filtroFav.value === frecuencia)? itera.classList.remove("noPasaFiltro"): itera.classList.add("noPasaFiltro");
                }
            }
        }else if(filtroGmail.value != "sinUsar" || filtroFav.value != "sinUsar"){
           // console.log("filtro simple");
            for (let itera of filas) {
                let frecuencia = itera.children[2].innerHTML;//valor de los sujetos
                let gmail = (itera.children[1].innerHTML).includes("gmail");
                if(filtroGmail.value != "sinUsar"){
                    if(filtroGmail.value === "gmail"){
                        gmail ? itera.classList.remove("noPasaFiltro"):itera.classList.add("noPasaFiltro");
                    }else{
                        gmail ? itera.classList.add("noPasaFiltro"):itera.classList.remove("noPasaFiltro");
                    }
    
                }else{
                    (filtroFav.value === frecuencia) ? itera.classList.remove("noPasaFiltro"): itera.classList.add("noPasaFiltro");;
                }
            }
        }else{
           // console.log("sin filtro ");
            for (let itera of filas) {
                    itera.classList.remove("noPasaFiltro");
            }
        }
    }
    cargaTabla();
    generador();
    
}

formulario_tabla();