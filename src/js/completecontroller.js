app.controller('CompleteController', function ($scope, $state, HighscoreService, $stateParams) {
    $scope.record = HighscoreService.getHighscore();
    $scope.time = $stateParams.time;
});