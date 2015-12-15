describe('when starting home', function (){
	beforeEach(module(
		'ionic', 
		'ngStorage', 
		'ReConnectApp.controllers', 
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var homeCtrl;
	var scope;
	beforeEach(inject(function($controller, $httpBackend, ApiEndpoint, feedService, $rootScope){
		scope = $rootScope.$new();

		var logInService = {getLoginStatus: function(){
			return true;
		}}

		$httpBackend.expectGET(ApiEndpoint.feed + '/reminders')
			.respond([
				{"module":"Reminder","type":"CommonMessage","data":{"count":"2"}},
				{"module":"Reminder","type":"ForumThreads","data":{"count":"3"}},
				{"module":"Reminder","type":"Registration","data":{"completedToday":"false"}}
				]);
		homeCtrl = $controller('HomeCtrl', {$scope: scope, loginManager: logInService});
		$httpBackend.flush();
	}));
	
	afterEach(inject(function($localStorage, $httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));

	it('should have items for home menu', function() {
		expect(homeCtrl.homeItems.length).toBe(4);
	});

	it('should have set reminder for forum', function() { 
		expect(homeCtrl.homeItems[1].reminder['count']).toBe('3');
	});

	it('should have set reminder for registration', function() { 
		expect(homeCtrl.homeItems[2].reminder['completedToday']).toBe('false');
	});

	it('should have set reminder for commonmessage', function() { 
		expect(homeCtrl.homeItems[3].reminder['count']).toBe('2');
	});
});