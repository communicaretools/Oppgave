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
	beforeEach(inject(function($rootScope, $controller, $httpBackend, ApiEndpoint){  
		var scope = $rootScope.$new();
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond({"isLoggedIn": true, "method": "password"});
		loginCtrl = $controller('LoginCtrl', {$scope: scope});
		$httpBackend.flush();
		
		user = {username: 'ture', password: ''};

	
	}));
	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should not post to login', function (){
		loginCtrl.login(user.username, user.password);
	});

});