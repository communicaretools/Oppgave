describe('when getting reminders', function(){
	beforeEach(function(){
		module('ReConnectApp.services', 'ReConnectApp.config');
	});
	var result;
	beforeEach(inject(function($httpBackend, ApiEndpoint, feedService){

		$httpBackend.expectGET(ApiEndpoint.feed + '/reminders')
			.respond([
				{type:'CommonMessage', data: [{key: 'count', value: '1'}]},
				{type:'ForumThreads', data: [{key:'count', value: '2'}]},
			]);
		feedService.getReminders(function(r){
			result = r;
		});
        
        $httpBackend.flush();
	}));
	
	it('should be successfull', function(){
		expect(result).toBeDefined();
		expect(result.length).toBe(2);
	});

	it('http is called', inject(function($httpBackend){
		$httpBackend.verifyNoOutstandingExpectation();
	}));
});