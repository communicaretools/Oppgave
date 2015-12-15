describe('when working with encryption', function () {
	var user = "test";
	var secret = "Hsss";

	beforeEach(module('ReConnectApp.services', 'ngStorage'));
	beforeEach(inject(function(storageService) {
		storageService.setUser(user);
	}));

	afterEach(inject(function($localStorage){
		$localStorage.$reset();
	}));

	describe('of simple objects', function(){
		var toEncode = "Veldig hemmelig";
		beforeEach(inject(function(storageService){
			storageService.setItem(secret, "toEncode", toEncode);
		}));			

		it('should have cryptated the object', inject(function(storageService) {
			var user = storageService.local();
			var notDecoded = user["toEncode"];
			expect(notDecoded).not.toEqual(toEncode);
			expect(notDecoded.toString()).toContain("=");
		}));

		it('should get decrypted item back', inject(function(storageService) {
			var decoded = storageService.getItem(secret, "toEncode");
			expect(decoded).toEqual(toEncode);
		}));

		it('should delete key when set to null', inject(function(storageService){
			storageService.setItem(secret, "toEncode");
			var user = storageService.local();
			var toBeDeleted = user["toEncode"];
			expect(toBeDeleted).not.toBeDefined();
		}));
	})

	describe('of complex objects', function(){
		var toEncode = {
			name: "Veldig hemmelig", 
			number: 5, 
			numberArray: [4,4,7,1]
		};
		beforeEach(inject(function(storageService){
			storageService.setItem(secret, "toEncode", toEncode);
		}));			

		it('should have cryptated the object', inject(function(storageService) {
			var user = storageService.local();
			var notDecoded = user["toEncode"];
			expect(notDecoded).not.toEqual(toEncode);
			expect(notDecoded.toString()).toContain("=");
		}));	

		it('should get decrypted item back', inject(function(storageService) {
			var decoded = storageService.getItem(secret, "toEncode");
			expect(decoded).toEqual(toEncode);
		}));

		it('should delete key when set to null', inject(function(storageService){
			storageService.setItem(secret, "toEncode");
			var user = storageService.local();
			var toBeDeleted = user["toEncode"];
			expect(toBeDeleted).not.toBeDefined();
		}));
	})
});