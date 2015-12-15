describe('when deleting a draft', function(){
	var msgCtrl;
	var msgId = 2;
	beforeEach(module(
		'ionic',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	beforeEach(inject(function($controller, $httpBackend, $stateParams, messagesService, ApiEndpoint){
		var toReturn = {messages: [{id: 1}, {id: msgId}, {id: 3}]};
		$httpBackend.expectGET(ApiEndpoint.messages + "/drafts?page=1")
			.respond(toReturn);
		$stateParams.box = "drafts";
		msgCtrl = $controller('MessageListCtrl', {});
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return messages list', function(){
		expect(msgCtrl.messages).toBeDefined();
		expect(msgCtrl.messages).toEqual(jasmine.any(Array));
		expect(msgCtrl.messages.length).toBe(3);
	});

	describe('after deleting', function(){
		beforeEach(inject(function($httpBackend, ApiEndpoint){
			$httpBackend.expectDELETE(ApiEndpoint.messages + '/drafts/' + msgId)
				.respond(200);
			msgCtrl.deleteMessage(msgCtrl.messages[1]);
	        $httpBackend.flush();
		}));

		it('should have removed the item', function(){
			expect(msgCtrl.messages.length).toBe(2);
		});
	})
})