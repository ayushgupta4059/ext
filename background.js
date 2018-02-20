chrome.runtime.onMessage.addListener(function (msg, sender) {
	chrome.browserAction.setBadgeText({text: msg.imdbRating});
});