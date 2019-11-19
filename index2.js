var body = document.querySelector("body");

var s = document.querySelector(".desplegable");
var s3 = document.querySelector(".desplegablePersona3");
var sCiudades4 = document.querySelector(".desplegableCiudades4");
var sCiudades5 = document.querySelector(".desplegableCiudades5");

var simi = document.querySelector(".titulo");

var btnEjecutar = document.querySelector(".btnEjecutar");
var btnEjecutar2 = document.querySelector(".btnEjecutar2");
var btnEjecutar3 = document.querySelector(".btnEjecutar3");
var btnEjecutar4 = document.querySelector(".btnEjecutar4");
var btnEjecutar5 = document.querySelector(".btnEjecutar5");
var btnEjecutar51 = document.querySelector(".btnEjecutar51");

var inputK = document.querySelector(".inputK");
var inputKD = document.querySelector(".inputKD");
var inputKD3 = document.querySelector(".inputKD3");
var inputKD4 = document.querySelector(".inputKD4");
var inputKD5 = document.querySelector(".inputKD5");
var inputKD51 = document.querySelector(".inputKD51");

let arregloDeLista;

let opciones;

let objetoA;
let objetoADestino;
let objetoB;

var elementoTemp;
var x;
var y;
let dataLinea;
var arregloTemp;

var nuevosK = [];
var nuevosKDestinos = [];
var nuevosKDestinosS3 = [];
var nuevosKCiudades = [];
var nuevosKCiudades5 = [];
var nuevosKCiudades51 = [];

var listaOrdenados;
var listaOrdenadosDestinos;

var listaK;

var listaSimilitud = document.querySelector(".lista-Similitud");
var listaSimilitudDestions = document.querySelector(".lista-SimilitudDestions");
var listaSimilitudPersona3 = document.querySelector(".lista-SimilitudPersona3");
var listaSimilitudCiudades4 = document.querySelector(".lista-SimilitudCiudades4");
var listaSimilitudCiudades5 = document.querySelector(".lista-SimilitudCiudades5");
var listaSimilitudCiudades51 = document.querySelector(".lista-SimilitudCiudades51");


//Arreglo donde se guarda la nueva información
var informacion = [];
var informacionDestinos = [];

//Arreglo de grupo de personas pregunta 1 y 2 
var perfilGrupal = [];

//Arreglo de grupo de personas pregunta 5
var perfilGrupal2 = [];

///////// Cargar archivos////////

//Cargar el archivo viajes
$.ajax({
    url: "Viajes.csv",
    dataType: "text"

}).done(successFunctionViajes);

//Cargar el archivo Destino
$.ajax({
    url: "Destinos.csv",
    dataType: "text"

}).done(successFunctionDestinos);


//////// Leer y separar los datos ///////

function successFunctionViajes(data) {
    //Division por saltos de linea
    var datosFila = data.split("\n");


    //Llenar el option de la pregunta 1
    for (let index = 1; index < datosFila.length; index++) {
        //Lectura de una linea
        dataLinea = datosFila[index];

        //Division por ;
        arregloDeLista = dataLinea.split(",");

        opciones = document.createElement("option");

        opciones.innerHTML = arregloDeLista[0];
        opciones.value = Object.values(arregloDeLista);

        s.appendChild(opciones);


        informacion.push(arregloDeLista);
    }

    //Lenar el option de la pregunta 3
    for (let index = 1; index < datosFila.length; index++) {
        //Lectura de una linea
        dataLinea = datosFila[index];

        //Division por ;
        arregloDeLista = dataLinea.split(",");

        opciones = document.createElement("option");

        opciones.innerHTML = arregloDeLista[0];
        opciones.value = Object.values(arregloDeLista);

        s3.appendChild(opciones);

        //informacion.push(arregloDeLista);
    }
}

function successFunctionDestinos(data) {
    //Division por saltos de linea
    var datosFila = data.split("\n");

    //Llenar option pregunta 4
    for (let index = 1; index < datosFila.length; index++) {
        //Lectura de una linea
        dataLinea = datosFila[index];

        //Division por ;
        arregloDeLista = dataLinea.split(",");

        opciones = document.createElement("option");

        opciones.innerHTML = arregloDeLista[0];
        opciones.value = Object.values(arregloDeLista);

        sCiudades4.appendChild(opciones);

        informacionDestinos.push(arregloDeLista);
    }
    //console.log(informacionDestinos);


    //Llenar option pregunta 5
    for (let index = 1; index < datosFila.length; index++) {
        //Lectura de una linea
        dataLinea = datosFila[index];

        //Division por ;
        arregloDeLista = dataLinea.split(",");

        opciones = document.createElement("option");

        opciones.innerHTML = arregloDeLista[0];
        opciones.value = Object.values(arregloDeLista);

        sCiudades5.appendChild(opciones);

        //informacionDestinos.push(arregloDeLista);
    }

}



