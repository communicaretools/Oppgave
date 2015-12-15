describe('when checking new usernames', function(){
	var check;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(profileService, $httpBackend, ApiEndpoint) {
        var username = 'test';
		$httpBackend.expectGET(ApiEndpoint.profile + '/changeUsername?newName='+ username)
			.respond(true);

		var result = profileService.checkUsername(username, function(r){
			check = r.data;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should return a true', function(){
		expect(check).toEqual(true);
	});
});