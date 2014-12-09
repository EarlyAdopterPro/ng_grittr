// Invite On-Boarding Wizard
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
      // Check if there is already this email in DB
      $http({ method:"post", 
              url:"/api/setpass", 
              data:{  
                      email:$scope.email,
                      password:$scope.password1
                   }})
      .success(function(data) {
        // Everything is ok.
        console.log(data);

        LoginService.attemptLogin(data.email, $scope.password1, function(userLoggedIn) {
          console.log("============ WelcomeCtrl - attemp Login - Callback -> userLoggedIn = " + userLoggedIn);
          if (userLoggedIn.err){
            $location.path('/').search(userLoggedIn);
          } else if (userLoggedIn) {
            AuthService.setUserAuthenticated(true, userLoggedIn.email, userLoggedIn);
            $location.path('/dashboard');
          } else {
            $location.path('/').search({err:1, msg:'Undefined error'});
          }
        });


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
function RoleCtrl($scope, $location, $timeout, AuthService) {
  console.log ('=================== Role Controller ===================');
  var localProfile = AuthService.getUserProfile(); 
  
  if (Object.keys(localProfile.roles).length > 1) {
    $scope.userRoles = localProfile.roles;
  }

  // default color schema for different Roles5
  grittrColors = [ 
    'grittr-yellow',
    'grittr-green',
    'grittr-blue',
    'grittr-red'
  ];

  // Placeholder for fresh form with three sample inputs
  $scope.newRoles=[
    {role:'', place:'', color:grittrColors[2]},
    {role:'', place:'', color:grittrColors[0]},
    {role:'', place:'', color:grittrColors[1]}
  ];

  // Default state of 'Delete Role' button is Hidden 
  $scope.showDelete = 0;

  // Sample roles for new input fields, hints for users
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

  // User can add up to 9 roles
  additionalSampleRoles = [
    {role:'', place:'', color:grittrColors[3]},
    {role:'', place:'', color:grittrColors[2]},
    {role:'', place:'', color:grittrColors[0]},
    {role:'', place:'', color:grittrColors[1]},
    {role:'', place:'', color:grittrColors[3]},
    {role:'', place:'', color:grittrColors[0]}
  ]; 

  iterator = 0;

  $scope.addRole = function() {
    $scope.newRoles.push(additionalSampleRoles[iterator++%6]);
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
  // TODO: take care of PREV button in roles
  $scope.prev = function(){
    if ($routeParams.email){
      $location.path('/invite/'+ $routeParams.email); 
    } else {
      $location.path('/invite/');
    }
  };

  $scope.next = function() {
    console.log ('------++++++++++ ROLES ++++++--------');
    console.log ($scope.newRoles);
    // TODO: 
    // #0 Check if all _new_ roles has values and places
    // #0.1 Check if there previous entered roles

    // We need at least one Role
    // if there are empty Roles, remove them from the list
    // if there the list is empty, through the error asking to @ min one role.

    // Q: what to do when there a place but no role
    // >: or vice versa there a role but no place

    // A: Seamless customer experience should not bound user.
    // >: let's save all what we have and proceed further

    // Possible soulutions:
    // 1. Modal confirmation window 'Do you want to leave them empty?'
    // 2. Cancel transaction and through an error
    
    // Counter to make sure we have at least one role or place
    var count = 0;

    // If there were previously saved roles, update them first 

      for (key in $scope.userRoles) {
        var obj = $scope.userRoles[key];
        // delete empty forms from scope
        if (obj.role === '' && obj.place === ''){
          delete $scope.userRoles[key];
        } else {
          if(localProfile.roles){
            localProfile.roles.push(obj);
          } else {
            localProfile.roles = [obj];
          }
          count++;
        }
    }

    // Count if there any new roles
    for (key in $scope.newRoles) {
      var obj = $scope.newRoles[key];

      // delete empty forms from scope
      if (obj.role === '' && obj.place === ''){
        delete $scope.newRoles[key];
      }
      else {
        if(localProfile.roles){
          localProfile.roles.push(obj);
        } else {
          localProfile.roles = [obj];
        }
        count++;
      }
    }

    console.log('final Roles ====== ');
    console.log(localProfile.roles);
    
    // #1 Save all field roles in Database
    // #2 Follow the path
    if (count > 0) {
      console.log(localProfile);
      // update wizard progress status
      localProfile.details['wizard_progress'] = 3;
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
function GoalCtrl($scope, $location, $timeout, AuthService) {

  console.log ('=================== Gole Controller ===================');
  var localProfile = AuthService.getUserProfile(); 
  $scope.userRoles = localProfile.roles;

  $scope.addGoal = function(role){

  }

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
          LoginService.attemptLogin($scope.loginEmail, $scope.loginPassword, function(userLoggedIn) {
            console.log("============ LoginCtrl Callback -> userLoggedIn = " + userLoggedIn);
            if (userLoggedIn.err){
              $location.path('/').search(userLoggedIn);
            } else if (userLoggedIn) {
              AuthService.setUserAuthenticated(true, userLoggedIn.email, userLoggedIn);
              $location.path('/dashboard');
            } else {
              $location.path('/').search({err:1, msg:'Undefined error'});
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
      console.log('> Switch Case Two: Partial roles was input, not saved');
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

