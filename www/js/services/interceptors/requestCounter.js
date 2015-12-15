angular.module('ReConnectApp.services')
    .factory("requestCounter", [
    	"$q",
		'$timeout',
    	function($q, $timeout) {
    		var counter = 0;
            var successCounter = 0;

    		function getRequestCount() {
    			return counter;
    		}

    		function request(config) {
    			counter++;
				return $q.when(config);
    		}

    		function requestError(error) {		
    			counter--;
    			return $q.reject(error);
    		}

    		function response(response) {    			
    			counter--;
                successCounter++;
    			return $q.when(response);
    		}

    		function responseError(error) {
    			counter--;
    			return $q.reject(error);
    		}

            function getAndResetSuccessCounter() {
                result = successCounter;
                successCounter = 0;
                return result;
            }


			var service = {
				"request": request,
				"requestError": requestError,
				"response": response,
				"responseError": responseError,
	            "getRequestCount": getRequestCount,
                "getSuccess": getAndResetSuccessCounter
			};

			return service;
    	}
    ]);
