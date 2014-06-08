// Managing the modes list

function RoleCtrl($scope, $location, $timeout) {
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

      console.log($scope.sampleRoles);
     
    $scope.addRole = function() {
      $scope.sampleRoles.push(additionalSampleRoles[iterator++%6]);
      console.log($scope.sampleRoles);
    };

    $scope.removeRole = function(roleIndex) {
      $timeout(function(){
                $scope.sampleRoles.splice(roleIndex, 1);
                console.log($scope.sampleRoles);
                }, 1000);  
         };

}
// GOAL CONTROLLER
function GoalCtrl($scope, $location) {
  $scope.next = function() {
    $location.path('/goals'); 
  };

  $scope.prev = function(){
    $location.path('/roles');
  };
}

// END OF GOAL CONTROLLER

// ANIMATION
//.animation('.slideUp', function () {
//    return {
//        addClass: function (element, className, done) {
//            jQuery(element).slideUp(done);
//        },
//    }
//});
