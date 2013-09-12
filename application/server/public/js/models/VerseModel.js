define(['backbone', 'text!config/app_config.json'], function(Backbone, AppConfig) {
	return Backbone.Model.extend({
		urlRoot : JSON.parse(AppConfig).url,
		getUrl: function (success) {			
			return this.urlRoot
			},

		defaults : {
			book : '',
			chapter : '',
			verse : ''
		}

	});
})