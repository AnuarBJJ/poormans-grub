var cooks = require('./../controllers/cooks.js')

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

	app.post('/demo', function(req, res){
		cooks.cooksAround(req, res);
	}),

	app.post('/list', function(req, res){
		cooks.cooksAround(req, res);
	})
}