
var primerFalloConexion = true

function setCheckConnection() {
    $("a:not([data-checked='true']), *[onclick*='']").click(function(event) {
        checkConnection(event)
    });
    $("a:not([data-checked='true']), *[onclick*='']").attr("data-checked", "true");
    try {
        checkConnection()
    } catch (e) {
    }
}

function launchPop() {
    $("#conectionPopUp").popup();
    document.getElementById("conectionPopUp").style.display = "";
    $("#conectionPopUp").popup("open");
}

$("#conectionPopUp").bind({
    popupafterclose: function(event, ui) {
        document.getElementById("conectionPopUp").style.display = "none";
    }
});

function checkConnection(ev) {
    try {
        var e = navigator.connection.type;
        var t = {};
        t[Connection.UNKNOWN] = false;
        t["cellular"] = true; //para ios...
        t[Connection.ETHERNET] = true;
        t[Connection.WIFI] = true;
        t[Connection.CELL_2G] = true;
        t[Connection.CELL_3G] = true;
        t[Connection.CELL_4G] = true;
        t[Connection.NONE] = false;
        if (!t[e]) {
            //if (primerFalloConexion) {
            //launchPop()
            //alert("No hay una conexión de datos disponible");
            primerFalloConexion = false;
            //}
            try {
                if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'iOS') {

                } else {
                    launchPop();
                    ev.cancelBubble = true;
                    if (ev.preventDefault) {
                        ev.preventDefault();
                    }
                    if (ev.stopPropagation)
                        ev.stopPropagation();
                    return false;

                }
            } catch (ex) {
                launchPop();
                ev.cancelBubble = true;
                if (ev.preventDefault) {
                    ev.preventDefault();
                }
                if (ev.stopPropagation)
                    ev.stopPropagation();
                return false;
            }
            if (!ev)
                var ev = window.event;
            /*IMPORTANTE: detiene la propagacion*/
//            ev.cancelBubble = true;
//            if (ev.preventDefault) {
//                ev.preventDefault();
//            }
//            if (ev.stopPropagation)
//                ev.stopPropagation();
//            return false;
        } else {
            primerFalloConexion = true;
        }
    } catch (err) {
        //console.error(err)
    }
}