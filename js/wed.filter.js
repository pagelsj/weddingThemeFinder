// STUPID IE8. :-(
var Wed = (Wed) ? Wed : {};

Wed.filter = (function (Wed, window, jQuery) {
		
		var Filters = (function(){
			var that = this;
			var createFilterOption = function (type) {
				var options = Wed.settings.filters.options[type],
					template = $wed("<div/>").addClass("filter");

				for(var i = 0, l = options.length; i<l;i++){

					var option = options[i],

					roleTemplate = $wed("<span/>").text(option).addClass(option).data("filter-type", type).data("arc-filter"+type, option).on("click", function(){
						if(setFilterOptions(type, this) == -1){
							$wed(this).addClass("selected");
						} else {
							$wed(this).removeClass("selected");
						};

					}).appendTo(template);

				};

				return template;
			},

			setFilterOptions = function (filter, elem) {
				var val = $wed(elem).data("arc-filter"+filter)
				var index = (Wed.settings.filters.selected[filter])? Wed.settings.filters.selected[filter].indexOf(val) : -1;

				if(index == -1){
					Wed.settings.filters.selected[filter].push(val);
				} else {
					Wed.settings.filters.selected[filter].splice(index, 1);
				}
				Wed.settings.filters.selected[filter+"Class"] = Wed.settings.filters.selected[filter].toString().replace(/,/g, " ");

				console.groupCollapsed("FILTER SELECTED");
					console.log("INDEX: ", index);
					console.log("FILTER: ", filter);
					console.log("VAL: ", val);
					console.log("FILTER: ", Wed.settings.filters.selected[filter]);
					console.log("FILTERCLASS: ", Wed.settings.filters.selected[filter+"Class"]);
				console.groupEnd();
				
				updateResults.elem = elem;

				that.onFilterChange(updateResults);
				return index;
			
			};


			this.buildFilters = function (elem, type) {
				console.log("elem", elem);
				console.log("type", type);
				$wed(elem).empty().append(createFilterOption(type));
			};

			this.onFilterChange = function (cb) {
				var that = this;
					that.values = {},
					elem = this.elem,
					filterType = $wed(elem).data("filter-type");

					selectedFiltersObj = {
						colors:Wed.settings.filters.selected.colors,
						roles:Wed.settings.filters.selected.roles
					};
//				for (p in selectedFiltersObj) {
					that.values = selectedFiltersObj;
					//selectedFiltersObj.watch(p, function (prop, oldVal, newVal) {
						that.values[filterType] = $wed(elem).data("arc-filter"+filterType);
						cb.call(this, that.values);
					//});
//				};
			};





			var updateResults = function(selectedFilters){

				console.log("This is a test!", this);

				var productContainer = "#wctfProducts",
					productsList = Wed.settings.productData,
					newPL = [],
					colorReg = (selectedFilters.colors && selectedFilters.colors.length) ? new RegExp("^"+selectedFilters.colors.toString().replace(/,/g, "|")+"$") : new RegExp(""),
					roleReg = (selectedFilters.roles && selectedFilters.roles.length) ? new RegExp("^"+selectedFilters.roles.toString().replace(/,/g, "|")+"$") : new RegExp("");

				console.log("colorReg" + colorReg);
				console.log("roleReg" + roleReg);
				if(Wed.settings.filters.selected.roles.length > 0 || Wed.settings.filters.selected.colors.length > 0) {
					Wed.main.displayCount = 0;
					
					//for(var p in productsList){
						//console.log("colorReg.test(productsList[p].attributes.COLOR", colorReg.test(productsList[p].attributes.COLOR));
						//console.log("colorReg.test(productsList[p].attributes.ROLE", colorReg.test(productsList[p].attributes.ROLE));
					for(var p = 0, l = productsList.length; p<l;p++) {
						//console.log("colorReg.test(productsList[p].attributes.COLOR"+ colorReg.test(productsList[p].attributes.COLOR);
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


			return this;

		});

	return Filters;

})(Wed, window, jQuery);