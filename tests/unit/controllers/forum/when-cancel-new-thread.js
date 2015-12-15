describe('when adding a new entry to a thread', function () {
	beforeEach(module(
		'ionic',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var forumCtrl;
	var forumId = 5;
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, ApiEndpoint){
		var scope = $rootScope.$new();
		$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosave/"+forumId+"?module=ForumThread")
			.respond(200);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+forumId+"?module=ForumThread")
				.respond(null);
		$stateParams.forumId = forumId;
		forumCtrl = $controller('ForumCtrl', {$scope: scope, $stateParams: $stateParams});
		forumCtrl.newThread = {
			'entry-content': "Blalala djakld k",
			'thread-name': "alga"
		};
		forumCtrl.newThreadModal = {
			hide: jasmine.createSpy("modalHide"),
			remove: jasmine.createSpy("modalRemove")
		};
		forumCtrl.cancelThread();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should clear newThread', function () {
		expect(forumCtrl.newThread).toEqual({'entry-content':'', 'thread-name': ''});
	});

	it('should close and remove modal', function () {
		expect(forumCtrl.newThreadModal.hide).toHaveBeenCalled();
		expect(forumCtrl.newThreadModal.remove).toHaveBeenCalled();
	});
});