myApp.factory('cooksFactory', function($http){
	var cooks = [];
	var factory = {};
	factory.getAll = function(bounds, callback){
		
		var splicer = function(){
			var counter1 = 0;
			var counter2 = 0;
			var negative = 1;

			while((isNaN(parseInt(bounds[counter1]))) && counter1 <= bounds.length -1){
				if(bounds[counter1]=="-"){
					negative = -1;
				};
				counter1 ++;
			}

			bounds = bounds.substring(counter1, bounds.length);

			while((!isNaN(parseInt(bounds[counter2])) || (bounds[counter2]) == ".") && counter2 <= bounds.length -1){
				counter2++;
			}
			var result = parseFloat(bounds.slice(0, counter2)*negative);
			bounds = bounds.substring(counter2, bounds.length);
			return result;
		}

		var south = splicer();

		var west = splicer()

		var north = splicer()

		var east = splicer()

		var boundsJson = {south: south, north: north, east: east, west: west};

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