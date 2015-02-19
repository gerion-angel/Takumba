/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(".coachMark").click(function(){
    $(this).hide();
    $(this).remove();
})

$(".coachMark").bind('touchmove', function(e){
    e.preventDefault()
})

$(document).on("pagebeforeshow", "#actividades", function() {
    var primerEvento = getData('primerEventoCoachMark');
    if (primerEvento == null){
        lanzaEventoCoachMark();
    } else {
        $(".coachMark.evento").remove();
    }
})

function lanzaEventoCoachMark(){
    saveData('primerEventoCoachMark', '1');
    $(".coachMark.evento").show();
}

$(document).on("pageshow", "#detalleActividad", function() {
    var primerActividad = getData('primerActividadCoachMark');
    if (primerActividad == null){
        lanzaActividadCoachMark();
    }else {
        $(".coachMark.actividad").remove();
    }
})

function lanzaActividadCoachMark(){
    saveData('primerActividadCoachMark', '1');
    var top = $("#botoneraDetalleActividad").offset().top
    var modifica = top -247;
    if(modifica > 0)
        $(".coachMark.actividad").attr('style', "padding-top:"+modifica+"px;overflow:hidden")
    else
        $(".coachMark.actividad").attr('style', "top:"+modifica+"px;overflow:hidden")
    $(".coachMark.actividad").show();
}

function checkBotoneraCoachMark(){
    var primerActividad = getData('primerActividadCoachMark');
    var top = $("#botoneraDetalleActividad").offset().top
    var modifica = top -247;
    if(modifica > 0)
        $(".coachMark.actividad").attr('style', "padding-top:"+modifica+"px;overflow:hidden")
    else
        $(".coachMark.actividad").attr('style', "top:"+modifica+"px;overflow:hidden")
    $(".coachMark.actividad").show();
}