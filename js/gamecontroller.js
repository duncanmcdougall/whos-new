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

app.controller('GameController', function ($scope, $interval, $timeout, $state, HighscoreService) {

    $scope.generatePack = function () {
        var items = [];

        if ($scope.step == 0) {
            falseLimit = $scope.totalSteps;
        } else {
            items.push({
                isNew: true,
                wrong: false
            });
        }

        var i;
        for (i = 0; items.length < $scope.totalSteps; i++) {
            var falseyIdx = 0;
            if ($scope.step > 1) {
                falseyIdx = _.random($scope.step - 1);
            }

            items.push({
                isNew: false,
                wrong: false
            });
        }

        items.forEach(function (el, idx) {
            el.color = colors[idx];
        });

        items = _.shuffle(items);

        return items;
    };
    
    $scope.highscore = HighscoreService.getHighscore();
    $scope.totalSteps = 9;
    $scope.step = 1;
    $scope.time = 0;
    $scope.started = false;
    $scope.countdown = 3;
    
    $scope.items = $scope.generatePack();
    $scope.color = randomColor();
    $scope.done = false;
    var dir = 1;

    var timerInterval = $interval(function () {
        $scope.time += 0.1;
    }, 100);

    $scope.chance = function (item) {
        if (item.isNew) {
            if ($scope.step == $scope.totalSteps) {
                $interval.cancel(timerInterval);
                //$window.alert("DONE!!!");
                $scope.items = [];
                if ($scope.highscore == null || $scope.time < $scope.highscore) {
                    $scope.highscore = $scope.time;
                    HighscoreService.setHighscore($scope.time);
                }
                $scope.done = true;
                return;
            }
            
            dir *= -1;
            $scope.step++;
            console.log("CORRECT");
            $scope.color = randomColor();
            $scope.items = $scope.generatePack();
        } else {
            console.log("WRONG");
            item.wrong = true;
        }
    };

    var shadeColor = function (color, percent) {
        var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    };


    
    $scope.getColor = function (item) {
        if (item.isNew) {
            return shadeColor($scope.color, 0.19);
        }
        return $scope.color;
    };



});