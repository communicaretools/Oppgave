angular.module("ReConnectApp.services")
	.factory('feedService', [
		'$http',
		'$log', 
		'ApiEndpoint', 
		function($http, $log, ApiEndpoint) {
			var feedEndpoint = ApiEndpoint.feed;
			
		    var onError = function (e) {
		        $log.error(e.msg);
		    };
		    
			function getReminders(onSuccess){
				$http.get(feedEndpoint + '/reminders')
					.then(function(result){
						onSuccess(result.data)
					}, onError);
			};

			var service = {
				"getReminders" : getReminders
			};

			return service;
	}])