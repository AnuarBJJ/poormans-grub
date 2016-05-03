var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cookSchema = new mongoose.Schema({
	name: String,
	pic: String,
	address: String,
	lat: Number,
	lng: Number,
	meals: [{type: Schema.Types.ObjectId, ref: 'meal'}],
	shifts: [{type: Schema.Types.ObjectId, ref: 'timetable'}]
	
});

var Cook = mongoose.model('cook', cookSchema);