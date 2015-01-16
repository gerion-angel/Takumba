function bindEventosPopUp(){
$('.popUpStore .cajaStore .cancelar').click(function () {
    $('.popUpStore').hide();
    $('.popUpStore').remove();
})

$('.popUpStore .cajaStore .aceptar').click(function () {
    $('.popUpStore .cajaStore .cancelar').click();
//    if (navigator.userAgent.match(/Android|iPhone|IEMobile/i))
    if (navigator.userAgent.match(/Android/i)){
        window.open(sessionStoreAndroid, '_blank')
    } else if (navigator.userAgent.match(/iPhone/i)){
        window.open(sessionStoreIos, '_blank')
    }
})
}