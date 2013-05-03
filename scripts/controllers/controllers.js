// Generated by CoffeeScript 1.4.0
(function() {

  window.ourApp.controller('GamesCtrl', [
    '$scope', 'Pleges', '$q', function($scope, Pledges, $q) {
      $scope.init = true;
      $scope.nb_player = 4;
      $scope.actual_player = 1;
      $scope.win_player = 1;
      $scope.score = {};
      $scope.is_playing = false;
      $scope.display_button_play = 'block';
      $scope.display_winner = 'none';
      $scope.display_tap_tap = 'none';
      $scope.initVar = function() {
        $scope.init = true;
        $scope.nb_player = 4;
        $scope.actual_player = 1;
        $scope.score = {};
        $scope.is_playing = false;
        $scope.display_button_play = 'block';
        $scope.display_winner = 'none';
        return $scope.display_tap_tap = 'none';
      };
      $scope.initTapTap = function() {
        return $scope.display_tap_tap = 'block';
      };
      $scope.playTapTap = function() {
        var i, _i, _ref;
        $scope.is_playing = true;
        $scope.display_button_play = 'none';
        setTimeout(function() {
          return $scope.$apply($scope.showScore());
        }, 1000);
        if ($scope.init) {
          for (i = _i = 1, _ref = $scope.nb_player; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            $scope.score[i] = 1;
          }
          return $scope.init = false;
        }
      };
      $scope.addTapTap = function() {
        if ($scope.is_playing) {
          return $scope.score[$scope.actual_player]++;
        }
      };
      $scope.showScore = function() {
        var actual_player_next, i, _i, _ref, _ref1;
        $scope.display_button_play = 'block';
        $scope.is_playing = false;
        if ($scope.actual_player === $scope.nb_player) {
          return $scope.endGame();
        } else {
          actual_player_next = $scope.actual_player;
          for (i = _i = _ref = parseInt($scope.actual_player) + 1, _ref1 = $scope.nb_player; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
            if ($scope.score[i] != null) {
              actual_player_next = i;
              break;
            } else {
              if ($scope.nb_player === i) {
                $scope.endGame();
                return true;
              }
            }
          }
          return $scope.actual_player = actual_player_next;
        }
      };
      return $scope.endGame = function() {
        var higher_score, player, score, score_equal, score_equal_tab, _ref, _ref1;
        higher_score = 0;
        score_equal = false;
        _ref = $scope.score;
        for (player in _ref) {
          score = _ref[player];
          if (score > higher_score) {
            $scope.win_player = parseInt(player);
            higher_score = parseInt(score);
          }
        }
        score_equal_tab = {};
        score_equal_tab[$scope.win_player] = higher_score;
        $scope.actual_player = $scope.win_player;
        _ref1 = $scope.score;
        for (player in _ref1) {
          score = _ref1[player];
          player = parseInt(player);
          score = parseInt(score);
          if (score === higher_score && $scope.win_player !== player) {
            score_equal_tab[player] = higher_score;
            score_equal = true;
            if ($scope.win_player > player) {
              $scope.actual_player = player;
            }
            break;
          }
        }
        if (score_equal) {
          $scope.score = score_equal_tab;
          return $scope.display_button_play = 'block';
        } else {
          $scope.display_winner = 'block';
          $scope.display_button_play = 'none';
          return setTimeout(function() {
            return $scope.$apply($scope.initVar());
          }, 2000);
        }
      };
    }
  ]);

  window.ourApp.controller('PledgesCtrl', [
    '$scope', 'Pleges', '$q', function($scope, Pledges, $q) {
      var generateRandomPledges, nb_card, one_pledge, played_card, pledges_static, shot_played, two_pledge;
      one_pledge = {
        __v: 0,
        _id: "516094ddb09bb9020000002d",
        description: "Wééééé",
        title: "Les filles boivent",
        category: {
          __v: 0,
          _id: "516092b6b09bb90200000012",
          title: "Tout le monde boit"
        }
      };
      two_pledge = {
        __v: 0,
        _id: "51609396b09bb9020000001f",
        description: "Niiiiice",
        title: "Distribue 3 gorgées",
        category: {
          __v: 0,
          _id: "5160915cb09bb90200000004",
          title: "Fais boire"
        }
      };
      pledges_static = [];
      pledges_static.push(one_pledge);
      pledges_static.push(two_pledge);
      shot_played = 0;
      played_card = [];
      nb_card = 2;
      $scope.pledges = pledges_static;
      $scope.current_pledges = [];
      $scope.current_categories = [];
      $scope.show_new_turn = true;
      $scope.first_shot = true;
      $scope.display_pledge = {
        title: "",
        description: ""
      };
      $scope.nb_play = 0;
      $scope.getPledge = function() {
        generateRandomPledges(nb_card);
        played_card = [];
        $scope.show_new_turn = false;
        return $scope.first_shot = false;
      };
      $scope.reveal = function(index_card) {
        var i, pledge, _i, _ref;
        if (played_card[index_card] === void 0) {
          shot_played++;
          pledge = $scope.current_pledges[index_card];
          $scope.current_pledges[index_card].reveal = ' show';
          $scope.display_pledge = pledge.data;
          $scope.actual_class = ' is-card-[number]'.replace('[number]', index_card + 1);
          played_card[index_card] = pledge;
          for (i = _i = 0, _ref = nb_card - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if ($scope.current_categories[i].index === index_card) {
              $scope.current_categories[i].played = true;
            }
          }
          if (shot_played >= nb_card) {
            $scope.show_new_turn = true;
            return shot_played = 0;
          }
        }
      };
      return generateRandomPledges = function(number) {
        var all_pledges, categories, i, index, pledge, pledges, pledges_length, _i;
        all_pledges = $scope.pledges;
        pledges_length = all_pledges.length;
        categories = [];
        pledges = [];
        for (i = _i = 1; 1 <= number ? _i <= number : _i >= number; i = 1 <= number ? ++_i : --_i) {
          pledge = all_pledges[Math.floor(Math.random() * pledges_length)];
          index = Math.floor(Math.random() * number);
          while ((categories[index] != null) && categories[index] !== void 0) {
            index = Math.floor(Math.random() * number);
          }
          categories[index] = {
            data: pledge.category,
            index: i - 1,
            played: false
          };
          pledges.push({
            data: pledge,
            reveal: ''
          });
        }
        console.log(pledges);
        $scope.current_pledges = pledges;
        return $scope.current_categories = categories;
      };
    }
  ]);

}).call(this);