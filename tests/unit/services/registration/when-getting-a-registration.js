describe('when getting a registration', function(){
	var registration;
	var regId = 23;
	var regType = 'smiley';
	var toReturn = {text: 'hurra', imageIndex: 5};
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function(registrationService, $httpBackend, ApiEndpoint) {
		$httpBackend.expectGET(ApiEndpoint.registration + '/'+regType+'/' + regId)
			.respond(toReturn)

		registrationService.get(regType, regId, function(result){
			registration = result;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return the registration', function(){
		expect(registration).toBeDefined();
		expect(registration.text).toEqual(toReturn.text);
		expect(registration.imageIndex).toEqual(toReturn.imageIndex);
	});
});