// Invite On-Boarding Wizard;
function WelcomeCtrl($scope, $location){
 // Get GET vars email
 //
 // Crete empty  User record object with email
 //
 // Request inputs for username and password  
 //
 // Proceed to roles wizard

  $scope.nextToRoles = function() {
    $location.path('/roles');        
  };

}

//Wizard of Roles
function RoleCtrl($scope, $location, $timeout) {
  $scope.userRoles = [];

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

// LOGIN FOR THE FIRST TIME CONTROLLER


