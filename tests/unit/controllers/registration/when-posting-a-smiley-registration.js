describe('when posting a registration', function(){
	var regCtrl;
	var dateId;
	beforeEach(module(
		'ionic',
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, autosaveService, ApiEndpoint) {
		$stateParams.regId = null;
		var scope = $rootScope.$new();
		dateId = autosaveService.dateId();
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+dateId+"?module=RegistrationSmiley")
			.respond(null);
		regCtrl = $controller("NewSmileyRegCtrl", {$scope: scope});
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have created an empty', function(){
		expect(regCtrl.newReg.text).toBe('');
		expect(regCtrl.newReg.imageIndex).toBe(-1);
	});

	describe('after posting', function(){
		beforeEach(inject(function($state, $httpBackend, ApiEndpoint){
			$state.expectTransitionTo('RCA.registration');
			var toPost= {text: 'hurra', imageIndex: 5};

			$httpBackend.expectPOST(ApiEndpoint.registration + '/smileyCollection', toPost)
				.respond(200);
			$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosave/"+dateId+"?module=RegistrationSmiley")
				.respond(200);
				
			regCtrl.newReg.text = toPost.text;
			regCtrl.selectSmiley(toPost.imageIndex);
			regCtrl.sendRegistration('smiley');
	        $httpBackend.flush();
		}));

		it('should change state back to the list', inject(function($state){
			$state.ensureAllTransitionsHappened();
		}));
	});
});