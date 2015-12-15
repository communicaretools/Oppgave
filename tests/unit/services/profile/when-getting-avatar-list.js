describe('when getting user avatar', function(){
	var avatars;
	var userId = 5;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(profileService, $httpBackend, ApiEndpoint) {
        var toReturn = ["test1", "test2", "test3"];
		$httpBackend.expectGET(ApiEndpoint.avatar + '/collection')
			.respond(toReturn);

		var result = profileService.avatarList(function(result){
			avatars = result.data;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return user data', function(){
		expect(avatars).toBeDefined();
		expect(avatars).toEqual(jasmine.any(Array));
		expect(avatars.length).toBe(3);
	});
});