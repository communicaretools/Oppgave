describe('when sending a message', function(){
	var added;
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config'));
	beforeEach(inject(function(messagesService, $httpBackend, ApiEndpoint) {
		var toPost= {subject: 'hurra', content: 'bla bla bla'};
		$httpBackend.expectPOST(ApiEndpoint.messages + '/send', toPost)
			.respond(200)
		
		messagesService.add(toPost, function(result){
			added = true;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should send successfully', function(){
		expect(added).toBe(true);
	});
});