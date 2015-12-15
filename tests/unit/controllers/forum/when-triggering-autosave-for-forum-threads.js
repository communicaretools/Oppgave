describe('when triggering autosave for forum entries', function(){
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var forumCtrl;
	var forumId = 5;
	var interval;
	var subject = "test subject";
	var newContent = "newContent";
	var eventNewerContent = 'eventNewerContent';
	var hB;
	var aE;
	
	function setupAutosavePost (content, subject){
		var toPost = {module: "ForumThread", data: JSON.stringify({content: content, subject: subject})};
		hB.expectPOST(aE.autosave + "/autosave/"+forumId, toPost)
			.respond(200);
	};

	function triggerInterval(){
		interval.flush(10001);		
	};

	function setupAndFlushAutosave(content, subject){
		setupAutosavePost(content, subject);
		forumCtrl.newThread['entry-content'] = content;
		forumCtrl.newThread['thread-name'] = subject;
		triggerInterval();
		hB.flush();
	} 

	beforeEach(inject(function($rootScope, $controller, $interval, $stateParams, $httpBackend, ApiEndpoint){
		var scope = $rootScope.$new();
		hB = $httpBackend;
		aE = ApiEndpoint;
		interval = $interval;
		hB.expectGET(ApiEndpoint.autosave + "/autosave/"+forumId+"?module=ForumThread")
				.respond(null);
		$stateParams.forumId = forumId;
		forumCtrl = $controller('ForumCtrl', {
			$scope: scope,
			$interval: interval, 
			$stateParams: $stateParams});
		hB.flush();
	}));

	afterEach(function(){
		hB.verifyNoOutstandingExpectation();
	});

	it('should not save when starting up and triggering for the first time', function(){
		triggerInterval();
	});

	it('should save when with new content', function(){
		setupAndFlushAutosave(newContent, subject);
	});

	it('should not save when content is not changed', function(){
		setupAndFlushAutosave(newContent, subject);

		triggerInterval();
	});

	it('should save when content is changed again', function(){
		setupAndFlushAutosave(newContent, subject);

		triggerInterval();

		setupAndFlushAutosave(eventNewerContent, subject);
	});
});