angular.module('ReConnectApp.mocks')
	.service('resources', ['$q', function($q){
		return {
			'get': function(key) {return key;},
			'load': function() {
			        var deferred = $q.defer();
			        deferred.resolve('Remote call result');
			        return deferred.promise;
			}
		};
	}]);