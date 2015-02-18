/*
 * funcion que quita los filtros de la sesion
 */
function resetFiltros() {
    sessionFiltroEvento = -1;
    sessionFiltroLugar = -1;
    sessionFiltroTematica = -1;
    sessionFiltroTematica2 = -1;
    sessionFiltroParticipantes = -1;
    sessionFiltroParticipantes2 = -1;
    sessionFiltroFavoritos = -1;
    sessionFiltroFecha = -1;
    sessionFiltroEtiqueta = -1;
    sessionUltFiltro = -1;
    sessionSegundoFiltro = 0;

    //cargaListadoTematicas()
//    cargaListadoParticipantes()
//    cargaListadoLugares()
    //cargaMenusFiltrados()
    $("a[href='#menuActividades']").removeClass("trOculto");
    document.getElementById('bannerDelListado').innerHTML = "";
    document.getElementById('bannerDeLaActividad').innerHTML = "";
    document.getElementById('bannerDetalleEvento').innerHTML = "";
    $(".zonaBannerEvento").html("");
}

/*
 * funcion Que carga un canvas loader en una zona de id dado
 */
var cl;
function setLoader(id) {
    try {
        cl.hide();
    } catch (e) {
    }
    if (sessionSetLoader != false) {
        cl = new CanvasLoader(id);
        cl.setColor('#ffffff'); // default is '#000000'
        cl.setShape('rect'); // default is 'oval'
        cl.setDiameter(50); // default is 40
        cl.setDensity(13); // default is 40
        cl.setRange(1); // default is 1.3
        cl.setSpeed(1); // default is 2
        cl.setFPS(16); // default is 24
        cl.show(); // Hidden by default
    }
}

/*setl
 * 
 * funcion que oculta un canvas loader
 */
function hideLoader() {
    try {
        cl.kill();
        var obj = document.getElementById('canvasLoader');
        obj.parentNode.removeChild(obj);
    } catch (e) {
    }
}
/*
 * funcion que establece una temática como favorita o la quita ese status
 */
function setTemaFavorito(id) {
    setLoader('idBody');
    setTimeout(function() {
        var key = "tematica" + id;
        if (getData(key) != null && getData(key) != 'null') {
            deleteData(key);
            borraTematicaFavorita(id);
            cargaListadoTematicasFavoritas()
        } else {
            saveData(key, id);
            nuevaTematicaFavorita(id);
        }
        //cargaListadoTematicas()
        cargaMenusFiltrados()
        hideLoader()
    }, 1);
}

/*
 * funcion que establece una temática como favorita o la quita ese status
 */
function setActividadFavorito(id, elem) {
    //elem.style.display="none"
    if (primerFalloConexion == true) {
        //console.log(sessionActividadMostrada)
        //setLoaderTemporal()
        setLoader('idBody');
        setTimeout(function() {
            var key = "actividad" + id;
            if (getData(key) != null && getData(key) != 'null') {
                deleteData(key);
                if (sessionActividadMostrada * 1 > -1) {
                    elem.innerHTML = "<img class='icoMarcable ajusteIcoMarcablePeque' src='images/estrellaNoMarca.png'/>"
                }
                else {
                    elem.innerHTML = "<img class='icoMarcable' src='images/estrellaNoMarca.png'/>"
                }
                borraActividadFavorita(id);
                setTimeout(function() {
                    cargaListadoActividadesFavoritas()
                }, 1000)
            } else {
                saveData(key, id);
                if (sessionActividadMostrada * 1 > -1) {
                    elem.innerHTML = "<img class='icoMarcable ajusteIcoMarcablePeque' src='images/estrellaMarcada.png'/>"
                }
                else {
                    elem.innerHTML = "<img class='icoMarcable' src='images/estrellaMarcada.png'/>"
                }
                nuevaActividadFavorita(id);
            }
            cargaListadoActividades()
            hideLoader()
        }, 1);
    }else{
        launchPop();
    }
}

/*
 * funcion que muestra solo las temáticas favoritas
 */
