
/*funcion que establece una alarma y corre el contador */
function setAlarm(f, antelacion, mensaje, ticker) {
    try {
        var ln = new LocalNotification();
        var key = "alarma" + sessionAlarmId;
        if (getData(key) != null && getData(key) != 'null') {
            ln.cancel(sessionAlarmId, function() {
                deleteData(key);
            });
        } else {
            console.log(f)
            try {
            //    tf.remoteLog(successCallback, failureCallback, f);
            } catch (e) {
                console.error(e)
            }
            var horas = antelacion.substring(0, 2);
            var minutos = antelacion.substring(3, 5);
            f.setMinutes(f.getMinutes() - minutos);
            f.setHours(f.getHours() - horas);
            console.log(f)

           // tf.remoteLog(successCallback, failureCallback, f);
            var def = {
                date: f,
                message: mensaje,
                title: ticker,
                autoCancel: false,
                badge: 1,
                id: sessionAlarmId
            };
            var resp = ln.add(def);
            saveData(key, sessionAlarmId)
            console.log(resp);
        }
    } catch (e) {
        //alert(e);
    }
    cargaListadoActividades();
    cargarActividad(sessionAlarmId);
    $(".dwb-c a").click();
    $("#selectorAntelacion").mobiscroll('setValue','01:00');
}

function remueveAlarma() {
    var ln = new LocalNotification();
    var key = "alarma" + sessionAlarmId;
    if (getData(key) != null && getData(key) != 'null') {
        setLoader('idBody');
        ln.cancel(sessionAlarmId)
        deleteData(key);
        cargaListadoActividades();
        try {
            cargarActividad(sessionActividadMostrada)
        } catch (e) {
        }
        hideLoader();
    }
}

/*funcion para obtener el id de la proxima alarma*/
function getAlarmId() {
    try {
        var id = getData("AlarmId");
        if (id == null || id == "" || id == undefined) {
            saveData("AlarmId", 1);
            return 1;
        }
        return id;
    } catch (e) {
        saveData("AlarmId", 1);
        return 1;
    }
}

/*funcion para generar el id de la proxima alarma*/
function newAlarmId() {
    saveData("AlarmId", getAlarmId() - (-1));
}

function alarmaDePrueba() {
    var f = new Date();
    f.setMinutes(f.getMinutes() - (-1));
    setAlarm(f, 0, "funciona!, FUNCIONA!!!!", "alarma de prueba Kurbana");
}

function aceptarAlerta() {
    var antelacion = document.getElementById('selectorAntelacion').value;
    setAlarm(new Date(sessionAlarmDate), antelacion, sessionAlarmNombre, sessionAlarmDesc);
}

