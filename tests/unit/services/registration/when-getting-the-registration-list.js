describe('when getting the registration list', function(){
	var registrations;
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function(registrationService, $httpBackend, ApiEndpoint) {
        var toReturn = {registrations: [{type:'daily'}, {type:'smiley'}, {type:'smiley'}]};
		$httpBackend.expectGET(ApiEndpoint.registration + '/collection')
			.respond(toReturn);

		registrationService.getList(function(result){
			registrations = result;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should return registration list', function(){
		expect(registrations).toBeDefined();
		expect(registrations).toEqual(jasmine.any(Array));
		expect(registrations.length).toBe(3);
	});
});