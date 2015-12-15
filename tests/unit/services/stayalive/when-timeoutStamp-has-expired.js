describe('when session has expired', function(){
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks', 
		'ngStorage'));
	beforeEach(inject(function(stayalive, sessionTimeout, $httpBackend, ApiEndpoint, $state){
		var toReturn = {"isLoggedIn": true, "method": "password"};
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);
		$httpBackend.flush(); 
		stayalive.setup();
		$httpBackend.expectGET(ApiEndpoint.auth + '/logout')
			.respond(200);
	}));
	
	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should log the user out, and return the user to login ', inject(function ($interval, $httpBackend, stayalive, sessionTimeout, timeoutIntervalFrequecy, $state) {
		$interval.flush(timeoutIntervalFrequecy);
		var expired = Date.now() + sessionTimeout + 3;
		spyOn(Date, 'now').and.returnValue(expired);
		$state.expectTransitionTo('RCA.login');
		$interval.flush(timeoutIntervalFrequecy);
		$httpBackend.flush();
		$state.ensureAllTransitionsHappened();
		expect(stayalive.get().$$state.value).toEqual('canceled');
	}));
});