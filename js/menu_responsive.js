/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
/* En este JS esta lo relacionado a las barras de navegacion (desktop/mobile)*/ 
"use strict";

document.addEventListener('DOMContentLoaded', function menuResponsive(){
    const urlAjax = "http://localhost:5500";
    let menuResponsive = document.querySelector(".menu_desktop");
    
    let botonMenuResponsive = document.querySelector(".button_toggle");//Mobile
    botonMenuResponsive.addEventListener("click", function(){
         menuResponsive.classList.toggle("responsive_display");
    });// hasta aca responsive

    // ARRANCA AJAX
    let indexArticle = document.querySelector(".index_article");//Donde quiere escribir

    let botonHome = document.querySelector("#boton_home");
    botonHome.addEventListener("click", cargarIndex);//funcion ya definida

    let botonContacto = document.querySelector("#boton_contacto");
    botonContacto.addEventListener('click', async function(){
        try{
            let response = await fetch(`${urlAjax}/contacto.html`);
            if (response.ok) {
                let texto = await response.text();
                indexArticle.innerHTML = texto;
                borrarScripts(); //evita riesgo de duplicar el mismo script y el error "no se encontro TAL elemento"
                let archivoJS = document.createElement('script');         
                archivoJS.setAttribute('type', 'text/javascript');         
                archivoJS.setAttribute('src', 'js/tabla_contacto.js');
                archivoJS.setAttribute('id', 'tabla_contacto');     
                document.getElementsByTagName('head')[0].appendChild(archivoJS);
                botonMenuResponsive.click();
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });
    

    let botonRegistro = document.querySelector("#boton_registro");
    botonRegistro.addEventListener("click", async function(){
        try{
            let response = await fetch(`${urlAjax}/registro.html`);
            if (response.ok) {
                let texto = await response.text();
                indexArticle.innerHTML = texto;
                borrarScripts();
                let archivoJS = document.createElement('script');         
                archivoJS.setAttribute('type', 'text/javascript');         
                archivoJS.setAttribute('src', 'js/formulario_tabla.js');
                archivoJS.setAttribute('id', 'formulario_captcha_tabla');    
                document.getElementsByTagName('head')[0].appendChild(archivoJS);
                botonMenuResponsive.click();
            }
        }
        catch(error){
            indexArticle.innerHTML = "<h1>Connection error</h1>";
        }
    });

    function borrarScripts(){//Si encuentra JS con estos ID, los borra
        if(document.querySelector("#formulario_captcha_tabla")){
            document.querySelector("#formulario_captcha_tabla").remove();
        }
        if(document.querySelector("#tabla_contacto")){
            document.querySelector("#tabla_contacto").remove();
        }     
    }
    let guia = 0;
    function cargarIndex(){
        indexArticle.innerHTML = "<h2>Loading</h2>";
        async function carga(){
            try{
                let response = await fetch(`${urlAjax}/inicio.html`);
                if (response.ok) {
                let texto = await response.text()
                indexArticle.innerHTML = texto;
                borrarScripts();
                if(guia>0){
                    botonMenuResponsive.click();
                }
                    guia++;
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