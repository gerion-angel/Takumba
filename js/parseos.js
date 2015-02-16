/* *
 * funcion que carga un listado de eventos en un listado pasados ambos como parametros
 * */
function parsearListadoEventos(data, id) {
    setTimeout(function () {
        setLoader('idBody');
        $("#canvasLoader").css("background-color", "transparent")
    }, 10)
    var listado = document.getElementById(id);
    var acumulador = "";
    resetFiltros();
    try {
        if (data.length == 1) {
            sessionSoloUnEvento = true;
            try {
                hideLoader();
            } catch (e) {
                console.error(e)
            }
            var evento = data[0];
            sessionFiltroEvento = evento.id;
            cargaListadoActividades();
            setTituloListado(evento.nombre);
            document.location.href = "#actividades";
            document.getElementById('backListadoActividades').style.display = 'none';
            $(".ui-pre-last-child").hide();
            $("#backListadoActividades").click(function () {
                document.getElementById('backListadoActividades').style.display = 'none';
                document.getElementById('zonaDetalleParticipante').style.display = 'none';
                document.getElementById('zonaDetalleEvento').style.display = '';
                sessionFiltroParticipantes = -1
            });
            cargaDetalleEvento();
        } else {
            sessionSetLoader = true;
            document.getElementById('backListadoActividades').style.display = 'block'
            for (var i = 0; i < data.length; i++) {
                var evento = data[i];
                var idEv = evento.id;
                var nombre = evento.nombre;
                var img = evento.urlImagen;
                var fechaIni = evento.fechaIni;
                var fechaFin = evento.fechaFin;
                var subtitulo = evento.subtitulo;
                acumulador += "<li>"
                acumulador += "<a  href='#actividades' onclick='sessionFiltroEvento=" + idEv + "; cargaListadoActividades();setTituloListado(\"" + nombre + "\");cargaDetalleEvento();cargaPosEvento();ga(\"send\", \"event\", \"button\", \"click\", \"Evento:" + nombre + "\", 1);'>"
                acumulador += "<div style=''>";
                acumulador += "<span><div><p>" + nombre + "</p>";
                acumulador += "<p>" + subtitulo + "</p>";
                acumulador += "<p>del " + getFechaSolo(fechaIni) + " al " + getFechaSolo(fechaFin) + "</p>" + "</div></span>";
                acumulador += "</div>"
//                acumulador += "<img class='lazy' data-original='" + img + "'\>";
                acumulador += "<img src='" + img + "'\>";
                acumulador += "</a></li>"

            }
            listado.innerHTML = acumulador;
            setTimeout(function () {
                try {
                    setTimeout(navigator.splashscreen.hide, 10)
                } catch (e) {
                }
                $("#splashDiv").remove();
                hideLoader()
                $("#canvasLoader").css("background-color", "#f8f8f8")
            }, 1000)

        }
    } catch (e) {
    }
    setCheckConnection()
    sessionSetLoader = true;

    $("#listadoEventosIndice li").on("MSPointerDown", function () {
        $(this).css('left', "10px")
    })
    $("#listadoEventosIndice li").on("MSPointerDown", function () {
        $(this).css('position', "relative")
    })
    $("#listadoEventosIndice li").on("MSPointerUp", function () {
        $(this).css('left', "0px")
    })
    $("#listadoEventosIndice li").on("MSPointerOut", function () {
        $(this).css('left', "0px")
    })

    $("#canvasLoader").remove()
}

/*
 * funcion que parsea y muestra el detalle de un evento
 */
function parsearDetalleEvento(data) {
    var zona = document.getElementById('zonaDetalleEvento');
    $(".descripcionFiltro").html('');
    zona.style.display = '';
    zona.innerHTML = "";
    var acumulador = "";
    var evento = data[0];
    document.getElementById("cabeceraInfoDetalleEvento").style.backgroundImage = "url('" + evento.urlImagen + "')";
    acumulador += "<span>" + evento.nombre + "</span>";
    if (evento.nombreLugar != undefined) {
        acumulador += "<span>" + evento.nombreLugar + "</span>";
    } else {
        acumulador += "<span> </span>";
    }
//    acumulador += "<span>del " + getFechaSolo(evento.fechaInicioOficial) + " al " + getFechaSolo(evento.fechaFinOficial) + "</span>";
    acumulador += "<span>" + evento.horaInicioOficial + " - " + evento.horaFinOficial + "</span>";
    $("#cabeceraInfoDetalleEvento div div").html(acumulador);
    acumulador = "";
    if (evento.numPatrocinadores * 1 == 0) {
        $("#zonaDetalleEventoPatrocinadores, .PatrocinadoresMenu").addClass("trOculto")
    } else {
        $("#zonaDetalleEventoPatrocinadores, .PatrocinadoresMenu").removeClass("trOculto")
    }

    acumulador += "<br/><br/><span style='font-weight:bold'>" + evento.subtitulo + "</span>";
    acumulador += "<br/><br/>" + evento.entradilla;
    acumulador += "<br/><br/>" + evento.descripcion;

    $("#zonaDetalleEventoTextos").html(acumulador)

    acumulador = ""
    if (evento.numPatrocinadores) {
        if (evento.numPatrocinadores * 1 == 0) {
            $(".botonAdmiracionDetalleEvento img, .PatrocinadoresMenu").addClass("trOculto")
        } else {
            $(".botonAdmiracionDetalleEvento img, .PatrocinadoresMenu").removeClass("trOculto")
        }
    }
    zona.style.backgroundImage = 'url("' + evento.urlImagen + '")'
    acumulador += "<div><span class='degradadoNegro'><div>"
    acumulador += "<p class='title'>" + evento.nombre + "</p>";
    //setTituloListado(evento.nombre);
    if (evento.subtitulo)
        acumulador += "<p>" + evento.subtitulo + "</p>";
//    acumulador += "<p>del " + getFechaSolo(evento.fechaInicioOficial) + " al " + getFechaSolo(evento.fechaFinOficial) + "</p>";
    acumulador += "<p>" + evento.horaInicioOficial + " - " + evento.horaFinOficial + "</p>";
    /*acumulador += "<img src='images/Degradado_PHONE.png' class='fondoDegradadoEventos'/>";*/
    acumulador += "</div></span></div>"
    acumulador += "<span class='botonDespliegue ajusteBtnDespliegueEvento'></span>"



    zona.innerHTML = acumulador;
    $(".descripcionFiltro,.descripcionEventoDetalle.descripcionFiltro").html(evento.entradilla);
    acumulador = "";
    document.getElementById('cabeceraDetalleEvento').innerHTML = evento.nombre;
    acumulador += "<span class='title'>" + evento.nombre + "</span>";
    acumulador += "<span>" + evento.entradilla + "</span>";
    acumulador += "<span>" + evento.nombreLugar + "</span>";
//    acumulador += "<span>Desde " + getFechaHora(evento.fechaInicioOficial) + "</span>";
//    acumulador += "<span>Hasta" + getFechaHora(evento.fechaFinOficial) + "</span>";
    acumulador += "<span>Desde " + evento.horaInicioOficial + "</span>";
    acumulador += "<span>Hasta" + evento.horaFinOficial + "</span>";
    $(".datosIzquierda.evento").html(acumulador);
    $(".imgDetalleEvento").html("<img src='" + evento.urlImagen + "' alt='" + evento.altImagen + "'/>");
    $(".cuerpoDetalleEvento").html("<span>" + evento.altImagen + "</span><p>" + evento.descripcion + "</p>");
    try {
        cargaBannersEvento();
    } catch (e) {
    }
    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
    $('.botonDespliegue').click(function (e) {
        e.preventDefault();
        if (!$(".descripcionFiltro").hasClass('descripcionFiltroDesplegada')) {
            $(".descripcionFiltro").addClass('descripcionFiltroDesplegada');
        } else {
            $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
        }
        if (!e)/*IMPRTANTE: detiene la propagacion*/
            var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    });
    sessionSetLoader = true;
    $("#canvasLoader").remove()

}

