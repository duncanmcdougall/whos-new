app.controller('GameController', function ($scope, $interval, $timeout, $state, HighscoreService) {

    var allItems;
    var totalItems = 12;

    var setupGame = function () {
        allItems = [];
        for (var j = 0; j < totalItems; j++) {
            allItems.push(randomColor());
        }
    };

    var timerInterval = $interval(function () {
        $scope.time += 0.1;
    }, 100);

    var gameComplete = function () {
        $interval.cancel(timerInterval);
        if ($scope.highscore == null || $scope.time < $scope.highscore) {
            $scope.highscore = $scope.time;
            HighscoreService.setHighscore($scope.time);
        }
        $scope.done = true;
    };

    $scope.generateLevel = function () {
        
        var items = [];
        
        items.push({
            color: allItems[$scope.level],
            isNew: true
        });
        
        var wrongs = allItems.slice(0, $scope.level);
        for(var i = 0; i < totalItems-1;i++) {
            var idx = _.random(0, $scope.level-1);
            items.push({
                color: wrongs[idx],
                isNew: false
            });
        }
        
        items = _.shuffle(items);
        
        return items;
    };

    $scope.chance = function (item) {
        if (item.isNew) {
            if ($scope.level == $scope.totalLevels) {
                gameComplete();
                return;
            }
            $scope.level++;
            $scope.items = $scope.generateLevel();
        } else {
            item.isWrong = true;
        }
    };

    $scope.totalLevels = 12;
    setupGame();
    $scope.highscore = HighscoreService.getHighscore();
    $scope.level = 1;
    $scope.time = 0;
    $scope.started = false;
    $scope.countdown = 3;

    $scope.items = $scope.generateLevel();
    $scope.done = false;
});