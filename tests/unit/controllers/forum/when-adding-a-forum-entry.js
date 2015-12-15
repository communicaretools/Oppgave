describe('when adding a new entry to a thread', function () {
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var scope;
	var entryCtrl; 
	var threadID = 1;
	var toReturn;
	beforeEach(inject(function($controller, $httpBackend, $stateParams, ApiEndpoint, $rootScope, storageService){
		scope = $rootScope.$new();
		storageService.setUser("test");
		toReturn = {
			header: {id: threadID, name: "thread1"},
			entries: []
		};

		$httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+threadID)
			.respond(toReturn);
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+threadID+"?module=Forum")
			.respond(null);

		$stateParams.threadId = threadID;
		entryCtrl = $controller('ThreadCtrl', {$stateParams: $stateParams, $scope: scope});
		$httpBackend.flush();
	}));

	describe("that has content", function(){
		beforeEach(inject(function($httpBackend, ApiEndpoint){
			entryCtrl.newEntry = {
				content: 'bla bla'
			};
			var postData = {"entry-content" : entryCtrl.newEntry.content};
			$httpBackend.expectPOST(ApiEndpoint.forumEntry + '/collection/'+threadID, postData)
				.respond();
			$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosave/"+threadID+"?module=Forum")
				.respond(200);
			$httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+threadID)
				.respond(toReturn);
		
			entryCtrl.submitEntry();
			$httpBackend.flush();
		}));

		it('http has no outstanding', inject(function($httpBackend){
			$httpBackend.verifyNoOutstandingExpectation();
		}));
	});

	describe('that has content and quote', function(){
		beforeEach(inject(function($httpBackend, ApiEndpoint, forumEntryService){
			var toQuote = {author: 'Ture', content: 'krii kraa kroo'}
			entryCtrl.quoteEntry(toQuote);
			entryCtrl.newEntry = {
				content: 'bla bla'
			};
			var toPost = {content: entryCtrl.newEntry.content, toQuote: toQuote}
			var postData = {"entry-content" : forumEntryService.quoteWrap(toPost)};
			$httpBackend.expectPOST(ApiEndpoint.forumEntry + '/collection/'+threadID, postData)
				.respond();
			$httpBackend.expectDELETE(ApiEndpoint.autosave + "/autosave/"+threadID+"?module=Forum")
				.respond(200);
			$httpBackend.expectGET(ApiEndpoint.forumEntry + '/collection/'+threadID)
				.respond(toReturn);
		
			entryCtrl.submitEntry();
			$httpBackend.flush();
		}));

		it('http has no outstanding', inject(function($httpBackend){
			$httpBackend.verifyNoOutstandingExpectation();
		}));
	});

	describe("that is empty", function(){
		beforeEach(function(){
			entryCtrl.newEntry = {
				content: ''
			};			
			entryCtrl.submitEntry();
		});

		it('http has no outstanding', inject(function($httpBackend){
			$httpBackend.verifyNoOutstandingExpectation();
		}));
	});
});