describe('when getting a forum with no forumid set', function () {
	beforeEach(module(
		'ionic',
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'
	));
	var forumCtrl; 
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $state, $stateParams, ApiEndpoint){		
		var scope = $rootScope.$new();
		$stateParams.forumId = null;
		$state.expectTransitionTo('RCA.forum');
		forumCtrl = $controller('ThreadsListCtrl', {$scope: scope});
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('The forums should not be available in ctrl', function () {
		expect(forumCtrl.header).toEqual({});
		expect(forumCtrl.threads).toEqual([]);
	});

    it('should go to $state with forum id', inject(function ($state) {
		$state.ensureAllTransitionsHappened();
    }));
});