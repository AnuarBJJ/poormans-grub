var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cookSchema = new mongoose.Schema({
	name: String,
	pic: String,
	address: String,
	lat: Number,
	lng: Number,
	shifts: [{type: Schema.Types.ObjectId, ref: 'Timetable'}],
	meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
});

var Cook = mongoose.model('cook', cookSchema);