// STUPID IE8. :-(
var Wed = (Wed) ? Wed : {};

Wed.products = (function (Wed, window, jQuery) {
		
		var Products = (function(){
			var that = this;

			this.displayCount = 0;
			this.pageSize = Wed.settings.defaultPageSize;
			this.createProductsList = function (cb) {
				// NEED TO REMOVE THE SPACE IN THE DEFAULT MARKUP - SILLY ECMC. :-(
				$wed("#wctfProducts").empty();

				for(var i = 0, l = Wed.settings.apiUri.length; i<l; i++){
					that.loadData(Wed.settings.apiUri[i], cb, (i==0));
				}

			};

			this.loadData = function (uri, cb, firstLoad) {
				$wed.ajax({
					url:uri,
					type: "GET",
					async: false,
					contentType: "application/jsonp",
					dataType: "text",
					success : function (data) {
						
						// NEED TO PARSE THE DATA BEACAUSE WE REQUESTING TXT DATATYPE. (JS FILE EXTENSION)
						data = JSON.parse(data);

						data.productSet = Wed.helpers().cleanData(data.productSet);
						
						// AND NOW I FEEL DIRTY
						for(var p = 0, pl = data.productSet.length; p<pl;p++){
							Wed.settings.productData.push(data.productSet[p]);
						}

						Wed.settings.productDataDisplay = Wed.settings.productData;
						
						if(firstLoad){
							that.buildProductList("#wctfProducts");
							that.showMore("#wctfProducts");
							cb;
						}
					}
				});
			}


			this.buildProductList = function (elem) {
				

				var productData = Wed.settings.productDataDisplay,
					showCount = this.displayCount + this.pageSize;
				
				console.log("this.displayCount", this.displayCount);
				console.log("showCount", showCount);
				if(showCount == 0){
					$wed(elem).html("<p class='error'>" + Wed.settings.noProductsMsg + "</p>");
					return;
				};
				
				if(showCount > productData.length) {
					showCount = productData.length;
					$wed(".showMoreResults").hide();
				}
				//showCount = (showCount > productData.length) ? productData.length : showCount;

				for (; this.displayCount < showCount; this.displayCount++){
					//if(p.length % 2 == 0) productData[p].images[1].url = productData[p].images[1].url.replace("media", "www");

					$wed(elem).append(that.buildProductTile(productData[this.displayCount]));
					//that.displayCount++;
				};
			};

			this.buildProductTile = function (product) {
				var tile = $wed("<div/>");
				
				
				var image = $wed("<img/>")
					.attr("src", product.images[1].url);
				
				var productLabel = $wed("</p>")
					.text(product.name);

				var productNowPrice = $wed("</p>")
					.addClass("nowPrice")
					.html("From &pound;" + product.unitPrice);

				tile.addClass("productTile")
					.data("productId", product.id)
					.append(image)
					.append(productLabel)
					.append(productNowPrice);
				console.log("product", product);
				for(a in product.attributes){
					console.log("product.attributes[a]", product.attributes[a]);
					product.attributes[a] = product.attributes[a];
					$wed(tile).addClass(product.attributes[a]);
				};

				return tile;
			};
			this.showMore = function (elem) {
				var showMore = $wed("<div/>")
					.addClass("showMoreResults")
					.append($wed("<a/>")
						.text("Show more")
						.on("click", function () {
							that.buildProductList(elem);
						})
					).insertAfter(elem);

			};

			return this;
	
		})();

	return Products;

})(Wed, window, jQuery);