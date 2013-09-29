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
				_.bindAll(this);
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
				
				var jsonObjects = JSON.parse(response);
				console.log(jsonObjects);
				debugger;
				var text = '';
				var book ='',
					chapter = '',
					verse = '';

				for(var i = 0; i < jsonObjects.length; i++){
					var object = jsonObjects[i];
					var parsed = jsonObjects[i].text.replace(/<[^>]*>/g,'');					
					if(i ==0){
						book = object.bookname;
						verse += object.verse;
						chapter = object.chapter;
					}
					else if (i == jsonObjects.length-1){
						verse += '-' + object.verse;
					}
					text+= parsed + " ";

				}
				$('.verse-output').addClass('hero-unit');
				var passage = this.model;
				$('#verse_passage').text(book +' ' + chapter +':' + verse);
				$('#passage_output').empty();
				$('#passage_output').html(text);

			},

			getPassageError : function () {
				console.log('error');
			}
		});
	})