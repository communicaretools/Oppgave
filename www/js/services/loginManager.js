angular.module('ReConnectApp.services')
    .factory("loginManager", [
        '$http', 
        '$log', 
        '$q',
        'ApiEndpoint', function ($http, $log, $q, ApiEndpoint) {
            var isLoggedIn;
            initService();
            function onError(e) {
                $log.error(e.msg);
            };

            function getLoginOptions(onSuccess) {
                var deferred = $q.defer();
                $http.get(ApiEndpoint.auth + "/login").then(
                    function (result) {
                        deferred.resolve(result.data.isLoggedIn);
                    },
                    onError);
                return deferred.promise;
            };

            function getLoginStatus(onSuccess) {
                return isLoggedIn;
            }

            function performLogin(username, password, onSuccess, onLoginError) {
                $http.post(ApiEndpoint.auth + "/login", { username: username, password: password })
                    .then(function (result) {
                        isLoggedIn = true;
                        onSuccess(result);
                    }, function (result) {
                        isLoggedIn = false;
                        onLoginError(result);
                    });
            };

            function logout(onSuccess){
        		$http.get(ApiEndpoint.auth + "/logout").then(function (result) {
                        isLoggedIn = false;
                        onSuccess(result);
                    }, onError);
            };


            function initService() {
                getLoginOptions().then(function(result) {
                    isLoggedIn = result;
                });
            };

            return {
            	"logout": logout,
            	"login": performLogin,
                "getLoginStatus":  getLoginStatus,
                "getOptions": getLoginOptions
            };
        }
    ]);