define(['backbone', 
	'main/views/MainView',	
	'main/views/MainNavbar'], 
	function (
		Backbone,
		MainView,		
		MainNavbar
		) {
		return Backbone.Router.extend({
			
			initialize : function(options){
				this.context = options.context;
				// that = this;
				console.log('foo');
				
				Backbone.history.start();
			},

			routes: {
				'' : 'showMain'
				// 'test': 'showTest'
			},

			showMain : function  () {
				this.navBar = new MainNavbar({
					el : '#main_navbar'
				});
				this.mainView = new MainView({
					el : '#main_content',
					context : this.context
				});
				this.mainView.render();
			}


			
		})

})