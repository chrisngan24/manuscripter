var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
    app.use(express.static(__dirname + '/static'));

    app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	//app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
    app.use(allowCrossDomain);
});


app.get('/', routes.index);


app.get('/api/verse*', function (request, response){  
  console.log(request.query);
  console.log("Response \n");
  // console.log(response);
  // console.log(response.body);
  var query = request.query;
  var reqPath = '/api/?passage=' + 
        query.book.split(' ').join('%20') + 
        '%20' + 
        query.chapter + 
        ':' + 
        query.verse + 
        '&type=json';

  var options = {
    host: 'labs.bible.org',
    path: reqPath,    
  };
  console.log(options);

  callback = function(res) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    res.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    res.on('end', function () {
      //console.log(str);
      response.end(str);
    });

    res.on('error', function(error) {
        console.log('error')
    });
  }

  http.request(options, callback).end();
});

app.get('/api/v1/?*', function (request, response){	
	//console.log(request);

	var options = {
    host: 'labs.bible.org',
    path: request.originalUrl,    
  };

  callback = function(res) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    res.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    res.on('end', function () {
      //console.log(str);
      response.end(str);
    });

    res.on('error', function(error) {
        console.log('error')
    });
  }

  http.request(options, callback).end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));  
});