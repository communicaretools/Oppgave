describe('when updating a registration', function(){
	var updated;
	var regId = 23;
	var regType = 'smiley';
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function(registrationService, $httpBackend, ApiEndpoint) {
		var toPost= {text: 'hurra', imageIndex: 5};
		$httpBackend.expectPATCH(ApiEndpoint.registration + '/'+ regType +'/'+regId, toPost)
			.respond(200)
		
		registrationService.update(regType, regId, toPost, function(result){
			updated = true;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should update successfully', function(){
		expect(updated).toBe(true);
	});
});