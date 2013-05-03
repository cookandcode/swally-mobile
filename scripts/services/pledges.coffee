window.ourApp.factory('Pleges', ['$resource', ($resource)->
	$resource('http://swally.herokuapp.com/pledges')
])