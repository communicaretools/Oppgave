describe("when openUserNameModal is called", function() {
    beforeEach(module(
        'ngStorage',
        'ReConnectApp.controllers',
        'ReConnectApp.services',
        'ReConnectApp.config',
        'ReConnectApp.mocks'));

    var profileCtrl;
    var user = {userId: 42, userName: 'Jane Doe', avatar: 'abc'};
    var scope;

    var checkUserNameSpy = jasmine.createSpy('profileService.checkUserNamek');

    beforeEach(inject(function($rootScope, $controller, $httpBackend, storageService, loginManager, ResourcePath, ApiEndpoint) {
        scope = $rootScope.$new();
        
        storageService.setUser(user.userName);
        storageService.local().user = user;

        $httpBackend.expectGET(ApiEndpoint.auth + "/login")
            .respond({"isloggedIn": true}); 

            var profileService = {
            "checkUsername": checkUserNameSpy,
            "getContact": function () {return "";},
            "getPreferences": function () {return {};}
    };

        profileCtrl = $controller('ProfileCtrl', {$scope: scope, profileService: profileService});
        
        $httpBackend.flush();
        $httpBackend.expectGET("templates/profile/changeUserName-modal.html").respond(200, "<div></div>");

        profileCtrl.openUserNameModal();

        $httpBackend.flush();

    }));
    
    afterEach(inject(function($httpBackend, $localStorage) {
        $localStorage.$reset();
        $httpBackend.verifyNoOutstandingExpectation();
    }));
    
    it('should prepare the from for use', function() {
        expect(profileCtrl.newUserName).toBe('');
    });

    it('should not check userName when newUserName is ""', function () {
        profileCtrl.checkUserName();
        expect(checkUserNameSpy).not.toHaveBeenCalled();
    });
               
});