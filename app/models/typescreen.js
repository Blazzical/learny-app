// app/models/typescreen

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Typescreen', {
	wordfileurl : String,
	typetext : String,
	time : Float,
	done : Boolean
});