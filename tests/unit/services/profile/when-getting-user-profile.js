describe('when getting user profile', function(){
	var userData;
	var userId = 5;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(profileService, $httpBackend, ApiEndpoint) {
        var toReturn = {"userId": userId, "userName": "testUser"}
		$httpBackend.expectGET(ApiEndpoint.profile + '/userdata')
			.respond(toReturn);

		var result = profileService.get(function(result){
			userData = result.data;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return user data', function(){
		expect(userData).toBeDefined();
		expect(userData.userName).toEqual("testUser");
		expect(userData.userId).toEqual(userId);
	});
});