describe('when getting a list of messages', function(){
	var messages;
	beforeEach(module(
		'ReConnectApp.services',
		'ReConnectApp.config'));
	beforeEach(inject(function(messagesService, $httpBackend, ApiEndpoint){
		var toReturn = {messages: [{id: 1}, {id: 2}, {id: 3}]};
		$httpBackend.expectGET(ApiEndpoint.messages + "/inbox?page=1")
			.respond(toReturn);

		messagesService.getList('inbox', 1, function(result){
			messages = result;
		});

        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return messages list', function(){
		expect(messages).toBeDefined();
		expect(messages).toEqual(jasmine.any(Array));
		expect(messages.length).toBe(3);
	});
})