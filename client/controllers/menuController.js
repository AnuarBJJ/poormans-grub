myApp.controller('menuController', function($scope, menuFactory, $cookies, $location){
	$scope.menu = [];
	$scope.newMeal = {};
	$scope.image = {};
	// $scope.meal;
	$scope.description;
	$scope.user = $cookies.get('user');
	$scope.notFound = true;

	$scope.items = ['menu', 'offer'];
	$scope.selection = $scope.items[0];

	// console.log("current user is " + $scope.user)

	menuFactory.getMenu($scope.user, function(result){
		if(result!="no cooks found"){
			$scope.menu = result;
			$scope.notFound = false;
		}
		else{
			console.log("cook not found")
		}
	})

	$scope.addMeal = function(){
		console.log($scope.meal)
		var newMeal = {cook: $scope.user, name: $scope.meal, description: $scope.description, price: $scope.price, image: 'https://s3-us-west-2.amazonaws.com/meal-upload/' + $scope.file.name};
		console.log(newMeal)
		menuFactory.createMeal(newMeal, function(response){
			console.log(response);
		});
	}
})