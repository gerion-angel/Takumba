/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
var objGeo = navigator.geolocation;
var map;
$(document).on("pagebeforeshow", "#ahoraCerca", function() {
    setLoader('map-canvas');
    try {

        var defaultLatLng = new google.maps.LatLng(sessionLatProyecto, sessionLongProyecto);  // Default a la localizacion del proyecto, CA when no geolocation support
    } catch (e) {
    }
    if (navigator.geolocation) {
        // Localizacion de la posicion del usuario.  Cache the location for 5 minutes, timeout after 6 seconds
        try {
            navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy: true, timeout: 6000});
        } catch (ex) {
        }
    } else {
        if (sessionFiltroEvento > -1) {
            sessionLatUser = sessionLatEvento;
            sessionLongUser = sessionLongEvento;
        } else {
            sessionLatUser = sessionLatProyecto;
            sessionLongUser = sessionLongProyecto;
        }
        cargaCercaYLugar(1);
    }
});

/*Funciones para el éxito y el fracaso de la acción para obtener las posiciones del usuario*/
function success(pos) {
    // si se localiza el dispositivo
    var defaultLatLng = new google.maps.LatLng(sessionLatProyecto, sessionLongProyecto);  // hay que incluir default incluso en el succes para evitar una excepcion (de consola)
    sessionLatUser = pos.coords.latitude;
    sessionLongUser = pos.coords.longitude;
    cargaCercaYLugar(1);
}
function fail(error) {
    var defaultLatLng = new google.maps.LatLng(sessionLatProyecto, sessionLongProyecto);  // Default es el proyect location
    if (sessionFiltroEvento > -1) {
        sessionLatUser = sessionLatEvento;
        sessionLongUser = sessionLongEvento;
    } else {
        sessionLatUser = sessionLatProyecto;
        sessionLongUser = sessionLongProyecto;
    }
    cargaCercaYLugar(1);
}

/*funcion que dibuja el mapa centrado en la posicion dada*/
function drawMap(latlng) {
    $("#map-canvas").css({"height": window.innerHeight - 77});
    ga("send", "event", "button", "click", "Posicion: " + sessionLatUser + ":" + sessionLongUser, 1);
    var zoom = 14;
    try {
        if (sessionRadioProyecto < 1) {/*lo voy a bajar un grado para más cercano*/
            zoom = 14;
        } else if (sessionRadioProyecto < 2) {
            zoom = 14;
        } else if (sessionRadioProyecto < 4) {
            zoom = 13;
        } else if (sessionRadioProyecto < 8) {
            zoom = 12;
        } else if (sessionRadioProyecto < 16) {
            zoom = 11;
        } else if (sessionRadioProyecto < 32) {
            zoom = 10;
        } else if (sessionRadioProyecto >= 32) {
            zoom = 9;
        } else {
            zoom = 15;
        }
    } catch (e) {
        zoom = 15;
    }
    var MiInfowindow = new google.maps.InfoWindow({
        content: "Cargando..." /// HAY QUE USAR H1 y P para que tenga tamaño y formatear el texto
    });
    var myOptions = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        output: 'embed'
//        mapTypeId: google.maps.MapTypeId.ROADMAP   //para mapa de carreteras
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        html: "<div><p>Mi ubicación</p></div>",
        title: sessionPosProyecto
    });

    google.maps.event.addListener(marker, 'click', function() {
        MiInfowindow.setContent(this.html);
        MiInfowindow.open(map, this);
        bloqueaLogoG();
    });
    try {
        hideLoader();
    } catch (e) {
    }
    setTimeout(bloqueaLogoG, 1000);
}

