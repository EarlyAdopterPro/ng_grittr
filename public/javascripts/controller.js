// Invite On-Boarding Wizard;
function WelcomeCtrl($scope, $location, $routeParams, $http, AuthService, LoginService){

  // Get GET vars email
  // If email is in Params - create record for user. It is invited user.
  if ( $routeParams.email && validator.isEmail($routeParams.email) ) {
    $scope.email = $routeParams.email;
    $scope.emailInputIsDisabled = true;
  } else {
    $scope.email = "email@example.com";
    $scope.emailInputIsDisabled = false;
  }
         
  // console.log($routeParams.hashkey);
  $scope.reset = function(){
    $location.path('/invite');
  }

  $scope.next = function() {
    //  Check if two passwords are equal
    if ($scope.password1 != $scope.password2){
      alert("Password should match");
    } else {
      // #3. Check if there is already this email in DB
      $http({ method:"post", 
              url:"/api/setpass", 
              data:{  
                      email:$scope.email,
                      password:$scope.password1
                   }})
      .success(function(data) {
      // Everything is ok.
        alert ('WelcomeCtrl: login user ');
        console.log(data);
        console.log(data.email);

        AuthService.setUserAuthenticated(true, data.email);


        if ($routeParams.email) {
          nextParams = "/" + $routeParams.email;
        } else {
          nextParams = "";
        }

        $location.path('/roles' + nextParams); 

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    }
  };

} // WelcomeCtrl ends here 

//Wizard of Roles
function RoleCtrl($scope, $location, $timeout, $routeParams, AuthService, LoginService) {
  $scope.userRoles = [];


  $scope.prev = function(){
    if ($routeParams.email){
      $location.path('/invite/'+ $routeParams.email); 
    } else {
      $location.path('/invite/');
    }
  };

  $scope.next = function() {
    // TODO: 
    //
    // #1 Save all field roles in Databas
    // #2 Follow the path

    $location.path('/goals'); 
  };

  grittrColors = [ 
    'grittr-yellow',
    'grittr-green',
    'grittr-blue',
    'grittr-red'
  ];


  $scope.showDelete = 0;
  $scope.sampleRoles = [
    {role:'manager', place:'company name', color:grittrColors[2]},
    {role:'sister', place:'family', color:grittrColors[0]},
    {role:'volunteer', place:'community', color:grittrColors[1]}
   ];

  additionalSampleRoles = [
    {role:'student', place:'uiversity', color:grittrColors[3]},
    {role:'mother', place:'family', color:grittrColors[2]},
    {role:'actor', place:'theater', color:grittrColors[0]},
    {role:'photographer', place:'freelance', color:grittrColors[1]},
    {role:'developer', place:'freelance', color:grittrColors[3]},
    {role:'writer', place:'freelance', color:grittrColors[0]}
  ]; 

  iterator = 0;

  // console.log($scope.sampleRoles);
     
  $scope.addRole = function() {
    $scope.sampleRoles.push(additionalSampleRoles[iterator++%6]);
    //console.log($scope.sampleRoles);
  };

  $scope.removeRole = function(roleIndex) {
    // Timeout for SlideUp animation 
    $timeout(function(){
                $scope.sampleRoles.splice(roleIndex, 1);
                console.log($scope.sampleRoles);
                }, 1000);  
    };

} // END OF ROLES CONTROLLER

// GOAL CONTROLLER
function GoalCtrl($scope, $location) {
  $scope.next = function() {
    $location.path('/goals'); 
  };

  $scope.prev = function(){
    $location.path('/roles');
  };
} // END OF GOAL CONTROLLER


// HEADER CONTROLLER
function HeaderCtrl($scope, AuthService, LoginService){

        console.log('HeaderCtrl:UserEmail -> getUserCredentials() = ' + AuthService.getUserCredentials());
        $scope.userEmail = "TEST"; 
        $scope.userEmail = AuthService.getUserCredentials();

         $scope.logoutUser = function() {
            // run a logout function to your api
            console.log('HeaderCtrl: LOGOUT ------>');
            AuthService.setUserAuthenticated(false, null);
            $location.path('/');
        };

        $scope.isLoggedIn = function() {
            console.log('HeaderCtrl: isLoggedIn? = ' + AuthService.getUserAuthenticated());
            userAuthStatus = AuthService.getUserAuthenticated();
            if (userAuthStatus){ 
               $scope.userEmail = AuthService.getUserCredentials();
            } else {
                $scope.userEmail = "HeaderCtrl:NAN";
            }


            return AuthService.getUserAuthenticated();
        };
} // END OF HEADER CONTROLLER

function LoginCtrl($scope, $location, $window, AuthService, LoginService){
    
        $scope.loginAction = function() {
          //AuthService.setUserAuthenticated(true, data.email);
          console.log("LoginCtrl -> loginAction call");
          console.log(">loginEmail= "+$scope.loginEmail+"; loginPass= "+$scope.loginPassword);
          
          LoginService.attemptLogin($scope.loginEmail, $scope.loginPassword, function(userLoggedIn) {
            console.log("LoginCtrl Callback -> userLoggedIn = " + userLoggedIn);
            if (userLoggedIn) {
              alert ("LoginCtrl Callback -> loginAction -> OK");

              AuthService.setUserAuthenticated(true, $scope.loginEmail);
              $window.location='/dashboard';
              
              // Check at what stage is Wizard?
              // If wizard is not finished, redirect to required step
              // Else redirect to Dashboard

            } else {
              alert ("LoginCtrl -> loginAction -> NOT OK");
            }
          });
        }


} // END OF HEADER CONTROLLER

