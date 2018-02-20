$(document).on("click", function () {
	var title = $('.title-card.is-focused').find('.video-preload-title-label').text();
	var tile  = $('.title-card.is-focused');
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
				chrome.runtime.sendMessage({'imdbRating': result.imdbRating});	

			// show rating on top of movie tile on netflix
			} else {
				var div = '<div class="imdb-rating" style="width: 40px;height: 14px;position: absolute;z-index: 1000;'
					+ 'top: -25px;left: 103px;border-radius: 20px;text-align: center;background: #000;'
					+ 'background-color: #235bc3;">' + result.imdbRating
					+ '<div style="border-left: 4px solid transparent;'
					+ 'border-right: 4px solid transparent;border-top: 8px solid #235bc3;'
					+ 'position: absolute;left: 16px;top: 14px;"></div></div>';
				var parent = tile.closest('.slider-item');
				parent.find('.imdb-rating').remove();
				parent.prepend(div);
			}
		});
	}
});
