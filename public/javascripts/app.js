angular.module('grittr', ['ngRoute' , 'ngAnimate', 'auth', 'login'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider

      .when('/invite', 
                {templateUrl:'/partials/invite.html', controller:WelcomeCtrl,
                 requireLogin: false 
       })

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
                  templateUrl:'/partials/login.html', controller:LoginCtrl,
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
    .service('AuthService', ['$http', function($http){
        var userIsAuthenticated = false;
        var userEmail = 'NotYetSet';
        var userProfile = null;

        // Set User var
        this.setUserAuthenticated = function(value, email, profile) {
            userIsAuthenticated = value;
            console.log("AuthService:setUserAuthenrication: " + value + " & email:  " + email)
            userEmail = email;
            userProfile = profile;
        };

        // Get User var
        this.getUserCredentials = function() {
            console.log("AuthService:getUserCredentials -> userEmail = " + userEmail);
            return userEmail;
        };

        // Get User Profile 
        this.getUserProfile = function() {

            console.log("AuthService:getUserProfile");

            userProfile.save = function(){
              console.log("============= $HTTP /api/updateProfile > =========");
              // create your request to your resource or $http request
              $http({ method:"post", 
                      url:"/api/updateProfile", 
                      data:{  
                              profile:userProfile
                           }})
              .success(function(data) {
                  // Everything is ok.
                  // get password as data variable
                   console.log("AuthSrv:userProfile.save->(http:post.SUCCESS");
                   console.log("> data = " + data);
                  // return data;

               })
              .error(function(data) {
                  console.log('AuthSrv:userProfile.save->http:post.ERR: '+data);
                  //callback(data);
                  return false;
              });
            };

            return userProfile;
        };

        // Check authenticated status
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
              // get password as data variable
              console.log("LoginService -> http[post].success");
              console.log("> data = " + data);
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

angular.module('planner', [])
    .service('PlannerService', ['$http', function($http) {
    var userID = null;

    this.getUserDetails = function(user, callback){

    };
}]);