////// formulas de coseno para viajes y destinos//////

//el grupo agregado vs los destinos
function formulaCosenoDestino() {
    objetoA = perfilGrupal;

    for (let i = 0; i < informacionDestinos.length; i++) {
        //Cada uno de los objetos del archvio CSV
        objetoB = informacionDestinos[i];

        var numerador = 0;
        var denominadorA = 0;
        var denominadorB = 0;

        for (let index = 0; index < objetoA.length; index++) {
            //Recorrer cada uno de los elementos (columnas de A)
            numerador += (parseInt(objetoA[index]) * parseInt(objetoB[index + 2]));
            //sumatori ade los cuadrados de A
            denominadorA += (parseInt(objetoA[index]) * parseInt(objetoA[index]));
            //sumatoria de los cuadrados de B
            denominadorB += (parseInt(objetoB[index + 2]) * parseInt(objetoB[index + 2]));
        }

        denominadorA = Math.sqrt(denominadorA);
        denominadorB = Math.sqrt(denominadorB);
        var valorK = numerador / (denominadorA * denominadorB);
        var valorFinalK = parseInt(valorK * 100);

        console.log('Similitud Coseno entre:' + objetoA[0] + ' ' + 'y' + ' ' + objetoB[0] + ' ' + 'es:' + ' ' + valorFinalK + '%');

        if (valorFinalK < 99) {

            nuevosKDestinos.push({
                "ciudad": objetoB,
                "valorK": valorFinalK
            });

        }
    }
    listaOrdenadosDestinos = nuevosKDestinos.sort((a, b) => (a.valorK > b.valorK) ? -1 : 1);
    console.log("listaOrdenadosDestinos");
    console.log(listaOrdenadosDestinos);

    for (let index = 0; index < listaOrdenadosDestinos.length; index++) {
        if (index < inputKD.value) {
            //console.log("Nombre: " + listaOrdenados[index].persona[0]);
            listaK = document.createElement("li");
            //listaK.innerHTML = Object.values(listaOrdenados[index].persona[0]);

            // for (k = 0; k < listaOrdenados[index].persona.length; k++) {
            //     $(".contenedorSimilitudes").append("<div class='xx'>" + listaOrdenados[index].persona[k] + "</div>");
            // }
            // $(".contenedorSimilitudes").append("<br>");

            listaK.innerHTML = listaOrdenadosDestinos[index].ciudad[0] + " - " + listaOrdenadosDestinos[index].valorK + "%";
            listaSimilitudDestions.appendChild(listaK);
        }
    }

}

// una persona Vs todas las personas
function formulaCoseno() {
    x = s.selectedIndex;
    y = s.options;
    //El objeto seleccionado de la lista desplegable
    objetoA = y[x].value.split(',');

    for (let i = 0; i < informacion.length; i++) {
        //Cada uno de los objetos del archvio CSV
        objetoB = informacion[i];

        var numerador = 0;
        var denominadorA = 0;
        var denominadorB = 0;

        for (let index = 1; index < objetoA.length; index++) {
            //Recorrer cada uno de los elementos (columnas de A)
            numerador += (parseInt(objetoA[index]) * parseInt(objetoB[index]));
            //sumatori ade los cuadrados de A
            denominadorA += (parseInt(objetoA[index]) * parseInt(objetoA[index]));
            //sumatoria de los cuadrados de B
            denominadorB += (parseInt(objetoB[index]) * parseInt(objetoB[index]));
        }

        denominadorA = Math.sqrt(denominadorA);
        denominadorB = Math.sqrt(denominadorB);
        var valorK = numerador / (denominadorA * denominadorB);
        var valorFinalK = parseInt(valorK * 100);

        console.log('Similitud Coseno entre:' + objetoA[0] + ' ' + 'y' + ' ' + objetoB[0] + ' ' + 'es:' + ' ' + valorFinalK + '%');

        if (valorFinalK < 99) {

            nuevosK.push({
                "persona": objetoB,
                "valorK": valorFinalK
            });

        }


    }

    listaOrdenados = nuevosK.sort((a, b) => (a.valorK > b.valorK) ? -1 : 1);
    console.log("listaOrdenados");
    console.log(listaOrdenados);

    for (let index = 0; index < listaOrdenados.length; index++) {
        if (index < inputK.value) {
            //console.log("Nombre: " + listaOrdenados[index].persona[0]);
            listaK = document.createElement("li");
            //listaK.innerHTML = Object.values(listaOrdenados[index].persona[0]);

            // for (k = 0; k < listaOrdenados[index].persona.length; k++) {
            //     $(".contenedorSimilitudes").append("<div class='xx'>" + listaOrdenados[index].persona[k] + "</div>");
            // }
            // $(".contenedorSimilitudes").append("<br>");

            listaK.innerHTML = listaOrdenados[index].persona[0] + " - " + listaOrdenados[index].valorK + "%";
            listaSimilitud.appendChild(listaK);
        }
    }
    calcularPerfilGrupal();
    // for (k = 0; k < perfilGrupal.length; k++) {
    //     $(".perfilGrupal").append("<div class='yy'>" + perfilGrupal[k] + "</div>");
    // }
    // $(".contenedorSimilitudes").append("<br>");

}

