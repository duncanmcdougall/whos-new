var app = angular.module('app', ['ui.router', 'LocalStorageModule', 'ngTouch', 'ngAudio']);


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
            templateUrl: "/templates/home.html"
        })
        .state('countdown', {
            templateUrl: '/templates/countdown.html',
            controller: 'CountdownController'
        })
        .state('game', {
            templateUrl: '/templates/game.html',
            controller: 'GameController'
        })
        .state('complete', {
            templateUrl: '/templates/complete.html',
            controller: 'CompleteController',
            params: {
                time: null,
                isNewRecord: false
            }
        });
});

function PreLoadImages(preloadedImages,srcs) {
    for (var i = 0; i < srcs.length; i++) {
        var image = new Image();
        image.src = srcs[i];
        preloadedImages.push(image);

    }
};