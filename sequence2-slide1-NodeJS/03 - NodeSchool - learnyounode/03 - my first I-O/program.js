var fs = require('fs');

var fileBuffer  = fs.readFileSync(process.argv[2]);
var fileContent = fileBuffer.toString();
var lines       = fileContent.split('\n');

console.log(lines.length - 1);