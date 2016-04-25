myApp.controller('LocalCooksController', function($document, $scope, cooksFactory, $cookies, $window, $location, $route){
	$scope.cooks = [];
	$scope.loca = "something";
	$scope.newCook = {};
    // angular.element('#exCollapsingNavbar').addClass('collapse');
    $scope.user = cooksFactory.getUser();
    $scope.loggedOut = true;

    if($scope.user){
    	$scope.loggedIn = true;
    	$scope.loggedOut = false;
    }

    $scope.addNew = function(newCook){
		console.log(newCook);
		cooksFactory.add(newCook);
	}

	$scope.delete = function(toDelete){
		cooksFactory.delete(toDelete);
	}

	$scope.createCook = function(){
		$scope.loggedOut = false;
		console.log($scope.newCook)
		angular.element('#closeModal').click();
		$cookies.put('user', $scope.newCook.name)
		$location.path('/cook')

		// $window.location.href = '#/partials/cookMenu.html';
		alert('successfully signed up')
	}
})