/**
 * NECESITA DEL USO DE LA LIBRERIA rrule.js
 * **/

/*obtiene un array de fechas correspondiente a la regla de recurrencia*/
function getFechasRecurrencia(regla) {
    if (regla.indexOf("RRULE:") == 0) {
        regla = regla.substring(6)
    }
    if (regla.lastIndexOf(';') == regla.length - 1) {
        regla = regla.substring(0, regla.length - 1)
    }
    if (regla.lastIndexOf(',') == regla.length - 1) {
        regla = regla.substring(0, regla.length - 1)
    }
    var rule = RRule.fromString(regla);
    return (rule.all())
}

/*combina 2 arrays evitando que aparezcan 2 veces la misma fecha y devuelve un array con la combinacion*/
function combinarArrays(ar1, ar2) {
    var hoy = getDateHoy();
    for (var i = 0; i < ar2.length; i++) {
        if (ar1.indexOf(ar2[i]) == -1) {
            if (new Date(ar2[i]).getTime() >= hoy) { //para quitar las fechas anteriores a hoy
                ar1.push(ar2[i])
            }
        }
    }
    return ar1;
}

/*funcion que obtiene todas las fechas que se generan en las reglas de recurrencia*/
function getArrayFechasRecurrentes(dataRecurrencias) {
    //var dataRecurrencias = selectListadoRecursivas()
    var arrayFechas = [];
    for (var i = 0; i < dataRecurrencias.length; i++) {
        console.info("for"+i)
        if (arrayFechas == []) {
            arrayFechas = getFechasRecurrencia(dataRecurrencias[i].rule);
        } else {
            arrayFechas = combinarArrays(arrayFechas, getFechasRecurrencia(dataRecurrencias[i].rule));
        }
    }
    return arrayFechas;

}

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

/*funcion que devuelve el timestamp del dia de hoy sin hora, minuto, segundo ni milisegundos*/
function getDateHoy() {
    return new Date(new Date(new Date(new Date(new Date().setMinutes(0)).setHours(0)).setSeconds(0)).setMilliseconds(0)).getTime();
}

/*funcion que devuelva un array de fechas a una diferencia de x horas*/
function getFechasCercanas(horas, fechas) {
    var fechasCerca = [];
    var timeToday = getDateHoy()
    for (var i = 0; i < fechas.length; i++) {
        var fecha = new Date(fechas[i]).getTime();
        if (fecha >= timeToday && fecha <= timeToday.addHours) {
            fechasCerca.push(fechas[i]);
        }
    }
    return fechasCerca;
}

/*get recurrentes por mes*/
function getRecurrentesPorMes(mes, anno, recurrentes) {
    var fechasMes = [];
    for (var i = 0; i < recurrentes.length; i++) {
        var fecha = new Date(recurrentes[i]);
        if (fecha.getMonth() == mes && fecha.getFullYear() == anno) {
            fechasMes.push(recurrentes[i])
        }
    }
    return fechasMes;
}

/*get fechas primera y ultima recurrentes devuelve array de 2 elementos con la primera fcha y la ultima*/
function getPrimeraUltimaRecurrentes(recurrentes) {
    var fechasPU = [];
    if (recurrentes.length > 0) {
        fechasPU[0] = recurrentes[0];
        fechasPU[1] = recurrentes[0];
        for (var i = 1; i < recurrentes.length; i++) {
            if (recurrentes[i] < fechasPU[0]) {
                fechasPU[0] = recurrentes[i]
            } else if (recurrentes[i] > fechasPU[1]) {
                fechasPU[1] = recurrentes[i]
            }
        }
    }
    return fechasPU;
}

/*funcion que devuelve los dias de diferencia entre 2 fechas*/
function getDiasDiferencia(fecha1, fecha2) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(fecha1);
    var secondDate = new Date(fecha2);
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}

/*funcion que devuelve las fechas entre 2 fechas*/
function getFechasEntreFechas(fecha1, fecha2) {
    var array = []
    var dia1 = new Date(fecha1);
    dia1.setHours(0);
    dia1.setMinutes(0);
    dia1.setSeconds(0);
    dia1.setMilliseconds(0);
    var dia2 = new Date(fecha2);
    dia2.setHours(0);
    dia2.setMinutes(0);
    dia2.setSeconds(0);
    dia2.setMilliseconds(0);
    while (dia1 <= dia2) {
        array.push(dia1.getTime())
        dia1.addHours(24)
    }
    return array;
}