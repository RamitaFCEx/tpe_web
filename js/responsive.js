/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

document.addEventListener('DOMContentLoaded', function menuResponsive(){
    let ulMenuResponsive = document.querySelector(".menu_responsive");
     // let conteinerMenuResponsive = document.querySelector(".container_menu_responsive");
    
     let botonMenuResponsive = document.querySelector(".button_toggle");
     botonMenuResponsive.addEventListener("click", function(){
         ulMenuResponsive.classList.toggle("responsive_display_ul");
    });
});



