describe('when getting the entries in a thread', function () {
	beforeEach(module(
		'ionic',
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config',  
		'ReConnectApp.mocks'));
	var entryCtrl; 
	var threadID = 1;
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $stateParams, ApiEndpoint, storageService){
		var scope = $rootScope.$new();
		storageService.setUser("test");
		var toReturn = {
			header: {id: threadID, name: "thread1"},
			entries: []
		};
		$httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+threadID)
			.respond(toReturn);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+threadID+"?module=Forum")
				.respond(null);
		$stateParams.threadId = threadID;
		entryCtrl = $controller('ThreadCtrl', {$scope: scope, $stateParams: $stateParams});

		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('The thread should be available in ctrl', function () {
		expect(entryCtrl.header).toBeDefined();
		expect(entryCtrl.entries).toEqual([]);
	});
});