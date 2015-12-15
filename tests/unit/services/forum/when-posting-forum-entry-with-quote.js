describe('when posting forum entry with quote', function () {
	var threadId = 42;
	var success = false;
    var quoteWrap = function (toQuote) {
        return "[quote " + "user=\'" + toQuote.author + "\']" + toQuote.content + "[/quote]";
    };

	beforeEach(module('ReConnectApp.services', 'ReConnectApp.config', 'ReConnectApp.mocks'));
	beforeEach(inject(function(forumEntryService, $httpBackend, ApiEndpoint){
        var toAdd = {content: 'NewContent', toQuote: {author: 'QuotedUser', content: 'toQuote'}};
        var toPost = {"entry-content": quoteWrap(toAdd.toQuote) + " " + toAdd.content};
		$httpBackend.expectPOST(ApiEndpoint.forumEntry + '/collection/'+ threadId, toPost)
			.respond();

		var result = forumEntryService.add(threadId, toAdd, function(){
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