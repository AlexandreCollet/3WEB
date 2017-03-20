var fs = require('fs');

fs.readFile(process.argv[2], function(err,fileBuffer){

	var fileContent = fileBuffer.toString();
	var lines       = fileContent.split('\n');

	console.log(lines.length - 1);

});