angular.module('ReConnectApp.services')
	.factory("profileService", [
		"$http",
		"$log",
		"ApiEndpoint", function($http, $log, ApiEndpoint){
            var onError = function (e) {
                $log.error(e.msg);
            };

        	getUser = function(onSuccess){
    			$http.get(ApiEndpoint.profile +"/userdata")
    				.then(onSuccess, onError);
        	};

			var service = {
				"get": getUser,
			};

			return service;
		}
	]);