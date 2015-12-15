describe('when getting forum entries', function () {
	var threadId = 42;
	var entries = [];
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumEntryService, $httpBackend, ApiEndpoint){
        $httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+ threadId)
			.respond({
        		header: {id: threadId, name: "Thread1"},
        		entries: [
        			{id: 1, content: 'text1'},
        			{id: 2, content: 'text2'}
    			]
        });

		var result = forumEntryService.get(threadId, function(result){
			entries = result.entries;
		});
        
        $httpBackend.flush();
	}));

	it('should set entries', function(){
		expect(entries).toBeDefined();
		expect(entries.length).toBe(2);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});