var timer1;
var timer2;
/*
 * funcion que parsea el/los banner de un evento
 */
function parsearBannersEvento(data) {
    var acumulador = "";
    var i1 = 0;
    var i2 = 1;

    if (data.length > 0) {
        sessionHayBanners = 1;
        if (data.length == 1) {
            i2 = 0;
        }
        var ancho = window.innerWidth;
        var up = (ancho * 50 / 320) - 1;
        /*if (sessionPushToken == "")
         up = up;*/
        document.getElementById('listadoActividades').style.marginBottom = up + "px"
        /*if (sessionPushToken == "")
         up = up - (-43);*/
        var upLis = up - (1);
        document.getElementById('bannerDelListado').style.bottom = upLis + "px"
        var upEve = up - 50;
        document.getElementById('bannerDetalleEvento').style.marginBottom = upEve + "px";
        document.getElementById('bannerDeLaActividad').style.marginBottom = (upEve - 2) + "px";
        acumulador += "<div class='bannerZone'>";
        acumulador += "<a class='linkBannerActividad1' onclick='window.open(\"" + data[i1].urlDestino + "\",\"_system\")'>"
        acumulador += "<img src='" + data[i1].urlImagen + "'/>"
        acumulador += "</a>";
        acumulador += "<a class='linkBannerActividad2' onclick='window.open(\"" + data[i2].urlDestino + "\",\"_system\")' >"
        acumulador += "<img src='" + data[i2].urlImagen + "'/>"
        acumulador += "</a>";
        acumulador += "</div>";
        $(".zonaBannerEvento").html(acumulador);
        $('.linkBannerActividad1').addClass('visible');
        timer2 = setTimeout(cambiaBannerActividad2, 5000);
        $(".bannerZone a img").each(function () {
            if ($(this).attr('src') == 'undefined') {
                $(this).remove();
            }
        })
    } else {
        sessionHayBanners = -1;
        $(".zonaBannerEvento").html("");
        document.getElementById('listadoActividades').style.marginBottom = "0px"
        document.getElementById('bannerDelListado').style.bottom = "0px"
    }
}


/*
 * funcion que parsea el/los banner de una actividad
 */
function parsearBannersActividad(data) {
    var acumulador = "";
    var i1 = 0;
    var i2 = 1;

    if (data.length > 0) {
        sessionHayBanners = 1;
        if (data.length == 1) {
            i2 = 0;
        }
        var ancho = window.innerWidth;
        var up = (ancho * 50 / 320) - 1;
        /*if (sessionPushToken == "")
         up = up;*/
        if ($("#actividades .zonaBannerEvento .bannerZone").html() != "")
            document.getElementById('listadoActividades').style.marginBottom = up + "px"
        /*if (sessionPushToken == "")
         up = up - (-43);*/
        var upLis = up - (1);
        //document.getElementById('listadoActividades').style.marginBottom = upLis + "px"
        //document.getElementById('bannerDelListado').style.bottom = upLis + "px"
        //var upEve = up - 50;
        //document.getElementById('bannerDetalleEvento').style.marginBottom = upEve + "px";
        document.getElementById('zonaRecintoDetalleAct').style.marginBottom = (upLis) + "px ";
        acumulador += "<div class='bannerZone'>";
        acumulador += "<a class='linkBannerActividad1' onclick='window.open(\"" + data[i1].urlDestino + "\",\"_system\")'>"
        acumulador += "<img src='" + data[i1].urlImagen + "'/>"
        acumulador += "</a>";
        acumulador += "<a class='linkBannerActividad2' onclick='window.open(\"" + data[i2].urlDestino + "\",\"_system\")' >"
        acumulador += "<img src='" + data[i2].urlImagen + "'/>"
        acumulador += "</a>";
        acumulador += "</div>";
        $("#bannerDeLaActividad").html(acumulador);
        $('.linkBannerActividad1').addClass('visible');
        timer2 = setTimeout(cambiaBannerActividad2, 5000);
    } else {
        sessionHayBanners = -1;
        $("#bannerDeLaActividad").html("");
        document.getElementById('zonaRecintoDetalleAct').style.marginBottom = "0px"
        //document.getElementById('bannerDelListado').style.bottom = "0px"
    }
}


/*funciones para la iteracion entre los banner*/
function cambiaBannerActividad2() {
    setTimeout(function () {
        $('.linkBannerActividad2').addClass('visible');
        $('.linkBannerActividad1').removeClass('visible');
    }, 1);
    //clearTimeout(timer2);
    setTimeout(cambiaBannerActividad1, 5000);
}
function cambiaBannerActividad1() {
    setTimeout(function () {
        $('.linkBannerActividad1').addClass('visible');
        $('.linkBannerActividad2').removeClass('visible');
    }, 1);
    //clearTimeout(timer1);
    setTimeout(cambiaBannerActividad2, 5000);
}

function parsearPatrocinadoresEvento(data) {
    var acumulador = "";
    var cat = "";
    var interno = "";
    var cont = 0;
    for (var i = 0; i < data.length; i++) {
        var patron = data[i];
        if (i > 0 && cat != patron.categoria) {
            acumulador += interno;
            acumulador += "</table>"
            cont++;
        }
        if (cat != patron.categoria) {
            interno = "";
//            acumulador += "<table class='categoriaPatron'><tr><th><span>" + patron.categoria + "</span><div class='botonDespliegue ajusteBtnDesplieguePatron' onclick='muestraPatrones(" + cont + ")'></div></th></tr>";
            acumulador += "<table class='categoriaPatron'><tr><th><span>" + patron.categoria + "</span></th></tr>";
            cat = patron.categoria;
        }
        interno += "<tr><td><a onclick='window.open(\"" + patron.urlDestino + "\",\"_system\")'><img src='" + patron.urlLogotipo + "' /></a></td></tr>"
    }
    acumulador += interno;
    acumulador += "</table>";
    $(".zonaPatrocinadores").html(acumulador);
}

