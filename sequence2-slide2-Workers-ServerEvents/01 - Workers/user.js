var mongoose = require('mongoose');

/**
 * Schema
 */

var schema = new mongoose.Schema({

	firstname : {type: String, required: true},
	lastname : {type: String, required: true},

	created : {type: Date, default: Date.now},
	modified : {type: Date, default: Date.now},

});

/**
 * Model
 */

var User = mongoose.model('User', schema);

/**
 * Export
 */

module.exports = User;
