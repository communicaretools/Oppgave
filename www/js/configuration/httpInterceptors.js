angular.module("ReConnectApp.config")
	.config(function($httpProvider) {
		$httpProvider.interceptors.push("requestCounter");
    	$httpProvider.interceptors.push('authHttpResponseInterceptor');
	});
