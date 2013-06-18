window.ourApp.controller('PledgesCtrl', ['$scope','Pleges', 'sharedServices','$q','$http', ($scope, Pledges, sharedServices, $q, $http)->

  # one_pledge = {
  #       __v:0
  #       _id: "516094ddb09bb9020000002d"
  #       description: "Wééééé"
  #       title: "Les filles boivent"
  #       category:{
  #           __v: 0
  #           _id: "516092b6b09bb90200000012"
  #           title: "Mini-jeu"
  #       }
  # }

  # two_pledge = {
  #   __v:0
  #   _id: "51609396b09bb9020000001f"
  #   description: "Niiiiice"
  #   title: "Distribue 3 gorgées"
  #   category:{
  #       __v: 0
  #       _id: "5160915cb09bb90200000004"
  #       title: "Mini-jeu"
  #   }
  # }

  # pledges_static = []
  # pledges_static.push(one_pledge)
  # pledges_static.push(two_pledge)
  
  shot_played = 0
  played_card = []
  nb_card     = 4

  $scope.pledges = Pledges.getAll(()->
    $scope.pledges = $scope.pledges.data;
    console.log $scope.pledges
  )

  $scope.pledges =  Pledges.query() #pledges_static


  $scope.current_pledges = []
  $scope.current_categories = []
  $scope.show_new_turn = true
  $scope.first_shot = true
  $scope.display_pledge =
    title: "",
    description: ""

  $scope.nb_play = 0


  #MYCODE
  $scope.current_mini_game = []
  $scope.show_mini_game = false

  $scope.$on('show-mini-game', ()->
    $scope.show_mini_game = sharedServices.show_mini_game
    $scope.current_mini_game = sharedServices.current_mini_game
  )

  $scope.getPledge = ()->
    generateRandomPledges(nb_card)

    played_card = []
    $scope.show_new_turn = false
    $scope.first_shot = false



  $scope.reveal = (index_card)->
    if (played_card[index_card] == undefined)
      shot_played++;

      pledge = $scope.current_pledges[index_card]
      $scope.current_pledges[index_card].reveal = ' show'
      $scope.display_pledge = pledge.data
      $scope.actual_class = (' is-card-[number]').replace('[number]', index_card + 1)

      played_card[index_card] = pledge
      for i in [0..nb_card-1]
        if ($scope.current_categories[i].index == index_card)
          $scope.current_categories[i].played = true

      if (shot_played >= nb_card)
        $scope.show_new_turn = true
        shot_played = 0

      #MYCODE
      if $scope.current_pledges[index_card].data.category.title == 'Mini-jeu'
        sharedServices.showMiniGame({
            url: './views/_game.html'
        })
    

  


  generateRandomPledges = (number)->
    all_pledges = $scope.pledges
    pledges_length = all_pledges.length
    categories = []
    pledges = []


    # // Generate random pledeges.
    for i in [1..number]
        pledge = all_pledges[Math.floor(Math.random() * pledges_length)]
        index  = Math.floor(Math.random() * number)

        # // Get index category.
        while(categories[index]? && categories[index] != undefined)
            index  = Math.floor(Math.random() * number);

      
        # // Push datas.
        categories[index] = {
            data: pledge.category,
            index : i - 1,
            played: false
        }

        pledges.push({
            data: pledge,
            reveal : ''
        })

    # // Set in scope.
    $scope.current_pledges = pledges;
    $scope.current_categories = categories;

    
])