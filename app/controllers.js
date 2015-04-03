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
    $scope.countdown = 3;

    $scope.chance = function(item) {
        if(item.isNew) {   
            $('.header__progress').addClass('animated pulse');
            $scope.step++;
            console.log("CORRECT");
        }else{
            console.log("WRONG");   
        }
    };
    
    $scope.reset = function() {
        types = shuffle(types);  
        $scope.step = 0;
        $scope.started = false;
        $scope.time = 0;
        $interval.cancel(timerInterval);
    };
    
    
    var readyInterval;
    
    $scope.getReady = function() {
        $scope.items = generatePack(0);
        $scope.started = true;
        readyInterval = $interval(function() {
             $scope.countdown--;
            if( $scope.countdown == 0) {
                $scope.start();
                $interval.cancel(readyInterval);
            }
        }, 1000);
    };
    
    $scope.start = function() {
        $scope.step = 1;
        $scope.items = generatePack(1);

        timerInterval = $interval(function() {
            $scope.time += 0.1;
        }, 100);
    };
    
    $
    
    $scope.reset();
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

function generatePack(step) {
    var i = 0;
    
    var items = [];
    
    falsesToShow = 15 - step;
    
    for(i; i < falsesToShow; i++) 
    {
        items.push({
            color: colors[_.random(colors.length-1)],
            icon: types[0],
            isNew: false
        });
    }
    
    var t = 0;
    for(t; t < step; t++) {
        items.push({
            color: colors[_.random(colors.length-1)],
            icon: types[step],
            isNew: true
        });
    }
    
    items = shuffle(items);
    
    return items;

};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}