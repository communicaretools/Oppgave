describe('when getting todays daily registration', function(){
	var registration;
	var toReturn = {text: 'hurra'};
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function(registrationService, $httpBackend, ApiEndpoint) {
		$httpBackend.expectGET(ApiEndpoint.registration + '/dailyCollection')
			.respond(toReturn)

		registrationService.getTodaysDaily(function(result){
			registration = result;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return todays registration', function(){
		expect(registration).toBeDefined();
		expect(registration.text).toEqual(toReturn.text);
	});
});