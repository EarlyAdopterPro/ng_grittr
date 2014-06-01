angular.module('grittr', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/roles', {templateUrl:'/partials/roles.html', controller:RoleCtrl })
      .when('/goals', {templateUrl:'/partials/goals.html', controller:GoalCtrl })
      .otherwise({ redirectTo:'/roles'});
}]);
