describe('when getting the message box', function(){
	var msgCtrl;
	var box;
	var toReturn = {messages: [{id: 1}, {id: 2}, {id: 3}]};		
	beforeEach(module(
		'ionic',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	
	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	describe('for inbox', function(){
		box = 'inbox';
		beforeEach(inject(function($controller, $httpBackend, $stateParams, ApiEndpoint){
			$httpBackend.expectGET(ApiEndpoint.messages + "/"+box+"?page=1")
				.respond(toReturn);
			$stateParams.box = box;
			msgCtrl = $controller('MessageListCtrl', {});
	        $httpBackend.flush();	
		}));

		it('should return messages list', function(){
			expect(msgCtrl.messages).toBeDefined();
			expect(msgCtrl.messages).toEqual(jasmine.any(Array));
			expect(msgCtrl.messages.length).toBe(3);
		});
	});
	describe('for outbox', function(){
		box = 'outbox';
		beforeEach(inject(function($controller, $httpBackend, $stateParams, ApiEndpoint){
			$httpBackend.expectGET(ApiEndpoint.messages + "/"+box+"?page=1")
				.respond(toReturn);
			$stateParams.box = box;
			msgCtrl = $controller('MessageListCtrl', {});
	        $httpBackend.flush();	
		}));

		it('should return messages list', function(){
			expect(msgCtrl.messages).toBeDefined();
			expect(msgCtrl.messages).toEqual(jasmine.any(Array));
			expect(msgCtrl.messages.length).toBe(3);
		});
	});
	describe('for drafts', function(){
		box = 'drafts';
		beforeEach(inject(function($controller, $httpBackend, $stateParams, ApiEndpoint){
			$httpBackend.expectGET(ApiEndpoint.messages + "/"+box+"?page=1")
				.respond(toReturn);
			$stateParams.box = box;
			msgCtrl = $controller('MessageListCtrl', {});
	        $httpBackend.flush();	
		}));

		it('should return messages list', function(){
			expect(msgCtrl.messages).toBeDefined();
			expect(msgCtrl.messages).toEqual(jasmine.any(Array));
			expect(msgCtrl.messages.length).toBe(3);
		});
	});
})