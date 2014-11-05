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
  console.log ('=================== Role Controller ===================');
  var localProfile = AuthService.getUserProfile(); 
  $scope.userRoles = localProfile.roles;


  $scope.prev = function(){
    if ($routeParams.email){
      $location.path('/invite/'+ $routeParams.email); 
    } else {
      $location.path('/invite/');
    }
  };

  grittrColors = [ 
    'grittr-yellow',
    'grittr-green',
    'grittr-blue',
    'grittr-red'
  ];

  $scope.newRoles=[
    {role:'', place:'', color:grittrColors[2]},
    {role:'', place:'', color:grittrColors[0]},
    {role:'', place:'', color:grittrColors[1]}
  ];

  $scope.showDelete = 0;
  $scope.sampleRoles = [
    {role:'manager', place:'company name', color:grittrColors[2]},
    {role:'sister', place:'family', color:grittrColors[0]},
    {role:'volunteer', place:'community', color:grittrColors[1]},
    {role:'student', place:'uiversity', color:grittrColors[3]},
    {role:'mother', place:'family', color:grittrColors[2]},
    {role:'actor', place:'theater', color:grittrColors[0]},
    {role:'photographer', place:'freelance', color:grittrColors[1]},
    {role:'developer', place:'freelance', color:grittrColors[3]},
    {role:'writer', place:'freelance', color:grittrColors[0]}
   ];

  additionalSampleRoles = [
    {role:'', place:'', color:grittrColors[3]},
    {role:'', place:'', color:grittrColors[2]},
    {role:'', place:'', color:grittrColors[0]},
    {role:'', place:'', color:grittrColors[1]},
    {role:'', place:'', color:grittrColors[3]},
    {role:'', place:'', color:grittrColors[0]}
  ]; 

  iterator = 0;

  // console.log($scope.sampleRoles);
     
  $scope.addRole = function() {
    $scope.newRoles.push(additionalSampleRoles[iterator++%6]);
    //console.log($scope.sampleRoles);

    //TODO: count newRoles. If == 9 hide Add Role button
      
  };

  $scope.removeRole = function(roleIndex) {
    // Timeout for SlideUp animation 
    $timeout(function(){
                $scope.newRoles.splice(roleIndex, 1);
                console.log('xxxxx Removing Role; Left roles:');
                console.log($scope.newRoles);
                }, 1000);  
    };

  $scope.next = function() {
    console.log ('------++++++++++ ROLES ++++++--------');
    console.log ($scope.newRoles);
    // TODO: 
    // #0 Check if all roles has values and places

    // We need at least on Role
    // if there are empty Roles, remove them from the list
    // if there the list is empty, through the error asking to @ min one role.

    // Q: what to do when there a place but no role
    // >: or vice versa there a role but no place

    // A: Seamless customer experience should not bound user.
    // >: let's save all what we have and proceed further

    // Possible soulutions:
    // 1. Modal confirmation window 'Do you want to leave them empty?'
    // 2. Cancel transaction and through an error
    // 3.  
    var count = 0;
    for (key in $scope.newRoles) {
      var obj = $scope.newRoles[key];

      if (obj.role === '' && obj.place === ''){
        console.log ('----------------');
        console.log ('Empty role key ' + key);
        delete $scope.newRoles[key];
      }
      else {
        console.log('++++++++ ' + count + ' +++++++++++++');
        if(localProfile.roles){
          localProfile.roles.push(obj);
        } else {
          localProfile.roles = [obj];
        }
        count++;
        
      }
      console.log('================');
    }

    console.log('final Roles ====== ');
    console.log($scope.newRoles);
    
    // #1 Save all field roles in Database
    // #2 Follow the path
    if (count > 0) {
      console.log(localProfile);
      alert('pause');
      localProfile.save();
      $location.path('/goals'); 
    }
    else {
      $scope.newRoles = [
        {role:'', place:'', color:grittrColors[1]},
        {role:'', place:'', color:grittrColors[0]},
        {role:'', place:'', color:grittrColors[2]}
      ];
      alert('Please, provide at least one Role or Place');
    }
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
function HeaderCtrl($scope, $location, AuthService, LoginService){

        //console.log('HeaderCtrl:UserEmail -> getUserCredentials() = ' + AuthService.getUserCredentials());
        $scope.userEmail = "TEST"; 
        $scope.userEmail = AuthService.getUserCredentials();

         $scope.logoutUser = function() {
            // run a logout function to your api
            console.log('HeaderCtrl: LOGOUT ------>');
            AuthService.setUserAuthenticated(false, null, null);
            $location.path('/');
        };

        $scope.isLoggedIn = function() {
          //  console.log('HeaderCtrl: isLoggedIn? = ' + AuthService.getUserAuthenticated());
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
        console.log('============ Login Controller =================');
    
        $scope.loginAction = function() {
          //AuthService.setUserAuthenticated(true, data.email);
          console.log("LoginCtrl -> loginAction call");
          console.log("> loginEmail= "+$scope.loginEmail+"; loginPass= "+$scope.loginPassword);
          
          LoginService.attemptLogin($scope.loginEmail, $scope.loginPassword, function(userLoggedIn) {
  
            console.log("-.-.-.--.-.-.--> LoginCtrl Callback -> userLoggedIn = " + userLoggedIn);
            if (userLoggedIn != 'false') {
              console.log("LoginCtrl -> Profile.email = " + userLoggedIn.email);
              console.log("LoginCtrl -> Profile = " + userLoggedIn.details['wizard_progress']);
              console.log("LoginCtrl -> retrived password" + userLoggedIn.password);
              console.log("LoginCtrl -> user provided password" + $scope.loginPassword);

              // check two password
              console.log("LoginCtrl -> SetUserAuth");
              AuthService.setUserAuthenticated(true, userLoggedIn.email, userLoggedIn);
              console.log(AuthService.getUserAuthenticated()); 
$scope = $scope || angular.element(document).scope();
              $location.path('/dashboard');
              
              // Check at what stage is Wizard?
              // If wizard is not finished, redirect to required step
              // Else redirect to Dashboard

            } else {
              $location.path='/?err=1';
            }
          });
        }
} // END OF LOGIN CONTROLLER

function DashCtrl($scope, $location, AuthService, LoginService){
  console.log('=============== Dashboard Controller ==================');
  console.log('> values of $scope');
  var localProfile = AuthService.getUserProfile();
  var wizardCompletion = parseInt(localProfile.details['wizard_progress']);
  console.log('> wizard Completion');
  console.log (wizardCompletion);
    
  switch(wizardCompletion){
    case 0:
      console.log ('> Switch Case Zero');
      $location.path('/');
      break;
    case 1:
      console.log ('> Switch Case One: Roles');
      $location.path('/roles');
      break;
    case 2:
      console.log('> Switch Case Two');
      $location.path ('/roles');
      break;
    case 3:
    case 4:
      console.log('> Switch Case Three Four: goals');
      $location.path('/goals');
      break;
    case 5:
    default:
        console.log('> Switch Case Default Five');
        break;
  } 
 
  //$location.path('/dashboard/'; 
} // END OF DASBOARD CONTROLLER

