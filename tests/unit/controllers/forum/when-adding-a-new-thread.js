describe('when adding a new thread', function(){
	beforeEach(module(
		'ionic',
		'ngStorage',
		'ReConnectApp.controllers',
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var forumCtrl;
	var forumId = 3;
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, ApiEndpoint){
		var scope = $rootScope.$new();
		$stateParams.forumId = forumId;
		$httpBackend.expectGET(ApiEndpoint.autosave + "/autosave/"+forumId+"?module=ForumThread")
			.respond(null);
		forumCtrl = $controller('ForumCtrl', {$scope: scope});
		$httpBackend.flush();
	}));

	describe("that has correct model", function(){
		beforeEach(inject(function($httpBackend, ApiEndpoint){
			var toPost = {'thread-name': "bla bla", 'entry-content': 'tra la la'};
			$httpBackend.expectPOST(ApiEndpoint.forumThread + '/collection/' + forumId, toPost)
				.respond(200);
			$httpBackend.expectDELETE(ApiEndpoint.autosave + '/autosave/' + forumId+ "?module=ForumThread")
				.respond(200);
			forumCtrl.newThread = {
				'thread-name': toPost['thread-name'],
				'entry-content': toPost['entry-content']
			};
			forumCtrl.newThreadModal = {
				hide: jasmine.createSpy("modalHide"),
				remove: jasmine.createSpy("modalRemove")
			};
			forumCtrl.submitThread();
			$httpBackend.flush();
		}));

		it('http has no outstanding', inject(function($httpBackend){
			$httpBackend.verifyNoOutstandingExpectation();
		}));

		it('should close and remove modal', function () {
			expect(forumCtrl.newThreadModal.hide).toHaveBeenCalled();
			expect(forumCtrl.newThreadModal.remove).toHaveBeenCalled();
		});
	});

	describe("that is empty", function(){
		beforeEach(function(){
			forumCtrl.newThread = {
				'thread-name': '',
				'entry-content': ''
			};			
			forumCtrl.submitThread();
		});

		it('http has no outstanding', inject(function($httpBackend){
			$httpBackend.verifyNoOutstandingExpectation();
		}));
	});
});