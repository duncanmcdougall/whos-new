var app = angular.module('app', ['ui.router', 'LocalStorageModule']);


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
            templateUrl: "templates/home.html"
        })
        .state('countdown', {
            templateUrl: 'templates/countdown.html',
            controller: 'CountdownController'
        })
        .state('game', {
            templateUrl: 'templates/game.html',
            controller: 'GameController'
        });
});