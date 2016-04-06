myApp.config(function($routeProvider) {
  $routeProvider
   .when('/cook', {
    templateUrl: '/partials/cook.html'
  })
   .when('/eater', {
    templateUrl: '/partials/eater.html'
  })

})