/*funcion que parsea el listado de etiquetas contenido en data*/
function parsearListadoEtiquetas(data) {
    var zona = document.getElementById('listadoEtiquetas');
    var acumulador = "";
    for (var i = 0; i < data.length; i++) {
        var etiqueta = data[i];
        var nombre = etiqueta.nombre;
        var id = etiqueta.id
        acumulador += "<li style='background-color:" + data[i].color + "' onclick='sessionFiltroEtiqueta=" + id + ";cargaListadoActividades();setTituloListado(\"" + nombre + "\");ga(\"send\", \"event\", \"button\", \"click\", \"Etiqueta:" + nombre + "\", 1);document.location.href=\"#actividades\"'>";

        acumulador += "<table>";
        acumulador += "<tr><td>";
//        var img = data[i].urlImagen
//        if (img != "undefined" && img != "" && img != null && img != "null")
//            acumulador += "<img src='" + img + "'/>";
//        else {
//            acumulador += "<div class='cuadradoColor' style='background-color:" + data[i].color + "'></div>"
//        }
//        acumulador += "</td><td>";
        acumulador += "<span>" + data[i].nombre + "</span>";
        acumulador += "</td></tr>";
        acumulador += "</table>";
        acumulador += "</li>";
    }
    zona.innerHTML = acumulador;
}

/*Funcion que toma la posicion de un evento*/
function parsearPosicionEvento(data) {
    var lat = data[0].latitud;
    var lang = data[0].longitud;
    var nombre = data[0].nombre;
    sessionLatEvento = lat;
    sessionLongEvento = lang;
    sessionPosEvento = nombre;
}

/*
 * funcion que parsea el listado de tematicas y las carga sobre su pagina
 */
function parsearListadoTematicas(data) {
    var contFav = 0;
    var listado = document.getElementById('listadoTematicas');
    var acumulador = "";
//    if (sessionTematicasFavoritas) {
//        document.getElementById('btnFavTematicas').src = 'images/estrellaBlancaMarcada.png'
//    } else {
//        document.getElementById('btnFavTematicas').src = 'images/estrellaBlancaNoMarca.png'
//    }
    try {
        if (data.length == 0) {
            acumulador = "No hay ninguna temática.";
            $(".tematicasMenu").addClass("trOculto");
        } else {
            $(".tematicasMenu").removeClass("trOculto");
            for (var i = 0; i < data.length; i++) {
                var tema = data[i];
                var idTem = tema.id;
                var nombre = tema.nombre;
                var img = tema.urlImagen;
                var key = "tematica" + idTem;
                var color = tema.color;
                if (sessionTematicasFavoritas == false || (getData(key) != 'null' && getData(key) != null)) {
                    acumulador += "<li style='background-color:" + color + "'>";
                } else {
                    acumulador += "<li style='display:none; background-color:" + color + "'>";
                }
                acumulador += "<table>";
                acumulador += "<tr>"
                acumulador += "<td><a href='#actividades' onclick='if(sessionFiltroTematica==-1){sessionFiltroTematica=" + idTem + "}else{sessionFiltroTematica2=" + idTem + "};setTituloListado(\"" + nombre + "\"); cargaListadoActividades();ga(\"send\", \"event\", \"button\", \"click\", \"Tematica:" + nombre + "\", 1);'>";
                acumulador += "<span>" + nombre + "</span>";
                acumulador += "</a></td><td class='celdaImg noMostrar'>";
                var key = "tematica" + idTem;
                if (getData(key) != 'null' && getData(key) != null) {
                    contFav++;
                    acumulador += "<a id='checkFavTem" + idTem + "' class='checkFavorito' onclick='setTemaFavorito(\"" + idTem + "\")'><img src='images/estrellaMarcada.png'/></a>";
                } else {
                    acumulador += "<a id='checkFavTem" + idTem + "' class='checkFavorito' onclick='setTemaFavorito(\"" + idTem + "\")'><img src='images/estrellaNoMarca.png'/></a>";
                }
                acumulador += "</td></tr></table></li>";
            }
        }
        listado.innerHTML = acumulador;

        //$(".bolaRoja").html(contFav);
        if (contFav > 0) {
            $(".bolaRoja").removeClass("trasparente");
        } else {
            $(".bolaRoja").addClass("trasparente");
        }
    } catch (e) {
        console.error("parsearListadoTematicas: " + e)
    }
}
/*
 * funcion que parsea el listado de tematicas y las carga sobre su pagina
 */
function parsearListadoTematicasFavoritas(data) {
    var listado = document.getElementById('listadoTematicasFavoritas');
    var acumulador = "";
    try {
        if (data.length == 0) {
            acumulador = "<span class='liSinNada'>No ha agregado aún ninguna temática a sus favoritos, puede hacerlo desde el menú de Temáticas.</span>";
        } else {
            for (var i = 0; i < data.length; i++) {
                var tema = data[i];
                var idTem = tema.id;
                var nombre = tema.nombre;
                var img = tema.urlImagen;
                var key = "tematica" + idTem;
                var color = tema.color;
                if (sessionTematicasFavoritas == false || (getData(key) != 'null' && getData(key) != null)) {
                    acumulador += "<li style='background-color:" + color + "'>";
                } else {
                    acumulador += "<li style='display:none; background-color:" + color + "'>";
                }
                acumulador += "<table>";
                acumulador += "<tr>"
                acumulador += "<td><a href='#actividades' onclick='if(sessionFiltroTematica==-1){sessionFiltroTematica=" + idTem + "}else{sessionFiltroTematica2=" + idTem + "};setTituloListado(\"" + nombre + "\"); cargaListadoActividades();ga(\"send\", \"event\", \"button\", \"click\", \"Tematica:" + nombre + "\", 1);'>";
                acumulador += "<span>" + nombre + "</span>";
                acumulador += "</a></td><td class='celdaImg noMostrar'>";
                var key = "tematica" + idTem;
                if (getData(key) != 'null' && getData(key) != null) {
                    //contFav++;
                    acumulador += "<a id='checkFavTem" + idTem + "' class='checkFavorito' onclick='setTemaFavorito(\"" + idTem + "\")'><img src='images/estrellaMarcada.png'/></a>";
                } else {
                    acumulador += "<a id='checkFavTem" + idTem + "' class='checkFavorito' onclick='setTemaFavorito(\"" + idTem + "\")'><img src='images/estrellaNoMarca.png'/></a>";
                }
                acumulador += "</td></tr></table></li>";
            }
        }
        listado.innerHTML = acumulador;
    } catch (e) {
        console.error("parsearListadoTematicasFavoritas: " + e)
    }
}

/*
 * función que parsea la posicion que del proyecto lleno
 */
function parsearPosicionProyecto(data) {
    if (data.length == 1) {
        sessionPosProyecto = data[0].nombre;
        sessionLatProyecto = data[0].latitud;
        sessionLongProyecto = data[0].longitud;
        sessionRadioProyecto = data[0].radio;
    }
}

/*
 * funcion que parsea el listado de tematicas y las carga sobre su página
 */
