angular.module('grittr', ['ngRoute' , 'ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',      {templateUrl:'/partials/invite.html', controller:WelcomeCtrl })
      .when('/roles', {templateUrl:'/partials/roles.html', controller:RoleCtrl })
      .when('/goals', {templateUrl:'/partials/goals.html', controller:GoalCtrl })
      .otherwise({ redirectTo:'/'});
}])// ANIMATION
.animation('.slideUp', function () {
    return {
        addClass: function (element, className, done) {
            jQuery(element).slideUp(done);
        },
    }
});
