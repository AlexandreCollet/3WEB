var http = require('http');
var url  = require('url');

var port = Number(process.argv[2]);

var server = http.createServer(function(request,response){

	var requestedURL = url.parse(request.url,true);
	var date         = new Date(requestedURL.query.iso);

	if(requestedURL.pathname == '/api/parsetime'){
		response.writeHead(200,{ 'Content-Type' : 'application/json' });
		response.write(JSON.stringify({
			'hour'   : date.getHours(),
			'minute' : date.getMinutes(),
			'second' : date.getSeconds()
		}));
	}

	else if(requestedURL.pathname == '/api/unixtime'){
		response.writeHead(200,{ 'Content-Type' : 'application/json' });
		response.write(JSON.stringify({
			'unixtime' : date.getTime()
		}));
	}

	else{
		response.statusCode = 500;
	}
	
	response.end();

});

server.listen(port);
