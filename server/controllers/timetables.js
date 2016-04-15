var mongoose = require('mongoose');

var Timetable = mongoose.model('timetable');

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
				var timetable = new Timetable({cook: cook[0]._id, menu: req.body.menu, beg: req.body.beg, end: req.body.end});
				timetable.save(function(err){
					if(err){
						console.log(err);
					} else{
						res.json(timetable);
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
					Meal.find({cook: cook[0]._id}, function(err, cookMenu){
						if(err){
							console.log(err)
						} else{
							res.json(cookMenu);
						}
					})
				}
			})
		}
	}
	
})();