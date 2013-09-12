define([], function(){
		function VerseService() {};
		// VerseService.prototype.getPassage = function (verse, success, error){
			
		// 	$.ajax({
		// 		type: 'GET',
		// 		contentType :'JSON',
		// 		url : verse.getUrl(success.name),
		// 		success : success,
		// 		error : error
		// 	});
					
		// };

		VerseService.prototype.getPassage = function (verse, success, error){			
			$.ajax({
				type: 'GET',
				contentType :'JSON',
				url : verse.getUrl(success.name),
				data: verse.attributes,
				success : success,
				error : error
			});
					
		};

		return VerseService;
});