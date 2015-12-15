describe('when posting to login', function(){
	var success;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(profileService, $httpBackend, ApiEndpoint) {
		success = null;
		var newAvatar = "test";
        var toPost = {"avatar": newAvatar}
		$httpBackend.expectPOST(ApiEndpoint.avatar + '/resource', toPost)
			.respond();

		var result = profileService.saveAvatar(newAvatar, function(){
			success = true;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should be successfull', function(){
		expect(success).toBeDefined();
		expect(success).toBe(true);
	});
});