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

app.controller('GameController', function ($scope, $interval, $timeout, $state) {

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

    $scope.totalSteps = 9;
    $scope.step = 1;
    $scope.time = 0;
    $scope.started = false;
    $scope.countdown = 3;
    $scope.highscore = 28.6;
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
                if ($scope.time < $scope.highscore) {
                    $scope.highscore = $scope.time;
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

/*app.controller('GameCtrl', ['$scope', '$interval', function ($scope, $interval) {
    
    
    
    
    $scope.reset = function() {
        
        $scope.step = 0;
        $scope.started = false;
        $scope.time = 0;
        $interval.cancel(timerInterval);
        
    };
    
    $scope.start = function() {
        $scope.step = 1;
        $scope.items = $scope.generatePack();

        timerInterval = $interval(function() {
            $scope.time += 0.1;
        }, 100);
    };
    
    
    
    $scope.reset();
}]); */