myApp.controller('LocalCooksController', function($document, $scope, cooksFactory, $animate){
	$scope.cooks = [];
	$scope.loca = "something";
    angular.element('#exCollapsingNavbar').addClass('collapse');

    $scope.addNew = function(newCook){
		console.log(newCook);
		cooksFactory.add(newCook);
	}

	$scope.delete = function(toDelete){
		cooksFactory.delete(toDelete);
	}

	// $scope.test = function(){
	// 	console.log("trying to remove");
	// 	angular.element('#exCollapsingNavbar').addClass('collapse');
	// }
})