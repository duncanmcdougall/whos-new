app.factory('HighscoreService', function (localStorageService) {

    var service = {};

    service.getHighscore = function () {
        var highscore = localStorageService.get('highscore');
        if (!!highscore) {
            return highscore;
        } else {
            return null;
        }
    };

    service.setHighscore = function (newHighscore) {
        localStorageService.set('highscore', newHighscore);
    };

    return service;
});


