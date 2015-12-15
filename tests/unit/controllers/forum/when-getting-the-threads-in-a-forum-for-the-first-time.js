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
		storageService.setUser("test");
		var toReturn = {
			header: {id: forumId, name: "forum1"},
			threads: []
		};
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

	it('Should set flag for forum visit to true', inject(function (storageService) {
		expect(storageService.local()['forum_'+ forumId]).toEqual(true);
	}));
});