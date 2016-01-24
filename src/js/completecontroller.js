app.controller('CompleteController', function ($scope, $state, HighscoreService, $stateParams) {
    $scope.record = HighscoreService.getHighscore('easy');
    $scope.time = $stateParams.time;
});