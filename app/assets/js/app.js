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