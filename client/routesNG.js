myApp.config(function($routeProvider) {
  $routeProvider
   .when('/cook', {
    templateUrl: '/partials/cook.html'
  })
   .when('/food', {
    templateUrl: '/partials/eater.html'
  })

})