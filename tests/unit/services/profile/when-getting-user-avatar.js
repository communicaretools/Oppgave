describe('when getting user avatar', function(){
	var avatar;
	var userId = 5;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(profileService, $httpBackend, ApiEndpoint) {
        var toReturn = [4,3,64,32,6];
		$httpBackend.expectGET(ApiEndpoint.avatar + '/resource/'+ userId)
			.respond(toReturn);

		var result = profileService.getAvatar(userId, function(result){
			avatar = result.data;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return user data', function(){
		expect(avatar).toBeDefined();
		expect(avatar).toEqual(jasmine.any(Array));
	});
});