function mostrarTematicasFavoritos(elem) {
    //setLoaderTemporal()
    setLoader('idBody');
    setTimeout(function() {
        if (sessionTematicasFavoritas) {
            sessionTematicasFavoritas = false;
            elem.src = "images/estrellaNoMarca.png"
        } else {
            sessionTematicasFavoritas = true;
            elem.src = "images/estrellaMarcada.png"
        }
        //cargaListadoTematicas();
        cargaMenusFiltrados()
        hideLoader()
    }, 1);
}

/*
 * funcion que muestra solo las actividades favoritas
 */
function mostrarActividadesFavoritos() {
    setLoader('idBody');
    setTimeout(function() {
        if (sessionActividadesFavoritas) {
            sessionActividadesFavoritas = false;
        } else {
            sessionActividadesFavoritas = true;
        }
        if (sessionActividadesFavoritas) {
            document.getElementById('btnFavActividades').src = 'images/estrellaBlancaMarcada.png';
        } else {
            document.getElementById('btnFavActividades').src = 'images/estrellaBlancaNoMarca.png';
        }
        cargaListadoActividades();
        hideLoader()
    }, 1);
}

/*
 * funcion que muestra todas las tematicas
 */
function mostrarTematicasTodas() {
    setLoader('idBody');
    setTimeout(function() {
        sessionTematicasFavoritas = false;
        document.getElementById("btnFavTematicas").src = "images/estrellaNoMarca.png"
        //cargaListadoTematicas();
        cargaMenusFiltrados()
        hideLoader()
    }, 1);
}
/*
 * funcion que muestra todas las actividades
 */
function mostrarActividadesTodas() {
    if (sessionSetLoader == true)
        setLoader('idBody');
    setTimeout(function() {
        sessionActividadesFavoritas = false;
        cargaListadoActividades();
        hideLoader()
    }, 1);
}

/*para evitar problemas de que esté marcado el boton todas uy solo salvan las favoritas*/
$(document).on("pagebeforeshow", "#tematicas", function() {
    if (sessionSegundoFiltro < 1)
        mostrarTematicasTodas();

});

$(document).on("pagebeforeshow", "#indice", function() {
    resetFiltros();
    //cargaMenusFiltrados();
});

/*para eleiminar los filtros si se vuelve a la pagina principal*/
$(document).on("pagebeforeshow", "#indice", function() {
    sessionFiltroEvento = -1;
    sessionFiltroLugar = -1;
    sessionFiltroTematica = -1;
    sessionFiltroParticipantes = -1;
    sessionFiltroFavoritos = -1;
    sessionFiltroFecha = -1;
});

/*
 * funciones para mostrar y ocultar las listas de favoritos
 */
function mostrarListadoTematicasFavoritas() {
    cargaListadoTematicasFavoritas();
    document.getElementById('listadoTematicasFavoritas').style.display = '';
    document.getElementById('listadoActividadesFavoritas').style.display = 'none';
}
function mostrarListadoActividadesFavoritas() {
    cargaListadoActividadesFavoritas();
    document.getElementById('listadoTematicasFavoritas').style.display = 'none';
    document.getElementById('listadoActividadesFavoritas').style.display = '';
}

/*comprobar que se ha realizado el cambio el cambio de favorita*/
function comprobarTematicaCambiada(data) {
    try {
        if (data.length == 1 && data[0][0] == 1) {
            //correcto
        }
    } catch (e) {
    }
}

/*para evitar problemas de que esté marcado el boton todas uy solo salvan las favoritas*/
$(document).on("pagebeforeshow", "#favoritas", function() {
    mostrarListadoTematicasFavoritas();
});

/*comprobar que se ha realizado el cambio el cambio de favorita*/
function comprobarTematicaCambiada(data) {
    try {
        if (data.length == 1 && data[0][0] == 1) {
            //correcto
        }
    } catch (e) {
    }
}

/*para poner el loader*/
$(document).on("pagebeforeshow", function() {
    //checkConnection()
    if (sessionSetLoader == true)
        setLoader('idBody');
});
/*para quitar el loader*/
$(document).on("pageshow", function() {
    hideLoader();
});

