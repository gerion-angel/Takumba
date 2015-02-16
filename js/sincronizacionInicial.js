(function () {
    if (getData('haSincronizadoInicialmente') != 1) { //para que solo se llame una sola vez
        var auth = make_base_auth("app", "Kurbana2k14");
        $.ajaxSetup({
            headers: {
                'Authorization': auth,
            }
        });
        saveData("haSincronizadoInicialmente",1)
            $.getJSON(sessionPath + "proyecto/proyectogetall?id=" + sessionProyecto, null, function (data) {
                /*lugares*/
                insertLugares(data.lugares);
                /*Participantes*/
                insertParticipantes(data.participantes);
                /*Banners*/
                insertBannersEvento(data.banners);
                /*etiqutas*/
                insertEtiquetas(data.etiquetas);
                /*patrocinadores*/
                insertPatrocinadores(data.patrocinadores);
                /*tematicas*/
                insertTematicas(data.tematicas);
                /*nomenclatura filtros*/
                insertNomenclaturaMenu(data.nomenclaturaFiltro);
                /*nomenclatura Actividad*/
                insertNomenclaturaActividad(data.nomenclaturaActividad);
                /*eventos solo sincro*/
                insertEventosSincroIncial(data.eventos);
                /*actividades solo sincro*/
                insertActividadesSoloSincro(data.actividades);
                /*relacion actividad etiquetas*/
                insertActividadEtiquetaSincroInicial(data.actEti);
                /*relacion actividad-participante*/
                insertActividadParticipanteSincroInicial(data.actPart);
                /*relacion actividad-tematica*/
                insertActividadTematicaSincroInicial(data.actTematica);
                /*relacion actividad-evento*/
                insertActividadEventoSincroInicial(data.actEvento);
                /**/
            });
    }
    
        
    
    $("#canvasLoader").remove()
})()

function sincroBorrados() {
    var auth = make_base_auth("app", "Kurbana2k14");
    $.ajaxSetup({
        headers: {
            'Authorization': auth,
        }
    });
    if (getData("ultimoBorrado")+"" == "null") {
        saveData("ultimoBorrado", 0);
    }
    var jsNow = new Date().getTime();
    var ruta = sessionPath + "proyecto/getBorrados?id=" + sessionProyecto + "&fecha=" + getData("ultimoBorrado")
    $.getJSON(ruta, null, function (data) {
        
        saveData("ultimoBorrado", new Date().getTime());
        if (data.actividad.length > 0) {
            deleteActividad(data.actividad)
        }
        if (data.evento.length > 0) {
            deleteEventos(data.evento)
        }
        if (data.banner.length > 0) {
            deleteBannerEvento(data.banner)
        }
        if (data.etiqueta.length > 0) {
            deleteEtiquetas(data.etiqueta)
        }
        if (data.tematica.length > 0) {
            deleteTematicas(data.tematica)
        }
        if (data.lugar.length > 0) {
            deleteLugares(data.lugar)
        }
        if (data.participante.length > 0) {
            deleteParticipantes(data.participante)
        }
        if (data.nomenclaturaActividad.length > 0) {
            deleteNomenclaturaActividad(data.nomenclaturaActividad)
        }
        if (data.patrocinador.length > 0) {
            deletePatrocinadores(data.patrocinador)
        }
        if (data.nomenclaturaFiltro.length > 0) {
            deleteNomenclaturaMenu(data.nomenclaturaFiltro)
        }
    });
        $("#canvasLoader").remove()
}