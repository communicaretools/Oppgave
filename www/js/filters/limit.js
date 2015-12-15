angular.module('ReConnectApp.filters')
    .filter('limit', function () { // fetched from IP (tests are there)
        return function (input, length) {
            length = length || 100;
            if (!input || input.length === 0) return "";
            if (input.length <= length) return input;
            return input.substr(0, length).replace(/\s[a-zA-Z0-9\-]*$/, "") + "...";
        };
    });