function parsearListadoParticipantes(data) {
    var listado = document.getElementById('listadoParticipantes');
    var acumulador = "";
    try {
        if (data.length == 0) {
            $(".participantesMenu").addClass("trOculto");
            acumulador = "No hay ningun participante asociado.";
        } else {
            $(".participantesMenu").removeClass("trOculto");
            for (var i = 0; i < data.length; i++) {
                var participante = data[i];
                var idTem = participante.id;
                var nombre = participante.nombre;
                var img = participante.urlImagen;
                try {
                    var descripcion = participante.descripcion;
                } catch (ex) {
                }
                acumulador += "<li><a href='#actividades' onclick='if(sessionFiltroParticipantes==-1){sessionFiltroParticipantes=" + idTem + "}else{sessionFiltroParticipantes2=" + idTem + "}; cargaListadoActividades();setTituloListado(\"" + nombre + "\");cargaDetalleParticipante();ga(\"send\", \"event\", \"button\", \"click\", \"Participante:" + nombre + "\", 1);'>";
                acumulador += "<table><tr>";
                if (img != null && img != "") {
                    acumulador += "<td class='celdaImgGrande'>"
//                    acumulador += "<img class='lazy' data-original='" + img + "'\></td>";
//                    acumulador += "<img src='" + img + "'\></td>";
                    acumulador += "<div style='background-image:url(" + img + ")'></div>"
                }
                acumulador += "<td class='ellipsis'>"
                acumulador += "<span>" + nombre + "</span>";
                try {
                    if (descripcion.length > 69)
                        acumulador += "<p>" + descripcion.substring(0, 60) + "...</p>";
                    else
                        acumulador += "<p>" + descripcion + "</p>";
                } catch (ex) {
                }
                acumulador += "</a></table></li>";
            }
        }
        listado.innerHTML = acumulador;
        /*$("img.lazy").lazyload();
         $('#participantes').bind('touchmove', function(e) {
         $("img.lazy").lazyload();
         });
         setTimeout(function() {
         $(window).scroll(function() {
         $("img.lazy").lazyload();
         })
         }, 1000);*/
    } catch (e) {
        console.error("parsearListadoParticipantes:" + e)
    }
}

/*
 * funcion que parsea y muestra el detalle de un participante
 */
function parsearDetalleParticipante(data) {
    var zona = document.getElementById('zonaDetalleParticipante');
    var acumulador = "";
    var participante = data[0];
    if (sessionDesdeActi != 1) {
        zona.style.display = '';
        $("#zonaDetalleParticipanteParticipa").removeClass("trOculto");
        zona.innerHTML = "";
        document.getElementById('zonaDetalleEvento').style.display = 'none'
        document.getElementById('zonaDetalleLugar').style.display = 'none'
        zona.style.backgroundImage = 'url("' + participante.urlImagen + '")'
        /* acumulador += "<img src='images/mascara.png' class='fondoDegradadoActividades'/>";
         acumulador += "<span class='title'>" + participante.nombre + "</span>";
         acumulador += "<div class='botonDespliegue ajusteParticipante'></div>"*/

        acumulador += "<div><span class='degradadoNegro'><div>";
        acumulador += "<p  class='title'>" + participante.nombre + "</p>";

        acumulador += "</div></span></div>"
        acumulador += "<span class='botonDespliegue ajusteParticipante'></span>"
        zona.innerHTML = acumulador;


        $(".descripcionFiltro").html('');
        $(".descripcionFiltro,.descripcionEventoDetalle.descripcionFiltro").html(participante.descripcion);
        //setTituloListado(participante.nombre);
    }
    document.getElementById("tituloNombreParticipante").innerHTML = participante.nombre;
    acumulador = "";
    acumulador += "<img src='" + participante.urlImagen + "'/>";
    acumulador += "<h3>" + participante.nombre + "</h3>";

    acumulador += "<span>" + participante.descripcion + "</span>";
    $("#paginaDetalleParticipante .contenido").html(acumulador);


    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
    $('.botonDespliegue').click(function (e) {
        e.preventDefault();
        if (!$(".descripcionFiltro").hasClass('descripcionFiltroDesplegada')) {
            $(".descripcionFiltro").addClass('descripcionFiltroDesplegada');
        } else {
            $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
        }
        if (!e)
            var e = window.event;
        /*IMPORTANTE: detiene la propagacion*/
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    });
    sessionDesdeActi = -1
}

/*
 * funcion que parsea y muestra el detalle de un participante
 */
function parsearDetalleLugar(data) {
    /*var zona = document.getElementById('zonaDetalleLugar');
     zona.style.display = '';
     zona.innerHTML = "";
     var acumulador = "";
     var lugar = data[0];
     acumulador += "<h2>" + lugar.nombre + "</h2>";
     acumulador += "<img src='" + lugar.urlImagen + "'/>";
     acumulador += "<span>" + lugar.descripcion + "</span>";
     acumulador += "<hr/>";
     zona.innerHTML = acumulador;*/
    var zona = document.getElementById('zonaDetalleLugar');
    var acumulador = "";
    var lugar = data[0];
    if (sessionDesdeActi != 1) {
        zona.style.display = '';
        //$("#zonaDetalleParticipanteParticipa").removeClass("trOculto");
        zona.innerHTML = "";
        document.getElementById('zonaDetalleEvento').style.display = 'none'
        document.getElementById('zonaDetalleParticipante').style.display = 'none'
        zona.style.backgroundImage = 'url("' + lugar.urlImagen + '")'
        acumulador += "<div><span class='degradadoNegro'><div>";
        acumulador += "<p  class='title'>" + lugar.nombre + "</p>";

        acumulador += "</div></span></div>"
        acumulador += "<span class='botonDespliegue ajusteParticipante'></span>"
        zona.innerHTML = acumulador;


        $(".descripcionFiltro").html('');
        $(".descripcionFiltro,.descripcionEventoDetalle.descripcionFiltro").html(lugar.descripcion);
        //setTituloListado(participante.nombre);
    }
    document.getElementById("tituloNombreLugar").innerHTML = lugar.nombre;
    acumulador = "";
    acumulador += "<img src='" + lugar.urlImagen + "'/>";
    acumulador += "<h3>" + lugar.nombre + "</h3>";

    acumulador += "<span>" + lugar.descripcion + "</span>";
    $("#paginaDetalleLugar .contenido").html(acumulador);


    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
    $('.botonDespliegue').click(function (e) {
        e.preventDefault();
        if (!$(".descripcionFiltro").hasClass('descripcionFiltroDesplegada')) {
            $(".descripcionFiltro").addClass('descripcionFiltroDesplegada');
        } else {
            $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
        }
        if (!e)
            var e = window.event;
        /*IMPORTANTE: detiene la propagacion*/
        e.cancelBubble = true;
        if (e.stopPropagation)
            e.stopPropagation();
    });
    sessionDesdeActi = -1
}

/*
 * funcion que parsea el listado de tematicas y las carga sobre su pagina
 */
