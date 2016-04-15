myApp.factory("dateFactory", function($http){
	var factory = {};

	factory.tomorrow = function(menu){
		console.log(menu)
		$http.post('/timetable', menu).success(function(response){
			console.log(response)
		})
	}

	return factory;
})