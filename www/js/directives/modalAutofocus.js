angular.module('ReConnectApp.directives')
.directive('modalAutofocus', ['$timeout', function ($timeout) {
  return {
    priority: 1,
    link: function (scope, element) {
      $timeout(function () {
        var a = angular.element(element);
        var e = a.find('input');
        if (e.length > 0){
	        e[0].focus();
        }
      }, 150);
    }
  };
}]);