$(document).on("pagecreate", "#indice", function() {
    $(document).on("swipeleft", "#indice", function(e) {
        if (!$("#menuPrincipal").hasClass('ui-page-active')) {
            $("#menuPrincipal").panel("open");
        }
    });
});
$(document).on("pagecreate", "#indice", function() {
    $(document).on("swiperight", "#indice", function(e) {
        if ($("#menuPrincipal").hasClass('ui-page-active')) {
            $("#menuPrincipal").panel("close");
        }
    });
});

$(document).on("pageshow", "#actividades", function() {
    setTimeout(function() {
        $("#tituloListadoActividades").click();//arregla una descolocacion haciendo un click en un punto de la pantalla
    }, 1000);
    $(document).on("swipeleft", "#actividades", function(e) {
        if (!$("#menuActividades").hasClass('ui-page-active')) {
            $("#menuActividades").panel("open");
        }
    });
});
$(document).on("pagecreate", "#actividades", function() {
    $(document).on("swiperight", "#actividades", function(e) {
        if ($("#menuActividades").hasClass('ui-page-active')) {
            $("#menuActividades").panel("close");
        }
    });
});


/*funcion para marcar un megusta*/
function siMeGusta(id, elem) {//setLoaderTemporal()
    setLoader('idBody');
    setTimeout(function() {
        if (primerFalloConexion == true) {
            var key = "gusta" + id;
            if (getData(key) != null && getData(key) != 'null') {
                deleteData(key);
                deleteGusta(id);
                elem.getElementsByTagName("img")[0].src = 'images/corazonNoMarca.png'
//            elem.innerHTML="<a><img src='images/corazonNoMarca.png'/></a>";
            } else {
                saveData(key, id);
                anadeGusta(id);
                elem.getElementsByTagName("img")[0].src = 'images/corazonMarcado.png'
//            elem.innerHTML="<a><img src='images/corazonMarcado.png'/></a>";
            }
//        if(sessionActividadMostrada>-1)
//            cargaListadoActividades()
        } else {
            launchPop()
        }
        hideLoader()
    }, 1);
}

/*funcion para establecer el titulo de el listado de actividades*/
function setTituloListado(titulo) {
    tituloAnterior = document.getElementById('tituloListadoActividades').innerHTML;
    document.getElementById('tituloListadoActividades').innerHTML = titulo;
}

/*
 * funcion que oculta las zonas superiores de detalle en los listados de actividad
 */
function ocultaZonasDetalleListadoActividades() {
    if (sessionFiltroEvento == -1)
        document.getElementById('zonaDetalleEvento').style.display = 'none';
    if (sessionFiltroLugar == -1)
        document.getElementById('zonaDetalleLugar').style.display = 'none';
    if (sessionFiltroParticipantes == -1) {
        document.getElementById('zonaDetalleParticipante').style.display = 'none';
        $("#zonaDetalleParticipanteParticipa").addClass("trOculto");
    }
}


$(document).on("pagebeforeshow", "#actividades", function() {
    cargaDiasConActividad();
});

$("#backListadoActividades").click(function() {
    $.getJSON(sessionPath + "tematica/tematicasfiltro?id=" + sessionProyecto, null, function(data) {
        parsearListadoTematicas(data);
        //console.info(data)
    });
});

/*
 * funciones que repliegan las descripciones de filtro
 */
