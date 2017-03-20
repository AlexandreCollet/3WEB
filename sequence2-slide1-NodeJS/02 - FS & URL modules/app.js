/**
 * Load Modules
 */

var http = require('http');
var fs = require('fs');
var url = require('url');

/**
 * Variables
 */

var port = 8080;

/**
 * Create Server
 */


var server = http.createServer(function(request, response) {

    var parsedURL = url.parse(request.url, true);

    /**
     * GET /form
     */
    if(parsedURL.pathname === "/form" && request.method === "GET") {
        fs.readFile('form.html', function(err, data) {
            if(err){
                response.statusCode = 500;
                response.end('Error readFile form.html');
                return;
            }

            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }

    /**
     * POST /completed
     */

    else if(parsedURL.pathname === "/completed" && request.method === "POST") {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(parsedURL));
    }

    /**
     * OTHER
     */

    else {
        response.statusCode = 403;
        response.end('Forbidden');
    }


});

server.listen(port);

console.log('Server is ready on port ' + port);
