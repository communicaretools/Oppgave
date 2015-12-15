describe('when getting a forum with an autosaved thread', function(){
	beforeEach(module(
		'ionic',
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var forumCtrl;
	var forumId = 3;
	var autosaveThread;
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, ApiEndpoint){
		var scope = $rootScope.$new();
		$stateParams.forumId = forumId;
		autosaveThread = {
			'subject': 'autosaved name',
			'content': 'autosaved content'
		};
		var autosaveData = {data: autosaveThread};
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+forumId+"?module=ForumThread")
			.respond(autosaveThread);
		forumCtrl = $controller('ForumCtrl', {$scope: scope});
		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should set new thread from autosave', function () {
		expect(forumCtrl.newThread['entry-content']).toBe(autosaveThread.content);
		expect(forumCtrl.newThread['thread-name']).toBe(autosaveThread.subject);
	});
});