describe('when sending a message', function(){
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
		beforeEach(inject(function($state, $httpBackend, ApiEndpoint){
			$state.expectTransitionTo('RCA.messages.outbox');
			var toPost= {
				id: null, 
				receivers: [msgCtrl.helpers[0].id], 
				inReplyTo: null, 
				subject: 'hurra', 
				rawContent: 'test'
			};
			$httpBackend.expectPOST(ApiEndpoint.messages + '/send', toPost)
				.respond(200);
			msgCtrl.message.subject = toPost.subject;
			msgCtrl.message.content = toPost.rawContent;
			msgCtrl.helpers[0].selected = true;
			msgCtrl.addEntry();
	        $httpBackend.flush();
		}));

		it('should change state back to the list', inject(function($state){
			$state.ensureAllTransitionsHappened();
		}));
	});
});