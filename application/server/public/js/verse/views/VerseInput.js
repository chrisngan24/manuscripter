define([
	'backbone', 
	'jquery',
	'typeahead',
	'text!verse/templates/VerseInputTemplate.tpl.html',
	'text!data/Books.json'	
	], 
	function (Backbone, $,  Typeahead, VerseInputTemplate, Books) {
		return Backbone.View.extend({
			initialize : function(options){
				this.template = _.template(VerseInputTemplate);
				this.context = options.context;
				return this;
			},

			render : function (options){
				$(this.el).append(this.template);				
				$('#passage_book').typeahead({
					source : JSON.parse(Books).books 
				});
				
			},

			events: {
				'click #passage_submit' : 'getPassage'			
			},			

			getPassage : function () {								
				var book= $('#passage_book').val();
				var chapter= $('#passage_chapter').val();
				var verses= $('#passage_verse').val();
				this.model.set({
					'book' : book,
					'chapter': chapter,
					'verse': verses
				});
				this.context.getVerseService().getPassage(this.model, this.getPassageSuccess, this.getPassageError );
			},

			getPassageSuccess : function (response) {
				
				jsonObjects = JSON.parse(response);
				var text = '';
				for(var i = 0; i < jsonObjects.length; i++){
					var parsed = jsonObjects[i].text.replace(/<[^>]*>/g,'');					
					text+= parsed + " ";
				}
				$('.verse-output').addClass('hero-unit');
				$('#passage_output').empty();
				$('#passage_output').html(text);

			},

			getPassageError : function () {
				console.log('error');
			}
		});
	})