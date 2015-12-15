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

		$httpBackend.expectGET(ApiEndpoint.registration + '/collection')
			.respond(toReturn);

		regCtrl = $controller("RegHistoryCtrl", {$scope: scope});
        
        $httpBackend.flush();
	}));

	afterEach(inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
	
	it('should get the registration list for ctrl', function(){
		expect(regCtrl.list).toBeDefined();
		expect(regCtrl.list).toEqual(jasmine.any(Array));
		expect(regCtrl.list.length).toBe(3);
	});

});