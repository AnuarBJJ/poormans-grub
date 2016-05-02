myApp.controller('registrationController', function($document, $scope, cooksFactory, $cookies, $window, $location, $route, $http, $timeout){
	var map;

	var mapFunction = function(){
		function initMap() {


	        map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: -34.397, lng: 150.644},
	          zoom: 13,
	          disableDefaultUI: true,
	          scrollwheel: false
	        });



	        var infoWindow = new google.maps.InfoWindow({map: map});

	        // Try HTML5 geolocation.
	        if (navigator.geolocation) {
	          navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };

	            // google.maps.event.addListener(map, 'bounds_changed', function(){
			       	var xhttp = new XMLHttpRequest();
			        xhttp.onreadystatechange = function() {
			          if (xhttp.readyState == 4 && xhttp.status == 200) {
			          	
			          	var cookLocation = (JSON.parse(xhttp.responseText)).results[0].formatted_address
						document.getElementById('address').value = cookLocation
			          }
			        };

					var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&sensor=true'
			        console.log(requestUrl)
			        xhttp.open("GET", requestUrl, true);
			        xhttp.send();
			    // })

	            infoWindow.setPosition(pos);
	            infoWindow.setContent('You are here.');
	            map.setCenter(pos);

	          }, function() {
	            handleLocationError(true, infoWindow, map.getCenter());
	          });
	        } else {
	          // Browser doesn't support Geolocation
	          handleLocationError(false, infoWindow, map.getCenter());
	        }

	      }

	     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	        infoWindow.setPosition(pos);
	        infoWindow.setContent(browserHasGeolocation ?
	                              'Error: The Geolocation service failed.' :
	                              'Error: Your browser doesn\'t support geolocation.');
	     }

        initMap();
    };

	var checkMap = function(){
		if(!(typeof google === 'object' && typeof google.maps === 'object')){
			$timeout(function(){checkMap();}, 1000);
		} else {
			mapFunction();
		}
	};

	checkMap();


	$scope.geolocation = function(){
		var adrs = document.getElementById('address').value
		adrs = adrs.replace(/ /g, "+");
		var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + adrs + '&key=AIzaSyAW_t0GYoB3USwL-JDTWYssYScHJ-RcjNA'

		console.log(requestUrl);
		$http.get(requestUrl).success(function(response){
			map.setCenter(response.results[0].geometry.location)
		})
	}

	$scope.registerCook = function(){
		var newCook = {name: $scope.newCook.name, 
						pic: 'https://s3-us-west-2.amazonaws.com/meal-upload/' + $scope.file.name,
						address: document.getElementById('address').value,
						lat: map.getCenter().lat(),
						lng: map.getCenter().lng()
					}

		$http.post('/registerCook', newCook).success(function(result){
			$cookies.put('user', $scope.newCook.name)
			console.log(result)
			$window.location.reload();
		})
	}
})

