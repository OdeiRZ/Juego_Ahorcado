//Función usada para "borrar" cookie almacenada solo accesible con el modo debug activado
function borrarCookie(id) {									
	document.cookie=id+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
//Función usada para crear cookie a partir de un id, valor y fecha de caducidad recibidas como parámetros
function crearCookie(id,valor,caducidad) {					
	var d=new Date();
	d.setTime(d.getTime()+(caducidad*24*60*60*1000));
	var expires="expires="+d.toGMTString();
	document.cookie=id+"="+valor+"; "+expires;
}
//Función usada para leer cookie y comparar su valor numérico con el recibido como parámetro,
//devolviendo -1, 0 o 1 (-1 existe)no record, (0 no existe, 1 record)si record
function leerCookie(id,tiempo) {//,debug)
	var n=0,nombre=id+"=";	
	var valor=document.cookie.split(';');
	for(var i=0;i<valor.length;i++)
		if(valor[i].indexOf(nombre) != -1) {
			n=-1;
			var tiempoCookie=valor[i].substring(nombre.length,valor[i].length);
			if(tiempoCookie > tiempo) {
				crearCookie(id,tiempo,1);
				n=1;
			} //(debug)? alert("tiempoCookie:"+tiempoCookie+" - tiempoActual:"+tiempo) : "";
			break;
		}
	return n;
}
//Función usada comprobar si existe una cookie asociada al documento si no existe se crea con el correspondiente
//nuevo record, y si existe se comparan sus valores, devolviendo true o false si existe o no nuevo record
function comprobarCookie(tiempo){//,debug) 
	var record=false;	
	var comprobacion=leerCookie("id",tiempo)//,debug);
	if(comprobacion>=0) {
		record=true;
		if(comprobacion==0)
			crearCookie("id",tiempo,1);
	}
	return record;
}