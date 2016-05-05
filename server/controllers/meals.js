var mongoose = require('mongoose');

var Meal = mongoose.model('meal');

var Cook = mongoose.model('cook');

module.exports = (function(){
	return {
		getAll: function(req, res){

			Meal.find({}, function(err, result){
			   if(err) {
		         console.log(err);
		       } else {
		         res.json(result);
		       }
			});
		},
		create: function(req, res){
			Cook.findOne({name: req.body.cook}, function(err, cook){
				var meal = new Meal({name: req.body.name, description: req.body.description, image: req.body.image, price: req.body.price});
				
				meal._cook = cook._id;

				cook.meals.push(meal);
				meal.save(function(err){
					cook.save(function(err){
						if(err){
							console.log(err)
						} else {
							res.json('succesfully added a meal')
						}
					})
				})
			})
		},
		delete: function(req, res){

			var id = req.params.id;
			Man.remove({_id: id}, function(err){
				if(err){
					console.log('saving failed');
				} else{
					res.json('success');
				}
			});
		},
		cookMenu: function(req, res){

			Cook.findOne({name: req.params.cook})
				.populate('meals')
				.exec(function(err, menu){
					if(menu){
						res.json(menu.meals)
					} else {
						res.json('no meals found')
					}
					
				})
		}
	}
	
})();