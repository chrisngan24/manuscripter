define(['text!config/app_config.json', 'services/VerseService'], 
	function(AppConfig, VerseService) {
		return {
			dev_config : function() {
				return JSON.parse(AppConfig);
			},

			getVerseService : function() {
				if(!this.verseService)
					this.verseService = new VerseService();
				return this.verseService;
			}

		};

	}
)