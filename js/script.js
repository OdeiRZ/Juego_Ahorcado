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
