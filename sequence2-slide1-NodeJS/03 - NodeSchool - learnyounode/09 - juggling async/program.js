var http = require('http');

/**
 * Init variables
 */

var urls   = []
var datas  = [];
var ended  = 0;
var nbUrls = process.argv.length - 2;

for(var i=2,l=process.argv.length;i<l;i++)
	urls[i-2] = process.argv[i];

/**
 * Main
 */

for(var i=0;i<nbUrls;i++)
	httpGet(i);

/**
 * Init Functions
 */

function httpGet(id){

	var url = urls[id];

	http.get(url,function(response){

		response.setEncoding('utf8');

		datas[id] = "";

		response.on('data',function(data){
			datas[id] += data;
		});

		response.on('end',function(){
			ended++;
			if(ended !== nbUrls) return;
			printResults();
		});
	});
}

function printResults(){

	for(var i=0;i<nbUrls;i++)
		console.log(datas[i]);
}