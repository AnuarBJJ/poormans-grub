myApp.controller('userController', function($document, $scope, cooksFactory, $cookies, $window, $location, $route){
    $scope.user = $cookies.get('user');
    $scope.loggedOut = true;
    console.log('working')

    if($scope.user){
    	$scope.loggedIn = true;
    	$scope.loggedOut = false;
    }

    $scope.logout = function(){
    	console.log('logging out')
    	$cookies.remove('user');
    	$window.location.reload();
    }
})