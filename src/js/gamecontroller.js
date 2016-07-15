app.controller('GameController', function ($scope, $interval, $timeout, $state, HighscoreService, PackService) {

    var timerInterval, countdownInterval, timer;
    $scope.mode = 'easy';
    $scope.totalItems = 12;
    $scope.totalLevels = 8;

    var setupGame = function () {
        $interval.cancel(timerInterval);
        $interval.cancel(countdownInterval);

        $scope.record = HighscoreService.getHighscore($scope.mode);
        $scope.level = 1;
        $scope.time = 0;
        $scope.started = false;
        $scope.countdown = 3;
        $scope.levels = [];
        $scope.paused = false;
        $scope.items = [];

        $scope.allItems = utils.shuffle(PackService.getPack($scope.mode));

        for (var i = 1; i <= $scope.totalLevels; i++) {
            $scope.levels.push(i);
        }

        $scope.starter = $scope.allItems[0];
        countdownInterval = $interval(function () {
            $scope.countdown--;
            if ($scope.countdown == 0) {
                $interval.cancel(countdownInterval);
                startGame();
            }
        }, 900);
    };

    var generateLevel = function () {
        // add the new item to the list
        var items = [{
            src: $scope.allItems[$scope.level],
            isNew: true
        }];

        // fill up the level with items you've already seen
        var wrongs = $scope.allItems.slice(0, $scope.level);
        for (var i = 0; i < $scope.totalItems - 1; i++) {
            var idx = utils.random(0, $scope.level - 1);
            items.push({
                src: wrongs[idx],
                isNew: false
            });
        }

        // then shuffle them about
        items = utils.shuffle(items);

        return items;
    };

    var startGame = function () {
        $scope.started = true;
        $scope.items = generateLevel();
        timer = new Stopwatch();
        timer.start();
        timerInterval = $interval(function () {
            $scope.time = timer.formatted();
        }, 150);
    }

    var gameComplete = function () {
        $interval.cancel(timerInterval);
        var isNewRecord = false;
        if ($scope.record == null || $scope.time < $scope.record) {
            $scope.record = $scope.time;
            newRecord = true;
            HighscoreService.setHighscore($scope.mode, $scope.time);
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
        timer.pause();
        $scope.paused = true;
    }

    $scope.unpause = function () {
        timer.start();
        $scope.paused = false;
    }

    $scope.restart = function () {
        setupGame();
    }
});