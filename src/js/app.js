var app = angular.module('app', ['ui.router', 'LocalStorageModule', 'ngTouch', 'ngAudio']);
document.ontouchmove = function(e) {e.preventDefault()};

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
            templateUrl: "templates/home.html",
            controller: function ($scope, PackService) {
                PackService.PreloadImages();
            }
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


$(function() {
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
        $(".block").remove();
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var s = w/10;
        var hs = h/s;
        
        var total = 10 * Math.ceil(hs);
        var container = $("#block-container");
        for(var i = 0; i < total; i++) {
            $('<div class="block">').appendTo(container);
        }
    }
    
    GenerateSquares();
    $(window).on('resize', GenerateSquares);

    function changeColor() {
      $('.block').each(function(idx, item) {
        var idx = Math.floor(Math.random() * colors.length);
        var color = colors[idx];
        $(item).css('backgroundColor', color);
      });
    }
    changeColor();
    setInterval(changeColor, 3000);
});
