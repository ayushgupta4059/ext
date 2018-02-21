$(document).on('click', '.slider-item', function () {
	var title = $(this).find('.video-preload-title-label').text();
	var element = $(this);
	var manifest = chrome.runtime.getManifest();
	if (title != undefined) {
		$.ajax({
			method: "GET",
			url: "https://www.omdbapi.com/?t=" + title + "&apikey=f314717f&plot=short&r=json"
		}).done(function(result){
			if (result.imdbRating == undefined)
				result.imdbRating = 'N/A';

			// show rating on extension as badge
			if (manifest.type.badge == 1) {
				chrome.runtime.sendMessage({'badge': 1, 'imdbRating': result.imdbRating});	

			// show rating on top of movie tile on netflix
			} else {
				chrome.runtime.sendMessage({'title': title});
				var div = '<div class="imdb-rating" style="width: 103px;position: absolute;z-index: 1000;'
					+ 'top: -49px;left: 80px;border-radius: 5px;text-align: center;background: #000;'
					+ 'background-color: #235bc3;padding: 4px;">IMDB rating - ' + result.imdbRating
					+ '<div style="border-left: 4px solid transparent;'
					+ 'border-right: 4px solid transparent;border-top: 8px solid #235bc3;'
					+ 'position: absolute;left: 52px;top: 41px;"></div></div>';
				element.find('.imdb-rating').remove();
				element.prepend(div);
			}
		});
	}
});

chrome.runtime.onMessage.addListener(function (msg, sender) {
	var response = msg.response.items;
	var result;
	for (var i = 0; i < 5; i++) {
		var title = response[i].snippet.title;

		if (title.indexOf("trailer") != -1 || title.indexOf("Trailer") != -1) {
			result = response[i];
			if (title.indexOf(msg.title) != -1) {
				break;	
			}
		}
	}
	var html = '<a style="display: block;text-decoration: underline;margin-bottom: 3px;" target="_blank" href="https://www.youtube.com/watch?v=' + result.id.videoId + '">Watch Trailer</a>';
	$('.title-card.is-focused').closest('.title-card-container').siblings('.imdb-rating').prepend(html);
});
