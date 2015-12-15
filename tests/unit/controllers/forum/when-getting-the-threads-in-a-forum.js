describe('when getting the threads in a forum', function () {
	beforeEach(module(
		'ionic',
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config',  
		'ReConnectApp.mocks'));
	var forumCtrl; 
	var forumId = 1;
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $stateParams, ApiEndpoint, storageService){
		var scope = $rootScope.$new();
		var toReturn = {
			header: {id: forumId, name: "forum1"},
			threads: []
		};
        storageService.setUser("test");
		$httpBackend.expectGET(ApiEndpoint.forumThread + '/collection/'+forumId)
			.respond(toReturn);

		$stateParams.forumId = forumId;
		forumCtrl = $controller('ThreadsListCtrl', {$scope: scope});

		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend, $localStorage){
		$httpBackend.verifyNoOutstandingExpectation();
		$localStorage.$reset();
	}));

	it('The forum should be available in ctrl', function () {
		expect(forumCtrl.header).toBeDefined();
		expect(forumCtrl.threads).toEqual([]);
	});
});