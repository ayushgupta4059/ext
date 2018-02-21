chrome.runtime.onMessage.addListener(function (msg, sender) {
	if (msg.badge == 1)
		chrome.browserAction.setBadgeText({text: msg.imdbRating});
});

chrome.runtime.onMessage.addListener(function (msg, sender) {
	if (msg.title != undefined) {
		var request = gapi.client.request({
			method: 'GET',
			path: '/youtube/v3/search',
			params: {
				part: 'snippet',
	            type: 'video',
	            q: msg.title + ' trailer',
	            maxResult: 5,
	            order: 'viewCount'
			}
		});

		request.execute(function (response) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			    var activeTab = tabs[0];
			    chrome.tabs.sendMessage(activeTab.id, {'response': response, 'title': msg.title});
			});
		});
	}
});

function init () {
	gapi.client.setApiKey('AIzaSyAdToc91_oFiu3ZHZyiNwqyc0qF7dxZ3Cs');
	gapi.client.load('youtube', 'v3', function () {
		// api ready
	});
}

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://apis.google.com/js/client.js?onload=init";
head.appendChild(script);