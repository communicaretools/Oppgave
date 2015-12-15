describe('when posting a registration', function(){
	var added;
	var regType = 'smiley';
	beforeEach(module(
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function(registrationService, $httpBackend, ApiEndpoint) {
		var toPost= {text: 'hurra', imageIndex: 5};
		$httpBackend.expectPOST(ApiEndpoint.registration + '/'+ regType +'Collection', toPost)
			.respond(200)
		
		registrationService.add(regType, toPost, function(result){
			added = true;
		});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should registrate successfully', function(){
		expect(added).toBe(true);
	});
});