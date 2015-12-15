describe('when getting the exercise list', function (){
	beforeEach(module(
		'ngStorage',
		'ReConnectApp.controllers', 
		'ReConnectApp.services',
		'ReConnectApp.config',
		'ReConnectApp.mocks'));
	var exerciseCtrl;
	beforeEach(inject(function($rootScope, $controller, $httpBackend, ApiEndpoint, exerciseService){
		var logEntry = {logCode: "ViewExerciseFolders", details: ""}
		$httpBackend.expectPOST(ApiEndpoint.event + '/log', logEntry)
			.respond(200);
		exerciseCtrl = $controller('ExercisesCtrl', {});
		$rootScope.$digest();
	}));

	it('should have items for exercise list', function() {
		expect(exerciseCtrl.list.length).toBe(3);
	});
});