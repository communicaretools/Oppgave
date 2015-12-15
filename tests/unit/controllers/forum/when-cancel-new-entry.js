describe('when adding a new entry to a thread', function () {
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var scope;
	var entryCtrl;
	var threadId = 5;
	beforeEach(inject(function($controller, $stateParams, $httpBackend, ApiEndpoint, $rootScope){
		scope = $rootScope.$new();
		var toReturn = {
			header: {id: threadId, name: "thread1"},
			entries: []
		};
		$httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+threadId)
			.respond(toReturn);		
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+threadId+"?module=Forum")
				.respond(null);
		$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosave/"+threadId+"?module=Forum")
			.respond(200);
		$stateParams.threadId = threadId;
		entryCtrl = $controller('ThreadCtrl', {$stateParams: $stateParams, $scope: scope});
		entryCtrl.newEntry = {
			content: "Blalala djakld k",
		};
		entryCtrl.cancelNewEntry();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should clear newEntry ', function () {
		expect(entryCtrl.newEntry).toEqual({content:'', toQuote: null});
	});

	it('should clear selected ', function () {
		expect(entryCtrl.selected).toBe(null);
	});
});