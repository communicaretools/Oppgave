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
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, ApiEndpoint) {
		$stateParams.regId = regId;
		var scope = $rootScope.$new();
		var toReturn = {
			id: regId,
			data: {
				generalSatisfaction: 6,
				handledTheDay: 3,
				numberOfHoursSlept: 5,
				numberOfMinutesInPhysicalActivity: 66,
				qualityOfSleep: 0,
				satisfactionWithDiet: 3,
				satisfactionWithPhysicalActivity: 7,
				satisfactionWithSocialRelations: 8,
				takenMedications: 1
			}
		};
		$httpBackend.expectGET(ApiEndpoint.registration + '/daily/'+regId)
			.respond(toReturn);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosaveGuid/"+regId+"?module=RegistrationDaily")
			.respond(null);

		regCtrl = $controller("NewDailyRegCtrl", {$scope: scope});
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have loaded the original', function(){
		expect(regCtrl.newReg.id).toBe(regId);
	});

	describe('after patching', function(){
		beforeEach(inject(function($state, $httpBackend, ApiEndpoint){
			$state.expectTransitionTo('RCA.registration');
			var toPost= {
				generalSatisfaction: 2,
				handledTheDay: 4,
				numberOfHoursSlept: 4,
				numberOfMinutesInPhysicalActivity: 126,
				qualityOfSleep: 2,
				satisfactionWithDiet: 40,
				satisfactionWithPhysicalActivity: 4,
				satisfactionWithSocialRelations: 2,
				takenMedications: 1
			};
			$httpBackend.expectPATCH(ApiEndpoint.registration + '/daily/'+regId, toPost)
				.respond(200);
			$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosaveGuid/"+regId+"?module=RegistrationDaily")
				.respond(200);
			regCtrl.newReg = toPost;
			regCtrl.updateRegistration('daily');
	        $httpBackend.flush();
		}));

		it('should change state back to the list', inject(function($state){
			$state.ensureAllTransitionsHappened();
		}));
		
	});
});