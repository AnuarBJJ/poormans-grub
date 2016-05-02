var mongoose = require('mongoose');

var Cook = mongoose.model('cook');

var Timetable = mongoose.model('timetable');

var Meal = mongoose.model('meal');

module.exports = (function(){
	return {
		registerCook: function(req, res){
			console.log(req.body)
			var cook = new Cook({name: req.body.name, pic: req.body.pic, lat: req.body.lat, lng: req.body.lng, address: req.body.address});
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
			var date = new Date();
			var menu = [];
			Cook.find({lat: {$gt: parseFloat(req.body.bounds.south), $lt: parseFloat(req.body.bounds.north)},
						lng: {$gt: parseFloat(req.body.bounds.west), $lt: parseFloat(req.body.bounds.east)}}).populate('')

			// .populate('')
		   
		},
		login: function(req, res){
			Cook.findOne({name: req.body.suspect}, function(err, user){
				if(err){
					console.log('finding user failed');
				} else{
					res.json(user);
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