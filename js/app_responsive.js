"use strict";

let ulMenuResponsive = document.querySelector(".menu_responsive");
// let liMenuResponsive = document.querySelector(".ul_menu_responsive_li");
// let aMenuResponsive = document.querySelector(".ul_menu_responsive_li_a");
let conteinerMenuResponsive = document.querySelector(".container_menu_responsive");

 let botonMenuResponsive = document.querySelector(".button_toggle");
 botonMenuResponsive.addEventListener("click", function(){
     ulMenuResponsive.classList.toggle("responsive_display_ul");
     
//     liMenuResponsive.classList.toggle("");
//     aMenuResponsive.classList.toggle("");
});
