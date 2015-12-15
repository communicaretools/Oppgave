describe('when using log service', function(){
	beforeEach(function(){
		module('ReConnectApp.services', 'ReConnectApp.config');
	});
	beforeEach(inject(function(logService){
		service = logService;
	}));

	describe('when sending', function(){
		var items;
		beforeEach(inject(function($httpBackend, ApiEndpoint){
			var entry = {logCode: "testCode", details: "testDetails"};
			$httpBackend.expectPOST(ApiEndpoint.event + '/log', entry)
				.respond(200);
			items = service.log(entry.logCode, entry.details);
		}));

		it('http is called', inject(function($httpBackend){
			$httpBackend.verifyNoOutstandingExpectation();
		}));
	});
});