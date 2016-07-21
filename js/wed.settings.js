// STUPID IE8. :-(
var Wed = (Wed) ? Wed : {};

Wed.settings = (function (Wed, window, jQuery) {
	
	var Settings = (function () {
		var that = this;
		
		//this.apiUri = "https://prod.api.arcadiagroup.co.uk/api/bhuk/product?apiKey=9a5bd03e-a87a-4126-9972-21e7c477b44d&category=471109,2831991&jsonp_callback=?&pageSize=200";
		//this.apiUri = "http://bhuk.stage.arcadiagroup.ltd.uk/13077_category_2831991_2848991.js?jsonp_callback=?";
		
		this.apiUri = ["http://bhuk.stage.arcadiagroup.ltd.uk/13077_category_2831991_2848991.js", "http://bhuk.stage.arcadiagroup.ltd.uk/13077_category_2831991_2849491.js"];
		
		//this.apiUri = ["/wctf/stub/stub.productData.json", "/wctf/stub/stub.productData2.json"];

		this.filters = {
			selected : {
				roles 		: [],
				colors 		: [],
				rolesClass 	: "",
				colorsClass : ""
			},
			options : {
				roles 	: ["Bridesmaid", "TeenBridesmaids", "FlowerGirl", "Groom", "Usher", "Pageboy"],
				colors 	: ["Navys", "Blues", "MintGreenandGreens", "Purples", "Pinks", "Reds", "Silver", "IvoryandCreamandWhite", "Yellows"]
			}
		};
		this.productData = [];
		this.defaultPageSize = 20;
		this.concurrentImageLoads = 40;
		this.noProductsMsg = "Unfortunately the colour you have selected is currently out of stock. Why not try a different shade and create a mix-and-match theme? Totally on-trend for 2016."

		return this;
	
	});

	return new Settings

})(Wed, window, jQuery);