describe('when getting a message', function(){
	var message;
	var msgId = 23;
	var toReturn = {id: msgId, subject: 'hurra', content: 'bla bla bla'};
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config'));
	beforeEach(inject(function(messagesService, $httpBackend, ApiEndpoint) {
		$httpBackend.expectGET(ApiEndpoint.messages + '/view/' + msgId)
			.respond(toReturn)

		messagesService.get(msgId, function(result){
			message = result;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return the message', function(){
		expect(message).toBeDefined();
		expect(message.text).toEqual(toReturn.text);
		expect(message.imageIndex).toEqual(toReturn.imageIndex);
	});
});