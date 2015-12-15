describe('when setting up loginManager', function(){
	var isloggedIn;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(loginManager, $httpBackend, ApiEndpoint) {
        var toReturn = {"isLoggedIn": false, "method": "password"}
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);
		       
        $httpBackend.flush();
	}));
	
	it('should set login status to false', inject(function(loginManager){
		expect(loginManager.getLoginStatus()).toEqual(false);
	}));

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});