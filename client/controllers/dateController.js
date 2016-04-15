myApp.controller('DateController', function($scope, dateFactory, userPersistenceService, dateFilter) {
      $scope.tomorrowMenu = {};
      $scope.user = userPersistenceService.getCookieData();
      var format = 'h:mm a';
      var now = dateFilter(new Date(), format);

      $scope.value = {
      	beginning: now,
      	end: now
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