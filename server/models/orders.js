var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
 food: {type: Schema.Types.ObjectId, ref: 'Food'}, 
 cook: {type: Schema.Types.ObjectId, ref: 'Cook'},
 eater: {type: Schema.Types.ObjectId, ref: 'Eater'},
 rating: Number,
});

var Order = mongoose.model('order', orderSchema);