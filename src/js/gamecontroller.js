function Stopwatch () {
  this.reset()
}

Stopwatch.prototype.start = function () {
  if (this.pausedAt != null) {
    this.paused += Date.now() - this.pausedAt
    this.pausedAt = null
  }
}

Stopwatch.prototype.pause = function () {
  if (!this.pausedAt) this.pausedAt = Date.now()
}

Stopwatch.prototype.reset = function () {
  var now = Date.now()
  this.startedAt = now
  this.pausedAt = now
  this.paused = 0
}

Stopwatch.prototype.ticks = function () {
  var now = this.pausedAt || Date.now()
  return (now - this.startedAt) - this.paused
}

Stopwatch.prototype.formatted = function () {
  return new Date(this.ticks()).getTime() / 1000;
}

app.controller('GameController', function ($scope, $interval, $timeout, $state, HighscoreService, PackService) {

    var allItems, timerInterval;
    $scope.mode = 'easy';
    $scope.totalItems = 12;
    $scope.totalLevels = 8;
    $scope.record = HighscoreService.getHighscore($scope.mode);
    $scope.level = 1;
    $scope.time = 0;
    $scope.started = false;
    $scope.countdown = 3;
    $scope.levels = [];
    var timer;
    
    var startTimer = function () {
        timer = new Stopwatch();
        timer.start();
        timerInterval = $interval(function () {
            $scope.time = timer.formatted();
        }, 150);
    };

    var generateLevel = function () {
        // add the new item to the list
        var items = [{
            src: allItems[$scope.level],
            isNew: true
        }];
        
        // fill up the level with items you've already seen
        var wrongs = allItems.slice(0, $scope.level);
        for (var i = 0; i < $scope.totalItems - 1; i++) {
            var idx = _.random(0, $scope.level - 1);
            items.push({
                src: wrongs[idx],
                isNew: false
            });
        }
        
        // then shuffle them about
        items = _.shuffle(items);

        return items;
    };

    var setupGame = function () {
        allItems = _.shuffle(PackService.getPack($scope.mode));

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
    
    $scope.restart = function() {
        $state.go("countdown");
    }
});