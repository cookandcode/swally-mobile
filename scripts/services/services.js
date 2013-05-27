// Generated by CoffeeScript 1.4.0
(function() {

  window.ourApp.factory('Categories', [
    '$resource', function($resource) {
      return $resource('http://swally.herokuapp.com/category');
    }
  ]);

  window.ourApp.factory('Pleges', [
    '$resource', function($resource) {
      return $resource('http://swally.herokuapp.com/pledges');
    }
  ]);

  window.ourApp.factory('sharedServices', [
    '$rootScope', function($rootScope) {
      var sharedBroadcoast, sharedVar;
      sharedVar = {};
      sharedVar.show_mini_game = false;
      sharedVar.current_mini_game = [];
      sharedVar.showMiniGame = function(current_mini_game) {
        this.show_mini_game = true;
        this.current_mini_game = current_mini_game;
        return sharedBroadcoast();
      };
      sharedVar.hideMiniGame = function() {
        this.show_mini_game = false;
        this.current_mini_game = {};
        return sharedBroadcoast();
      };
      sharedBroadcoast = function() {
        return $rootScope.$broadcast('show-mini-game');
      };
      return sharedVar;
    }
  ]);

}).call(this);
