var app = angular.module('app', ['ui.router', 'LocalStorageModule', 'ngTouch']);


app.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");


    localStorageServiceProvider
        .setPrefix('dmgame');


    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "assets/templates/home.html"
        })
        .state('countdown', {
            templateUrl: 'assets/templates/countdown.html',
            controller: 'CountdownController'
        })
        .state('game', {
            templateUrl: 'assets/templates/game.html',
            controller: 'GameController'
        });
});

$.preloadImages = function(images) {
  for (var i = 0; i < images.length; i++) {
    $("<img />").attr("src", images[i]);
  }
}


$(function () {
    var windowXArray = [],
        windowYArray = [];

    for (var i = 0; i < $(window).innerWidth(); i++) {
        windowXArray.push(i);
    }

    for (var i = 0; i < $(window).innerHeight(); i++) {
        windowYArray.push(i);
    }

    function randomPlacement(array) {
        var placement = array[Math.floor(Math.random() * array.length)];
        return placement;
    }


    var canvas = oCanvas.create({
        canvas: '#canvas',
        fps: 60
    });

    setInterval(function () {

        var rectangle = canvas.display.ellipse({
            x: randomPlacement(windowXArray),
            y: randomPlacement(windowYArray),
            origin: {
                x: 'center',
                y: 'center'
            },
            radius: 0,
            fill: randomColor(),
            opacity: 1
        });

        canvas.addChild(rectangle);

        rectangle.animate({
            radius: 10,
            opacity: 0
        }, {
            duration: '1000',
            easing: 'linear',
            callback: function () {
                this.remove();
            }
        });

    }, 100);

    $(window).resize(function () {
        canvas.width = $(window).innerWidth();
        canvas.height = $(window).innerHeight();
    });

    $(window).resize();
});