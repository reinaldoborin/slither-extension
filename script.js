let low = false;

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

document.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        setLowerGraphics();
    }
});


document.body.onmousewheel = zoom;


$("body").append('<select id="select-srv" style="position:fixed;bottom: 120px; right: 20px; z-index:99999999;"><option>Selecione um Server</option></select>');

$("#select-srv").on("change", function (e) {
	const serverIP = e.target.value.split(":");
	forceServer(serverIP[0], serverIP[1])
});

function getServersList() {
	if (window.sos && window.sos.length > 0) {
		var selectSrv = document.getElementById("select-srv");
		$('#select-srv').empty();
		for (var i = 0; i < sos.length; i++) {
			var srv = sos[i];
			var option = document.createElement("option");
			option.value = srv.ip + ":" + srv.po;
			option.text = (i + 1) + ". " + option.value;
			selectSrv.appendChild(option);
		}
	} else {
		setTimeout(getServersList, 100);
	}
	if(window.bso?.ip)
		$("#select-srv").val(window.bso.ip + ":" + window.bso.po);
}

setInterval(() => {
	getServersList();
}, 2000);
