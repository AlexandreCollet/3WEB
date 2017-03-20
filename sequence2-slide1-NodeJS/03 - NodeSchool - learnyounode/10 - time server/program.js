var net    = require('net');
var port   = Number(process.argv[2]);
var server = net.createServer(function(socket){

	socket.write(getDateString());
	socket.end('\n');

});

server.listen(port);


function getDateString(){

	var date = new Date();

	var year   = date.getFullYear();
	var month  = zeroFill(date.getMonth()+1);
	var day    = zeroFill(date.getDate());
	var hour   = zeroFill(date.getHours());
	var minute = zeroFill(date.getMinutes());


	return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

function zeroFill(i){
	return ( i<10 ? "0" : "" ) + i;
}