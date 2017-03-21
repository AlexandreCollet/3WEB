/**
 * Load Modules
 */

var express = require('express');
var app = express();

var path = require('path');
var http = require('http').createServer(app);

var morgan  = require('morgan');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

/**
 * Variables
 */
  
var port = 8080;

/**
 * Set view engine & public folder
 */

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middlewares
 */

//Morgan
app.use(morgan('dev'));

//BodyParser
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Routing
 */

var router = express.Router();

router.route('/').get(function(request, response){
  response.render('index');
});

app.use(router);

/**
 * SOCKET IO 
 */

var messages = [];
var usernames = [];

io.sockets.on('connection', function(socket){
    
    socket.on('login', function(username){
        if(usernames.indexOf(username) !== -1) return;

        socket.username = username;
        usernames.push(username);

        socket.emit('connected', username);

        messages.forEach(function(message){
            socket.emit('message', message.username, message.body, message.date);
        });

        console.log(socket.username + ' is connected');
    });   

    socket.on('message',function(body){
        var message = {
            username : socket.username,
            body     : body,
            date     : new Date()
        }

        messages.push(message);

        socket.broadcast.emit('message', message.username, message.body, message.date);

        console.log(socket.username + ' : ' + body);
    })

    socket.on('disconnect', function(){
        if(!socket.username) return;

        usernames.splice(usernames.indexOf(socket.username), 1);

        console.log(socket.username + ' is disconnected');
    });

});

/**
 * Launch Server
 */

http.listen(port);

console.log('Server is ready on port ' + port);