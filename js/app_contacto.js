/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
"use strict";

document.addEventListener('DOMContentLoaded', function contacto(){
    function cargarTabla(){
        const datosPorDefecto = [
            {
                0 : "+54 9 011 457 147",
                1 : "+598 9 011 457 148"
            },
            {
                0 : "+54 9 011 457 149",
                1 : "+598 9 011 457 150"
            },
            {
                0 : "+54 9 011 457 151",
                1 : "+598 9 011 457 152"
            },
            {
                0 : "+54 9 011 457 153",
                1 : "+598 9 011 457 154"
            }
        ];
        let tabla_contacto = document.querySelector(".tabla_contacto");
    
            for(let h=0; h<datosPorDefecto.length; h++){//cada fila
                const fila = document.createElement("tr"); //dice que es una fila y pone nombre
                tabla_contacto.append(fila);//crea la fila
    
                
                for(let j in datosPorDefecto[h]){
                    const espacio = document.createElement('td');//dice que es una celda y pone nombre
                    let contenido = document.createTextNode(`${datosPorDefecto[h][j]}`);//crea el contenido
                    fila.appendChild(espacio);//crea la celda
                    espacio.appendChild(contenido);//escribe la celda
                }
            }
    }
    
    cargarTabla();
});
