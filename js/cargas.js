
/*$(document).ready(function() {
 
 var auth = make_base_auth("app", "Kurbana2k14");
 $.ajaxSetup({
 //cache: false,
 crossDomain: true,
 Authorization: auth,
 //        username: 'app',
 //        password: 'Kurbana2k14',
 header: {
 'Authorization': auth}
 });
 });*/


//var auth = make_base_auth("app", "Kurbana2k14");

function make_base_auth(user, password)
{
    var tok = user + ':' + password;
    var hash = Base64.encode(tok);
    return "Basic " + hash;
}

/*
 * funcion que carga el listado de los eventos 
 */
function cargaListadoEventos(id) {
    var auth = make_base_auth("app", "Kurbana2k14");
    setCheckConnection();
    if (primerFalloConexion == true) {
        $.ajax({
            type: "POST",
            url: sessionPath + "evento/proyecto?id=" + sessionProyecto,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", auth);

            },
            success: function (data) {
                parsearListadoEventos(data, id);

                insertEventos(data);

            },
            error: function (data) {
            }
        });
    } else {
        var data = selectListadoEventos();

    }
    setCheckConnection();
}

/*
 * funcion que carga el listado de temáticas
 */
/*function cargaListadoTematicas() {
 $.getJSON(sessionPath + "tematica/proyecto?id=" + sessionProyecto, null, function(data) {
 parsearListadoTematicas(data);
 console.log(data)
 });
 setCheckConnection()
 }*/

/*
 * funcion que carga el listado de Etiquetas
 */
function cargaListadoEtiquetas() {
    if (primerFalloConexion == true) {
        //console.log(sessionPath + "etiqueta/evento?evento=" + sessionFiltroEvento)
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "etiqueta/evento?evento=" + sessionFiltroEvento, null, function (data) {
            parsearListadoEtiquetas(data);
            insertEtiquetas(data);
        });
    } else {
        var data = selectListadoEtiquetas();
    }
    setCheckConnection()
}

/*
 * funcion que carga el listado de participantes
 */
function cargaListadoParticipantes() {
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "participante/proyecto?id=" + sessionProyecto, null, function (data) {
            parsearListadoParticipantes(data);
            insertParticipantes(data);
        });
    }
    setCheckConnection()
}

/*
 * funcion que carga el listado de participantes
 */
function cargaListadoLugares() {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(sessionPath + "lugar/proyecto?id=" + sessionProyecto, null, function (data) {
        parsearListadoLugares(data);
    });
    setCheckConnection()
}

/*
 * funcion que carga el listado filtrado por favoritos.
 */
function cargaListadoTematicasFavoritas() {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(sessionPath + "notificacionTematica/getfavoritas?udid=" + sessionPushToken + '&nocache=' + new Date().getTime(), null, function (data) {
        parsearListadoTematicasFavoritas(data);
    })
            ;


    setCheckConnection()
}
/*
 * funcion que carga el listado de actividades filtrado por favoritos.
 */
function cargaListadoActividadesFavoritas() {
    var ruta = sessionPath + "notificacionActividad/getfavoritas?udid=" + sessionPushToken + '&nocache=' + new Date().getTime();
    //console.info(ruta)
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(ruta, null, function (data) {
        parsearListadoActividadesFavoritas(data);
    });

    setCheckConnection()
}

/*
 * funcion que carga la posicion del proyecto.
 */
function cargaPosProyecto() {
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });

        $.getJSON(sessionPath + "lugar/localizacionproyecto?id=" + sessionProyecto, null, function (data) {
            parsearPosicionProyecto(data);
            insertPosicionProyecto(data);
        });
    } else {
        var data = selectPosProyecto();
    }
    setCheckConnection()
}

/*
 * funcion que carga la posicion del evento
 */
function cargaPosEvento() {
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "lugar/localizacionevento?evento=" + sessionFiltroEvento, null, function (data) {
            parsearPosicionEvento(data);
            insertPosicionEvento(data)
        });
    } else {
        var data = selectPosEvento();
    }
    setCheckConnection()
}

/*
 * Función que carga el detalle de un evento
 */
