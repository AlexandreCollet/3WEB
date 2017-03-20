var fs = require('fs');
var path = require('path');

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
        var file_path = path.join(__dirname, '/index.html');
        response.sendFile(file_path, function(err){
            console.log('index.html sended.');
        });
    },

    getForm : function(request,response){
        var file_path = path.join(__dirname, '/form.html');
        response.sendFile(file_path, function(err){
            console.log('form.html sended.');
        });
    },

    postForm : function(request,response){
        response.json({result: "Success"});
    },

}
