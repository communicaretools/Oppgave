describe('when triggering autosave for messages', function(){
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var composeCtrl;
	var msgId = 5;
	var interval;
	var newContent = "newContent";
	var eventNewerContent = 'eventNewerContent';
	var hB;
	var aE;
    var scope;
	
	function setupAutosavePost (content, subject){
		var toPost = {id: msgId, rawContent: content, subject: subject, inReplyTo: null, receivers: [1]};
		hB.expectPOST(aE.messages + "/drafts", toPost)
			.respond(toPost);
	};

	function setupAndFlushAutosave(content, subject){
		setupAutosavePost(content, subject);
		composeCtrl.message.content = content;
		composeCtrl.message.subject = subject;
		interval.flush(10001);
		hB.flush();
	} 

	beforeEach(inject(function($controller, $interval, $stateParams, $httpBackend, ApiEndpoint, storageService, $rootScope){
		hB = $httpBackend;
		aE = ApiEndpoint;
		interval = $interval;
		storageService.setUser("test");
		scope = $rootScope.$new();
		
		var toReturn = {id: msgId, subject: "test", content: "bla bla bla", receivers:  [{id: 1}]};
		hB.expectGET(ApiEndpoint.messages + '/send')
			.respond([{id: 1, name: 't'}, {id: 2, name: 'w'}]);	
		hB.expectGET(ApiEndpoint.messages + "/view/"+msgId)
				.respond(toReturn);
		$stateParams.messageId = msgId;
		composeCtrl = $controller('MessageComposeCtrl', {
			$interval: interval, 
			$stateParams: $stateParams,
			$scope: scope});
		hB.flush();
	}));

	afterEach(inject(function($localStorage){
		hB.verifyNoOutstandingExpectation();
		$localStorage.$reset();
	}));

	it('should not save when starting up and triggering for the first time', function(){
		interval.flush(10001);
	});

	it('should save when with new content', function(){
		setupAndFlushAutosave(newContent, '');
	});

	it('should not save when content is not changed', function(){
		setupAndFlushAutosave(newContent,'');

		interval.flush(10001);
	});

	it('should save when content is changed again', function(){
		setupAndFlushAutosave(newContent,'');

		interval.flush(10001);

		setupAndFlushAutosave(eventNewerContent,'');
	});
});