var mongoose = require('mongoose');

var Cook = mongoose.model('cook');

var Timetable = mongoose.model('timetable');

var Meal = mongoose.model('meal');

module.exports = (function(){
	return {
		registerCook: function(req, res){
			var address = {lat: req.body.lat, lng: req.body.lng}
			var cook = new Cook({name: req.body.name, pic: req.body.pic, lat: req.body.lat, lng: req.body.lng});
			cook.save(function(err){
				if(err){
					console.log('saving failed');
				} else{
					res.json('success');
				}
			})
		},
		getAll: function(req, res){
			Cook.find({}, function(err, result){
			   if(err) {
		         console.log(err);
		       } else {
		         res.json(result);
		       }
			});
		},
		cooksAround: function(req, res){
			Cook.find({lat: {$gt: parseFloat(req.body.south), $lt: parseFloat(req.body.north)},
						lng: {$gt: parseFloat(req.body.west), $lt: parseFloat(req.body.east)}}, function(err, result){
			   if(err) {
		         console.log(err);
		       } else {
		       		for(var i=0; i<result.length; i++){
		       			var cookTomorrow = result[i];
		       			Timetable.find({cook: result[i]._id}, function(err, shifts){
		       				for(var j=0; j<shifts.length; j++){
		       					var shift = shifts[j];
		       					for(offer in shifts[j].menu){
		       						Meal.find({_id: offer}, function(err, meals){
		       							var menuOptions = [];
		       							for(var s=0; s<meals.length; s++){
		       								var mealForTomorrow = {cook: cookTomorrow, shift: shift, meal: meals[s]};
		       								menuOptions.push(mealForTomorrow);
		       								console.log(mealForTomorrow)
		       							}
		       							res.json(menuOptions);
		       						})
		       					}
		       				}
		       			})
		       		}
		       }
		   })
		},
		create: function(req, res){
			var man = new Man({name: req.body.name, occupation: req.body.occupation});
			man.save(function(err){
				if(err){
					console.log('saving failed');
				} else{
					res.redirect('/');
				}
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
		}
	}
	
})();