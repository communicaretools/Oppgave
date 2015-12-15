describe('when settign up stayalive session', function(){
	
	var setup;
	var $intervalSpy = function (fn, interval){
		setup = {fn: fn, interval: interval};
	};

	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks', 'ngStorage', function ($provide) {
		$provide.value('$interval', $intervalSpy);
	}));
	
	beforeEach(inject(function(stayalive, $httpBackend, ApiEndpoint){
		var toReturn = {"isLoggedIn": true, "method": "password"};
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);

		stayalive.setup();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	

	it('should setup session with a function and a interval value', inject(function ($interval, stayalive, timeoutIntervalFrequecy) {
		expect(setup.interval).toBe(timeoutIntervalFrequecy);
		expect(setup.fn.name).toBe("checkTimeStamp");
	}));
});