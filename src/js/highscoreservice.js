app.factory('HighscoreService', function (localStorageService) {

    var service = {};
    var highscoreKey = 'highscore-';

    service.getHighscore = function (mode) {
        var highscore = localStorageService.get(highscoreKey + mode);
        if (!!highscore) {
            return highscore;
        } else {
            return null;
        }
    };

    service.setHighscore = function (mode, newHighscore) {
        localStorageService.set(highscoreKey + mode, newHighscore);
    };

    return service;
});


