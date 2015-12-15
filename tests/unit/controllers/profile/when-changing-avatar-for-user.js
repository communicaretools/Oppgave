describe("when openAvatarModal is called", function() {
    beforeEach(module(
        'ngStorage',
        'ReConnectApp.controllers',
        'ReConnectApp.services',
        'ReConnectApp.config',
        'ReConnectApp.mocks'));

    var profileCtrl;
    var toReturn = ['avatatar01','avatatar02','avatatar03'];
    var user = {userId: 42, userName: 'Jane Doe', avatar: 'abc'};
    var scope;
    
    beforeEach(inject(function($rootScope, $controller, $httpBackend, storageService, loginManager, ResourcePath, ApiEndpoint) {
        scope = $rootScope.$new();
        
        storageService.setUser(user.userName);
        storageService.local().user = user;

        $httpBackend.expectGET(ApiEndpoint.auth + "/login")
            .respond({"isloggedIn": true}); 

        $httpBackend.expectGET(ApiEndpoint.profile + "/contact")
            .respond({"email": 'dfsad@fldsø.no', 'sms': '91849328'});         
        $httpBackend.expectGET(ApiEndpoint.profile + "/preferences")
            .respond({"isloggedIn": true});

       
 

        profileCtrl = $controller('ProfileCtrl', {$scope: scope});
        
        $httpBackend.flush();
        $httpBackend.expectGET("templates/profile/avatar-modal.html").respond(200, "<div></div>");
        $httpBackend.expectGET(ApiEndpoint.avatar + "/collection")
            .respond(200, toReturn);

        profileCtrl.openAvatarModal();

        $httpBackend.flush();

    }));
    
    afterEach(inject(function($httpBackend, $localStorage) {
        $localStorage.$reset();
        $httpBackend.verifyNoOutstandingExpectation();
    }));
    
    it('should get the list of available avatars', function() {
        expect(scope.avatarModal.list).toEqual(toReturn);
    });
               
});