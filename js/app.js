var app = angular.module('app', ['ui.router']);

var colors = [
    'red',
    'pink',
    'purple',
    'deeppurple',
    'indigo',
    'blue',
    'lightblue',
    'cyan',
    'teal',
    'green',
    'lightgreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deeporange',
    'brown'
];

var types = [
    'car',
    'motorcycle',
    'diamond',
    'coffee',
    'smile-o',
    'flash',
    'send',
    'soccer-ball-o',
    'star',
    'tree',
    'umbrella',
    'thumbs-up',
    'bell',
    'wheelchair',
    'plane',
    'money',
    'wifi',
    'trophy',
    'child',
    'camera',
    'heart',
    'apple',
    'android',
    'twitter',
    'ambulance',
    'ship',
    'anchor',
    'binoculars',
    'briefcase',
    'bomb',
    'bug',
    'volume-up',
    'bullhorn',
    'eye',
    'wrench',
    'dollar'
];

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "js/partials/home.html"
    })
    .state('countdown', {
        templateUrl: 'js/partials/countdown.html',
        controller: 'CountdownController'
    })
  .state('game', {
        templateUrl: 'js/partials/game.html',
        controller: 'GameController'
    });
    /*
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });*/
});