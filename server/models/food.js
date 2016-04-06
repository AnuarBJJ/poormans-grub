var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var foodSchema = new mongoose.Schema({
 name: String,
 pic: String,
 cook: {type: Schema.Types.ObjectId, ref: 'Cooks'},
 orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
});

var Food = mongoose.model('food', foodSchema);