function cargaDetalleEvento() {
    setTimeout(function () {
        try {
            setTimeout(navigator.splashscreen.hide, 10);
            setLoader('idBody');
        } catch (e) {
        }
        
        $("#canvasLoader").css("background-color", "transparent")
        hideLoader()
    }, 10)
    $("#cabeceraDetalleEvento").html("");
    $(".datosIzquierda.evento").html("");
    $(".imgDetalleEvento").html("");
    $(".cuerpoDetalleEvento").html("");
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        //console.log(sessionPath + "evento/getitem?evento=" + sessionFiltroEvento);
        $.getJSON(sessionPath + "evento/getitem?evento=" + sessionFiltroEvento, null, function (data) {
            parsearDetalleEvento(data);
            updateDetalleEvento(data);
        });
    } else {
        var data = selectDetalleEvento();
    }
    setTimeout(function () {
        $("#splashDiv").remove();
        $("#canvasLoader").css("background-color", "#f8f8f8")
    }, 1000)
    setCheckConnection()
}

/*
 * Función que carga el detalle de un lugar
 */
function cargaDetalleLugar() {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(sessionPath + "lugar/getitem?lugar=" + sessionFiltroLugar, null, function (data) {
        parsearDetalleLugar(data);
        updateLugar(data);
    });
    setCheckConnection()
}

/*
 * Función que carga los patrocinadores de un evento
 */
function cargaPatrocinadoresEvento() {
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "patrocinador/evento?evento=" + sessionFiltroEvento, null, function (data) {
            parsearPatrocinadoresEvento(data);
            insertPatrocinadores(data);
        });
    } else {
        var data = selectPatrocinadoresEvento();
    }
    setCheckConnection()
}

/*
 * Función que carga los banners de un evento
 */
function cargaBannersEvento() {
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });

        $.getJSON(sessionPath + "banner/evento?evento=" + sessionFiltroEvento, null, function (data) {
            parsearBannersEvento(data);
            insertBannersEvento(data);
        });
    } else {
        var data = selectBannersEvento();
    }
    setCheckConnection()
}

/*
 * Función que carga el detalle de un participante
 */
function cargaDetalleParticipante() {
    $("#tituloNombreParticipante").html("");
    $("#paginaDetalleParticipante .contenido").html("");
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        if (sessionFiltroParticipantes2 > 0) {
            $.getJSON(sessionPath + "participante/getitem?participante=" + sessionFiltroParticipantes2, null, function (data) {
                parsearDetalleParticipante(data);
                insertParticipantes(data)
            });
        } else {
            $.getJSON(sessionPath + "participante/getitem?participante=" + sessionFiltroParticipantes, null, function (data) {
                parsearDetalleParticipante(data);
                insertParticipantes(data)
            });
        }
    } else {
        var data;
        if (sessionFiltroParticipantes2 > 0) {
            data = selectDetalleParticipante(sessionFiltroParticipantes2)
        } else {
            data = selectDetalleParticipante(sessionFiltroParticipantes)
        }
    }
    setCheckConnection()
}

/*
 * funcion que carga las actividades en la pagina de actividades, según una serie 
 * de filtros almacenados en session
 */
function cargaListadoActividades() {

    ocultaZonasDetalleListadoActividades();
    var ruta = sessionPath + "actividad/getactividades?id=" + sessionProyecto;
    var cont = 0;
    if (sessionFiltroEvento != -1) {
        ruta += "&evento=" + sessionFiltroEvento;
        document.getElementById('menuEtiquetas').style.display = 'block';
        document.getElementById('menuPatrocinadores').style.display = 'block';
        cont++
    } else {
        document.getElementById('menuEtiquetas').style.display = 'none';
        document.getElementById('menuPatrocinadores').style.display = 'none';
    }
    if (sessionFiltroLugar != -1) {
        ruta += "&lugar=" + sessionFiltroLugar;
        cont++
    }
    if (sessionFiltroTematica != -1 && cont < 2) {
        ruta += "&tematica=" + sessionFiltroTematica;
        cont++
    }
    if (sessionFiltroTematica2 != -1 && cont < 2) {
        ruta += "&tematica2=" + sessionFiltroTematica2;
        cont++
    }
    if (sessionFiltroParticipantes != -1 && cont < 2) {
        ruta += "&participante=" + sessionFiltroParticipantes;
        cont++
    }
    if (sessionFiltroParticipantes2 != -1 && cont < 2) {
        ruta += "&participante2=" + sessionFiltroParticipantes2;
        cont++
    }
    if (sessionFiltroFecha != -1 && cont < 2) {
        ruta += "&fecha=" + sessionFiltroFecha;
        cont++
    }
    if (sessionFiltroEtiqueta != -1 && cont < 2) {
        ruta += "&etiqueta=" + sessionFiltroEtiqueta;
        cont++
    }
    if (cont > 1)
        $("a[href='#menuActividades']").addClass("trOculto");
    //console.log(ruta);
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(ruta, null, function (data) {
            insertActividades(data);
            parsearListadoActividades(data);
        });
    } else {
        var data = selectListadoActitividades();
    }
    setCheckConnection()
}

