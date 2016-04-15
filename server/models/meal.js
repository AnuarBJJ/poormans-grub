var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mealSchema = new mongoose.Schema({
 name: String,
 image: String,
 description: String,
 price: Number,
 cook: {type: Schema.Types.ObjectId, ref: 'Cooks'},
 orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
});

var Meal = mongoose.model('meal', mealSchema);