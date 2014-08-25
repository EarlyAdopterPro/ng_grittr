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
      alert($scope.email);
      $http({ method:"post", 
              url:"/api/setpass", 
              data:{  
                      email:$scope.email,
                      password:$scope.password1
                   }})
      .success(function(data) {
      // Everything is ok.
        alert ('login user here');

        AuthService.setUserAuthenticated(true);

        console.log(data);

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

      $scope.logoutUser = function() {
            // run a logout function to your api
            console.log('LOGOUT ------>');
            AuthService.setUserAuthenticated(false);
            $location.path('/');
        };

        $scope.isLoggedIn = function() {
            console.log('WclmCtrl:isLoggedIn?' + AuthService.getUserAuthenticated());
            return AuthService.getUserAuthenticated();
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
   $scope.logoutUser = function() {
            AuthService.setUserAuthenticated(false);
            // run a logout function to your api
            $location.path('/');
   };

   $scope.isLoggedIn = function() {
            return AuthService.getUserAuthenticated();
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

// LOGIN FOR THE FIRST TIME CONTROLLER


