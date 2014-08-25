angular.module('grittr', ['ngRoute' , 'ngAnimate', 'auth', 'login'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/invite/', 
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl,
                 requireLogin: false 
       })
      .when('/invite/:email', 
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl,
                 requireLogin: false 
       })
      .when('/invite/:email/:hashkey',  
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl,
                 requireLogin: false 
       })
      .when('/',
                {
                  templateUrl:'/partials/invite.html', 
                  controller:WelcomeCtrl,
                  requireLogin: false 
       })
      .when('/roles', 
                {templateUrl:'/partials/roles.html', controller:RoleCtrl,
                  requireLogin: true 
       })
      .when('/roles/:email', 
                {templateUrl:'/partials/roles.html', controller:RoleCtrl,
                  requireLogin: true 
       })
      .when('/goals', 
                {templateUrl:'/partials/goals.html', controller:GoalCtrl,
                  requireLogin: true 
       })
      .otherwise({ redirectTo:'/'});
}])

// ANIMATION
.animation('.slideUp', function () {
    return {
        addClass: function (element, className, done) {
            jQuery(element).slideUp(done);
        },
    }
})

// RUN
.run(['$rootScope', 'AuthService', '$location', function($rootScope, AuthService, $location){
        // Everytime the route in our app changes check auth status
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            // if you're logged out send to login page.
            if (next.requireLogin && !AuthService.getUserAuthenticated()) {
                $location.path('/login');
                event.preventDefault();
            }
        });
}]);

// AUTH
angular.module('auth', [])

    .service('AuthService', [function(){
        var userIsAuthenticated = false;

        this.setUserAuthenticated = function(value) {
            userIsAuthenticated = value;
        };

        this.getUserAuthenticated = function() {
            return userIsAuthenticated;
        };

        return this;
}]);

angular.module('login', [])

    .service('LoginService', [function() {
        this.attemptLogin = function(email, password) {
            // create your request to your resource or $http request
            return true;
        };

        return this;
}]);
