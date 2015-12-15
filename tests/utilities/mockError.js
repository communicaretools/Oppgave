angular.module('ReConnectApp.mocks')
	.service('errorService', function(){
		return {
			"add": jasmine.createSpy('errorAdd'),
			"currentErrors": jasmine.createSpy('errorCurrent'),
			"remove": jasmine.createSpy('errorRemove')
		};
	});