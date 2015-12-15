describe('when selecting a new usernames', function(){
	var success;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(profileService, $httpBackend, ApiEndpoint) {
        var username = 'test';
		$httpBackend.expectPOST(ApiEndpoint.profile + '/changeUsername', {name: username})
			.respond(200);

		var result = profileService.changeUsername(username, function(){
			success = true;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should succeed', function(){
		expect(success).toEqual(true);
	});
});