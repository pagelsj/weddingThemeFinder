module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			options: {
				compress: {
					drop_console: false
				},
				beautify 			: false,
				preserveComments 	: true
			},
			my_target: {
				files: {
					'./js/wed.main.min.js' : [
						"js/vendors.js",
						"js/es6.js",
						"js/wed.settings.js",
						"js/wed.main.js",
						"js/wed.helpers.js",
						"js/wed.filter.js",
						"js/wed.products.js"
					]
				}
			}
		}




	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);

}