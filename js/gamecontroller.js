app.controller('CountdownController', function ($scope, $interval, $timeout, $state) {
    $scope.countdown = 3;
    var readyInterval = $interval(function() {
         $scope.countdown--;
        if($scope.countdown == 0) {
            $scope.countdown = "GO!"
            $timeout(function() {
                $state.go('game')
            }, 700);
            $interval.cancel(readyInterval);
        }
    }, 900);
});

app.controller('GameController', function ($scope, $interval, $timeout, $state) {
    
});

/*app.controller('GameCtrl', ['$scope', '$interval', function ($scope, $interval) {
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
            item.wrong = true;
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
                isNew: true,
                wrong: false
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
                isNew: false,
                wrong: false
            });
        }
        
        items.forEach(function(el, idx) {
            el.color = colors[idx];
        });

        items = shuffle(items);

        return items;

    };
    
    $scope.reset();
}]); */