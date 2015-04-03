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
    'deeporange',
    'brown'
];

var types = [
    'car',
    'motorcycle',
    'diamond',
    'coffee',
    'smile-o',
    'flash',
    'send',
    'soccer-ball-o',
    'star',
    'tree',
    'umbrella',
    'thumbs-up',
    'bell',
    'wheelchair',
    'plane',
    'money',
    'wifi',
    'trophy',
    'child',
    'camera',
    'heart',
    'apple',
    'android',
    'twitter',
    'ambulance',
    'ship',
    'anchor',
    'binoculars',
    'briefcase',
    'bomb',
    'bug',
    'volume-up',
    'bullhorn',
    'eye',
    'wrench',
    'dollar'
];

app.controller('GameCtrl', ['$scope', '$interval', function ($scope, $interval) {
    $scope.items = [];
    $scope.totalSteps = 15;
    $scope.step = 0;
    $scope.time = 0;
    $scope.started = false;
    var timerInterval;
    $scope.countdown = 3;
    $scope.highscore = 28.6;
    
    $scope.chance = function(item) {
        if(item.isNew) {   
            if($scope.step == $scope.totalSteps) {
               $interval.cancel(timerInterval);
                //$window.alert("DONE!!!");
                $scope.items = [];
                if($scope.time < $scope.highscore) {
                    $scope.highscore = $scope.time;   
                }
                return;
            }
            
            $scope.step++;
            console.log("CORRECT");
            $scope.items = $scope.generatePack();
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
        shuffle(colors);
    };
    
    
    var readyInterval;
    
    $scope.getReady = function() {
        $scope.items = $scope.generatePack();
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
        $scope.items = $scope.generatePack();

        timerInterval = $interval(function() {
            $scope.time += 0.1;
        }, 100);
    };
    
    $scope.generatePack = function() {
        

        var items = [];

        if($scope.step == 0) {
            falseLimit = $scope.totalSteps;
        }else{
            items.push({
                icon: types[$scope.step],
                isNew: true
            });   
        }
        
        var i;
        for(i = 0; items.length < $scope.totalSteps; i++) 
        {
            var falseyIdx = 0;
            if($scope.step > 1) {
                falseyIdx = _.random($scope.step-1);
            }

            items.push({
                icon: types[falseyIdx],
                isNew: false
            });
        }
        
        items.forEach(function(el, idx) {
            el.color = colors[idx];
        });

        items = shuffle(items);

        return items;

    };
    
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