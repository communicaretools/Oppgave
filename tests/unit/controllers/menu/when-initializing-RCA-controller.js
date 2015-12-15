describe('when starting home', function (){
	beforeEach(module(
		'ionic', 
		'ngStorage', 
		'ReConnectApp.controllers', 
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var rcaCtrl;
	beforeEach(inject(function($rootScope, $state, $controller, $httpBackend, ApiEndpoint, feedService){
		var scope = $rootScope.$new();
		var logInService = {getLoginStatus: function(){
			return true;
		}}
		$state.setCurrent('RCA.home');
		rcaCtrl = $controller('RCACtrl', {$scope: scope, loginManager: logInService});
		scope.$digest();
	}));
	
	afterEach(inject(function($localStorage, $httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have items for home menu', function() {
		expect(rcaCtrl.menuItems.length).toBe(2);
	});

	it('should have items for home menu', function() {
		expect(rcaCtrl.isLoggedIn).toBe(true);
	});

	it('should perform active check based on state', function(){
		expect(rcaCtrl.checkActive(rcaCtrl.menuItems[0])).toBe(true);
	});
});