function parsearListadoLugares(data) {
    var listado = document.getElementById('listadoLugares');
    var acumulador = "";
    try {
        if (data.length == 0) {
            acumulador = "No hay ningun lugar asociado.";
            $(".lugaresMenu").addClass("trOculto");
        } else {
            $(".lugaresMenu").removeClass("trOculto");
            for (var i = 0; i < data.length; i++) {
                var lugar = data[i];
                var idLug = lugar.id;
                var nombre = lugar.nombre;
                var desc = lugar.descripcion;
                var img = lugar.urlImagen;
                acumulador += "<li><a href='#actividades' onclick='sessionFiltroLugar=" + idLug + ";cargaDetalleLugar(); cargaListadoActividades();setTituloListado(\"" + nombre + "\");ga(\"send\", \"event\", \"button\", \"click\", \"Lugar:" + nombre + "\", 1);'>";


                acumulador += nombre;
                acumulador + "</a></li>";
            }
        }
        listado.innerHTML = acumulador;

        try {
            $("#listadoLugares li, #zonaListadoFechasFiltro ul li").touchstart(function () {
                $(this).addClass('lugarPressed');
            });
            $("#listadoLugares li, #zonaListadoFechasFiltro ul li").touchend(function () {
                $(this).removeClass('lugarPressed');
            });
            $("#listadoLugares li, #zonaListadoFechasFiltro ul li").on("vmouseout", function () {
                $(this).removeClass('lugarPressed');
            });
            $("#listadoLugares li, #zonaListadoFechasFiltro ul li").mouseout(function () {
                $(this).removeClass('lugarPressed');
            });
            $("#listadoLugares li, #zonaListadoFechasFiltro ul li").mousedown(function () {
                $(this).addClass('lugarPressed');
            });
            $("#listadoLugares li, #zonaListadoFechasFiltro ul li").mouseup(function () {
                $(this).removeClass('lugarPressed');
            });
            $("#listadoLugares li a").touchstart(function () {
                $(this.parent).addClass('lugarPressed');
            });
            $("#listadoLugares li a").touchend(function () {
                $(this.parent).removeClass('lugarPressed');
            });
            $("#listadoLugares li a").on("vmouseout", function () {
                $(this.parent).removeClass('lugarPressed');
            });
            $("#listadoLugares li a").mouseout(function () {
                $(this.parent).removeClass('lugarPressed');
            });
            $("#listadoLugares li a").mousedown(function () {
                $(this.parent).addClass('lugarPressed');
            });
            $("#listadoLugares li a").mouseup(function () {
                $(this.parent).removeClass('lugarPressed');
            });
        } catch (e) {
            console.error("añadiendo eventos a botones back:" + e)
        }
    } catch (e) {
        console.error("parsearListadoLugares: " + e)
    }
}

/*
 * funcion que parsea el listado de actividades filtradas que devuelve el ser vicio
 */
function parsearListadoActividades(data) {
    if (sessionSoloUnEvento == true && (sessionFiltroTematica != -1 || sessionFiltroLugar != -1 || sessionFiltroTematica2 != -1 || sessionFiltroParticipantes != -1 || sessionFiltroFecha != -1 || sessionFiltroEtiqueta != -1)) {
        document.getElementById('backListadoActividades').style.display = 'block';
    }


    document.getElementById('listadoActividades').style.marginBottom = "0px"
    var listado = document.getElementById('listadoActividades');
    var acumulador = ""
    try {
        if (data.numPatrocinadores != null) { /*si hay patrocinadores*/
            if (data.numPatrocinadores == 0) {
                $(".PatrocinadoresMenu").addClass("trOculto")
            } else {
                $(".PatrocinadoresMenu").removeClass("trOculto")
            }
        }
        if (data.numEtiquetas != null) { /*si ahy etiquetas*/
            if (data.numEtiquetas == 0) {
                $(".etiquetasMenu").addClass("trOculto")
            } else {
                $(".etiquetasMenu").removeClass("trOculto")
            }
        }
    } catch (e) {
    }//si falla el servicio

    if (data.data.length == 0 && sessionFiltroParticipantes > -1) {
        $("#zonaDetalleParticipante").click();
    }

    for (var i = 0; i < data.data.length; i++) {
        var act = data.data[i];
        var idAct = act.id;
        var nombre = act.nombre;
        var img = act.urlImagen;
        var fechaIni = act.fechaInicioOficial;
        var horaIni = act.horaInicioOficial;
        var fechaFin = act.fechaFinOficial;
        var lugar = act.nombreLugar;
        var key = "actividad" + idAct;
        if (sessionActividadesFavoritas == false || (getData(key) != 'null' && getData(key) != null)) {
            acumulador += "<li><a  href='#detalleActividad' onclick='cargarActividad(" + idAct + ");ga(\"send\", \"event\", \"button\", \"click\", \"Actividad:" + nombre + "\", 1);'>";
        } else {
            acumulador += "<li style='display:none'><a  href='#detalleActividad' onclick='cargarActividad(" + idAct + ");ga(\"send\", \"event\", \"button\", \"click\", \"Actividad:" + nombre + "\", 1);'>";
        }
        acumulador += "<div class='fichaActividad'>";
        acumulador += "<table class='tabla1ListadoActividades'><tr>"
        if (img != null && img != "") {
            acumulador += "<td><div class='thumnailActividad' style=\"background-image:url('" + img + "')\"></div></td>";

        }
        acumulador += "<td><span>" + nombre + "</span></td></tr></table>";
        if (act.nombreEventos)
            acumulador += "<div><span class='spanListaActi'>" + act.nombreEventos + "</span>";
        /*acumulador += "<span style='font-size: 12px;font-weight: normal;overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap;width: 170px;'>" + lugar + "</span>";*/
        acumulador += "<span class='spanListaActi'>" + getFechaSolo(fechaIni) + " " + horaIni + "</span></div>";
        acumulador += "</div></a>";
        acumulador += "<table  class='tabla2ListadoActividades'><tr>"

        if (act.meGustaActivo == true) {
            acumulador += "<td><div class='bolaRoja ajusteDetalleBolaRoja'>" + act.numMeGusta + "</div></td>"
        } else {
            acumulador += "<td><div class='bolaRoja ajusteDetalleBolaRoja'></div></td>"
        }
        acumulador += "<td class='lanzaLoader' onclick='siMeGusta(" + idAct + ", this)'>";
        var key = 'gusta' + idAct;
        if (getData(key) != 'null' && getData(key) != null) {
            acumulador += "<a><img class='icoMarcable' src='images/corazonMarcado.png'/></a>";
        } else {
            acumulador += "<a><img class='icoMarcable' src='images/corazonNoMarca.png'/></a>";
        }
        key = "alarma" + idAct;
        if (getData(key) != 'null' && getData(key) != null) {
            acumulador += "</td><td class='noMostrar' onclick='sessionAlarmId=\"" + idAct + "\";remueveAlarma()'>";
            acumulador += "<a><img class='icoMarcable' src='images/relojMarcado.png'/></a>";
        } else {
            acumulador += "</td><td class='noMostrar' onclick='$(\"#selectorAntelacion\").click();sessionAlarmId=\"" + idAct + "\";sessionAlarmDate=\"" + fechaIni + "\";sessionAlarmNombre=\"" + nombre + "\";sessionAlarmDesc=\"" + nombre + "\"'>";
            acumulador += "<a><img class='icoMarcable' src='images/relojNoMarca.png'/></a>";
        }
        acumulador += "</td><td class='noMostrar'>";
        acumulador += "<a id='checkFavAct" + idAct + "' class='checkFavorito' onclick='setActividadFavorito(\"" + idAct + "\", this)'>";

        key = "actividad" + idAct;
        if (getData(key) != 'null' && getData(key) != null) {
            acumulador += "<img class='icoMarcable' src='images/estrellaMarcada.png'/>";
        } else {
            acumulador += "<img class='icoMarcable' src='images/estrellaNoMarca.png'/>";
        }
        acumulador += "</a></td>";
        acumulador += "</tr></table>";
        acumulador += "</li>";
    }
    listado.innerHTML = acumulador;



    var ancho = window.innerWidth;
    var up = (ancho * 50 / 320) - 1;
    if (sessionPushToken == "" && $("#actividades .zonaBannerEvento .bannerZone").html() == "")
        up = up - 43;
    if (sessionHayBanners > 0)
        document.getElementById('listadoActividades').style.marginBottom = up + "px"
    setTimeout(function () {
        $("#tituloListadoActividades").click();//arregla una descolocacion haciendo un click en un punto de la pantalla
    }, 700);

    $("#canvasLoader").remove()
}

