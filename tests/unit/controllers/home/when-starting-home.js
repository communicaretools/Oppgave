describe('when starting home', function (){
	beforeEach(module(
		'ionic', 
		'ngStorage', 
		'ReConnectApp.controllers', 
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var homeCtrl;
	beforeEach(inject(function($controller, $httpBackend, ApiEndpoint, feedService){
		$httpBackend.expectGET(ApiEndpoint.feed + '/reminders')
			.respond([]);
		var logInService = {getLoginStatus: function(){
			return true;
		}}

		homeCtrl = $controller('HomeCtrl', {loginManager: logInService});
		$httpBackend.flush();
	}));
	
	afterEach(inject(function($localStorage, $httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have items for home menu', function() {
		expect(homeCtrl.homeItems.length).toBe(4);
	});
});