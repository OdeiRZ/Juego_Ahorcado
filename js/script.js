//Función usada para cargar atributos y valores de elementos recibidos como parametro
//devolviendo una cadena con el codigo que insertaremos en la sección que deseemos
window.onload=function() {
	var letras=["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","ñ","z","x","c","v","b","n","m"];
	var botones=cargaEventos(letras,"onclick","button","comprobarLetra(this.id)","disabled");
	document.getElementById('formulario').innerHTML=botones+document.getElementById('formulario').innerHTML;
	function cargaEventos(letras,evento,tipo,funcion,activa) {															
		var aux="";
		for(var i=0;i<letras.length;i++)
			aux+="<input type='"+tipo+"' value='"+letras[i].toUpperCase()+"' id='"+letras[i]+"' "+evento+"='"+funcion+"' "+activa+">\n";
		return aux;
	}
}
var personajes=["mozart","cervantes","nietzsche","kepler","darwin","aristoteles","chaplin","fawkes","beethoven","einstein","kennedy","tesla"];
var segundos="00",minutos="00",horas="00";
var indice=0,conFallos=0,maxFallos=7,repetidor;
var debug=false,empezado=false;
//Función usada para dar comienzo al juego inicializando variables globales, etc
function comienzo() {
	var eleccion="";
	indice=parseInt(Math.random()*personajes.length);
	for(var i=0;i<personajes[indice].length;i++)
		eleccion+="_ ";
	
	for(var i=0;i<document.forms[0].elements.length;i++)
		document.forms[0].elements[i].disabled=false;
	document.getElementById('empezar').disabled=true;
	document.getElementById('palabra').style.visibility="visible";
	document.getElementById('texto').innerHTML=eleccion;
	repetidor=setInterval('contadorReloj()',1000);
	empezado=true;
	cambiaImagen();
	if(debug) {													//Si el "modo" debug esta activado, mostraremos el personaje al comienzo del juego
		alert(personajes[indice]);								//y habilitaremos un botón para borrar los datos de la cookie que almacena el record
		document.getElementById('oculto').style="display:inline;";
	}
}
//Función usada para reiniciar el juego, parando el reloj y reiniciando variables y botones
function reinicio() {
	horas="00";
	minutos="00";
	segundos="00";
	conFallos=0;
	empezado=false;
	cambiaImagen();
	clearInterval(repetidor);
	
	for(var i=0;i<document.forms[0].elements.length;i++)
		document.forms[0].elements[i].disabled=true;
	document.getElementById('empezar').disabled=false;//document.getElementById('oculto').disabled=false;
	document.getElementById('palabra').style.visibility="hidden";
	document.getElementById('tiempo').innerHTML=horas+":"+minutos+":"+segundos;
}
//Función usada para validar la letra pulsada recibida como parámetro y comprobar si la palabra a sido acertada o no
function comprobarLetra(letra) {								
	if(empezado) {												
		document.getElementById(letra).disabled=true;			//Comprobacion usada por seguridad ante deshabilitacion de botones (via html)
		
		var cadena=document.getElementById('texto').innerHTML.split(" ");
		var cadenaAux="", existeLetra=false;
		for(var i=0;i<personajes[indice].length;i++) {
			if(personajes[indice].charAt(i)==letra) {
				cadenaAux+=letra+" ";
				existeLetra=true;
			}
			else
				cadenaAux+=cadena[i]+" ";
		}
		document.getElementById('texto').innerHTML=cadenaAux;
		if(cadenaAux.split(" ").indexOf("_") == -1)
			finJuego("Jugador");
		if(!existeLetra) {
			conFallos++;
			cambiaImagen();
			if(conFallos==maxFallos)					
				finJuego("PC");
		}
	}
}
//Función usada para cambiar la imágen del juego a partir del número de errores cometidos, usando el contador como nombre de imágen
function cambiaImagen()	{										
	var nombre=(empezado) ? conFallos : "ahorcado";
	document.getElementById('ahorcado').src="img/"+nombre+".png";
}
//Función usada para comprobar ganador del juego a partir de cadena	
//recibida como parámetro, si el ganador es el usuario se comprueba
//si el tiempo utilizado es inferior al record almacenado
function finJuego(cadena){																	
	empezado=false;												
	clearInterval(repetidor);									
	var tiempo="";
	(horas>0) 	? tiempo+=horas+" horas " 	   : "";
	(minutos>0)	? tiempo+=minutos+" minutos y ": "";
	(segundos>0)? tiempo+=segundos+" segundos" : "";
	
	if(cadena=="PC")
		alert("Lo siento, has perdido\n\nEl Personaje era: "+personajes[indice]);
	else {
		var tiempoSeg=(parseInt(segundos))+(parseInt(minutos)*60/100)+(parseInt(horas)*3600/10);
		alert("¡¡Enhorabuena, has ganado!!\n\nTu tiempo fue de: "+tiempo);
		(comprobarCookie(tiempoSeg)/*,debug)*/)?alert("¡¡Has batido el Record!!\n\nSe ha registrado tu tiempo"):alert("No has batido el Record\n\nSigue intentándolo");
	}
	document.getElementById('ahorcado').src="img/"+personajes[indice]+".jpg";
}
//Función usada para mostrar un contador de tiempo de juego 
//que habilitaremos o desactivaremos según nos interese
function contadorReloj() {										
	segundos++;	
	if(segundos=="60") {
		segundos="0";
		minutos++;
		(minutos<10)? minutos="0"+minutos : "";
	}
	if(minutos=="60") {
		minutos="0";
		horas++;
		(horas<10) ? horas="0"+horas : "";
	}
	(segundos<10)?segundos="0"+segundos:"";
	document.getElementById('tiempo').innerHTML=horas+":"+minutos+":"+segundos;
}