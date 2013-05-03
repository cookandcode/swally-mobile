describe('Test Pledge controller', ()->
	beforeEach('ourApp')

	ctrl
	scope

	beforeEach(inject(($controller, $rootScope)->
		scope = $rootScope.$new()

		ctrl = $controller('PledgesCtrl',{
			$scope: scope
		})
	))

	# it('test all Pledge', ()->
	# 	scope.pledges = []

	# 	scope.pledges.push({
	# 		titre:'test'
	# 	})

	# )
)