var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cookSchema = new mongoose.Schema({
	name: String,
	pic: String,
	address: Object,
	lat: Number,
	lng: Number
});

var Cook = mongoose.model('cook', cookSchema);