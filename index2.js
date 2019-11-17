var body = document.querySelector("body");
var s = document.querySelector(".desplegable");
var simi = document.querySelector(".titulo");
var btnEjecutar = document.querySelector(".btnEjecutar");
var inputK = document.querySelector(".inputK");
var btnEjecutar2 = document.querySelector(".btnEjecutar2");
var inputKD = document.querySelector(".inputKD");
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
var listaOrdenados;
var listaOrdenadosDestinos;
var listaK;
var listaSimilitud = document.querySelector(".lista-Similitud");
var listaSimilitudDestions = document.querySelector(".lista-SimilitudDestions");


//Arreglo donde se guarda la nueva información
var informacion = [];
var informacionDestinos = [];

//Arreglo de las similitudes
var perfilGrupal = [];

//Cargar el archivo
$.ajax({
    url: "Viajes.csv",
    dataType: "text"

}).done(successFunctionViajes);

//Cargar el archivo Destino
$.ajax({
    url: "Destinos.csv",
    dataType: "text"

}).done(successFunctionDestinos);

function successFunctionDestinos(data) {
    //Division por saltos de linea
    var datosFila = data.split("\n");

    for (let index = 1; index < datosFila.length; index++) {
        //Lectura de una linea
        dataLinea = datosFila[index];

        //Division por ;
        arregloDeLista = dataLinea.split(",");


        //s.appendChild(opciones);

        informacionDestinos.push(arregloDeLista);
    }
    console.log(informacionDestinos);

}


function successFunctionViajes(data) {
    //Division por saltos de linea
    var datosFila = data.split("\n");

    //console.log(informacion);

    for (let index = 1; index < datosFila.length; index++) {
        //Lectura de una linea
        dataLinea = datosFila[index];

        //Division por ;
        arregloDeLista = dataLinea.split(";");

        opciones = document.createElement("option");

        opciones.innerHTML = arregloDeLista[0];
        opciones.value = Object.values(arregloDeLista);

        s.appendChild(opciones);

        informacion.push(arregloDeLista);
    }

}


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
            denominadorB += (parseInt(objetoB[index+2]) * parseInt(objetoB[index+2]));
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

// coseno para viajes
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

    formulaCosenoDestino();

}


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


btnEjecutar.addEventListener('click', formulaCoseno);
btnEjecutar2.addEventListener('click', formulaCosenoDestino);