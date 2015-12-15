describe('when getting a list of messages', function(){
	var scope;
	var msgViewCtrl;
	var msgId = 42;
	var toReturn = {id: 1, subject: "test", content: "bla bla bla", receivers: {id: 1}};
	beforeEach(module(
		'ionic',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config'));
	beforeEach(inject(function($controller, $httpBackend, $stateParams, messagesService, ApiEndpoint, $rootScope){
		scope = $rootScope.$new();

		$stateParams.messageId = msgId;
		$httpBackend.expectGET(ApiEndpoint.messages + "/view/"+msgId)
			.respond(toReturn);
		msgViewCtrl = $controller('MessageViewCtrl', {$scope: scope});
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return the message', function(){
		expect(msgViewCtrl.message).toBeDefined();
		expect(msgViewCtrl.message.subject).toEqual(toReturn.subject);
	});
	
	it('should set canReply to false', function(){
		expect(msgViewCtrl.message.canBeReplied).toBe(false);
	});
})