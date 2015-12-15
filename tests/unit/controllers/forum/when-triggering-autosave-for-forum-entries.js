describe('when triggering autosave for forum entries', function(){
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var entryCtrl;
	var threadId = 5;
	var interval;
	var newContent = "newContent";
	var eventNewerContent = 'eventNewerContent';
	var hB;
	var aE;
	var scope;
	
	function setupAutosavePost (content){
		var toPost = {module: "Forum", data: JSON.stringify({content: content, toQuote: null})};
		hB.expectPOST(aE.autosave + "/autosave/"+threadId, toPost)
			.respond(200);
	};

	function setupAndFlushAutosave(content){
		setupAutosavePost(content);
		entryCtrl.newEntry.content = content;
		entryCtrl.newEntry.toQuote = null;
		interval.flush(10001);
		hB.flush();
	} 

	beforeEach(inject(function($controller, $interval, $stateParams, $httpBackend, ApiEndpoint, storageService, $rootScope){
		scope = $rootScope.$new();
		hB = $httpBackend;
		aE = ApiEndpoint;
		interval = $interval;
		storageService.setUser("test");
		var toReturn = {
			header: {id: threadId, name: "thread1"},
			entries: []
		};
		hB.expectGET(aE.forumEntry + '/collection/'+threadId)
			.respond(toReturn);
		hB.expectGET(ApiEndpoint.autosave + "/autosave/"+threadId+"?module=Forum")
				.respond(200);
		$stateParams.threadId = threadId;
		entryCtrl = $controller('ThreadCtrl', {
			$interval: interval, 
			$stateParams: $stateParams,
			$scope: scope 
		});
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
		setupAndFlushAutosave(newContent);
	});

	it('should not save when content is not changed', function(){
		setupAndFlushAutosave(newContent);

		interval.flush(10001);
	});

	it('should save when content is changed again', function(){
		setupAndFlushAutosave(newContent);

		interval.flush(10001);

		setupAndFlushAutosave(eventNewerContent);
	});
});