chrome.storage.local.get(null, function(output){
	if (output["enabled"] == undefined || output["enabled"] == null || output["enabled"] == "true") {
		var s = document.createElement('script');
		s.src = chrome.extension.getURL('jquery.min.js');
		s.onload = function() {
			var s = document.createElement('script');
			s.src = chrome.extension.getURL('script.js');
			s.onload = function() {
				this.parentNode.removeChild(this);
			};
			(document.head || document.documentElement).appendChild(s);
		};
		(document.head || document.documentElement).appendChild(s);
	}
});