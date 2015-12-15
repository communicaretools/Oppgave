describe('when getting available forums with one forum', function () {
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
				{id: 1, name: "forum1", "thread-count": 3}
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

    /*it('should go to $state with forum id', inject(function ($state) {
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith("RCA.threads",{forumId:1, onlyOneForum: true});
    }));*/
});