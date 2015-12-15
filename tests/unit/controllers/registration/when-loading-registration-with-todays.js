describe('when loading registration with todays', function(){
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
		.respond({id: 1});
		$httpBackend.expectGET(ApiEndpoint.registration + '/smileyCollection')
		.respond({id: 3});		
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosaveGuid/"+1+"?module=RegistrationDaily")
			.respond(null);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosaveGuid/"+3+"?module=RegistrationSmiley")
			.respond(null);

		regCtrl = $controller("RegTodayCtrl", {$scope: scope});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	

	it('should have todays set', function(){
		expect(regCtrl.smiley.today).toBeTruthy();
		expect(regCtrl.daily.today).toBeTruthy();
	});

	it('should have autosave flags set to false', function(){
		expect(regCtrl.smiley.autosave).toBe(false);
		expect(regCtrl.daily.autosave).toBe(false);
	});
});