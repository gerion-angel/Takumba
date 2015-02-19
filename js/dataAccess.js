var xmlhttp;
function cargarXMLDoc(archivoXML) 
	{
		try{
    		if (window.XMLHttpRequest) {// codigo para IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// para IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET", archivoXML, false);	
            xmlhttp.responseType = 'json';
			xmlhttp.withCredentials = "true";
            xmlhttp.send();
            var xml = xmlhttp.responseXML;
			return xml;
			
		}catch(e){
			//blackberry.ui.toast.show("No ha sido posible conectar con el servidor");
			}
}