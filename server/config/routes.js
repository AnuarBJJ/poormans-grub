var cooks = require('./../controllers/cooks.js')
var meal = require('./../controllers/meals.js')
var timetable = require('./../controllers/timetables.js')

module.exports = function(app){

	app.get('/cooks', function(req, res){
		cooks.getAll(req, res);
	}),

	app.post('/man/add', function(req, res){
		men.create(req, res);
	}),

	app.delete('/man/delete/:id', function(req, res){
		men.delete(req, res);
	}),

	app.get('/cookpage', function(req, res){
		res.render('cook', {title: "my Express project"});
	}),

	app.post('/registerCook', function(req, res){
		cooks.registerCook(req, res);
	}),

	// app.post('/cooksAround', function(req, res){
	// 	cooks.cooksAround(req, res);
	// }),

	app.post('/list', function(req, res){
		cooks.cooksAround(req, res);
	}),

	app.post('/newMeal', function(req, res){
		meal.create(req, res);
	}),

	app.post('/download', function(req, res){
		console.log(req)
	}),

	app.get('/menu/:cook', function(req, res){
		meal.cookMenu(req, res);
	}),

	app.post('/timetable', function(req, res){
		console.log(req.body)
		timetable.create(req, res);
	})

}