describe('when viewing an exercise', function(){
	var regCtrl;
	var exId = 2;
	beforeEach(module(
		'ngAudio',
        'ReConnectApp.controllers',
		'ReConnectApp.services', 
		'ReConnectApp.config', 
		'ReConnectApp.mocks'));
	beforeEach(inject(function($rootScope, $controller, $stateParams, $httpBackend, ApiEndpoint) {
		var scope = $rootScope.$new();
		$stateParams.id = exId;

		regCtrl = $controller("ExerciseViewCtrl", {$stateParams: $stateParams, $scope: scope});
		$rootScope.$digest();		
	}));
	
	it('should get the exercise for ctrl', function(){
		expect(regCtrl.exercise).toBeDefined();
		expect(regCtrl.exercise.content).toEqual(jasmine.any(String));
		expect(regCtrl.exercise.sound).toEqual(jasmine.any(String));
	});
	
	it('should get the sound for ctrl', function(){
		expect(regCtrl.sound).toBeDefined();
	});
	
	it('should select content tab if avalable', function(){
		expect(regCtrl.activeTab).toBe('content');
	});
});