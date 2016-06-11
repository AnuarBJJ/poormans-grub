myApp.factory("dateFactory", function($http, $route){
	var factory = {};

	factory.tomorrow = function(menu, callback){
		console.log(menu)
		$http.post('/timetable', menu).success(function(response){
			console.log(response);
			callback(response);
		})
	}

	return factory;
})