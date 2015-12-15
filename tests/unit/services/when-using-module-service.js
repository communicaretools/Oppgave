describe('when using module service', function(){
	var service;
	beforeEach(function(){
		module('ngStorage','ReConnectApp.services', 'ReConnectApp.config');
	});
	beforeEach(inject(function(moduleService){
			service = moduleService;
			service.setupModules();
	}));

	describe('to get menu items', function(){
		var items;
		beforeEach(function(){
			items = service.forMenu();
		});

		it('should return all menu items', function(){
			expect(items.length).toBe(7);
		});
	});

	describe('to get home items', function(){
		var items;
		beforeEach(function(){
			items = service.forHome();
		});

		it('should return all home items', function(){
			expect(items.length).toBe(4);
		});
	});

	describe('to get a intro item', function(){
		var item;
		beforeEach(function(){
			item = service.forIntro('threads');
		});

		it('should return correct intro item', function(){
			expect(item.module).toBe('forum');
			expect(item.goTo).toBeDefined();
			expect(item.steps).toBeDefined();
		});
	});
});