/*
 * funcion que parsea el listado de actividades filtradas que devuelve el ser vicio
 */
function parsearListadoActividadesFavoritas(data) {
    var listado = document.getElementById('listadoActividadesFavoritas');
    var acumulador = ""
    if (data.length == 0) {
        acumulador = "<span class='liSinNada'>No ha agregado aún ninguna actividad a sus favoritos, puede hacerlo pulsando sobre el icono de la estrella desde cualquier actividad.</span>";
    } else {

        for (var i = 0; i < data.length; i++) {
            var act = data[i];
            var idAct = act.id;
            var nombre = act.nombre;
            var img = act.urlImagen;
            var fechaIni = act.fechaInicioOficial;
            var fechaFin = act.fechaFinOficial;
            var lugar = act.nombreLugar;
            var key = "actividad" + idAct;
            acumulador += "<li><a  href='#detalleActividad' onclick='cargarActividad(" + idAct + ");ga(\"send\", \"event\", \"button\", \"click\", \"Actividad:" + nombre + "\", 1);'>";

            acumulador += "<div class='fichaActividad'>";
            acumulador += "<table class='tabla1ListadoActividades'><tr>"
            if (img != null && img != "") {
//            acumulador += "<td><img class='lazy' data-original='" + img + "'\></td>";
                acumulador += "<td><img src='" + img + "'\></td>";
            }
            acumulador += "<td><span>" + nombre + "</span></td></tr></table>";
            acumulador += "<div><span class='spanListaActi'>" + act.nombreEventos + "</span>";
            /*acumulador += "<span style='font-size: 12px;font-weight: normal;overflow-x: hidden;text-overflow: ellipsis;white-space: nowrap;width: 170px;'>" + lugar + "</span>";*/
            acumulador += "<span class='spanListaActi'>" + getFechaSolo(fechaIni) + "</span></div>";
            acumulador += "</div></a>";
            acumulador += "<table  class='tabla2ListadoActividades'><tr>"


            acumulador += "<td class='lanzaLoader' onclick='siMeGusta(" + idAct + ", this)'>";
            var key = 'gusta' + idAct;
            if (getData(key) != 'null' && getData(key) != null) {
                acumulador += "<a><img class='icoMarcable' src='images/corazonMarcado.png'/></a>";
            } else {
                acumulador += "<a><img class='icoMarcable' src='images/corazonNoMarca.png'/></a>";
            }
            key = "alarma" + idAct;
            if (getData(key) != 'null' && getData(key) != null) {
                acumulador += "</td><td class='noMostrar' onclick='sessionAlarmId=\"" + idAct + "\";remueveAlarma()'>";
                acumulador += "<a><img class='icoMarcable' src='images/relojMarcado.png'/></a>";
            } else {
                acumulador += "</td><td class='noMostrar' onclick='$(\"#selectorAntelacion\").click();sessionAlarmId=\"" + idAct + "\";sessionAlarmDate=\"" + fechaIni + "\";sessionAlarmNombre=\"" + nombre + "\";sessionAlarmDesc=\"" + nombre + "\"'>";
                acumulador += "<a><img class='icoMarcable' src='images/relojNoMarca.png'/></a>";
            }
            acumulador += "</td><td class='noMostrar'>";
            acumulador += "<a id='checkFavAct" + idAct + "' class='checkFavorito' onclick='setActividadFavorito(\"" + idAct + "\", this)'>";

//        key = "actividad" + idAct;
//        if (getData(key) != 'null' && getData(key) != null) {
            acumulador += "<img class='icoMarcable' src='images/estrellaMarcada.png'/>";
//        } else {
//            acumulador += "<img class='icoMarcable' src='images/estrellaNoMarca.png'/>";
//        }
            acumulador += "</a></td>";
            acumulador += "</tr></table>";
            acumulador += "</li>";
        }
    }
    listado.innerHTML = acumulador;

}

/*
 * funcion que parsea el detalle de una actividad
 */
