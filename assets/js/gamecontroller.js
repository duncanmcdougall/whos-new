app.controller('GameController', function ($scope, $interval, $timeout, $state, HighscoreService) {

    var allItems;
    
    $scope.totalLevels = 12;
    
    var packs = [
        {
            name: 'food',
            items: 20
        }, 
        {
            name: 'sea',
            items: 20
        }
    ];
    
    var pack = packs[0];

    
    $scope.highscore = HighscoreService.getHighscore();
    $scope.level = 1;
    $scope.time = 0;
    $scope.started = false;
    $scope.countdown = 3;

    var setupGame = function () {
        allItems = [];
        for (var j = 1; j <= pack.items; j++) {
            allItems.push("/assets/icons/"+ pack.name + "/icon (" + j + ").png");
        }
        
        $.preloadImages(allItems);
        
        allItems = _.shuffle(allItems);
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
            src: allItems[$scope.level],
            isNew: true
        });
        
        var wrongs = allItems.slice(0, $scope.level);
        for(var i = 0; i < $scope.totalLevels-1;i++) {
            var idx = _.random(0, $scope.level-1);
            items.push({
                src: wrongs[idx],
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

    setupGame();

    $scope.items = $scope.generateLevel();
    $scope.done = false;
});