describe('when getting available forums with more than one forum', function () {
	beforeEach(module(
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	var forumListCtrl; 
	beforeEach(inject(function($controller, $httpBackend, ApiEndpoint){		
		var toReturn = 
			{
				forums: [
					{id: 1, name: "forum1", "thread-count": 3},
					{id: 2, name: "forum2", "thread-count": 2}
				]
			};
		$httpBackend.expectGET(ApiEndpoint.forum + '/collection')
			.respond(toReturn);
		forumListCtrl = $controller('ForumListCtrl', {});

		$httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('The forums should be available in ctrl', function () {
		expect(forumListCtrl.forums).toBeDefined();
		expect(forumListCtrl.forums.length).toBe(2);
	});

    it('should not call $state', inject(function ($state) {
		$state.ensureAllTransitionsHappened();
    }));
});