function anadirMasMarcasMapa(data) {
    try {
        var defaultLatLng = new google.maps.LatLng(sessionLatUser, sessionLongUser);
        drawMap(defaultLatLng);
        setTimeout(function() {
            drawMap(defaultLatLng);
            var infowindow = new google.maps.InfoWindow({
                content: "Cargando..." /// HAY QUE USAR H1 y P para que tenga tamaño y formatear el texto
            });
            var arr = new Array();
            for (var i = 0; i < data.length; i++) {
                var marker = data[i];/**//*cuando este el servicio podre ver la estructura*/
                var nombre = marker.nombre;
                var id = marker.id;
                var desc = marker.entradilla;
                var latitud = marker.latitud;
                var longitud = marker.longitud;
                var ini = getFechaHora(marker.fechaIni);
                var fin = getFechaHora(marker.fechaFin);
                var elHTML = "<div id='content'" + i + " onclick='cargarActividad(" + id + ");document.location=\"#detalleActividad\"'><h1>" + nombre + "</h1><p>" + desc + "</p><p>Desde " + ini + "</p><p>Hasta " + fin + "</p></div>";
                arr.push(elHTML);
            }
            for (var i = 0; i < data.length; i++) {
                var marker = data[i];/**//*cuando este el servicio podre ver la estructura*/
                var nombre = marker.nombre;
                var id = marker.id;
                var desc = marker.descripcion;
                var latitudBuena = marker.latitud;
                var longitudBuena = marker.longitud;
                var elPunto = new google.maps.LatLng(latitudBuena, longitudBuena);

                var marker = new google.maps.Marker({
                    position: elPunto,
                    map: map,
                    title: nombre,
                    html: arr[i],
                    icon: "images/ubicacion3.png"
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
            }
        }, 500);
    } catch (e) {
        //alert(e)
    }
}
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
    };
}

var verMap = new google.maps.Map(document.getElementById("map-canvas2"), null);
function cargaVerLugar(lat, long, nombre) {
    if (primerFalloConexion == true) {
        //console.log(lat + " " + long + " " + nombre)
        $("#map-canvas2").css({"height": window.innerHeight - 45});
        $("#pagVerLugar h1.cercaMenu").html(nombre);
        document.location.href = "#pagVerLugar"

        var verMapaLatLang;
        verMapaLatLang = new google.maps.LatLng(lat, long);
        var myOptions = {
            zoom: 14,
            center: verMapaLatLang,
            mapTypeId: google.maps.MapTypeId.HYBRID
                    //        mapTypeId: google.maps.MapTypeId.ROADMAP   //para mapa de carreteras
        };

        verMap = new google.maps.Map(document.getElementById("map-canvas2"), myOptions);
        setTimeout(function() {
            verMap = new google.maps.Map(document.getElementById("map-canvas2"), myOptions);
            var marker = new google.maps.Marker({
                position: verMapaLatLang,
                map: verMap,
                title: nombre,
                icon: "images/ubicacion3.png"
            });
            var infowindow2 = new google.maps.InfoWindow({
                content: "<div><h1>" + nombre + "</h1><p></p></div>" // HAY QUE USAR H1 y P para que tenga tamaño y formatear el texto
            });
            navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy: true, timeout: 6000});
            setTimeout(function() {
                var defaultLatLng = new google.maps.LatLng(sessionLatUser, sessionLongUser);
                var marker2 = new google.maps.Marker({
                    position: defaultLatLng,
                    map: verMap,
                    html: "<div><p>Mi ubicación</p></div>",
                    title: sessionPosProyecto
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow2.setContent("<div><h1>" + nombre + "</h1><p></p></div>");
                    infowindow2.open(verMap, this);
                    bloqueaLogoG();
                });

                google.maps.event.addListener(marker2, 'click', function() {
                    infowindow2.setContent("<div><p>Mi ubicación</p></div>");
                    infowindow2.open(verMap, this);
                    bloqueaLogoG();
                });
            }, 500);
            setTimeout(bloqueaLogoG, 1000);
        }, 1000);
    }
}

function bloqueaLogoG() {
    //console.log("bloqueaLogoG")
    try {
        $("img[src='http://maps.gstatic.com/mapfiles/api-3/images/google_white2.png'], a[href*='google']").click(function(evt) {
           // console.info('bloqueado')
            evt.preventDefault();
            return false;
        });
    } catch (e) {
    }/*en movil, la url del logo termina en hdpi o transparent*/
    $("img[src='http://maps.gstatic.com/mapfiles/api-3/images/google_white2_hdpi.png'], a[href*='google']").click(function(evt) {

        //console.info('bloqueado')
        evt.preventDefault();
        return false;
    });
    $("img[src='http://maps.gstatic.com/mapfiles/api-3/images/google_white2.png'], a[href*='google']").on('touchstart', function() {
        //console.info('bloqueado')
        evt.preventDefault();
        return false;
    });
    $("img[src='http://maps.gstatic.com/mapfiles/api-3/images/google_white2_hdpi.png'], a[href*='google']").on('touchstart', function() {
       // console.info('bloqueado')
        evt.preventDefault();
        return false;
    });


}