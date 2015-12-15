describe('when getting todays smiley registration', function(){
	var registration;
	var toReturn = {text: 'hurra', imageIndex: 5};
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function(registrationService, $httpBackend, ApiEndpoint) {
		$httpBackend.expectGET(ApiEndpoint.registration + '/smileyCollection')
			.respond(toReturn)

		registrationService.getTodaysSmiley(function(result){
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
		expect(registration.imageIndex).toEqual(toReturn.imageIndex);
	});
});