describe('when posting forum entry', function () {
	var forumId = 42;
	var success = false;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumThreadService, $httpBackend, ApiEndpoint){
        var toPost = {"entry-content": "content", "thread-name": "Name"};
		$httpBackend.expectPOST(ApiEndpoint.forumThread + '/collection/'+ forumId, toPost)
			.respond();

		var result = forumThreadService.add(forumId, toPost, function(){
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