/*
 * funcion que carga una actividad
 */
function cargarActividad(idAct) {
    $(".fecha .dia").html("");
    $(".fecha .mes").html("");
    $(".botonera").html("");
    $(".datos").html("");
    $(".imgDetalleActividad").html("");
    $(".cuerpoDetalleActividad").html("");
    var ruta = sessionPath + "actividad/getitem?actividad=" + idAct;
    if (sessionFiltroEvento > -1) {
        ruta += "&idEvento=" + sessionFiltroEvento;
    }
    //console.log(ruta);
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });

        $.getJSON(ruta, null, function (data) {
            updateActividad(data);
            parsearActividad(data);
            //cargaListadoActividades();
        });
    } else {
        var data = selectActividad(idAct)
    }
    var ruta = sessionPath + "nomenclaturaActividad/actividad?actividad=" + idAct;
    //console.info(ruta);
    $.getJSON(ruta, null, function (data) {
        parsearNomenclaturaActividad(data);
    });
    setCheckConnection()
}

/*
 * funcion que crea una nueva tematica favorita en el servidor.
 */
function nuevaTematicaFavorita(id) {
    var os = navigator.platform;
    var url = sessionPath + "notificacionTematica/setfavorita?tematica=" + id + "&udid=" + sessionPushToken + "&os=" + os
    //console.log(url)
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(url, null, function (data) {
        //console.log(data)
        comprobarTematicaCambiada(data);
    });
    setCheckConnection()
}

/*
 * funcion que quita una tematica favorita en el servidor.
 */
function borraTematicaFavorita(id) {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(sessionPath + "notificacionTematica/unsetfavorita?tematica=" + id + "&udid=" + sessionPushToken, null, function (data) {
        comprobarTematicaCambiada(data);
    });
    setCheckConnection()
}

/*
 * funcion que crea una nueva tematica favorita en el servidor.
 */
function nuevaActividadFavorita(id) {
    /*sessionUUID = window.device.uuid;
     var uuid = sessionUUID;*/
    var os = navigator.platform;
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    var url = sessionPath + "notificacionActividad/setfavorita?actividad=" + id + "&udid=" + sessionPushToken + "&os=" + os
    //console.log(url)
    $.getJSON(url, null, function (data) {
        comprobarTematicaCambiada(data);
    });
    setCheckConnection()
}

/*
 * funcion que quita una tematica favorita en el servidor.
 */
function borraActividadFavorita(id) {
    /*sessionUUID = window.device.uuid;
     var uuid = sessionUUID;*/
    var llamada = sessionPath + "notificacionActividad/unsetfavorita?actividad=" + id + "&udid=" + sessionPushToken;
    //console.log(llamada);
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(llamada, null, function (data) {
        comprobarTematicaCambiada(data);
        //cargaListadoActividadesFavoritas();
    });
    setCheckConnection()
}

/*para cargar las posiciones de actividades cercanas por fecha*/
function cargaCercaYLugar(rango) {
    var long = sessionLongUser;
    var lat = sessionLatUser;
    var ruta = sessionPath + "actividad/getcercade?longitud=" + long + "&latitud=" + lat + "&periodo=" + rango;
    if (sessionFiltroEvento != -1) {
        ruta += "&evento=" + sessionFiltroEvento;
    } else {
        ruta += "&proyecto=" + sessionProyecto;
    }
    //console.log(ruta);
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(ruta, null, function (data) {
        anadirMasMarcasMapa(data);
    });
    setCheckConnection()
}

/*funcion para llamar al servicio que establece el numero de me gusta*/
function anadeGusta(id) {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(sessionPath + "usuarioActividadMeGusta/setmegusta?actividad=" + id + "&udid=" + sessionPushToken, null, function (data) {
        cargarActividad(id);
    });
    setCheckConnection()
}
/*funcion para llamar al servicio que elimina un megusta*/
function deleteGusta(id) {
    /*sessionUUID = window.device.uuid;
     var uuid = sessionUUID;*/
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    $.getJSON(sessionPath + "usuarioActividadMeGusta/unsetmegusta?actividad=" + id + "&udid=" + sessionPushToken, null, function (data) {
        cargarActividad(id);
    });
    setCheckConnection()
}

