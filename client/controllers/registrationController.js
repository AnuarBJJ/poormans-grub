myApp.controller('registrationController', function($document, $scope, cooksFactory, $cookies, $window, $location, $route, $http, $timeout){
	var map2;

	var mapFunction = function(){
		function initMap() {


	        map2 = new google.maps.Map(document.getElementById('map2'), {
	          center: {lat: -34.397, lng: 150.644},
	          zoom: 13,
	          disableDefaultUI: true,
	          scrollwheel: false
	        });


	        var infoWindow = new google.maps.InfoWindow({map: map2});

	        // Try HTML5 geolocation.
	        if (navigator.geolocation) {
	          navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
		            };
		        // })


	            google.maps.event.addListener(map2, 'bounds_changed', function(){
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
			    })

	            infoWindow.setPosition(pos);
	            infoWindow.setContent('You are here.');
	            map2.setCenter(pos);

	          }, function() {
	            handleLocationError(true, infoWindow, map2.getCenter());
	          });
	        } else {
	          // Browser doesn't support Geolocation
	          handleLocationError(false, infoWindow, map2.getCenter());
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
			map2.setCenter(response.results[0].geometry.location)
		})
	}

	$scope.registerCook = function(){
		var newCook = {name: $scope.newCook.name, 
						pic: 'https://s3-us-west-2.amazonaws.com/meal-upload/' + $scope.file.name,
						address: document.getElementById('address').value,
						lat: map2.getCenter().lat(),
						lng: map2.getCenter().lng()
					}

		$http.post('/registerCook', newCook).success(function(result){
			$cookies.put('user', $scope.newCook.name)
			console.log(result)
			document.getElementById('coolStuffLauncher').click()
			setTimeout(function(){ $window.location.reload(); }, 5000);
			

		})


	}
})

