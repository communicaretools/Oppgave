describe("when logging out", function(){
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var loginCtrl;
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $state, storageService, ApiEndpoint){  
		var scope = $rootScope.$new();

		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond({"isLoggedIn": true, "method": "password"});
		loginCtrl = $controller('LoginCtrl', {$scope: scope});
		$httpBackend.flush();

		storageService.setUser('ture');
		storageService.local().user = {userName: 'ture', userId: 32, avatar: [234,234,123]}

		$httpBackend.expectGET(ApiEndpoint.auth + '/logout')
			.respond();
		$state.expectTransitionTo('RCA.home');
		loginCtrl.logout();
		$httpBackend.flush();
	}));
	
	afterEach(inject(function(storageService, $httpBackend){
		storageService.reset();
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('user is cleared from localStorage', inject(function(storageService){
		expect(storageService.local()).toEqual(null);
	}));

	it('should update loginStatus in', inject(function (loginManager) {
		expect(loginManager.getLoginStatus()).toBeFalsy();
	}));

	it('should change state back to the list', inject(function($state){
		$state.ensureAllTransitionsHappened();
	}));
});