//una persona Vs los destinos
function formulaCosenoPersona3() {
    x = s3.selectedIndex;
    y = s3.options;
    //El objeto seleccionado de la lista desplegable
    objetoA = y[x].value.split(',');

    //console.log(objetoA);

    for (let i = 0; i < informacionDestinos.length; i++) {
        //Cada uno de los objetos del archvio CSV
        objetoB = informacionDestinos[i];

        //console.log(objetoB);

        var numerador = 0;
        var denominadorA = 0;
        var denominadorB = 0;

        for (let index = 1; index < objetoA.length; index++) {
            //Recorrer cada uno de los elementos (columnas de A)
            numerador += (parseInt(objetoA[index]) * parseInt(objetoB[index + 1]));
            //sumatoria de los cuadrados de A
            denominadorA += (parseInt(objetoA[index]) * parseInt(objetoA[index]));
            //sumatoria de los cuadrados de B
            denominadorB += (parseInt(objetoB[index + 1]) * parseInt(objetoB[index + 1]));
        }
        //console.log( 'A ' + denominadorA + '  B ' + denominadorB + "  numerador " + numerador );

        denominadorA = Math.sqrt(denominadorA);
        denominadorB = Math.sqrt(denominadorB);
        var valorK = numerador / (denominadorA * denominadorB);
        var valorFinalK = parseInt(valorK * 100);

        console.log('Similitud Coseno entre:' + objetoA[0] + ' ' + 'y' + ' ' + objetoB[0] + ' ' + 'es:' + ' ' + valorFinalK + '%');

        if (valorFinalK < 99) {

            nuevosKDestinosS3.push({
                "ciudad": objetoB,
                "valorK": valorFinalK
            });

        }
    }
    listaOrdenadosDestinos = nuevosKDestinosS3.sort((a, b) => (a.valorK > b.valorK) ? -1 : 1);
    // console.log("listaOrdenadosDestinos");
    // console.log(listaOrdenadosDestinos);

    for (let index = 0; index < listaOrdenadosDestinos.length; index++) {
        if (index < inputKD3.value) {
            //console.log("Nombre: " + listaOrdenados[index].persona[0]);
            listaK = document.createElement("li");
            //listaK.innerHTML = Object.values(listaOrdenados[index].persona[0]);

            // for (k = 0; k < listaOrdenados[index].persona.length; k++) {
            //     $(".contenedorSimilitudes").append("<div class='xx'>" + listaOrdenados[index].persona[k] + "</div>");
            // }
            // $(".contenedorSimilitudes").append("<br>");

            listaK.innerHTML = listaOrdenadosDestinos[index].ciudad[0] + " - " + listaOrdenadosDestinos[index].valorK + "%";
            listaSimilitudPersona3.appendChild(listaK);
        }
    }

}

