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
			Cook.find({name: req.body.cook}, function(err, cook){
				var meal = new Meal({cook: cook[0]._id, name: req.body.name, description: req.body.description, image: "some image", price: req.body.price});
				meal.save(function(err){
					if(err){
						console.log(err);
					} else{
						res.json(meal);
					}
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
			Cook.find({name: req.params.cook}, function(err, cook){
				if(err){
					console.log(err)
				} else{
					if(cook[0] != undefined){
						Meal.find({cook: cook[0]._id}, function(err, cookMenu){
							if(err){
								console.log(err)
							} else{
								res.json(cookMenu);
							}
						})
					} else{
						res.json("no cooks found");
					}
				}
			})
		}
	}
	
})();