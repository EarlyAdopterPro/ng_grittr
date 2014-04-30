// Managing the modes list

function ModeCtrl($scope) {
  $scope.modes = [
    {text:'Viewer'},
    {text:'Setter'},
    {text:'Player' }];
}

function ViewerCtrl($scope) {
  $scope.modes = [];

}

function SetterCtrl($scope) {
  $scope.modes = [];
}


function PlayerCtrl($scope) {
  $scope.modes = [];
}

