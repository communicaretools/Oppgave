angular.module('ReConnectApp.services')
    .factory('stayalive', [
        '$interval',
        '$ionicPopup',
        '$state',
        '$rootScope',
    	'sessionTimeout',
        'sessionTimeOutWarning',
        'timeoutIntervalFrequecy',
        'loginManager',
        'requestCounter',
        'storageService',
        'resources',
    	function ($interval, $ionicPopup, $state, $rootScope, sessionTimeout, sessionTimeOutWarning, timeoutIntervalFrequecy, loginManager, requestCounter, storageService, resources) {
    		var session;
    		var timestamp;
            var inactivityWarning;
            var showInactivityWarning = false;


    		function setupStayAlive () {
    			setTimeStamp();
    			session = $interval(checkTimeStamp, timeoutIntervalFrequecy);
    		};

    		function getSession() {
    			return session;
    		};

            function openInactivityWarning() {
                if (!showInactivityWarning){
                    inactivityWarning = $ionicPopup.alert({
                    title: resources.get("_inactivityWarningTitle"),
                    template: resources.get("_inactivityWarningDescription")
                    });
                    inactivityWarning.then(function(){
                        showInactivityWarning = false;
                        setTimeStamp();  
                        loginManager.getOptions(function(result){
                            if (!result) {
                                onLogoutSucces();
                            }
                        });
                    });
                    showInactivityWarning = true;   
                }
            };

    		function checkTimeStamp () {
                if(requestCounter.getSuccess() > 0) {
                    setTimeStamp();
                }
                if(timestampExpired()) {
                    loginManager.logout(onLogoutSucces);
    			} else if(showSessionTimeOutWarning()){
                    openInactivityWarning();
                }
    		};

            function showSessionTimeOutWarning() {
                var now = Date.now();
                var delta = now - timestamp;
                if (sessionTimeOutWarning < delta) {
                    return true;
                }
                return false;
            };

            function onLogoutSucces() {
                $interval.cancel(session);
                storageService.setUser(null);
                if (inactivityWarning) {
                    inactivityWarning.close();
                }
                $state.go('RCA.login');
            };

            function stopStayalive () {
                $interval.cancel(session);
                var showInactivityWarning = false;
            };

    		function timestampExpired(){
                var now = Date.now();
                var delta = now - timestamp;
                if (sessionTimeout < delta) {
                    return true;
                }
                return false;
    		};

            function setTimeStamp () {
                timestamp = Date.now();
            };

            function checkRequestCounter() {
                return requestCounter.getRequestCount();
            };

    		var service = {
    			"get": getSession,
    			"setup": setupStayAlive,
                "stop": stopStayalive
    		};

    		return service;
    	}
	]);