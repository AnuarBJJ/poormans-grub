myApp.controller('menuController', function($scope, menuFactory, $cookies, $location, $route, $routeParams){
	$scope.menu = [];
	$scope.newMeal = {};
	$scope.image = {};
	$scope.description;
	$scope.user = $cookies.get('user');
	$scope.shifts = [];
	$scope.notFound = true;
	$scope.items = ['menu', 'offer', 'times'];
	$scope.selection = $scope.items[0];

	menuFactory.getMenu($scope.user, function(result){
		if(result!="no cooks found"){
			console.log(result)
			$scope.menu = result;
			$scope.notFound = false;
		}
		else{
			console.log("cook not found")
		}
	});

	menuFactory.shifts($scope.user, function(shifts){
		$scope.shifts = (shifts);
		console.log($scope.shifts)
	});

	$scope.addMeal = function(){
		var newMeal = {cook: $scope.user, name: $scope.meal, description: $scope.description, price: $scope.price, image: 'https://s3-us-west-2.amazonaws.com/meal-upload/' + $scope.file.name};
		// console.log()
		menuFactory.createMeal(newMeal, function(response){
			console.log(response);
			$scope.menu.push(response);
			$route.reload();
			
		});
	}

})