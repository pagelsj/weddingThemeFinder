// STUPID IE8. :-(
var Wed = (Wed) ? Wed : {};

Wed.main = (function (Wed, window, jQuery) {
		//Wed.settings = new Wed.settings;
		Wed.main = {
			
			init : function () {
				var selectedFiltersObj = Wed.settings.filters.selected;

				

				new Wed.products.createProductsList(preloadAllImages);

				var filter = new Wed.filter;
					filter.buildFilters("#filterroles", "roles");
					filter.buildFilters("#filtercolors", "colors");

					// LETS UPDATE THE VIEW EVERYTIME THE FILTER CHANGES SHALL WE
					//filter.onFilterChange(updateResults);
			}
		};

		var preloadAllImages = function () {
			var helper = new Wed.helpers;
			console.log('preloadAllImages', preloadAllImages);

			for (p in Wed.settings.productDataDisplay) {
				helper.imageLoader(Wed.settings.productDataDisplay[p].images[1].url);
			}
		};

		var updateResults = function(selectedFilters){

			console.log("This is a test!");

			var productContainer = "#wctfProducts",
				productsList = Wed.settings.productData,
				newPL = [],
				colorReg = (selectedFilters.colors.length) ? new RegExp("^"+selectedFilters.colors.toString().replace(/,/g, "|")+"$wed") : new RegExp(""),
				roleReg = (selectedFilters.roles.length) ? new RegExp("^"+selectedFilters.roles.toString().replace(/,/g, "|")+"$wed") : new RegExp("");

			console.log("Wed.settings.filters.selected.colors.length" + Wed.settings.filters.selected.colors.length);
			if(Wed.settings.filters.selected.roles.length > 0 || Wed.settings.filters.selected.colors.length > 0) {
				Wed.main.displayCount = 0;
				
				for(var p in productsList){
				//for(var p = 0, l = productList.length; p<l;p++) {
					console.log("colorReg" + colorReg);
					console.log("productsList[p].attributes.ECMC_PROD_WEDDING_COLOUR_41");
					console.log(productsList[p].attributes.ECMC_PROD_WEDDING_COLOUR_41);
					//console.log("colorReg.test(productsList[p].attributes.ECMC_PROD_WEDDING_COLOUR_41"+ colorReg.test(productsList[p].attributes.COLOR);
					if(colorReg.test(productsList[p].attributes.ECMC_PROD_WEDDING_COLOUR_41) && roleReg.test(productsList[p].attributes.ECMC_PROD_WEDDING_PERSON_41)){
						newPL.push(productsList[p]);
					}	
				};
				Wed.products.pageSize = newPL.length;
				Wed.settings.productDataDisplay = newPL;
				
				$wed(".showMoreResults").hide();

			} else {
				Wed.products.pageSize = Wed.settings.defaultPageSize;
				Wed.settings.productDataDisplay = Wed.settings.productData;
				$wed(".showMoreResults").show();

			}
			Wed.products.displayCount = 0;
		
			$wed(productContainer).empty();
					
			Wed.products.buildProductList(productContainer); 
		};
	
	return Wed.main;
})(Wed, window, jQuery);