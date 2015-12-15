describe('when trying to sending a message without receivers', function(){
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

	it('should not have warning bool defined', function(){
		expect(msgCtrl.showNoReceiverWarning).not.toBeDefined();
	});

	describe('after posting', function(){
		beforeEach(inject(function($rootScope){
			msgCtrl.message.subject = 'testSubject';
			msgCtrl.message.content = 'testContent';
			msgCtrl.addEntry();
	        $rootScope.$digest();
		}));

		it('should show warning', function(){
			expect(msgCtrl.showNoReceiverWarning).toBe(true);
		});

		it('should reset warning after selecting a receiver', function(){
			msgCtrl.resetReceiverWarning();
			expect(msgCtrl.showNoReceiverWarning).toBe(false);
		});
	});
});