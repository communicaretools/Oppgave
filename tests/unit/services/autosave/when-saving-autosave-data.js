describe('when saving autosave data', function(){

		var success;
	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(autosaveService, $httpBackend, ApiEndpoint){
		success = false;
		var id = 5;
		var moduleName = "test";
        var toSave = {"name": "test item"};
        var toPost = {"module": moduleName, "data": JSON.stringify(toSave)}
		$httpBackend.expectPOST(ApiEndpoint.autosave + '/autosave/'+ id, toPost)
			.respond();

		var result = autosaveService.save(moduleName, id, toSave, function(){
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