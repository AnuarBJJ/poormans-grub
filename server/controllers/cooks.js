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
			console.log(req.body)
			var menu = {};
			var menuOptions = [];
			Cook.find({lat: {$gt: parseFloat(req.body.bounds.south), $lt: parseFloat(req.body.bounds.north)},
						lng: {$gt: parseFloat(req.body.bounds.west), $lt: parseFloat(req.body.bounds.east)}}, function(err, cooks){
			   if(err) {
		         console.log("error in cook " + err);
		       } else {
		       		for(cook in cooks){
		       			Timetable.find({cook: cook._id}, {beg: {$lt: parseFloat(req.body.end)}}, {end: {$gt: parseFloat(req.body.beg)}}, function(err, shifts){
		       				for(shift in shifts){
		       					// for()
		       				}
		       				var item = {cook: cook, shift: shift}
		       				
		       			})
		       		}
		       }
		    })

			var shifts = function(cooksList){
				var allShifts
				for(cook in cooksList){
					Timetable.find({cook: cook._id}, function(err, result){
	       				if(err){
	       					console.log("error")
	       				}else{
	       					allShifts = result;
						}
				return allShifts
					})
				}
			}
		       		
		       		// for(var i=0; i<result.length; i++){

		       		// 	var cookTomorrow = result[i];
		       		// 	var resultLength = result.length -1;
		       		// 	Timetable.find({cook: result[i]._id}, function(err, shifts){
		       		// 		if(err){
		       		// 			console.log("error")
		       		// 		}else{
		       		// 			var shiftsLength = shifts.length -1;
			       	// 			for(var j=0; j<shifts.length; j++){
			       	// 				var orders = [];
			       	// 				for(order in shifts[j].menu){
			       	// 					orders.push(order);
			       	// 				}
			       	// 				for(var k=0; k<orders.length; k++){
			       	// 					console.log(orders[k])
			       	// 					Meal.find({_id: orders[k]}, function(err, meals){
			       	// 						for(var s=0; s<meals.length; s++){
			       	// 							var mealForTomorrow = {cook: cookTomorrow, shift: order, meal: meals[s]};
			       	// 							menuOptions.push(mealForTomorrow);
			       	// 						}

			       	// 						console.log("i= " + i + ", j= "+ j +", k= "+k);
			       	// 						if( true){
			       	// 							console.log('done')
			       	// 							res.json(menuOptions);
			       	// 						}
			       	// 					})
			       	// 				}
			       	// 			}
			       	// 		}
		       		// 	})

		       		// }
		   
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