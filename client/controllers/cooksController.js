myApp.controller('LocalCooksController', function($document, $scope, cooksFactory){
	$scope.cooks = [];
	$scope.loca = "something";

    $scope.loadCooksAround = function(){
    	var result = document.getElementById("test");
    	var bounds  = result.innerHTML;
    	cooksFactory.getAll(bounds, function(list){
	    	$scope.cooks = list;
	    })
    };
    
    $scope.addNew = function(newCook){
		console.log(newCook);
		cooksFactory.add(newCook);
	}

	$scope.delete = function(toDelete){
		cooksFactory.delete(toDelete);
	}

	

})