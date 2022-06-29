/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

document.addEventListener('DOMContentLoaded', function menuResponsive(){
    let menuResponsive = document.querySelector(".menu_desktop");
    
     let botonMenuResponsive = document.querySelector(".button_toggle");
     botonMenuResponsive.addEventListener("click", function(){
         menuResponsive.classList.toggle("responsive_display");

    });// hasta aca responsive

    // ARRANCA AJAX
    let indexArticle = document.querySelector(".index_article");

    let botonHome = document.querySelector("#boton_home");
    botonHome.addEventListener("click", async function(e){
        e.preventDefault();
        indexArticle.innerHTML = "<h2>Loading</h2>";
        try{
            let response = await fetch("http://192.168.0.154:5500/index_article.html");//ARREGLAR IP
            if (response.ok) {
            let t = await response.text()
            indexArticle.innerHTML = t;
            borrarScripts();
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });

    let botonContacto = document.querySelector("#boton_contacto");
    botonContacto.addEventListener('click', async function(e){
        e.preventDefault();
        try{
            let response = await fetch("http://192.168.0.154:5500/contacto_article.html");
            if (response.ok) {
                let t = await response.text()
                indexArticle.innerHTML = t;
                borrarScripts(); //evita riesgo de duplicar el mismo script y el error "no se encontro tal elemento"
                let fileref = document.createElement('script');         
                fileref.setAttribute('type', 'text/javascript');         
                fileref.setAttribute('src', 'js/app_contacto.js');
                fileref.setAttribute('id', 'contactoJs')     
                document.getElementsByTagName('head')[0].appendChild(fileref);
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });


    let botonRegistro = document.querySelector("#boton_registro");
    botonRegistro.addEventListener("click", async function(e){
        e.preventDefault();
        try{
            let response = await fetch("http://192.168.0.154:5500/registro_article.html");
            if (response.ok) {
                let t = await response.text()
                indexArticle.innerHTML = t;
                borrarScripts();
                let fileref = document.createElement('script');         
                fileref.setAttribute('type', 'text/javascript');         
                fileref.setAttribute('src', 'js/app_captcha.js');
                fileref.setAttribute('id', 'captchaRef');    
                document.getElementsByTagName('head')[0].appendChild(fileref);
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });

    function borrarScripts(){
        if(document.querySelector("#captchaRef")){
            document.querySelector("#captchaRef").remove();
        }
        if(document.querySelector("#contactoJs")){
            document.querySelector("#contactoJs").remove();
        }
    }

    function cargarIndex(){
        indexArticle.innerHTML = "<h2>Loading</h2>";
        async function carga(){
            try{
                let response = await fetch("http://192.168.0.154:5500/index_article.html");
                if (response.ok) {
                let t = await response.text()
                indexArticle.innerHTML = t;
                borrarScripts();
                }
            }
            catch(error){
                indexArticle.innerHTML = "<h1>Connection error</h1>";
            }
        }
        carga();
    }
    cargarIndex();
    
});

