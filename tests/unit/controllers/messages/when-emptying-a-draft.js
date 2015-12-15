describe('when cancelling or emptying a draft', function(){
	var scope;
	var msgCtrl;
	var msgId = 5;
	var helpersToReturn = [{id: 1, name: 't'}, {id: 2, name: 'w'}];
	var msgToReturn = {id: msgId, subject: "test", content: "bla bla bla", receivers: [{id: 2}]};	
	beforeEach(module(
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($controller, $stateParams, $httpBackend, ApiEndpoint, $rootScope) {
		scope = $rootScope.$new();
		$stateParams.messageId = msgId;	
		$httpBackend.expectGET(ApiEndpoint.messages + '/send')
			.respond(helpersToReturn);	
		$httpBackend.expectGET(ApiEndpoint.messages + "/view/"+msgId)
			.respond(msgToReturn);
		msgCtrl = $controller("MessageComposeCtrl", {$scope: scope});
		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have created an empty message', function(){
		expect(msgCtrl.message.subject).toBe(msgToReturn.subject);
		expect(msgCtrl.message.content).toBe(msgToReturn.content);
		expect(msgCtrl.message.receivers.length).toBe(msgToReturn.receivers.length);
	});

	it('should have gotten helpers', function(){
		expect(msgCtrl.helpers.length).toBe(helpersToReturn.length);
	});
	
	describe('when emptying', function(){
		beforeEach(inject(function($rootScope, $httpBackend){
			msgCtrl.empty();
			$rootScope.$digest();
		}));

		it('should have an empty message', function(){
			expect(msgCtrl.message.subject).toBe('');
			expect(msgCtrl.message.content).toBe('');
			expect(msgCtrl.message.receivers.length).toBe(0);
		});
	});
});