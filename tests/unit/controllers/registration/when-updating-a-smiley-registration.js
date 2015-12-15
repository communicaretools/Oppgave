describe('when updating a registration', function(){
	var regCtrl;
	var regId = 23;
	beforeEach(module(
		'ionic',
		'angularMoment',
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, resources, ApiEndpoint) {
		$stateParams.regId = regId;
		var scope = $rootScope.$new();
		var toReturn = {id: regId, text: 'bæ', imageIndex: 8};

		$httpBackend.expectGET(ApiEndpoint.registration + '/smiley/'+regId)
			.respond(toReturn);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosaveGuid/"+regId+"?module=RegistrationSmiley")
			.respond(null);

		regCtrl = $controller("NewSmileyRegCtrl", {$scope: scope});
        $httpBackend.flush();		
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have loaded the original', function(){
		expect(regCtrl.newReg.id).toBe(regId);
	});

	it('should be valid to submit', function(){
		expect(regCtrl.validToSubmit()).toBe(true);
	});

	describe('after patching', function(){
		beforeEach(inject(function($state, $httpBackend, ApiEndpoint){
			$state.expectTransitionTo('RCA.registration');
			var toPatch = {text: 'hurra', imageIndex: 5, id: regId};

			$httpBackend.expectPATCH(ApiEndpoint.registration + '/smiley/'+regId, toPatch)
				.respond(200);
			$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosaveGuid/"+regId+"?module=RegistrationSmiley")
				.respond(200);
				
			regCtrl.newReg.text = toPatch.text;
			regCtrl.selectSmiley(toPatch.imageIndex);
			regCtrl.updateRegistration('smiley');
	        $httpBackend.flush();
		}));

		it('should change state back to the list', inject(function($state){
			$state.ensureAllTransitionsHappened();
		}));
	});
});