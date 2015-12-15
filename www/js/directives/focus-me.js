angular.module('ReConnectApp.directives')
.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element) {
      $timeout(function() {
        element[0].focus(); 
      }, 150);
    }
  };
});