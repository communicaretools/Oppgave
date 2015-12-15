describe('when deleting autosave data', function(){
	var success;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(autosaveService, $httpBackend, ApiEndpoint){
		success = false;
		var id = 5;
		var moduleName = "test";
		$httpBackend.expectDELETE(ApiEndpoint.autosave + '/autosave/'+ id + '?module='+ moduleName)
			.respond();

		var result = autosaveService.delete(moduleName, id, function(){
			success = true;
		});
        
        $httpBackend.flush();
	}));

	it('should complete successfully', function(){
		expect(success).toBe(true);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});