describe('when getting logout', function(){
	var success;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(loginManager, $httpBackend, ApiEndpoint) {
		success = null;
        
        var toReturn = {"isLoggedIn": false, "method": "password"}
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);
		
        var toPost = {"username": "testUsername", "password": "testPassword"}
		$httpBackend.expectGET(ApiEndpoint.auth + '/logout')
			.respond();

		var result = loginManager.logout(function(){
			success = true;
		});
        
        $httpBackend.flush();
	}));
	
	it('should be successfull', function(){
		expect(success).toBeDefined();
		expect(success).toBe(true);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});