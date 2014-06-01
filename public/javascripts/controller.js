// Managing the modes list

function RoleCtrl($scope, $location) {

  $scope.userRoles = [];

  $scope.next = function() {
    $location.path('/goals'); 
  };

  grittrColors = [ 
    'grittr-yellow',
    'grittr-green',
    'grittr-blue',
    'grittr-red'
  ];


  $scope.showDelete = 0;
  alert("in RoleCntrl");
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

 $scope.addRole = function() {
    $scope.sampleRoles.push(additionalSampleRoles[iterator++%6]);
    console.log($scope.sampleRoles);
  };

   $scope.removeRole = function(roleIndex) {
  //  alert(roleIndex);
  //  alert($scope.sampleRoles[roleIndex].role);
    $scope.sampleRoles.splice(roleIndex, 1);  

    console.log($scope.sampleRoles);
   };

}

function GoalCtrl($scope, $location) {
  $scope.next = function() {
    $location.path('/goals'); 
  };

  $scope.prev = function(){
    $location.path('/roles');
  };
}

