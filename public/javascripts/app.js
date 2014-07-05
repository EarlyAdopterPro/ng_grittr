angular.module('grittr', ['ngRoute' , 'ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/invite/', 
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl })
      .when('/invite/:email', 
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl })
      .when('/invite/:email/:hashkey',  
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl })
      .when('/',
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl })
      .when('/roles', 
                {templateUrl:'/partials/roles.html', controller:RoleCtrl })
      .when('/roles/:email', 
                {templateUrl:'/partials/roles.html', controller:RoleCtrl })
      .when('/goals', 
                {templateUrl:'/partials/goals.html', controller:GoalCtrl })
      .otherwise({ redirectTo:'/'});
}])

// ANIMATION
.animation('.slideUp', function () {
    return {
        addClass: function (element, className, done) {
            jQuery(element).slideUp(done);
        },
    }
});
