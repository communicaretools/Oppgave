angular.module('ReConnectApp.filters')
 .filter('unsafe', ['$sce', function ($sce) {
     return function (text) {
     	var text = text ? text.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';
         return $sce.trustAsHtml(text);
     };
 }]);