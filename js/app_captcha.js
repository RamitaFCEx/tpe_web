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

generador();

let titulo = document.querySelector("#texto_captcha");
titulo.innerHTML = textoClave;