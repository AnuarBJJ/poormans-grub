myApp.factory('cooksFactory', function($http, $cookies){
	var cooks = [];
	var factory = {};
	var user = $cookies.get('user');

	console.log("user is " + user)

	factory.getUser = function(){
		return user;
	}

	factory.getAll = function(bounds, callback){

		$http.post('/cooksAround', boundsJson).success(function successCallback(response){
			cooks = response;
			callback(cooks);			
		});
		return cooks;
		
	}

	factory.add = function(info){
		$http.post('/cooks/new', info).success(function(){
			console.log('got back to add')
		})
	}

	factory.delete = function(data){
		$http.delete('/customers/'+data._id).success(function(response){
			console.log('back to delete');
		})
	}
	return factory;
});