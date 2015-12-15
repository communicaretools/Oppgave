describe('when-successful-requests-are-made', function(){
	var mockRequestCounter = {
		"getSuccess": function () {
			return 1;
		}
	}
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks', 
		'ngStorage', function($provide){
		$provide.value('requestCounter', mockRequestCounter)
	}));
	beforeEach(inject(function(stayalive, sessionTimeout, $httpBackend, ApiEndpoint, $state){
		var toReturn = {"isLoggedIn": true, "method": "password"};
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);
		$httpBackend.flush(); 
		stayalive.setup();
	}));
	
	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should not log the user out if there have been a successful request', 
		inject(function ($interval, $httpBackend, stayalive, sessionTimeout, timeoutIntervalFrequecy, $state) {
			$interval.flush(timeoutIntervalFrequecy);
			var expired = Date.now() + sessionTimeout + 3;
			spyOn(Date, 'now').and.returnValue(expired);
			$interval.flush(timeoutIntervalFrequecy);
			$state.ensureAllTransitionsHappened();
			expect(stayalive.get().$$state.value).not.toEqual('canceled');
	}));
});