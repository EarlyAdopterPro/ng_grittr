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
                  templateUrl:'/partials/invite.html', controller:WelcomeCtrl,
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
      .when('/dashoard/', // need to solve issue with trailing slashes
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes
                {templateUrl:'/partials/dashboard.html', controller:DashCtrl,
                 requireLogin: true 
       })
      .when('/dashboard', 
                {templateUrl:'/partials/dashboard.html', controller:DashCtrl,
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
        var userEmail = 'NotYetSet';

        this.setUserAuthenticated = function(value, email) {
            userIsAuthenticated = value;
            console.log("AuthService:setUserAuthenrication: " + value + " & email:  " + email)
            userEmail = email;
        };

        this.getUserCredentials = function() {
            console.log("AuthService:getUserCredentials -> userEmail = " + userEmail);
            return userEmail;
        };

        this.getUserAuthenticated = function() {
            return userIsAuthenticated;
        };

        return this;
}]);

angular.module('login', [])
    .service('LoginService', ['$http', function($http) {

        this.attemptLogin = function(email, password, callback) {
            console.log("LoginService -> send http to ExpressJS to login user");
            console.log("LoginService -> userEmail = " + email);
            console.log("LoginService -> password = " + password);
            console.log("LoginService -> $http call to ExpressJS");
            console.log("============= $HTTP /api/login > =============");

            // create your request to your resource or $http request
            $http({ method:"post", 
                    url:"/api/login", 
                    data:{  
                            email:email,
                            password:password
                         }})
            .success(function(data) {
            // Everything is ok.
              console.log("LoginService -> http[post].success");
              console.log("> data =" + data);
              callback(data);
              // return data;

             })
            .error(function(data) {
              console.log('LoginService -> http[post].Error: ' + data);
              callback(data);
              return false;
            });
        };

        return this;
}]);
