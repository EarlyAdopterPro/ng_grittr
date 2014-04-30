angular.module('dice', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {templateUrl:'partials/list.html', controller:ModeCtrl })
      .when('/setter', {templateUrl:'partials/setter.html', controller:SetterCtrl })
      .when('/viewer', {templateUrl:'partials/viewer.html', controller:ViewerCtrl })
      .when('/player', {templateUrl:'partials/player.html', controller:PlayerCtrl })
      .otherwise({ redirectTo:'/list.html'});
}]);
