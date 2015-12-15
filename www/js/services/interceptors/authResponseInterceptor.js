angular.module('ReConnectApp.services')
	.factory('authHttpResponseInterceptor',[
		'$q',
		'$log',
		'$location',
		function($q, $log, $location){
	    return {
	        response: function(response){
	            if (response.status === 401) {
	                $log.info("Response 401");
	            }
	            return response || $q.when(response);
	        },
	        responseError: function(rejection) {
	            if (rejection.status === 401) {
	                $log.info("Response Error 401", rejection);
	                $location.path('RCA/home');
	            }
	            return $q.reject(rejection);
	        }
	    }
	}])