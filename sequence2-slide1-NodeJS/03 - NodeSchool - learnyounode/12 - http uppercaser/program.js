var http = require('http');

var port = Number(process.argv[2]);

var server = http.createServer(function(request,response){

	if(request.method != "POST"){
		response.statusCode = 500;
		response.end();
	}

	else{

		var body = "";

		request.on('data',function(chunck){
			body += chunck;
		});

		request.on('end',function(){
			response.write(body.toUpperCase());
			response.end();
		})

	}

});

server.listen(port);
