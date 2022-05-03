const posiblesCaracteres = ['a', 'g', 'e', '4', 'r', 'p', '6', 'y', 'k','u','8'];

let clave = [];
let textoClave;

function generador(){
for (i=0; i<5; i++){
  console.log("-----");
  let indice = Math.floor(Math.random()*11);
  console.log(posiblesCaracteres[indice]);

clave.push(posiblesCaracteres[indice])
}

textoClave = clave.join("");
console.log(textoClave);
}

function comprobarCaptcha(e){
    e.preventDefault();
    if(respuestaCaptcha.value == textoClave){//compara
        resultado_captcha.innerHTML = "Validado";
    } else{
        resultado_captcha.innerHTML = "Rechazado";
    }
    
    
}

generador();

let titulo = document.querySelector("#texto_captcha");//captcha que se muestra en pantalla
titulo.innerHTML = textoClave;

let resultado_captcha = document.querySelector("#resultado_captcha");//h4 que dice si se valido o no

let respuestaCaptcha = document.querySelector("#respuestaCaptcha");// respuesta del humano al captcha

let boton_captcha = document.querySelector("#boton_captcha");

boton_captcha.addEventListener("click", comprobarCaptcha);