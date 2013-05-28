window.ourApp.factory('Pleges', ['$resource', ($resource)->
    $resource('http://swally.herokuapp.com/pledges.json', {callback: "JSON_CALLBACK"},{
      getAll: {method: 'JSONP'}
    });
])