$(document).on("pagebeforeshow", "#actividades", function() {
    sessionNumCargas++;//para el control de los backs para la recarga de los menus
    if (sessionSegundoFiltro < 1) {
        cargaMenusFiltrados();
    }

    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
    if (!primeraCarga) {
        primeraCarga = true;
        $("#actividades div[data-role='header'] a:first-child").click(function() {
            /*if(sessionNumCargas==1 || sessionNumCargas==0 ){
             resetFiltros();  
             sessionNumCargas=0;
             }else{
             sessionNumCargas=0;
             }*/
            if (!$("a[href='#menuActividades']").hasClass("trOculto")) {
                resetFiltros()
            }
            $("a[href='#menuActividades']").removeClass("trOculto");
            switch (sessionSegundoFiltro) {
                case 1:
                    break;
                case 2:
                    sessionFiltroFecha = -1;
                    break;
                case 3:
                    sessionFiltroLugar = -1;
                    break;
                case 4:
                    break;
                case 5:
                    sessionFiltroParticipantes2 = -1;
                    break;
                case 6:
                    sessionFiltroTematica = -1;
                    break;
                case 7:
                    sessionFiltroEtiqueta = -1;
                    break;
                case 8:
                    break;
            }
            setTimeout(function() {
                setTituloListado(tituloAnterior);
                cargaListadoActividades();
                if (sessionFiltroParticipantes > 0) {
                    cargaDetalleParticipante()
                }
                if (sessionFiltroEvento > -1) {
                    document.getElementById("zonaDetalleEvento").style.display = ""
                    document.getElementById("zonaDetalleParticipante").style.display = "none"
                    $("#zonaDetalleParticipanteParticipa").addClass("trOculto");
                }
            }, 500);
        })
    }
});
$(document).on("pagebeforeshow", "#paginaDetalleEvento", function() {
    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
});
$(document).on("pagebeforeshow", "#paginaDetalleParticipante", function() {
    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
});





/*
 * funcion q para redirigir cuando llega una url de compartir
 */
$(document).on("pagebeforeshow", "#detalleActividad", function() {
    document.getElementById('popShare').style.display = 'none'
    document.getElementById('popMas').style.display = 'none'
    document.getElementById('popPatrocinadores').style.display = 'none'
    $(".descripcionFiltro").removeClass('descripcionFiltroDesplegada');
    try {
        var query = window.location.hash;
        if (query.indexOf('?') > 0) {
            var idActividad = query.substring(query.indexOf("id=") - (-3));
            cargarActividad(idActividad);
        }
    } catch (e) {
        console.error(e)
    }
});



/*
 * funcion q para redirigir cuando llega una url de compartir
 */
$(document).on("pageshow", "#detalleActividad", function() {

    try {
        if ($('.calendario .fecha .dia').html() == "") {
        }
    } catch (e) {
    }
});

$(document).on("pageshow", "#favoritas", function() {
    if (sessionTabFavorito == '2') {
        $("#navBarAct").click();
        $("#navBarTem").removeClass("ui-btn-active");
        $("#navBarTem").removeClass("ui-state-persist");
        $("#navBarAct").addClass("ui-btn-active");
        $("#navBarAct").addClass("ui-state-persist");
        document.getElementById('listadoTematicasFavoritas').style.display = 'none';
        document.getElementById('listadoActividadesFavoritas').style.display = '';
    } else {
        $("#navBarTem").click();
        $("#navBarTem").addClass("ui-btn-active");
        $("#navBarTem").addClass("ui-state-persist");
        $("#navBarAct").removeClass("ui-btn-active");
        $("#navBarAct").removeClass("ui-state-persist");
        document.getElementById('listadoTematicasFavoritas').style.display = '';
        document.getElementById('listadoActividadesFavoritas').style.display = 'none';
    }
});

function getDayName(d)
{
    var x = new Array("Domingo", "Lunes", "Martes");
    x = x.concat("Miércoles", "Jueves", "Viernes");
    x = x.concat("Sábado");
    var day = d.getUTCDay();
    return(x[day]);
}


/*
 * funcion que obtiene el nombre de un mes
 */
function getMonthName(num) {
    switch (num) {
        case 0:
            return "Enero";
            break;
        case 1:
            return "Febrero";
            break;
        case 2:
            return "Marzo";
            break;
        case 3:
            return "Abril";
            break;
        case 4:
            return "Mayo";
            break;
        case 5:
            return "Junio";
            break;
        case 6:
            return "Julio";
            break;
        case 7:
            return "Agosto";
            break;
        case 8:
            return "Septiembre";
            break;
        case 9:
            return "Octubre";
            break;
        case 10:
            return "Noviembre";
            break;
        case 11:
            return "Diciembre";
            break;
    }
}

