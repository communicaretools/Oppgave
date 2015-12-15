describe('when getting forum threads', function () {
	var forumId = 42;
	var threads = [];    
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumThreadService, $httpBackend, ApiEndpoint){
        $httpBackend.expectGET(ApiEndpoint.forumThread + '/collection/'+ forumId)
			.respond({
        		header: {id: forumId, name: "Forum1"},
        		threads: [
        			{id: 1, name: 'text1'},
        			{id: 2, name: 'text2'}
    			]
        });

		var result = forumThreadService.get(forumId, function(result){
			threads = result.threads;
		});
        
        $httpBackend.flush();
	}));

	it('should set threads', function(){
		expect(threads).toBeDefined();
		expect(threads.length).toBe(2);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});