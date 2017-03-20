/**
 * Load Modules
 */

var express = require('express');
var app     = express();

var path = require('path');

var morgan     = require('morgan');
var session    = require('cookie-session');
var bodyParser = require('body-parser');

var controller = require('./controller');

/**
 * Variables
 */

var port = 8080;

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

//Cookie-session
app.use(session({
    name: 'session',
    keys : ['key1', 'key2']
}));

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