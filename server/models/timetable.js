var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var timetableSchema = new mongoose.Schema({
	menu: Object,
	beg: Date,
	end: Date,
	cook: {type: Schema.Types.ObjectId, ref: 'cook'}
});

var Timetable = mongoose.model('timetable', timetableSchema);