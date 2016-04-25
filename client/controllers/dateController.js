myApp.controller('DateController', function($scope, dateFactory, $cookies, dateFilter) {
      $scope.tomorrowMenu = {};
      $scope.user = $cookies.get('user');
      var format = 'h:mm a';
      $scope.now = new Date();

      $scope.value = {
      	beginning: $scope.now,
      	end: $scope.now
      };

      $scope.addToTomorrow = function(item){
      	var key = item;
      	$scope.tomorrowMenu[item] = 0;
      	console.log($scope.tomorrowMenu)
      };
      $scope.buildTomorrowMenu = function(){
      	for(var key in $scope.tomorrowMenu){
      		$scope.tomorrowMenu[key] = document.getElementById(key).value
      	};
      	var tomorrow = {menu: $scope.tomorrowMenu, beg: $scope.value.beginning, end: $scope.value.end, cook: $scope.user}
      	dateFactory.tomorrow(tomorrow);
      }
    });