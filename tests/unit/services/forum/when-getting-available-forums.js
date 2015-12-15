describe("when getting available forums", function(){
	var forums;

	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumService, $httpBackend, ApiEndpoint){
		var toReturn = {
			forums: [
				{id: 1, name: "forum1", "thread-count": 3},
				{id: 2, name: "forum2", "thread-count": 2}
			]
		};
		$httpBackend.expectGET(ApiEndpoint.forum + '/collection')
			.respond(toReturn);

		var result = forumService.get(function(result){
			forums = result.forums;
		})

		$httpBackend.flush();
	}));

	it('should return forums', function(){
		expect(forums).toBeDefined();
		expect(forums).toEqual(jasmine.any(Array));
		expect(forums.length).toBe(2);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
})