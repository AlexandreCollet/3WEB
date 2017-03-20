/**
 * Load Modules
 */

var express = require('express');
var app     = express();

var controller = require('./controller');

/**
 * Variables
 */

var port = 8080;

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

app.use(router);

/**
 * Launch Server
 */

app.listen(port);

console.log('Server is ready on port ' + port);