angular.module('ReConnectApp.filters')
    .filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
        	decimals = decimals || 0;
    		return $filter('number')(input * 100, decimals) + '%';
        };
    }]);