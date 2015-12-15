describe('when trying to sending a message without subject', function(){
	var msgCtrl;
	var scope;
	
	beforeEach(module(
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($controller, $stateParams, $httpBackend, ApiEndpoint, $rootScope) {
		scope = $rootScope.$new();

		$stateParams.messageId = null;	
		$httpBackend.expectGET(ApiEndpoint.messages + '/send')
			.respond([{id: 1, name: 't'}, {id: 2, name: 'w'}]);	
		msgCtrl = $controller("MessageComposeCtrl", {$scope: scope});
		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have created an empty message', function(){
		expect(msgCtrl.message.subject).toBe('');
		expect(msgCtrl.message.content).toBe('');
		expect(msgCtrl.message.receivers.length).toBe(0);
	});

	it('should have gotten helpers', function(){
		expect(msgCtrl.helpers.length).toBe(2);
	});

	describe('after posting', function(){
		beforeEach(inject(function($rootScope){
			msgCtrl.message.subject = '';
			msgCtrl.message.content = 'Hello';
			msgCtrl.helpers[0].selected = true;
			msgCtrl.addEntry();
	        $rootScope.$digest();
		}));

		it('should not reset form ', function(){
			expect(msgCtrl.message.content).toBe('Hello');
		});
	});
});