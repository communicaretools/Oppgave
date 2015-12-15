describe('when loading registration', function(){
	var regCtrl;
	beforeEach(module(
		'ionic', 
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($controller, $rootScope, $httpBackend, autosaveService, ApiEndpoint) {
		var scope = $rootScope.$new();
        var toReturn = {registrations: [{type:'daily', id: 1}, {type:'smiley', id: 2}, {type:'smiley', id:3}]};

		var dateId = autosaveService.dateId();

		$httpBackend.expectGET(ApiEndpoint.registration + '/dailyCollection')
		.respond(null);
		$httpBackend.expectGET(ApiEndpoint.registration + '/smileyCollection')
		.respond(null);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+dateId+"?module=RegistrationDaily")
			.respond({});
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+dateId+"?module=RegistrationSmiley")
			.respond({});

		regCtrl = $controller("RegTodayCtrl", {$scope: scope});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	

	it('should not have todays set', function(){
		expect(regCtrl.smiley.today).toBeFalsy();
		expect(regCtrl.daily.today).toBeFalsy();
	});

	it('should have autosave flags be true', function(){
		expect(regCtrl.smiley.autosave).toBe(true);
		expect(regCtrl.daily.autosave).toBe(true);
	});
});