// un destino Vs todas las personas
function formulaCosenoCiudades4() {
    x = sCiudades4.selectedIndex;
    y = sCiudades4.options;
    //El objeto seleccionado de la lista desplegable
    objetoA = y[x].value.split(',');// Aqui A es la lista de ciudades

    for (let i = 0; i < informacion.length; i++) {
        //Cada uno de los objetos del archvio CSV
        objetoB = informacion[i];

        var numerador = 0;
        var denominadorA = 0;
        var denominadorB = 0;

        for (let index = 2; index < objetoA.length; index++) {
            //Recorrer cada uno de los elementos (columnas de A)
            numerador += (parseInt(objetoA[index]) * parseInt(objetoB[index - 1]));
            //sumatori ade los cuadrados de A
            denominadorA += (parseInt(objetoA[index]) * parseInt(objetoA[index]));
            //sumatoria de los cuadrados de B
            denominadorB += (parseInt(objetoB[index - 1]) * parseInt(objetoB[index - 1]));
            //console.log( 'numerador: ' + numerador+   'A:  '+denominadorA + 'B:  '+   denominadorB);
        }

        denominadorA = Math.sqrt(denominadorA);
        denominadorB = Math.sqrt(denominadorB);
        var valorK = numerador / (denominadorA * denominadorB);
        var valorFinalK = parseInt(valorK * 100);

        console.log('Similitud Coseno entre:' + objetoA[0] + ' ' + 'y' + ' ' + objetoB[0] + ' ' + 'es:' + ' ' + valorFinalK + '%');

        if (valorFinalK < 99) {

            nuevosKCiudades.push({
                "persona": objetoB,
                "valorK": valorFinalK
            });

        }

    }

    listaOrdenados = nuevosKCiudades.sort((a, b) => (a.valorK > b.valorK) ? -1 : 1);
    console.log("listaOrdenados");
    console.log(listaOrdenados);

    for (let index = 0; index < listaOrdenados.length; index++) {
        if (index < inputKD4.value) {

            listaK = document.createElement("li");

            listaK.innerHTML = listaOrdenados[index].persona[0] + " - " + listaOrdenados[index].valorK + "%";
            listaSimilitudCiudades4.appendChild(listaK);
        }
    }

}

// una persona Vs todas las personas
function formulaCosenoCiudades5() {
    x = sCiudades5.selectedIndex;
    y = sCiudades5.options;
    //El objeto seleccionado de la lista desplegable
    objetoA = y[x].value.split(',');// aqui A es ciudades

    for (let i = 0; i < informacion.length; i++) {
        //Cada uno de los objetos del archvio CSV
        objetoB = informacionDestinos[i];// B tambien es ciudades

        var numerador = 0;
        var denominadorA = 0;
        var denominadorB = 0;

        for (let index = 2; index < objetoA.length; index++) {
            //Recorrer cada uno de los elementos (columnas de A)
            numerador += (parseInt(objetoA[index]) * parseInt(objetoB[index]));
            //sumatori ade los cuadrados de A
            denominadorA += (parseInt(objetoA[index]) * parseInt(objetoA[index]));
            //sumatoria de los cuadrados de B
            denominadorB += (parseInt(objetoB[index]) * parseInt(objetoB[index]));
        }

        denominadorA = Math.sqrt(denominadorA);
        denominadorB = Math.sqrt(denominadorB);
        var valorK = numerador / (denominadorA * denominadorB);
        var valorFinalK = parseInt(valorK * 100);

        console.log('Similitud Coseno entre:' + objetoA[0] + ' ' + 'y' + ' ' + objetoB[0] + ' ' + 'es:' + ' ' + valorFinalK + '%');

        if (valorFinalK < 99) {

            nuevosKCiudades5.push({
                "persona": objetoB,
                "valorK": valorFinalK
            });

        }


    }

    listaOrdenados = nuevosKCiudades5.sort((a, b) => (a.valorK > b.valorK) ? -1 : 1);
    console.log("listaOrdenados");
    console.log(listaOrdenados);

    for (let index = 0; index < listaOrdenados.length; index++) {
        if (index < inputKD5.value) {
            //console.log("Nombre: " + listaOrdenados[index].persona[0]);
            listaK = document.createElement("li");


            listaK.innerHTML = listaOrdenados[index].persona[0] + " - " + listaOrdenados[index].valorK + "%";
            listaSimilitudCiudades5.appendChild(listaK);
        }
    }
    calcularPerfilGrupalCiudades();


}


