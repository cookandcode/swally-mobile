window.ourApp.factory('Categories', ['$resource', ($resource)->
	$resource('http://swally.herokuapp.com/category')
])