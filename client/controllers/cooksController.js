myApp.controller('LocalCooksController', function($document, $scope, cooksFactory, $cookies, $window, $location, $route){
	$scope.cooks = [];
	$scope.newCook = {};
    // angular.element('#exCollapsingNavbar').addClass('collapse');
    $scope.user = cooksFactory.getUser();
    $scope.loggedOut = true;
    if($scope.currentTime == undefined){
    	$scope.date = new Date();
    	$scope.beg = $scope.date;
    	$scope.end = new Date();
    	$scope.end.setTime(Date.parse($scope.beg)+15*60*1000);
    }

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
		alert('successfully signed up')
	}
})