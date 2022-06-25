/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";
document.addEventListener('DOMContentLoaded', function menuResponsive(){
    let ulMenuResponsive = document.querySelector(".menu_responsive");
     // let conteinerMenuResponsive = document.querySelector(".container_menu_responsive");
    
     let botonMenuResponsive = document.querySelector(".button_toggle");
     botonMenuResponsive.addEventListener("click", function(){
         ulMenuResponsive.classList.toggle("responsive_display_ul");
    });// hasta aca responsive



    // ARRANCA AJAX
    let indexArticle = document.querySelector(".index_article");
    let botonHome = document.querySelector("#boton_home");
    botonHome.addEventListener("click", async function(e){
        e.preventDefault();
        botonHome.classList.toggle("validandoCaptcha");
        indexArticle.innerHTML = "<h2>Loading</h2>";
        try{
            let response = await fetch("http://127.0.0.1:5500/index_article.html");
            if (response.ok) {
            let t = await response.text()
            indexArticle.innerHTML = t;
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
        

    })

    let botonContacto = document.querySelector("#boton_contacto");
    botonContacto.addEventListener("click", async function(e){
        e.preventDefault();
        botonContacto.classList.toggle("validandoCaptcha");
        try{
            let response = await fetch("http://127.0.0.1:5500/contacto_article.html");
            if (response.ok) {
                let t = await response.text()
                indexArticle.innerHTML = t;
                if(document.querySelector("#captchaRef")){
                    document.querySelector("#captchaRef").remove();
                }
                if(document.querySelector("#contactoJs")){
                    document.querySelector("#contactoJs").remove();
                }
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
        botonRegistro.classList.toggle("validandoCaptcha");
        try{
            let response = await fetch("http://127.0.0.1:5500/registro_article.html");
            if (response.ok) {
                let t = await response.text()
                indexArticle.innerHTML = t;
                console.log(indexArticle.firstElementChild.className);
                if(document.querySelector("#captchaRef")){
                    document.querySelector("#captchaRef").remove();
                }
                if(document.querySelector("#contactoJs")){
                    document.querySelector("#contactoJs").remove();
                }
                let fileref = document.createElement('script');         
                fileref.setAttribute('type', 'text/javascript');         
                fileref.setAttribute('src', 'js/app_captcha.js');
                fileref.setAttribute('id', 'captchaRef')     
                document.getElementsByTagName('head')[0].appendChild(fileref);
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    })
});



