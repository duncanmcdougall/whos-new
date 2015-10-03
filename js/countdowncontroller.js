app.controller('CountdownController', function ($scope, $interval, $timeout, $state) {
    $scope.countdown = 3;
    var readyInterval = $interval(function () {
        $scope.countdown--;
        if ($scope.countdown == 0) {
            $scope.countdown = "GO!"
            $timeout(function () {
                $state.go('game')
            }, 1000);
            $interval.cancel(readyInterval);
        }
    }, 900);
});