function parsearActividad(data) {
    $("#zonaPlegadaInfoActiviad").removeClass("desplegadoInfoActividad")
    $("#btnLeerMas").html("Leer más");


    var zonaCabecera = document.getElementById('cabeceraDetalleActividad');
    var zonaCuerpo = document.getElementById('cuerpoDetalleActividad');
    var activity = data.actividad[0];
    var idAct = activity.id;
    sessionActividadMostrada = idAct;
    zonaCabecera.style.backgroundImage = "url('" + activity.urlImagen + "')";
    var acumulaCalen = "";
    var fechaIni = new Date(activity.fechaInicioOficial);
    acumulaCalen += "<span>" + getMonthName(fechaIni.getMonth()) + "</span>"
    acumulaCalen += "<span>" + fechaIni.getDate() + "</span>"
    acumulaCalen += "<span>" + getDayName(fechaIni) + "</span>"

    var acumulador = "";
    $("#cabeceraDetalleActividad div table td:first-child").html(acumulaCalen);
    var nombre = activity.nombre;
    document.getElementById('tituloDetalleActividad').innerHTML = nombre;
    if (nombre.length > 25)
        acumulador += "<span>" + nombre.substring(0, 25) + "...</span>";
    else
        acumulador += "<span>" + nombre + "</span>";

    acumulador += "<span><em class='nomenDesde'>Desde</em> " /*+ getFechaSolo(activity.fechaInicioOficial)*/;
    if (activity.horaInicioOficial) {
        acumulador += " " + activity.horaInicioOficial;
    }
    acumulador += "</span>"
    acumulador += "<span><em class='nomenHasta'>Hasta</em> "/* + getFechaSolo(activity.fechaFinOficial)*/;
    if (activity.horaFinOficial) {
        acumulador += " " + activity.horaFinOficial;
    }
    acumulador += "</span>"

    $("#cabeceraDetalleActividad div table td:last-child").html(acumulador);
    var descripcion = activity.descripcion;
    $("#zonaPlegadaInfoActiviad").html("<div>" + descripcion + "<div>")
    acumulador = "";

    var htmlBotonera = "<table><tr>"
    /*num*/
    htmlBotonera += "<td><div class='bolaRoja ajusteDetalleBolaRoja' id='detalleActBolaRoja'></div></td>"
    /*gusta*/
    htmlBotonera += "<td onclick='siMeGusta(" + idAct + ", this), cargaListadoActividades()'>";
    key = 'gusta' + idAct;
    if (getData(key) != 'null' && getData(key) != null) {
        htmlBotonera += "<a><img class='icoMarcablePeque' src='images/corazonMarcado.png'/></a>";
    } else {
        htmlBotonera += "<a><img class='icoMarcablePeque' src='images/corazonNoMarca.png'/></a></td>";
    }
    /*mapa*/
    htmlBotonera += "<td><a onclick='if(primerFalloConexion==true){cargaVerLugar(" + activity.latitud + ", " + activity.longitud + ", \"" + nombre + "\")}else{launchPop()}' class='nomenVerLugar'><img src ='images/mapa.png'/></a></td>"

    /*favor*/
    htmlBotonera += "<td class='noMostrar'><a id='checkFavAct" + idAct + "' class='checkFavorito' onclick='setActividadFavorito(\"" + idAct + "\", this)'>";
    key = "actividad" + idAct;
    if (getData(key) != 'null' && getData(key) != null) {
        htmlBotonera += "<img class='icoMarcablePeque ajusteIcoMarcablePeque' src='images/estrellaMarcada.png'/>";
    } else {
        htmlBotonera += "<img class='icoMarcablePeque ajusteIcoMarcablePeque' src='images/estrellaNoMarca.png'/>";
    }
    htmlBotonera += "</a></td>";
    /*alarma*/
    var key = "alarma" + idAct;
    if (getData(key) != null && getData(key) != 'null') {
        htmlBotonera += "<td class='noMostrar' onclick='sessionAlarmId=\"" + idAct + "\";remueveAlarma()'>";
        htmlBotonera += "<a><img class='icoMarcablePeque ajusteIcoMarcablePeque' src='images/relojMarcado.png'/></a>";
    } else {
        htmlBotonera += "<td class='noMostrar' onclick='$(\"#selectorAntelacion\").click();sessionAlarmId=\"" + idAct + "\";sessionAlarmDate=\"" + fechaIni + "\";sessionAlarmNombre=\"" + nombre + "\";sessionAlarmDesc=\"" + nombre + "\"'>";
        htmlBotonera += "<a><img class='icoMarcablePeque ajusteIcoMarcablePeque' src='images/relojNoMarca.png'/></a>";
    }
    htmlBotonera += "</td>"
    /*compartir*/
    htmlBotonera += "<td><a onclick='muestraPopShare()' class=''><img src ='images/footShare.png'/></a></td>"
    /*patrocinadores*/
    htmlBotonera += "<td id='admir'><a onclick='muestraPopPatrocinadores()' class=''><img src ='images/patrocinadores.png'/></a></td>"

    htmlBotonera += "</tr></table>";


    $("#botoneraDetalleActividad").html(htmlBotonera)
    setCheckConnection()

    if (data.numPatrocinadores * 1 == 0) {
        document.getElementById("admir").style.display = "none"
    } else {
        document.getElementById("admir").style.display = ""
    }
$("#entradillaDetalleActividad").html("<div>" + activity.entradilla + "</div>");
    acumulador = "";
    if (activity.nombreLugar) {
        acumulador = "<span>" + activity.nombreLugar + "</span>";
    }
    if (activity.recinto) {
        acumulador += "<span>" + activity.recinto + "</span>";
    }
    if (activity.urlWeb) {
        acumulador += "<span onclick='window.open(\"" + activity.urlWeb + "\",\"_system\")'>" + activity.urlWeb + "</span>";
    }
    if (activity.video) {
        acumulador += "<span onclick='window.open(\"" + activity.video + "\",\"_system\")' >video</span>"
    }



    $("#zonaRecintoDetalleAct").html(acumulador);
    acumulador = "";
    var participantes = data.participantes;
    if ((participantes.length > 0)) {
        acumulador += "<span class='nomenParticipantes'>Participantes</span>";
        acumulador += "<table class='listadoGridParticipantes'>";
        for (var i = 0; i < participantes.length; i++) {
            if (i % 3 == 0) {
                acumulador += "<tr>";
            }
            acumulador += "<td><a onclick='sessionDesdeActi = 1;sessionFiltroParticipantes=" + participantes[i].id + "; cargaDetalleParticipante();checkConnection();document.location.href=\"#paginaDetalleParticipante\"'><div style='background-image:url(" + participantes[i].urlImagen + ")'></div><span>" + participantes[i].nombre + "</span></a></td>"
            if ((i - (-1)) % 3 == 0) {
                acumulador += "</tr>";
            }
        }
        acumulador += "</table>";
        $("#zonaParticipantesDetalleActi").removeClass('trOculto');
    } else {
        $("#zonaParticipantesDetalleActi").addClass('trOculto');
    }



    try {
        $("#zonaParticipantesDetalleActi").html(acumulador);
        if (data.galeria && data.galeria.length >= 1) {
            parsearGaleriaImagenesActividad(data.galeria)
            if (data.banners != null) {
                var anchoAux = window.innerWidth;
                var upAux = (anchoAux * 50 / 320);
                document.getElementById('zonaGaleriaDetalleActi').style.marginBottom = (upAux) + "px ";
            } else {
                document.getElementById('zonaGaleriaDetalleActi').style.marginBottom = "0px ";
            }
        } else {
            $("#zonaGaleriaDetalleActi").html("")
        }
    } catch (egal) {
        $("#zonaGaleriaDetalleActi").html("")
    }//error en el parseo de la galeria

    /*var data=[{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"},{urlImagen:"http://localhost:8080/Kurbana/participantes/3.png"}]
     parsearGaleriaImagenesActividad(data)*/

    /*if (activity.entradilla)
        acumulador = activity.entradilla;
    $("#entradillaDetalleActividad").html("<div>" + activity.entradilla + "</div>");*/




    var key = "gusta" + idAct;
    var classGusta = "";

    if (getData(key) != null && getData(key) != 'null') {
        classGusta = "ui-btn ui-icon-check ui-btn-icon-notext ui-state-disabled";
    } else {
        classGusta = "ui-btn ui-icon-check ui-btn-icon-notext";
    }
    $("#detalleActividad .descripcionFiltro").html(activity.entradilla);
    var classNotifica = "";
    classNotifica = "ui-btn ui-icon-alert ui-btn-icon-notext"
    var acumulador = "";
    var numGusta = activity.numMeGusta;

    

    var nomEv = activity.nombreEvento;
    $(".detalleActiPrincipal .calendario .fecha .dia").html(fechaIni.getDate());
    $(".detalleActiPrincipal .calendario .fecha .mes").html(getMonthName(fechaIni.getMonth()));

    $(".detalleActiPrincipal .calendario .botonera").html(htmlBotonera);
    if (nombre.length > 40)
        acumulador += "<h3>" + nombre.substring(0, 40) + "...</h3>";
    else
        acumulador += "<h3>" + nombre + "</h3>";
    acumulador += "<p>" + nomEv + "</p>";
    acumulador += "<p>" + activity.nombreLugar + "</p>";

    $(".detalleActiPrincipal .datos").html(acumulador);
    if (activity.meGustaActivo == true) {
        $('#detalleActBolaRoja').html(numGusta);
        cargaListadoActividades()
    }
    acumulador = "";


    var horaIni = activity.horaInicioOficial;
    var horaFin = activity.horaFinOficial;
    var img = activity.urlImagen;

    $(".imgDetalleActividad").html("<img src='" + img + "'/>")

    if (activity.altImagen) {
        acumulador += "<span>" + activity.altImagen + "</span>";
    } else {
        acumulador += "<span>" + activity.entradilla + "</span>";
        //console.info("No hay altImagen")
    }
    acumulador += "<p>" + descripcion + "</p>";



    if (activity.recinto) {
        acumulador += "<p>" + activity.recinto + "</p>";
    }
    acumulador += ""

    $(".cuerpoDetalleActividad").html(acumulador)


    if (data.banners != null) {
        parsearBannersActividad(data.banners)
    }

    var eventos = data.eventos;
    var acumulaPatron = "";
    var acumulaMas = "";
    if (eventos.length >= 1) {
        for (var i = 0; i < eventos.length; i++) {
            acumulaPatron += "<p><a id='patronId' onclick='sessionFiltroEvento=" + eventos[i].id + "; cargaPatrocinadoresEvento()' href='#pagPatrocinadores'> " + eventos[i].nombre + " </a></p>";
            acumulaMas += "<p><a id='masId' onclick='sessionFiltroEvento=" + eventos[i].id + ";$(\"#backDetAct\").click();cargaListadoActividades();cargaDetalleEvento();' href='' > " + eventos[i].nombre + " </a></p>";
        }
        $("#popPatrocinadores").html(acumulaPatron);
        $("#popMas").html(acumulaMas);
    }
    sessionNumEventos = eventos.length;
    acumulador = "";
    try {
        if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'iOS') { //plugin share
            acumulador += "<p><a onclick='muestraPopShare();navigator.share(\"" + sessionShareLink + idAct + "\",\"Kurbana\",\"plain/text\");ga(\"send\", \"event\", \"button\", \"click\", \"Facebook\", 1);'>Compartir</a></p>";

        } else { //sin plugin share
            acumulador += "<p><a onclick='muestraPopShare();window.open(\"https://www.facebook.com/sharer/sharer.php?u=" + sessionShareLink + idAct + "\",\"_system\");ga(\"send\", \"event\", \"button\", \"click\", \"Facebook\", 1);'>Facebook </a></p>";
            acumulador += "<p><a onclick='muestraPopShare();window.open(\"https://twitter.com/share?url=" + sessionShareLink + idAct + "\",\"_system\");ga(\"send\", \"event\", \"button\", \"click\", \"Facebook\", 1);' > Twitter </a></p>";

        }
    } catch (e) { //web
        acumulador += "<p><a onclick='muestraPopShare();window.open(\"https://www.facebook.com/sharer/sharer.php?u=" + sessionShareLink + idAct + "\",\"_system\");ga(\"send\", \"event\", \"button\", \"click\", \"Facebook\", 1);'>Facebook </a></p>";
        acumulador += "<p><a onclick='muestraPopShare();window.open(\"https://twitter.com/share?url=" + sessionShareLink + idAct + "\",\"_system\");ga(\"send\", \"event\", \"button\", \"click\", \"Facebook\", 1);' > Twitter </a></p>";

    }
    acumulador += "<p><a onclick='muestraPopShare()'>Cancelar</a></p>"
    $("#popShare").html(acumulador);
    checkBotoneraCoachMark()



}

