describe('when deleting an entry returns forbidden', function () {
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var scope;
	var entryCtrl;
	var entryId = 3;
	var threadId = 5;
	beforeEach(inject(function($controller, $stateParams, $httpBackend, ApiEndpoint, $rootScope, storageService){
		scope = $rootScope.$new();
		storageService.setUser("test");
		var toReturn = {
			header: {id: threadId, name: "thread1"},
			entries: [
				{id: 1, content: 'bla', isDeleted: false},
				{id: 2, content: 'bla bla', isDeleted: false},
				{id: entryId, content: 'bla bla bla', isDeleted: false}
			]
		};
		$stateParams.threadId = threadId;
		$httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+threadId)
			.respond(toReturn);		
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+threadId+"?module=Forum")
				.respond(null);
		entryCtrl = $controller('ThreadCtrl', {$stateParams: $stateParams, $scope: scope});
        
        $httpBackend.flush();
		$httpBackend.expectDELETE(ApiEndpoint.forumEntry + '/resource/'+entryId)
			.respond(403);
		entryCtrl.deleteEntry(entryCtrl.entries[2]);
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it("should not change number of entries", function(){
		expect(entryCtrl.entries.length).toEqual(3);
	});

	it("should not mark item", function(){
		expect(entryCtrl.entries[2].content).toEqual('bla bla bla');
		expect(entryCtrl.entries[2].isDeleted).toBe(false);
	});
});