define([
	'backbone', 
	'jquery',	
	'text!main/templates/MainViewTemplate.tpl.html',
	'verse/views/VerseInput',
	'models/VerseModel'
	], function (Backbone, $, MainViewTemplate, VerseInput, VerseModel) {
	return Backbone.View.extend({

		initialize : function (options) {			
			this.template = _.template(MainViewTemplate);
			this.context = options.context;
			return this;
		},
			

		render: function () {			
			$(this.el).append(this.template);
			this.showVerseInput('#verse_input');
		},

		showVerseInput : function (element) {
			this.verseModel = new VerseModel();
			this.verseInput = new VerseInput({
				el: element,
				model: this.verseModel,
				context : this.context
			});
			this.verseInput.render();
		}
	});
})