function parsearGaleriaImagenesActividad(data) {
    var acumulador = "<ul>";
    for (var i = 0; i < data.length; i++) {
        var img = data[i].urlImagen;
        acumulador += "<li style='background-image:url(\"" + img + "\")' onclick='muestraImagenGaleria(\"" + img + "\")'>"
    }
    acumulador += "</ul>"
    $("#zonaGaleriaDetalleActi").html(acumulador)
}

/*muestra en grande la imagen seleccionada de la galeria*/
function muestraImagenGaleria(url) {
    setTimeout(function () {
        setLoader('idBody')
    }, 1)
    var img = new Image();
    img.onload = function () {
        var razonImg = img.height / img.width;
        var razonPantalla = $(window).height() / $(window).width();
        var acumulador = "<div class='fondoGaleria' id='fondoGaleria'></div>"
        $("body").append(acumulador);
        $("#fondoGaleria").append(img)
        if (razonImg >= razonPantalla) {
            $("#fondoGaleria img").addClass('ajusteAlto')
        } else {
            $("#fondoGaleria img").addClass('ajusteAncho')
        }
        hideLoader()
        $("#fondoGaleria").click(function () {
            $(this).remove()
        })
    }
    img.src = url + "?_=" + (new Date().getTime());
}


/*fucnion que parsea el menu lateral para sustituir su nomnclatura*/
function parsearMenuLateral(data) {
    try {
        try {
            var fav = data.favoritos;
            $(".favoritosMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.tematicas;
            $(".tematicasMenu").html(fav);
            $(".nomenTemaFavoritos").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.inicio;
            $(".inicioMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.lugares;
            $(".lugaresMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.participantes;
            $(".participantesMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.cerca;
            $(".cercaMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.acerca;
            $(".acercaMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.fecha;
            $(".fechaMenu").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.etiquetas;
            $("#menuEtiquetas").html(fav);
        } catch (ex) {
        }
        try {
            var fav = data.patrocinadores;
            $("#menuPatrocinadores").html(fav);
        } catch (ex) {
        }
    } catch (e) {
    }
}

/*nomenclatura de actividad*/
function parsearNomenclaturaActividad(data) {
    if (data.desde)
        $(".nomenDesde").html(data.desde);
    if (data.hasta)
        $(".nomenHasta").html(data.hasta);
    if (data.participantes)
        $(".nomenParticipantes").html(data.participantes);
    if (data.verLugar)
        $(".nomenVerLugar").html(data.verLugar);

}