$(document).on("click", function () {
	var title = $('.title-card.is-focused').find('.video-preload-title-label').text();
	if (title != undefined) {
		$.ajax({
			method: "GET",
			url: "https://www.omdbapi.com/?t=" + title + "&apikey=f314717f&plot=short&r=json"
		}).done(function(result){
			chrome.runtime.sendMessage({'imdbRating': result.imdbRating});
		});
	}
});
