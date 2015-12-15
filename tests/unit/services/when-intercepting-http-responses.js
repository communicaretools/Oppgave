describe('when intercepting http responses', function(){
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	var id = 5;
	var moduleName = 'Test';

	describe('with 401 response', function(){
		beforeEach(inject(function($httpBackend, $location, ApiEndpoint, autosaveService){
			$location.path = jasmine.createSpy('locationPathSpy');
			$httpBackend.expectGET(ApiEndpoint.autosave + '/autosave/'+ id + '?module='+ moduleName)
				.respond(401);
			autosaveService.get(moduleName, 5, function(){});
			$httpBackend.flush();
		}));
		
		it('should intercept', inject(function($location){
			expect($location.path).toHaveBeenCalled();
		}));
	});
	
});