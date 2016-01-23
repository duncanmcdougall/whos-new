app.controller('CountdownController', function ($scope, $interval, $timeout, $state, ngAudio) {
    $scope.countdown = 3;
    var audio = [
        ngAudio.load('sounds/go.ogg'),
        ngAudio.load('sounds/1.ogg'),
        ngAudio.load('sounds/2.ogg'),
        ngAudio.load('sounds/3.ogg'),
    ];
    var readyInterval = $interval(function () {
        $scope.countdown--;
        audio[$scope.countdown].play();
        if ($scope.countdown == 0) {
            $interval.cancel(readyInterval);
            $scope.countdown = "GO!"
            $timeout(function () {
                $state.go('game')
            }, 1000);
        }
    }, 900);
});