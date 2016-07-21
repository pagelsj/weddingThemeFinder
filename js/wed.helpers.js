var Wed = Wed || {};

Wed.helpers = (function (Wed, window, jQuery) {
		
		var Helpers = (function(){

			this.imageLoader = (function () {
				var that = this,
					throttle = Wed.settings.concurrentImageLoads,
					queue = [],
					currentIndex = 0,
					loadingCount = 0;
				
				var loadimage = function (productIndex) {
					var productIndex = productIndex,

						image = new Image();
						image.src = queue[productIndex].img;

						image.onload = function () {
							that.loadNext(loadingCount--);
						};
				};

				this.init = function (imgSrc, elem) {
					queue.push({img : imgSrc});
					that.loadNext();
				};

				this.loadNext = function () {
					if (loadingCount <= throttle && currentIndex != queue.length) {
						new loadimage(currentIndex);
						currentIndex++;
						loadingCount++;
					};
				};

				return this.init;
			})();

			this.cleanData = function (data) {
				for(var i in data) {
					for (var a in data[i].attributes) {
						data[i].attributes[a] = data[i].attributes[a].replace(/ /g, "");
					}
				}
				return data;
			}

			return this;

		});

	return Helpers;

})(Wed, window, jQuery);