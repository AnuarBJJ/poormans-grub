myApp.factory('menuFactory', function($http){
	var factory={};
	var cookMenu = [];
	var shifts = [];

	factory.getMenu = function(cook, callback){
		$http.get('/menu/'+ cook).success(function(response){
			cookMenu = response;
			callback(cookMenu);
		})
	}

	factory.createMeal = function(meal, callback){
		// console.log("the new meal is", meal.name)
		$http.post('/newMeal', meal).success(function(response){
			cookMenu.push(response);
			callback(response);
		})
	}

	factory.shifts = function(cook, callback){
		$http.post('/shifts', {cook: cook}).success(function(response){
			console.log(response)
			callback(response);
		})
	}

	return factory;
})