describe('when posting forum entry', function () {
	var threadId = 42;
	var success = false;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumEntryService, $httpBackend, ApiEndpoint){
        var toAdd = {content: 'NewContent', toQuote: null};
        var toPost = {"entry-content": toAdd.content};
		$httpBackend.expectPOST(ApiEndpoint.forumEntry + '/collection/'+ threadId, toPost)
			.respond();

		var result = forumEntryService.add(threadId, toAdd, function(){
			success = true;
		});
        
        $httpBackend.flush();
	}));

	it('should complete successfully', function(){
		expect(success).toBe(true);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});