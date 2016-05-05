var mongoose = require('mongoose');

var Cook = mongoose.model('cook');

var Meal = mongoose.model('meal');

var Timetable = mongoose.model('timetable');



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
			var menu = []
			var endEater = new Date(req.body.date+' '+req.body.end);
			var endEaterIso = endEater.toISOString()
			console.log(endEaterIso)
			var begEater = new Date(req.body.date+' '+req.body.beg);
			var begEaterIso = begEater.toISOString()
			console.log(begEaterIso);
			Cook.find({lat: {$gt: parseFloat(req.body.bounds.south), $lt: parseFloat(req.body.bounds.north)},
						lng: {$gt: parseFloat(req.body.bounds.west), $lt: parseFloat(req.body.bounds.east)}})
				.populate({path: 'shifts',
							match: { 'beg': {$lt: endEaterIso}, 'end': {$gt: begEaterIso}}
								})
				.populate('meals')
				.exec(function(err, array){
					console.log(array)
					array.forEach(function(ckoo){
						if(ckoo.shifts.length>0){
							menu.push(ckoo)
						}
					})
					console.log(menu)
					res.json(menu)
				})
		   
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