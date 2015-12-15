describe('when sessionTimeOutWarningTime has expired', function(){

	

	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks', 'ngStorage'));
	beforeEach(inject(function(stayalive, sessionTimeOutWarning, $httpBackend, ApiEndpoint, $state){
		var toReturn = {"isLoggedIn": true, "method": "password"};
		$httpBackend.expectGET(ApiEndpoint.auth + '/login')
			.respond(toReturn);
		$httpBackend.flush(); 
		stayalive.setup();
	}));
	
	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should show popup with warning.', inject(function ($interval, $httpBackend, stayalive, sessionTimeOutWarning, timeoutIntervalFrequecy, $state, $ionicPopup) {
		$interval.flush(timeoutIntervalFrequecy);
		var expired = Date.now() + sessionTimeOutWarning + 3;
		var popup = $ionicPopup.alert({
                    	title: "test",
                    	template: "Test"
                    });
		spyOn(Date, 'now').and.returnValue(expired);
		spyOn($ionicPopup, 'alert').and.returnValue(popup);
		$interval.flush(timeoutIntervalFrequecy);
		expect($ionicPopup.alert).toHaveBeenCalled();
	}));
});