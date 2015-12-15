describe('when marking a forum entry as deleted', function() {
	var markedEntry;
	var entryId = 3;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumEntryService, $httpBackend, ApiEndpoint){
        $httpBackend.expectDELETE(ApiEndpoint.forumEntry + '/resource/'+ entryId)
			.respond(200, {id: 3, content: '', isDeleted: true});

		var result = forumEntryService.delete(entryId, function(result){
			markedEntry = result;
		});
        
        $httpBackend.flush();
	}));

	it('should return the entry', function(){
		expect(markedEntry).toBeDefined();
		expect(markedEntry.isDeleted).toBe(true);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});