var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mealSchema = new mongoose.Schema({
_cook: {type: Schema.Types.ObjectId, ref: 'Cook'},
 name: String,
 image: String,
 description: String,
 price: Number
 // orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
});

var Meal = mongoose.model('meal', mealSchema);