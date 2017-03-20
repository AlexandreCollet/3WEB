var mongoose = require('mongoose');

var User = require('./user.js');

module.exports = {

    allInit: function(request, response, next){
        console.log('All init');
        next();
    },

    allAuth: function(request, response, next){
        console.log('All auth');
        next();
    },

    getIndex: function(request,response){
        response.render('index',function(err,html){
            if(err) {
                return response.status(500).send('Error readFile index.html');
            }

            response.send(html);
        });
    },

    getForm: function(request, response){
        response.render('form');
    },

    postForm: function(request, response){
        var user = new User(request.body);

        user.save(function(err, user){
            User.find(function(err, users){
                response.render('formReturn', {persons: users});
            });
        });
    },

    getDelete: function(request, response){
        var id = request.params.id;

        User.findByIdAndRemove(id, function(err, deleted) {
            response.sendStatus(204);
        });
    },

};
