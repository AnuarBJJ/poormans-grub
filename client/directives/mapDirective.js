myApp.directive('mealsAroundMap', ['$timeout', function($timeout){

	var mapFunction = function(scope){
		function initMap() {
		        var cooksAround = []

		        var map = new google.maps.Map(document.getElementById('map'), {
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

		        google.maps.event.addListener(map, 'bounds_changed', function(){
		          var bounds = map.getBounds();

		       	var xhttp = new XMLHttpRequest();
		        xhttp.onreadystatechange = function() {
		          if (xhttp.readyState == 4 && xhttp.status == 200) {
		          	console.log(xhttp.responseText)
		            if(xhttp.responseText == 'no cooks found' || xhttp.responseText == 'shifts not found'){
		            	console.log('no cooks work')
		            } else{

			            var nearCook = JSON.parse(xhttp.responseText);

			            console.log(nearCook)

			            for(var i=0; i<nearCook.length; i ++){
			              var marker = new google.maps.Marker();
			              marker.setPosition(new google.maps.LatLng(parseFloat(nearCook[i].cook.lat), parseFloat(nearCook[i].cook.lng)));
			              marker.setMap(map);
			            }
			            scope.cooks = nearCook;
			            scope.$apply()
			        }
		          }
		        };

		        var data = JSON.stringify({bounds: bounds, date: document.getElementById('date').value, beg: document.getElementById('beg').value, end: document.getElementById('end').value});
		        xhttp.open("POST", "/list", true);
		        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		        xhttp.send(data);


		        });

		      }

		      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		        infoWindow.setPosition(pos);
		        infoWindow.setContent(browserHasGeolocation ?
		                              'Error: The Geolocation service failed.' :
		                              'Error: Your browser doesn\'t support geolocation.');
		      }

		        initMap();
		    };

	var checkMap = function(scope){
		var scope = scope;
		if(!(typeof google === 'object' && typeof google.maps === 'object')){
			$timeout(function(){checkMap(scope);}, 1000);
		} else {
			mapFunction(scope);
		}
	};

	function link(scope){
		checkMap(scope);
	}
	
	return {
		templateUrl: '/partials/mealAround.html',
		scope: false,
		link: link
		}
			
}])


