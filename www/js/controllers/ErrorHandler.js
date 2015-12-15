angular.module('ReConnectApp.controllers')
.controller('ErrorHandlerController', 
	['ErrorService',
	'$log',
	function(ErrorService, $log) {
		var vm = this;
		vm.errors = ErrorService.currentErrors;
		vm.causeError = causeErrorFunc;
		vm.removeError = removeError;

		function causeErrorFunc () {
			throw new ReferenceError("NEW ERROR ON TIME: " + new Date());
		}

		function removeError(error) {
			ErrorService.remove(error);
		}
	}]);