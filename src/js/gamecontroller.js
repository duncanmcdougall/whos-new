app.controller('GameController', function ($scope, $interval, $timeout, $state, HighscoreService, PackService) {

    var allItems, timerInterval, pack;

    $scope.totalLevels = 12;
    $scope.record = HighscoreService.getHighscore();
    $scope.level = 1;
    $scope.time = 0;
    $scope.started = false;
    $scope.countdown = 3;
    $scope.levels = [];

    var startTimer = function () {
        timerInterval = $interval(function () {
            $scope.time += 0.1;
        }, 100);
    };

    var generateLevel = function () {
        var items = [];

        items.push({
            src: allItems[$scope.level],
            isNew: true
        });

        var wrongs = allItems.slice(0, $scope.level);
        for (var i = 0; i < $scope.totalLevels - 1; i++) {
            var idx = _.random(0, $scope.level - 1);
            items.push({
                src: wrongs[idx],
                isNew: false
            });
        }

        items = _.shuffle(items);

        return items;
    };

    var setupGame = function () {
        pack = PackService.getPack();
        allItems = [];
        for (var j = 1; j <= pack.items; j++) {
            allItems.push("icons/" + pack.name + "/icon (" + j + ").png");
        }

        allItems = _.shuffle(allItems);

        for (var i = 1; i <= $scope.totalLevels; i++) {
            $scope.levels.push(i);
        }
        
        $scope.items = generateLevel();
        startTimer();
    };

    var gameComplete = function () {
        $interval.cancel(timerInterval);
        var isNewRecord = false;
        if ($scope.record == null || $scope.time < $scope.record) {
            $scope.record = $scope.time;
            newRecord = true;
            HighscoreService.setHighscore($scope.time);
        }
        $state.go('complete', {
            isNewRecord: isNewRecord,
            time: $scope.time
        });
    };
    
    setupGame();
    
    /* EVENT HANDLERS */

    $scope.chance = function (item) {
        if (item.isNew) {
            if ($scope.level == $scope.totalLevels) {
                gameComplete();
                return;
            }
            $scope.level++;
            $scope.items = generateLevel();
        } else {
            item.isWrong = true;
        }
    };

    $scope.pause = function () {
        $interval.cancel(timerInterval);
        $scope.paused = true;
    }

    $scope.unpause = function () {
        startTimer();
        $scope.paused = false;
    }
    
    $scope.restart = function() {
        $state.go("countdown");
    }
});