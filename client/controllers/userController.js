myApp.controller('userController', function($document, $scope, cooksFactory, $cookies, $window, $location, $route){
    $scope.user = $cookies.get('user');
    $scope.loggedOut = true;
    
    console.log($location.url());


    // toggles the video for better UX
    $scope.$on('$routeChangeStart', function(next, current) { 
        console.log('something is changing')
        if($location.url() != '/'){
            $scope.classVideo = 'collapse'
        } else {
            $scope.classVideo = ''
        }
    });

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