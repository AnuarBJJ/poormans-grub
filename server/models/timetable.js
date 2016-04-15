var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var timetableSchema = new mongoose.Schema({
	menu: Object,
	beg: Date,
	end: Date,
	cook: {type: Schema.Types.ObjectId, ref: 'Cooks'}
});

var Timetable = mongoose.model('timetable', timetableSchema);