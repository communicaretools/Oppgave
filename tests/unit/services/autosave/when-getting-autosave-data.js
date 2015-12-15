describe('when getting autosave data', function(){
	var fetched;
	var moduleName = "test";
	var id = 5;

	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(autosaveService, $httpBackend, ApiEndpoint){
		fetched = null
        var data = {"name": "test item"};
        var toReturn = {"module": moduleName, "data": JSON.stringify(data)}
		$httpBackend.expectGET(ApiEndpoint.autosave + '/autosave/'+ id + '?module='+ moduleName)
			.respond(toReturn);

		var result = autosaveService.get(moduleName, id, function(result){
			 fetched = result;
		});
        
        $httpBackend.flush();
	}));

	it('should complete successfully', function(){
		expect(fetched).toBeDefined();
		expect(fetched.module).toBe(moduleName);
		expect(fetched.data).toBeDefined();
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});