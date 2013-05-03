window.ourApp = angular.module('swallyApp', ['ngResource'])


window.ourApp.config(['$routeProvider', ($routeProvider)->
    $routeProvider
      .when('/', {
        templateUrl: 'views/_card.html',
        controller: 'PledgesCtrl'
      })
      .when('/game', {
        templateUrl: 'views/_game.html',
        controller: 'GamesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
])