///// Calcular perfil grupal de personas para ir a un lugar /////
function calcularPerfilGrupal() {
    //Recorrer las columnas de cada persona,se asume q todas las personas tienen las mismas colunas
    //por eso se usa la posicion cero como muestra y se inicia el contador p=1, por que en cero esta el nombre
    for (p = 1; p < listaOrdenados[0].persona.length; p++) {
        perfilGrupal[p - 1] = 0;
        //Recorrer a todas las personas
        for (let index = 0; index < inputK.value; index++) {
            perfilGrupal[p - 1] += parseInt(listaOrdenados[index].persona[p]);
        }
        //debe sumarse el mismo objetoA
        perfilGrupal[p - 1] += parseInt(objetoA[p]);
        //calculamos el promedio
        console.log("Suma Perfil: " + perfilGrupal[p - 1]);
        perfilGrupal[p - 1] = perfilGrupal[p - 1] / (parseInt(inputK.value) + 1);
    }

}


///// Calcular perfil grupal de lugares para la pregunta 5 /////
function calcularPerfilGrupalCiudades() {
    //Recorrer las columnas de cada persona,se asume q todas las personas tienen las mismas colunas
    //por eso se usa la posicion cero como muestra y se inicia el contador p=1, por que en cero esta el nombre
    for (p = 1; p < listaOrdenados[0].persona.length; p++) {
        perfilGrupal2[p - 2] = 0;
        //Recorrer a todas las personas
        for (let index = 0; index < inputKD5.value; index++) {
            perfilGrupal2[p - 2] += parseInt(listaOrdenados[index].persona[p]);
        }
        //debe sumarse el mismo objetoA
        perfilGrupal[p - 2] += parseInt(objetoA[p]);
        //calculamos el promedio
        console.log("Suma Perfil: " + perfilGrupal2[p - 2]);
        perfilGrupal2[p - 2] = perfilGrupal2[p - 2] / (parseInt(inputKD5.value) + 1);
    }
    console.log('perfil grupal 2 '+ perfilGrupal2);
}

//el grupo agregado de ciudades vs las personas
function formulaCosenoCiudades51() {
    objetoA = perfilGrupal2;// esto es ciudades

    for (let i = 0; i < informacion.length; i++) {
        //Cada uno de los objetos del archvio CSV
        objetoB = informacion[i];// esto es personas

        var numerador = 0;
        var denominadorA = 0;
        var denominadorB = 0;

        for (let index = 0; index < objetoA.length; index++) {
            //Recorrer cada uno de los elementos (columnas de A)
            numerador += (parseInt(objetoA[index]) * parseInt(objetoB[index + 1]));
            //sumatori ade los cuadrados de A
            denominadorA += (parseInt(objetoA[index]) * parseInt(objetoA[index]));
            //sumatoria de los cuadrados de B
            denominadorB += (parseInt(objetoB[index + 1]) * parseInt(objetoB[index + 1]));
        }

        denominadorA = Math.sqrt(denominadorA);
        denominadorB = Math.sqrt(denominadorB);
        var valorK = numerador / (denominadorA * denominadorB);
        var valorFinalK = parseInt(valorK * 100);

       console.log('Similitud Coseno entre:' + objetoA[0] + ' ' + 'y' + ' ' + objetoB[0] + ' ' + 'es:' + ' ' + valorFinalK + '%');

        if (valorFinalK < 99) {

            nuevosKCiudades51.push({
                "ciudad": objetoB,
                "valorK": valorFinalK
            });

        }
    }
    listaOrdenadosDestinos = nuevosKCiudades51.sort((a, b) => (a.valorK > b.valorK) ? -1 : 1);
    console.log("listaOrdenadosDestinos");

    for (let index = 0; index < listaOrdenadosDestinos.length; index++) {
        if (index < inputKD51.value) {
            //console.log("Nombre: " + listaOrdenados[index].persona[0]);
            listaK = document.createElement("li");
            
            listaK.innerHTML = listaOrdenadosDestinos[index].ciudad[0] + " - " + listaOrdenadosDestinos[index].valorK + "%";
            listaSimilitudCiudades51.appendChild(listaK);
        }
    }

}


btnEjecutar.addEventListener('click', formulaCoseno);// pregunta 1
btnEjecutar2.addEventListener('click', formulaCosenoDestino); // pregunta 2 
btnEjecutar3.addEventListener('click', formulaCosenoPersona3);// pregunta 3
btnEjecutar4.addEventListener('click', formulaCosenoCiudades4); // pregunta 4
btnEjecutar5.addEventListener('click', formulaCosenoCiudades5); // pregunta 5
btnEjecutar51.addEventListener('click', formulaCosenoCiudades51); // pregunta 5