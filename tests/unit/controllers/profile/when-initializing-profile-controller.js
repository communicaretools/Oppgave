describe("when initializing the profile controller", function() {
    beforeEach(module(
        'ngStorage',
        'ReConnectApp.controllers',
        'ReConnectApp.services',
        'ReConnectApp.config',
        'ReConnectApp.mocks'));

    var profileCtrl;
    var user = {userId: 42, userName: 'Jane Doe', avatar: 'abc'};
    
    beforeEach(inject(function($rootScope, $controller, storageService, loginManager, $httpBackend, ApiEndpoint) {
        var scope = $rootScope.$new();
        
        storageService.setUser(user.userName);
        storageService.local().user = user;

        $httpBackend.expectGET(ApiEndpoint.auth + "/login")
            .respond({"isloggedIn": true}); 
        
        $httpBackend.expectGET(ApiEndpoint.profile + "/contact")
            .respond({"email": 'dfsad@fldsø.no', 'sms': '91849328'}); 
        $httpBackend.expectGET(ApiEndpoint.profile + "/preferences")
            .respond({});  

        profileCtrl = $controller('ProfileCtrl', {$scope: scope});
        
        $httpBackend.flush();
    }));
    
    afterEach(inject(function($localStorage) {
        $localStorage.$reset();
    }));
      
    it('should get username and avatar from local storage', function() {
        expect(profileCtrl.user.avatar).toEqual(user.avatar);
        expect(profileCtrl.user.userName).toEqual(user.userName);
    });
});