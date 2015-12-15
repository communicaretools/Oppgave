describe('when getting user objects', function() {
	var user1 = "user1";
	var user2 = "user2";
	var localObj1;
	var localObj2;
	var sessionObj1;
	var sessionObj2;
	beforeEach(module('ReConnectApp.services', 'ngStorage'));
	beforeEach(inject(function(storageService, $localStorage, $sessionStorage) {
		storageService.setUser(user1);

		storageService.local().value = "localStorage of user 1";
		storageService.session().value = "sessionStorage of user 1";

		storageService.setUser(user2);

		storageService.local().value = "localStorage of user 2";
		storageService.session().value = "sessionStorage of user 2";
	}));
	afterEach(inject(function(storageService){
		storageService.reset();
	}));

	it('should have the values of currentUser', inject(function(storageService) {
		expect(storageService.local().value).toBeDefined();
		expect(storageService.local().value).toEqual("localStorage of user 2");
		expect(storageService.session().value).toBeDefined();
		expect(storageService.session().value).toEqual("sessionStorage of user 2");
	}));

	it('should keep the values for others users', inject(function(storageService) {
		storageService.setUser(user1);
		expect(storageService.local().value).toBeDefined();
		expect(storageService.local().value).toEqual("localStorage of user 1");
		expect(storageService.session().value).toBeDefined();
		expect(storageService.session().value).toEqual("sessionStorage of user 1");
	}))
});