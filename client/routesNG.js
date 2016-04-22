myApp.config(function($routeProvider) {
  $routeProvider
   .when('/cook', {
    templateUrl: '/partials/cookMenu.html'
  })
   .when('/eater', {
    templateUrl: '/partials/eater.html'
  })
	.when('/timetable', {
    templateUrl: '/partials/timetable.html'
  })
  .when('/fblogin', {
    templateUrl: '/partials/FBlogin.html'
  })
  .when('/signup', {
    templateUrl: '/partials/register.html'
  })
})