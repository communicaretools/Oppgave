describe("when logging in successfully", function(){
	beforeEach(module(
		'ngStorage',
		'ionic',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config',
		'ReConnectApp.mocks'
	));
	var loginCtrl, user, isLoggedIn;
	var userId = 42;
	beforeEach(inject(function($rootScope, $state, $stateParams, $controller, $httpBackend, storageService, ApiEndpoint, loginManager){  
		var scope = $rootScope.$new();
		$stateParams.requestedState = 'RCA.messages';
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond({"isLoggedIn": true, "method": "password"});
		loginCtrl = $controller('LoginCtrl', {$scope: scope});
		$httpBackend.flush();
		
		$state.expectTransitionTo('RCA.messages');
		user = {username: 'ture', password: 'pass'};
		$httpBackend.expectPOST(ApiEndpoint.auth + '/login', user)
			.respond(200);
		$httpBackend.expectGET(ApiEndpoint.profile + '/userdata')
			.respond({userName: user.username, id: userId, avatar: 'default'});
		loginCtrl.login(user.username, user.password);
		$httpBackend.flush();
	}));
	afterEach(inject(function(storageService, $httpBackend){
		storageService.reset();
		$httpBackend.verifyNoOutstandingExpectation();
	}));


	it('the user is stored in localStorage', inject(function(storageService){
		expect(storageService.local().user).toEqual({userName: user.username, id: userId, avatar: jasmine.any(String)});
	}));

	it('should update loginStatus in', inject(function (loginManager) {
		expect(loginManager.getLoginStatus()).toBe(true);
	}));

	it('should change state back to the list', inject(function($state){
		$state.ensureAllTransitionsHappened();
	}));
});