describe('when getting a registration', function(){
	var regCtrl;
	var regId = 23;
	var regType = 'Smiley';
	var toReturn = {text: 'hurra', imageIndex: 5};
	beforeEach(module(
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($controller, $stateParams, $httpBackend, ApiEndpoint) {
		$stateParams.regId = regId;
		$stateParams.type = regType;
		$httpBackend.expectGET(ApiEndpoint.registration + '/'+regType+'/' + regId)
			.respond(toReturn)

		regCtrl = $controller("ViewRegCtrl", {$stateParams: $stateParams});

        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should get the registration for ctrl', function(){
		expect(regCtrl.reg).toBeDefined();
		expect(regCtrl.reg.text).toEqual(toReturn.text);
		expect(regCtrl.reg.imageIndex).toEqual(toReturn.imageIndex);
	});
});