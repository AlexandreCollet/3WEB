var myModule = require('./module');

var folder = process.argv[2];
var ext    = process.argv[3];

myModule(folder,ext,function(err,files){

	files.forEach(function(file){
		console.log(file);
	})

})