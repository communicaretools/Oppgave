angular.module('ReConnectApp.services')
.factory('ErrorService', [
	'$log',
	'$http',
	'ApiEndpoint',
	function($log, $http, ApiEndpoint) {
		var eventEndpoint = ApiEndpoint.event;
		var currentErrors = [];

		var service = {
			"add": addError,
			"currentErrors": currentErrors,
			"remove": removeError,
		};

		return service;

		var onSuccess = function() {
			$log.log("Error log sent to server!");
		}

		var onError = function(e) {
			$log.log("Fail to send error to server: " + e.msg);
		}

		function addError(exception, cause) {
			var error = {
				exception: exception,
				cause: cause
			};
			sendError(error);
			currentErrors.push(error);
		}

		function removeError(error) {
			var index = currentErrors.indexOf(error);
			if (index !== -1) {
				currentErrors.splice(index, 1);
			}
		}

		function sendError(error) {
			$http.post(eventEndpoint + "/error", error).then(onSuccess, onError);
		}
	}
]);