var express = require('express');
var app = express();

var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var controller = require('./controller');

/**
 * Variables
 */

var port = 8080;
var db_host = 'localhost';
var db_name = '3WEB';

/**
 * Database connection
 */

mongoose.connect(db_host, db_name);

var db = mongoose.connection;

db.on('error', function(){console.log('connection error')});
db.once('open', function(){console.log('connection open')});

/**
 * Set view engine
 */

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

/**
 * Middlewares
 */

//Morgan
app.use(morgan('dev'));

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routing
 */

var router = express.Router();

router.route('*')
    .all(controller.allInit);
router.route('/auth/*')
    .all(controller.allAuth);
router.route('^(/|/index)$')
    .get(controller.getIndex);
router.route('/form')
    .get(controller.getForm)
    .post(controller.postForm);
router.route('/delete/:id')
    .all(controller.getDelete);

app.use(router);

/**
 * Launch Server
 */

app.listen(port);

console.log('Server is ready on port ' + port);
