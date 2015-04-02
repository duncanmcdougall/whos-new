var app = angular.module('app', []);

var colors = [
    'red',
    'pink',
    'purple',
    'deeppurple',
    'indigo',
    'blue',
    'lightblue',
    'cyan',
    'teal',
    'green',
    'lightgreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deeporange'
];

var types = [
    'car',
    'motorcycle',
    'diamond',
    'coffee',
    'female',
    'flash',
    'send',
    'soccer-ball-o',
    'star',
    'tree',
    'umbrella',
    'thumbs-up',
    'rocket',
    'wheelchair',
    'fighter-jet',
    'euro',
    'apple',
    'android',
    'pinterest',
    'twitter',
    'heart'
];

app.controller('GameCtrl', ['$scope', '$interval', function ($scope, $interval) {
    $scope.items = [];
    $scope.totalSteps = 15;
    $scope.step = 1;
    $scope.time = 0;
    $scope.started = false;
    
    var timerInterval;
    
    var i;
    for(i = 0; i < 15; i++)
    {
        $scope.items.push({
            color: colors[_.random(colors.length-1)],
            icon: types[i]
        });
    }
    
    $scope.chance = function() {
        $('.header__progress').addClass('animated pulse');
        $scope.step++;
    };
    
    $scope.start = function() {
        $scope.started = true;
        $scope.time = 0;
        
        $interval.cancel(timerInterval);
        timerInterval = $interval(function() {
            $scope.time += 0.1;
        }, 100);
    };
}]);

app.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseFloat(n);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        return num.toFixed(len);
    };
});