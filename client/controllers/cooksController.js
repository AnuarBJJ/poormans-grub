myApp.controller('LocalCooksController', function($document, $scope, cooksFactory){
	$scope.cooks = [];
	$scope.loca = "something";
    
    $scope.addNew = function(newCook){
		console.log(newCook);
		cooksFactory.add(newCook);
	}

	$scope.delete = function(toDelete){
		cooksFactory.delete(toDelete);
	}
})