function cargaMenusFiltrados() {
    var ruta = "";
    if (sessionFiltroEvento != -1) {
        ruta += "&evento=" + sessionFiltroEvento;
    }
    if (sessionFiltroLugar != -1) {
        ruta += "&lugar=" + sessionFiltroLugar;
    }
    if (sessionFiltroTematica != -1) {
        ruta += "&tematica=" + sessionFiltroTematica;
    }
    if (sessionFiltroParticipantes != -1) {
        ruta += "&participante=" + sessionFiltroParticipantes;
    }
    if (sessionFiltroFecha != -1) {
        ruta += "&fecha=" + sessionFiltroFecha;
    }
    if (sessionFiltroEtiqueta != -1) {
        ruta += "&etiqueta=" + sessionFiltroEtiqueta;
    }
    if (primerFalloConexion == true) {

        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "tematica/tematicasfiltro?id=" + sessionProyecto + ruta, null, function (data) {
            parsearListadoTematicas(data);
            insertTematicas(data)
//            console.info(data)
        });
        $.getJSON(sessionPath + "lugar/lugaresfiltro?id=" + sessionProyecto + ruta, null, function (data) {
            parsearListadoLugares(data);
            insertLugares(data);
        });
        $.getJSON(sessionPath + "participante/participantesfiltro?id=" + sessionProyecto + ruta, null, function (data) {
            parsearListadoParticipantes(data);
            insertParticipantes(data)
        });
    } else {
        selectListadoTematicas()
        selectListadoLugares()
        selectListadoParticipantes()
    }
    setCheckConnection()

}

/*funcion que carga las nomenclturas del menú lateral*/
function cargaNomenclaturasMenu() {
    if (primerFalloConexion == true) {
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "nomenclaturaFiltro/filtro?proyecto=" + sessionProyecto, null, function (data) {
            parsearMenuLateral(data);
            insertNomenclaturaMenu(data);
        });
    } else {
        selectNomenclaturaMenu()
    }
}

/*funcion para el registro del dispositivo para push adhock*/
function registro() {

    if (getData('registrado') != true && getData('registrado') != "true") {
        var os = navigator.platform;
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        $.getJSON(sessionPath + "instalacion/save?udid=" + sessionPushToken + "&os=" + os + "&proyecto=" + sessionProyecto, null, function (data) {
            saveData('registrado', true);
        });
    }
    setCheckConnection()
}

function cargaDiasConActividad() {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth
        }
    });
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var numMes = meses.indexOf($(".ui-datepicker-title .ui-datepicker-month").html()) - (-1);
    var numAnno = $(".ui-datepicker-title .ui-datepicker-year").html();
    var ruta = sessionPath + "actividad/fechasactividad?month=" + numMes + "&year=" + numAnno + "&id=" + sessionProyecto;

    if (sessionFiltroEvento != -1) {
        ruta += "&evento=" + sessionFiltroEvento;
    }
    if (sessionFiltroLugar != -1) {
        ruta += "&lugar=" + sessionFiltroLugar;
    }
    if (sessionFiltroTematica != -1) {
        ruta += "&tematica=" + sessionFiltroTematica;
    }
    if (sessionFiltroParticipantes != -1) {
        ruta += "&participante=" + sessionFiltroParticipantes;
    }
    if (sessionFiltroEtiqueta != -1) {
        ruta += "&etiqueta=" + sessionFiltroEtiqueta;
    }

    //console.info(ruta);

    sessionMesPintar = numMes;
    sessionAnnoPintar = numAnno;

    $.getJSON(ruta, null, function (data) {
        pintaDiasConActividad(data)
    });


    $("#filtroCalendario").datepicker();
    $(".ui-datepicker .ui-datepicker-prev, .ui-datepicker .ui-datepicker-next").click(function () {
        cargaDiasConActividad();
    })
    setCheckConnection()
}


/*
 add headers
 $.ajaxSetup({
 headers : {
 'Authorization' : 'Basic faskd52352rwfsdfs',
 'X-PartnerKey' : '3252352-sdgds-sdgd-dsgs-sgs332fs3f'
 }
 });
 
 */






var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },
    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },
    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}