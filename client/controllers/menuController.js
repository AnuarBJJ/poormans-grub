myApp.controller('menuController', function($scope, menuFactory, $cookies){
	$scope.menu = [];
	$scope.newMeal = {};
	$scope.image = {};
	$scope.meal;
	$scope.description;
	$scope.user = $cookies.get('user');
	$scope.notFound = true;

	console.log("current user is " + $scope.user)

	angular.element('#exCollapsingNavbar').addClass('collapse');

	menuFactory.getMenu($scope.user, function(result){
		console.log(result)
		if(result!="no cooks found"){
			$scope.menu = result;
			$scope.notFound = false;
		}
		else{
			console.log("cook not found")
		}
	})

	$scope.addMeal = function(){
		var newMeal = {cook: $scope.user, name: $scope.meal, description: $scope.description, price: $scope.price, image: 'https://s3-us-west-2.amazonaws.com/meal-upload/' + $scope.file.name};
		menuFactory.createMeal(newMeal, function(response){
			console.log(response);
		});
	}
})