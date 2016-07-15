var app = angular.module('app', ['ui.router', 'LocalStorageModule', 'ngAudio']);
document.ontouchmove = function (e) {
    e.preventDefault()
};

app.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    localStorageServiceProvider
        .setPrefix('whatsnew');

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "templates/home.html"
        })
        .state('game', {
            templateUrl: 'templates/game.html',
            controller: 'GameController'
        })
        .state('complete', {
            templateUrl: 'templates/complete.html',
            controller: 'CompleteController',
            params: {
                time: null,
                isNewRecord: false
            }
        });
});

utils = {
    random : function (min, max) {
            if (max == null) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
    },
    shuffle : function (array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
};

$(function () {

    FastClick.attach(document.body);

    var colors = [
      "#F48FB1",
      "#F06292",
      "#EC407A",
      "#E91E63",
      "#D81B60",
      "#C2185B",
      "#AD1457",
    ];

    function GenerateSquares() {
        var grid = 5;

        $(".block").remove();
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var s = w / grid;
        var hs = h / s;

        var total = grid * Math.ceil(hs);
        var container = $("#block-container");
        for (var i = 0; i < total; i++) {
            $('<div class="block">').appendTo(container);
        }
    }

    GenerateSquares();
    $(window).on('resize', GenerateSquares);

    function changeColor() {
        $('.block').each(function (idx, item) {
            var idx = Math.floor(Math.random() * colors.length);
            var color = colors[idx];
            $(item).css('backgroundColor', color);
        });
    }
    changeColor();
    setInterval(changeColor, 3000);
});