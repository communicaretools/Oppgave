angular.module('ReConnectApp')
.config(function($provide) {
	$provide.decorator('$exceptionHandler', function($delegate, $injector, $log) {
		return function(exception, cause) {
			$delegate(exception, cause);
			var errorService = $injector.get("ErrorService");
			$log.log("In exceptionHandler decorator");
			$log.log(exception.message);
			errorService.add(exception, cause);
		}
	});
});