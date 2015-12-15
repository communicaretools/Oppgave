describe('when getting the threads in a forum', function () {
	beforeEach(module(
		'ionic',
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config',  
		'ReConnectApp.mocks'));
	var myThreadsCtrl; 
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $stateParams, ApiEndpoint){		
		var scope = $rootScope.$new();
		var toReturn = {
			header: null,
			threads: []
		};
		$httpBackend.expectGET(ApiEndpoint.forumThread + '/myThreads')
			.respond(toReturn);
		myThreadsCtrl = $controller('MyThreadsCtrl', {$scope: scope});

		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('My threads should be available in ctrl', function () {
		expect(myThreadsCtrl.header).not.toBeDefined();
		expect(myThreadsCtrl.threads).toEqual([]);
	});
});