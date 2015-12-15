angular.module('ReConnectApp.services')
.factory('logService', [
	'$log',
	'$http',
	'ApiEndpoint',
	function($log, $http, ApiEndpoint) {
		var eventEndpoint = ApiEndpoint.event;

		var service = {
			"log": sendLog
		};

		return service;

		var onSuccess = function() {
			$log.log("Log entry sent to server!");
		}

		var onError = function(e) {
			$log.log("Fail to send log entry to server: " + e.msg);
		}

		function sendLog(code, details) {
			var entry = {logCode: code, details: details};
			$http.post(eventEndpoint + "/log", entry).then(onSuccess, onError);
		}
	}
]);