/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
/* En este JS esta lo relacionado a las barras de navegacion (desktop/mobile)*/ 
"use strict";

document.addEventListener('DOMContentLoaded', function menuResponsive(){
    let menuResponsive = document.querySelector(".menu_desktop");
    
    let botonMenuResponsive = document.querySelector(".button_toggle");//Mobile
    botonMenuResponsive.addEventListener("click", function(){
         menuResponsive.classList.toggle("responsive_display");

    });// hasta aca responsive

    // ARRANCA AJAX
    let indexArticle = document.querySelector(".index_article");

    let botonHome = document.querySelector("#boton_home");
    botonHome.addEventListener("click", cargarIndex);//funcion ya definida

    let botonContacto = document.querySelector("#boton_contacto");
    botonContacto.addEventListener('click', async function(){
        try{
            let response = await fetch("http://192.168.0.154:5500/contacto.html");
            if (response.ok) {
                let texto = await response.text();
                indexArticle.innerHTML = texto;
                borrarScripts(); //evita riesgo de duplicar el mismo script y el error "no se encontro TAL elemento"
                let archivoJS = document.createElement('script');         
                archivoJS.setAttribute('type', 'text/javascript');         
                archivoJS.setAttribute('src', 'js/tabla_contacto.js');
                archivoJS.setAttribute('id', 'contactoJs');     
                document.getElementsByTagName('head')[0].appendChild(archivoJS);
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });


    let botonRegistro = document.querySelector("#boton_registro");
    botonRegistro.addEventListener("click", async function(){
        try{
            let response = await fetch("http://192.168.0.154:5500/registro.html");
            if (response.ok) {
                let texto = await response.text();
                indexArticle.innerHTML = texto;
                borrarScripts();
                let archivoJS = document.createElement('script');         
                archivoJS.setAttribute('type', 'text/javascript');         
                archivoJS.setAttribute('src', 'js/formulario_tabla.js');
                archivoJS.setAttribute('id', 'captchaRef');    
                document.getElementsByTagName('head')[0].appendChild(archivoJS);
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });

    function borrarScripts(){//Si encuentra JS con estos ID, los borra
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
                let response = await fetch("http://192.168.0.154:5500/inicio.html");
                if (response.ok) {
                let texto = await response.text()
                indexArticle.innerHTML = texto;
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