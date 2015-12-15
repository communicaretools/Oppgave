describe('when getting my threads', function () {
		var threads = [];    
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumThreadService, $httpBackend, ApiEndpoint){
        $httpBackend.expectGET(ApiEndpoint.forumThread + '/myThreads')
			.respond({
        		header: null,
        		threads: [
        			{id: 1, name: 'text1'},
        			{id: 2, name: 'text2'}
    			]
        });

		var result = forumThreadService.getMyThreads(function(result){
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