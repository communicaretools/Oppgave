describe('when posting to login', function(){
	var success;
	var isLoggedIn;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(loginManager, $httpBackend, ApiEndpoint) {
		success = null;
		var loginManager = loginManager;
        var toPost = {"username": "testUsername", "password": "testPassword"}
        var toReturn = {"isLoggedIn": false, "method": "password"}
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);
		$httpBackend.expectPOST(ApiEndpoint.auth + '/login', toPost)
			.respond();

		var result = loginManager.login(toPost.username, toPost.password, function(){
			success = true;
		}, function(){success = false});
        
        $httpBackend.flush();
        isLoggedIn = loginManager.getLoginStatus();
	}));
	
	it('should be successfull', function(){
		expect(success).toBeDefined();
		expect(success).toBe(true);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should update loginStatus in', function () {
		expect(isLoggedIn).toBe(true);
	});
});