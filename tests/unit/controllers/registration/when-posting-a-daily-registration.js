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
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+dateId+"?module=RegistrationDaily")
			.respond(null);
		regCtrl = $controller("NewDailyRegCtrl", {$scope: scope});
		scope.$digest();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have created an empty with defaults', function() {
		expect(regCtrl.newReg.id).not.toBeDefined();
		expect(regCtrl.newReg.generalSatisfaction).toBe(5);
		expect(regCtrl.newReg.handledTheDay).toBe(5);
		expect(regCtrl.newReg.qualityOfSleep).toBe(5);
		expect(regCtrl.newReg.satisfactionWithDiet).toBe(5);
		expect(regCtrl.newReg.satisfactionWithPhysicalActivity).toBe(5);
		expect(regCtrl.newReg.satisfactionWithSocialRelations).toBe(5);
		expect(regCtrl.newReg.numberOfHoursSlept).toBe(0);
		expect(regCtrl.newReg.numberOfMinutesInPhysicalActivity).toBe(0);
		expect(regCtrl.newReg.takenMedications).toBe(3);
	});

	describe('after posting', function(){
		beforeEach(inject(function($state, $httpBackend, ApiEndpoint){
			$state.expectTransitionTo('RCA.registration');
			var toPost = {
				generalSatisfaction: 6,
				handledTheDay: 3,
				qualityOfSleep: 0,
				satisfactionWithDiet: 3,
				satisfactionWithPhysicalActivity: 7,
				satisfactionWithSocialRelations: 8,
				numberOfHoursSlept: 5,
				numberOfMinutesInPhysicalActivity: 66,
				takenMedications: 1
			};
			$httpBackend.expectPOST(ApiEndpoint.registration + '/dailyCollection', toPost)
				.respond(200);
			$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosave/"+dateId+"?module=RegistrationDaily")
				.respond(200);

			regCtrl.newReg = toPost;
			regCtrl.sendRegistration('daily');
	        $httpBackend.flush();
		}));

		it('should change state back to the list', inject(function($state){
			$state.ensureAllTransitionsHappened();
		}));
	});
});