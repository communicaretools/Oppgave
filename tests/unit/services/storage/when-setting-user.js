describe('when setting user', function () {
	var user = "test";
	var currentUser = "";
	var localObj;
	var sessionObj;
	beforeEach(module('ReConnectApp.services', 'ngStorage'));
	beforeEach(inject(function(storageService, $localStorage, $sessionStorage) {
		storageService.setUser(user);

		currentUser = storageService.getCurrentUser();
		localObj = storageService.local();
		sessionObj = storageService.session();
	}));

	it('should get user', function() {
		expect(currentUser).toBeDefined();
		expect(currentUser).toEqual(user);
	});

	it('local and session objects should be defined', function() {
		expect(localObj).toBeDefined();
		expect(sessionObj).toBeDefined();
	});
});