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
        response.render('index');
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

    getUsers: function(request, response){
        var since = new Date(0);

        if(request.query.since) {
            since = new Date(parseInt(request.query.since));
        }

        User.find()
            .where('created').gt(since)
            .sort('-created')
            .exec(function(err, users){
                console.log(users);
                response.json(users);
            });
    },

};
