/*
 * controla si al entrar en la aplicacion, esta recibe parametros de busqueda.
 * si encuentra el parametro de actividad o de evento, redirige hasta ello y carga
 * su información
 */
$(document).on("pagebeforeshow", "#indice", function() {
    var search = document.location.search;
    /*actividad y evento*/
    if (!sessionDesdeQR) {
        if (search.indexOf("actividad") > -1) {
            var igual = search.indexOf("=");
            var id = search.substring(igual - (-1));
            sessionDesdeQR = true;
            document.getElementById('backDetAct').style.display="none"
            document.getElementById('backDetActFake').style.display="block"
            $("#backDetActFake").addClass("ui-btn-left ui-btn ui-icon-carat-l ui-btn-icon-notext");
            $("#backDetActFake").click(function(){
                document.getElementById('backDetAct').style.display="inline"
                $("<style type='text/css' id='dynamic' />").appendTo("head");
                $("#dynamic").text (".cssDinamico:after{margin-top: 3px;margin-left: 3px;}")
                document.getElementById('backDetActFake').style.display="none"
                $(this).removeClass("ui-btn-left ui-btn ui-icon-carat-l ui-btn-icon-notext ui-btn-right")
                var obj = document.getElementById('backDetActFake');
                obj.parentNode.removeChild(obj);
            });
            onPushActi(id)
        } else if (search.indexOf("evento") > -1) {
            var igual = search.indexOf("=");
            sessionFiltroEvento = search.substring(igual - (-1));
            sessionDesdeQR = true;
            cargaListadoActividades();
            cargaDetalleEvento();
            document.location.href = "#actividades";
        }
    }
});