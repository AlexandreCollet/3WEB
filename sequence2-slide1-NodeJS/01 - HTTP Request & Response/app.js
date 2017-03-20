/**
 * Load Modules
 */

var http = require('http');

/**
 * Variables
 */

var port = 8080;

/**
 * Create Server
 */


var server = http.createServer(function(request, response) {

    /**
     * GET /form
     */

    if(request.url === "/form" && request.method === "GET") {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write("<!doctype html>");
        response.write("<html><body>");
        response.write("<form method='POST' action='/completed'>");
        response.write("<input type='text' name='data1'/>");
        response.write("<input type='text' name='data2'/>");
        response.write("<input type='text' name='data3'/>");
        response.write("<input type='text' name='data4'/>");
        response.write("<input type='submit' value='Send'/>");
        response.end("</form></body></html>");
    }

    /**
     * POST /completed
     */

    else if(request.url === "/completed" && request.method === "POST") {
        var body  = "";

        request.on('data', function(chunck) {
            body += chunck;
        });

        request.on('end', function() {
            response.end(body + '\n\n');
        });
    }

    /**
     * OTHER
     */

    else {
        response.writeHead(403);
        response.end('Forbidden');
    }


});

server.listen(port);

console.log('Server is ready on port ' + port);
