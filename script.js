// Variavéis.

let low = false;

// Funções.
function zoom(e) {
	if (!window.gsc) 
		return;
	window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
	window.gsc > 2 ? window.gsc = 2 : window.gsc < 0.1 ? window.gsc = 0.1 : null;
}

function setLowerGraphics() {
    low = !low;
	if (low == true) {
		setBackground('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQYBigs0bXWaQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADUlEQVQI12P4//8/AwAI/AL+XJ/P2gAAAABJRU5ErkJggg==');
		render_mode = 1;
	} else {
        setBackground();
		render_mode = 2;
	}
}

function setBackground(url = '/s/bg45.jpg') {
	ii.src = url;
}


function setNickname() {
    var nick = document.getElementById("nick").value;
    window.localStorage.setItem("nick", nick);
}

// Recupera a lsita de servidor.
getServersList = (function getServersList() {
	if (window.sos && window.sos.length > 0) {
		var selectSrv = document.getElementById("select-srv");
		$('#select-srv').empty();
		$('#select-srv').append("<option>Selecione um Server</option>");
		for (var i = 0; i < sos.length; i++) {
			var srv = sos[i];
			if(srv.ip.includes("185")){ // Servers brasileiros.
				var option = document.createElement("option");
				option.value = srv.ip + ":" + srv.po;
				option.text = (i + 1) + ". " + option.value;
				selectSrv.appendChild(option);
			}
		}
	} else {
		setTimeout(getServersList, 100);
	}
	if(window.bso?.ip)
		$("#select-srv").val(window.bso.ip + ":" + window.bso.po);
})();


// Adiciona ao Body o select de servidor.
$("body").append('<select id="select-srv" style="position:fixed;bottom: 120px; right: 20px; z-index:99999999;"><option>Selecione um Server</option></select>');

// Ao selecionar um servidor no select, força ele.
$("#select-srv").on("change", function (e) {
	if(e.target.value != undefined && e.target.value != null){
		const serverIP = e.target.value.split(":");
		forceServer(serverIP[0], serverIP[1])
	}
});

// Recupera a lista de servidores a cada 5 segundos.
setInterval(() => {
	getServersList;
}, 5000);

// Scroll do mouse ativa o zoom.
document.body.onmousewheel = zoom;
// Houve os eventos de pressionar teclas.
document.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) { // ENTER.
        setLowerGraphics();
    }
});
// Salva o nick utilizado.
document.getElementById("nick").addEventListener("input", setNickname, false);


// Libera skins?
window.localStorage.setItem ('edttsg', '1');



if (window.localStorage.getItem("nick") != null) {
	var nick = window.localStorage.getItem("nick");
	document.getElementById("nick").value = nick;
}