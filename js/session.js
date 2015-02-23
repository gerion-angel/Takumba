//var sessionPath = "http://212.183.201.45:60700/Kurbana/test";
//var sessionPath = "http://212.183.201.45:60700/Kurbana/rest/";
//var sessionPath = "http://193.242.188.196:8080/Kurbana/rest/";
var sessionPath = "http://192.168.2.24:8080/Kurbana/rest/";
//var sessionPath = "http://localhost:8080/Kurbana/rest/";
var sessionProyecto = 10; //ver readme
var sessionHayBanners = -1;
var sessionDateFormat = "dd/MM/YYYY"
var tf;
var sessionFiltroEvento = -1;
var sessionFiltroLugar = -1;
var sessionFiltroTematica = -1;
var sessionFiltroTematica2 = -1;
var sessionFiltroParticipantes = -1;
var sessionFiltroParticipantes2 = -1;
var sessionFiltroFavoritos = -1;
var sessionFiltroFecha = -1;
var sessionFiltroEtiqueta = -1;
var sessionUltFiltro = -1;

var tituloAnterior = "";
var primeraCarga=false;
var sessionSegundoFiltro = 0;

var sessionActividadMostrada = -1;
var sessionNumEventos = -1;

var sessionRadioProyecto=-1;
var sessionLatUser = 0;
var sessionLongUser = 0;
var sessionLatProyecto = 0;
var sessionLongProyecto = 0;
var sessionLatEvento = 0;
var sessionLongEvento = 0;
var sessionPosProyecto = "";
var sessionPosEvento = "";

sessionDesdeActi = -1;

var sessionNumTematicas = 0;

var sessionTematicasFavoritas = false;
var sessionActividadesFavoritas = false;
var sessionUUID;

var sessionTrakingGoogle = "UA-24976927-9"//padel y otras
//var sessionTrakingGoogle = "UA-8393234-7"//Infantiles

//para alarmas
var sessionAlarmNombre;
var sessionAlarmDesc;
var sessionAlarmDate;
var sessionAlarmId;

var sessionPushToken= '';
var sessionDesdeQR = false;

var sessionNumCargas=0;

var sessionMesPintar=-1;
var sessionAnnoPintar=-1;

var sessionSetLoader = false;

var sessionSoloUnEvento = false;
var sessionTabFavorito = 1;

/*Stores*/
var sessionStoreAndroid = 'https://play.google.com/store?hl=es';
var sessionStoreIos = 'http://store.apple.com/es'

/*Compartir*/
var sessionShareLink = "http://193.242.188.196:8080/takumba/index.html?actividad"