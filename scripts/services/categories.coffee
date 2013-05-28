window.ourApp.factory('Categories', ['$resource', ($resource)->
    $resource('http://swally.herokuapp.com/categories/:categoryId.json',{categoryId: '@id', callback: "JSON_CALLBACK"}, {
        getById: {method: 'JSONP', isArray: true}
    })
])