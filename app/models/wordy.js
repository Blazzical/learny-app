// app/models/wordy.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WordySchema   = new Schema({
    actualword: String,
	submittedword: String,
	timetaken: Number
});

WordySchema.methods.isCorrect = function() {
	if(actualword == submittedword) {
		return true;
	} else {
		return false;
	}
};

module.exports = mongoose.model('Wordy', WordySchema);