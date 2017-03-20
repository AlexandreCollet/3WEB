var http = require('http');

var url = process.argv[2];

http.get(url,function(response){

	response.setEncoding('utf8');

	datas = "";

	response.on('data',function(data){
		datas += data;
	});

	response.on('end',function(){
		console.log(datas.length);
		console.log(datas);
	})

});