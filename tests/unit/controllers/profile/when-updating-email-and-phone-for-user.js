describe("when changing email and phonenumber for user", function() {
    beforeEach(module(
        'ngStorage',
        'ReConnectApp.controllers',
        'ReConnectApp.services',
        'ReConnectApp.config',
        'ReConnectApp.mocks'));

    var profileCtrl;
    var user = {userId: 42, userName: 'Jane Doe'};
    var contact = {email: 'test@test.no', sms: "12345678"};
    var newContact = {email: 'fest@fest.no', sms: '12312312'};
    
    beforeEach(inject(function($rootScope, $controller, storageService, loginManager, $httpBackend, ApiEndpoint) {
        var scope = $rootScope.$new();
        
        storageService.setUser(user.userName);
        storageService.local().user = user;

        $httpBackend.expectGET(ApiEndpoint.auth + "/login")
            .respond({"isloggedIn": true}); 
        
        $httpBackend.expectGET(ApiEndpoint.profile + "/contact")
            .respond(contact);
        $httpBackend.expectGET(ApiEndpoint.profile + "/preferences")
            .respond({}); 

        profileCtrl = $controller('ProfileCtrl', {$scope: scope});
        
        $httpBackend.flush();
    }));
    
    afterEach(inject(function($localStorage, $httpBackend, ApiEndpoint) {
        $localStorage.$reset();
        $httpBackend.verifyNoOutstandingExpectation();
    }));
      

    it('should set contact information', function() {
        expect(profileCtrl.user.contact.email).toEqual(contact.email);
        expect(profileCtrl.user.contact.sms).toEqual(contact.sms);
    });

    it('should have copied contact info into new contact variables', function() {
        expect(profileCtrl.newEmail).toEqual(profileCtrl.user.contact.email);
        expect(profileCtrl.newSms).toEqual(profileCtrl.user.contact.sms);
    });

/* 
Commented out until we find a way to use the dom in tests
We need the form elements or mocks since we use ng-pattern 
*/
/*
    describe('after posting', function() {
        beforeEach(inject(function($httpBackend, ApiEndpoint) {
            profileCtrl.smsForm.sms = {$error: {}}; // mock form element
            profileCtrl.emailForm.email = {$error: {}}; // mock form element

            $httpBackend.expectPOST(ApiEndpoint.profile + '/changeEmail/')
                .respond(200);
            $httpBackend.expectPOST(ApiEndpoint.profile + '/changeSms/')
                .respond(200);
            profileCtrl.newEmail = newContact.email;
            profileCtrl.newSms = newContact.sms;
            profileCtrl.updateEmail();
            profileCtrl.updateSms();
            $httpBackend.flush();
        }));
        
        it('should update local information after post', function() {
            expect(profileCtrl.user.contact.email).toEqual(newContact.email);
            expect(profileCtrl.user.contact.sms).toEqual(newContact.sms);

        });
    });*/
});