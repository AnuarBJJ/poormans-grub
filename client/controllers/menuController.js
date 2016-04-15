myApp.controller('menuController', function($scope, menuFactory, userPersistenceService){
	$scope.menu = [];
	$scope.newMeal = {};
	$scope.image = {};
	$scope.meal;
	$scope.description;
	$scope.user = userPersistenceService.getCookieData();

	userPersistenceService.setCookieData("Sheila");

	menuFactory.getMenu($scope.user, function(result){
		$scope.menu = result;
	})

	$scope.addMeal = function(){
		var newMeal = {cook: $scope.user, name: $scope.meal, description: $scope.description, price: $scope.price, image: $scope.image};
		menuFactory.createMeal(newMeal, function(response){
			// $scope.menu.push(response);
			console.log(response);
		});
	}
})