/*-ESTE SITIO FUE DESARROLLADO POR DIAZ MANUEL(C2) Y MEZA RAMIRO(C11) GRUPO 10----------------------------*/
/* En este JS esta lo relacionado la carga de la tabla de contacto_article*/ 
"use strict";

function cargarTabla(){
    const datosPorDefecto = [
        {//primera fila
            0 : "+54 9 011 457 147",//primera celda
            1 : "+598 9 011 457 148"//segunda celda
        },
        {//segunda fila
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
            const fila = document.createElement("tr"); //dice que es una fila 
            tabla_contacto.append(fila);//crea la fila

            
            for(let j in datosPorDefecto[h]){
                const celda = document.createElement('td');//dice que es una celda 
                let contenido = document.createTextNode(`${datosPorDefecto[h][j]}`);//crea el contenido
                fila.appendChild(celda);//crea la celda
                celda.appendChild(contenido);//escribe la celda
            }
        }
}
cargarTabla();