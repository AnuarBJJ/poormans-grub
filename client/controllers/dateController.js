myApp.controller('DateController', function($scope, dateFactory, $cookies, dateFilter, $route, $timeout) {
      $scope.tomorrowMenu = {};
      $scope.user = $cookies.get('user');
      var format = 'h:mm a';
      $scope.now = new Date();

      $scope.value = {
      	beginning: $scope.now,
      	end: $scope.now
      };

      $scope.addToTomorrow = function(item, index){
            var el = angular.element(event.target)
            console.log(el.parent().parent().css("background-color"))
      	if(el.parent().parent().css("background-color") != "rgb(51, 204, 204)"){
                  var key = item;
                  $scope.tomorrowMenu[item] = 0;
                  console.log($scope.tomorrowMenu);
                  el.parent().parent().css({ "background-color": "#33cccc"});
                  document.getElementById('button' + index).innerHTML = 'Uncheck';
            } else {
                  el.parent().parent().css({ "background-color": "transparent"});
                  document.getElementById('button' + index).innerHTML = 'Cook this';
            }

      };

      $scope.buildTomorrowMenu = function(){
      	for(var key in $scope.tomorrowMenu){
      		$scope.tomorrowMenu[key] = document.getElementById(key).value
      	};
      	var tomorrow = {menu: $scope.tomorrowMenu, beg: $scope.value.beginning, end: $scope.value.end, cook: $scope.user}
      	
            dateFactory.tomorrow(tomorrow, function(data){
                  $scope.shifts.push(data)
                  $timeout(function() {
                        angular.element('#test').triggerHandler("click")
                  })
            });
            
      }
    });