var mongoose = require('mongoose');

var Cook = mongoose.model('cook');

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

			// var yo = [{name: "Maria", pic: "/img/chickenCurry.jpeg"}, {name: "Alba", pic: "/img/LightRicotta.jpg"}, {name: "Jay", pic: "/img/burrito.jpeg"}, {name: "Makhabbat", pic: "/img/breakfast.jpg"}];
			// res.json(yo);

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
		         res.json(result);
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