/*
 * funcion que parsea una con hora
 */
function getFechaHora(date) {
    var f = new Date(date)
    var dia = f.getDate();
    var mes = f.getMonth() + 1;
    var ano = f.getFullYear();

    var hora = f.getHours() + "";
    if (hora.length == 1) {
        hora = "0" + hora;
    }
    var min = f.getMinutes() + "";
    if (min.length == 1) {
        min = "0" + min;
    }
    return dia + "/" + mes + "/" + ano + " " + hora + ":" + min;
}

/*
 * funcion que parsea una fecha sin hora
 */
function getFechaSolo(date) {
    var f = new Date(date)
    var dia = f.getDate();
    var mes = f.getMonth() + 1;
    var ano = f.getFullYear();
    if (dia * 1 < 10)
        dia = "0" + dia;
    if (mes * 1 < 10)
        mes = "0" + mes;

    return dia + "/" + mes + "/" + ano;
}

/*
 * funcion que hace visible el menu de compartir
 */
function muestraPopShare() {
    if (primerFalloConexion == true) {
        if (document.getElementById('popShare').style.display == 'block') {
            document.getElementById('popShare').style.display = 'none'
        } else {
            document.getElementById('popShare').style.display = 'block'
        }
    } else {
        launchPop()
    }
}

/*
 * funcion que hace visible el pop de ver más o redirige al listado de mas
 */
function muestraPopMas() {
    if (sessionNumEventos == 1) {
        $("#masId").click();
        $("#backDetAct").click();
    } else {
        if (document.getElementById('popMas').style.display == 'block') {
            document.getElementById('popMas').style.display = 'none'
        } else {
            document.getElementById('popMas').style.display = 'block'
        }
    }
}

/*
 * funcion que muestra el listado de patrocinadores o lleva a su pagina
 */
function muestraPopPatrocinadores() {
    if (primerFalloConexion == true) {
        if (sessionNumEventos == 1) {
            $("#patronId").click();
        } else {
            if (document.getElementById('popPatrocinadores').style.display == 'block') {
                document.getElementById('popPatrocinadores').style.display = 'none'
            } else {
                document.getElementById('popPatrocinadores').style.display = 'block'
            }
        }
    }
}

/*
 * funcion q despliega el control de patrocinadores
 */
function muestraPatrones(cont) {
    if ($(".lineaTr" + cont).hasClass('trOculto')) {
        $(".lineaTr" + cont + " img").removeClass('imgOculto');
        $(".lineaTr" + cont).removeClass('trOculto');
    } else {
        $(".lineaTr" + cont + " img").addClass('imgOculto');
        $(".lineaTr" + cont).addClass('trOculto');
    }
}

/*
 * captura de eventos click en a, para que se abran en navegador
 */
$(document).on('click', 'a[target="_blank"]', function(ev) {
    var url;
    url = $(this).attr('href');
    //console.log(url);
    try {
        window.open(url, '_system', 'location=yes');
    } catch (e) {
        //alert(e)      
    }
});

/*
 * callback genericos
 */
function successCallback() {
}
function failureCallback() {
}

/*
 * funcion que establese el loader durante medio segundo
 */
function setLoaderTemporal() {
    setLoader('listadoActividades');
    setTimeout(hideLoader(), 500);
}

/*$(document).on("scrollstart", function() {
 $("img.lazy").lazyload();
 })
 $('body').bind('touchmove', function(e) {
 $("img.lazy").lazyload();
 });*/

function pliegaDespliegaInfo() {
    if ($("#zonaPlegadaInfoActiviad").hasClass("desplegadoInfoActividad")) {
        $("#zonaPlegadaInfoActiviad").removeClass("desplegadoInfoActividad")
        $("#btnLeerMas").html("Leer más");
    } else {
        $("#zonaPlegadaInfoActiviad").addClass("desplegadoInfoActividad")
        $("#btnLeerMas").html("Leer menos");
    }
}

