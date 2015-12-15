describe("when logging in unsuccessfully", function(){
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services', 
		'ReConnectApp.config',
		'ReConnectApp.mocks'
	));
	var loginCtrl, user, isLoggedIn;
	var userId = 42;

	beforeEach(inject(function($rootScope, $controller, $httpBackend, ApiEndpoint, loginManager){  
		var scope = $rootScope.$new();
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond({"isLoggedIn": false, "method": "password"});
		loginCtrl = $controller('LoginCtrl', {$scope: scope});
		$httpBackend.flush();
		
		user = {username: 'ture', password: 'pass'};
		$httpBackend.expectPOST(ApiEndpoint.auth + '/login', user)
			.respond(403, {});
		loginCtrl.login(user.username, user.password);
		$httpBackend.flush();
	}));
	
	afterEach(inject(function($localStorage, $httpBackend){
		$localStorage.$reset();
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('the user is not set in localStorage', inject(function($localStorage){
		expect($localStorage.user).toBe(undefined);
	}));

	it('should update loginStatus in', inject(function (loginManager) {
		expect(loginManager.getLoginStatus()).toBe(false);
	}));
});