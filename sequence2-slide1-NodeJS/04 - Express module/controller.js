var fs = require('fs');

module.exports = {

    allInit : function(request,response,next){
        console.log('All init');
        next();
    },

    allAuth : function(request,response,next){
        console.log('All auth');
        next();
    },

    getIndex : function(request,response){

        fs.readFile('index.html',function(err,data){

            if(err){
                response.statusCode = 500;
                response.end('Error readFile index.html');
            }

            else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }

        });

    },

    getForm : function(request,response){

        fs.readFile('form.html',function(err,data){

            if(err){
                response.statusCode = 500;
                response.end('Error readFile form.html');
            }

            else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }

        });

    },

    postForm : function(request,response){

        response.writeHead(200, {'Content-Type': 'application/json'});

        response.end(JSON.stringify({
            result : "Success"
        }));

    },

}