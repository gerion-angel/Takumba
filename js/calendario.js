var eventoAsignado = false;
$(document).on("pageinit", "#fecha", function() {
    var fecha = new Date();
    var conc = (fecha.getMonth() - (-1)) + "/" + fecha.getDate() + "/" + (fecha.getYear() - (-1900));
    $("#filtroCalendario").datepicker("setDate", conc);
    $("#filtroCalendario").datepicker("option", "dayNamesMin", ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"]);
    $("#filtroCalendario").datepicker("option", "monthNamesShort", ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]);
    $("#filtroCalendario").datepicker("option", "monthNames", ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]);
    $("#filtroCalendario").datepicker("option", "firstDay", 1);
    $("#filtroCalendario").datepicker();
    $("#filtroCalendario").on('change', function() {
        var f = new Date($("#filtroCalendario").datepicker('getDate'));
        sessionFiltroFecha = f.getTime();
        tituloAnterior = document.getElementById('tituloListadoActividades').innerHTML;
        document.getElementById('tituloListadoActividades').innerHTML = getFechaSolo(f)
        document.location.href = "#actividades";
        cargaListadoActividades();
    });
    if (!eventoAsignado) {
        eventoAsignado = true;

        $(".ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-next").click(function() {
            cargaDiasConActividad();
        })
    }
    sessionMesPintar = fecha.getMonth();
    sessionAnnoPintar = fecha.getYear();
    cargaDiasConActividad();
});

var numMesesMovido = 0;

$(document).on("pagebeforeshow", "#fecha", function() {
    var fecha = new Date();
    var conc = (fecha.getMonth() - (-1)) + "/" + fecha.getDate() + "/" + (fecha.getYear() - (-1900));
    $("#filtroCalendario").datepicker("setDate", conc);
    numMesesMovido = 0;
});

function onFechaSeleccion(f) {
    tituloAnterior = document.getElementById('tituloListadoActividades').innerHTML;
    document.getElementById('tituloListadoActividades').innerHTML = getFechaSolo(f)
    document.location.href = "#actividades";
    cargaListadoActividades();
}

function mesMenosCalendario() {

    $("#filtroCalendario").datepicker("setDate", "-1m");

}

function mesMasCalendario() {
    $("#filtroCalendario").datepicker("setDate", "+1m");

}

function pintaDiasConActividad(data) {

    //console.info(data)

    switch (data.tipo) {
        case "1":
            /*si son del tipo listado cargar el ul*/
            $("#zonaListadoFechasFiltro").removeClass("trOculto");
            $("#zonaCalendarioFiltro").addClass("trOculto")
            var acumulador = "";
            for (i = 0; i < data.fechas.length; i++) {
                var fecha = new Date(data.fechas[i]);
                acumulador += "<li onclick='sessionFiltroFecha=\"" + fecha.getTime()
                        + "\"; onFechaSeleccion(\"" + fecha + "\")'>"
                acumulador += "<span>" + getDayName(fecha) + " " + fecha.getDate() + " de " + getMonthName(fecha.getMonth()) + "</span>";
                acumulador += "</li>"
            }
            $("#zonaListadoFechasFiltro ul").html(acumulador);
            break;
        case "2":
            if (data.fechas.length == 0 && numMesesMovido < 12 && numMesesMovido != -1) {
                numMesesMovido++;
                $(".ui-datepicker .ui-datepicker-next").click()
                //console.info("Pasando mes")
                break;
            }
            if (data.fechas.length == 0 && numMesesMovido == 12) {
                var fecha = new Date();
                var conc = (fecha.getMonth() - (-1)) + "/" + fecha.getDate() + "/" + (fecha.getYear() - (-1900));
                $("#filtroCalendario").datepicker("setDate", conc);
                cargaDiasConActividad();
                //console.info ("PASADOS 12 MESES ")
                numMesesMovido++;
            }
            if(data.fechas.length>0){
                numMesesMovido=13;
            }
            for (i = 1; i <= 31; i++) {
                $("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "'] a").removeClass("diaConActividadPermanente");
                $("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "'] a").removeClass("diaConActividad");
            }

            $("#zonaListadoFechasFiltro").addClass("trOculto");
            $("#zonaCalendarioFiltro").removeClass("trOculto")
            /*clarear los dias prebios*/
            var diaHoy = new Date().getDate()
            var mesHoy = new Date().getMonth()
            var annoHoy = new Date().getYear() - (-1900);
            var diasPre = diaHoy;
            if (annoHoy < sessionAnnoPintar) {
                diasPre = 0;
            } else if (annoHoy > sessionAnnoPintar) {
                diasPre = 32;
            } else if ((sessionMesPintar - 1) < mesHoy) {
                diasPre = 32;
            } else if ((sessionMesPintar - 1) > mesHoy) {
                diasPre = 0;
            }

            for (var i = 1; i < diasPre; i++) {
                $("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "'] a").addClass("diasPrevios");
            }

            var permanente = data.haypermanente; // hay que sacar el valor de data

            try {
                for (i = 0; i < data.fechas.length; i++) {//marca las no permanentes
                    var dia;
                    var mes;
                    var anno;
                    var fecha = new Date(data.fechas[i]);
                    dia = fecha.getDate();
                    mes = fecha.getMonth();
                    anno = fecha.getYear() - (-1900);
                    $("td[data-dia='" + dia + "'][data-month='" + mes + "'][data-year='" + anno + "'] a").addClass("diaConActividad");
                }
            } catch (e) {
               // console.error(e)
                /*No hay fechas*/
            }

            if (permanente) {   /*marca los permanentes*/
                for (i = 1; i <= 31; i++) {
                    $("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "'] a").addClass("diaConActividadPermanente");
                }
            }

            for (i = 1; i <= 31; i++) {/*establece si son clickables*/
                if (!$("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "'] a").hasClass("diaConActividad") && !$("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "'] a").hasClass("diaConActividadPermanente")) {
                    $("td[data-dia='" + i + "'][data-month='" + (sessionMesPintar - 1) + "'][data-year='" + sessionAnnoPintar + "']").addClass("ui-datepicker-unselectable");
                }
            }
            break;
    }
}

$(document).on("pagebeforeshow", "#fecha", function() {
    cargaDiasConActividad();
});

/*
 
 $("td[data-dia='13'][data-month='6'][data-year='2014'] a").addClass("diaConActividad")
 
 $("td[data-dia='11'][data-month='6'][data-year='2014'] a").addClass("diaConActividad")
 
 $("td[data-dia='1'][data-month='6'][data-year='2014'] a").addClass("diaConActividad")
 
 $("td[data-dia='7'][data-month='6'][data-year='2014'] a").addClass("diaConActividad")
 
 $("td[data-dia='20'][data-month='6'][data-year='2014'] a").addClass("diaConActividad")
 
 $("td[data-dia='27'][data-month='6'][data-year='2014'] a").addClass("diaConActividad")
 
 */

