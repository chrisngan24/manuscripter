define([
	'backbone',
	'AppContext',
	'router/AppRouter' ], 
	function(Backbone, AppContext, AppRouter) {
		return {
			initialize : function () {
				
				var appRouter = new AppRouter({
					context : AppContext
				});

				// Backbone.History.start();
			}
		};
	}
)