angular.module("ReConnectApp.controllers")
	.controller("LoginCtrl", [
		'$log',
        '$ionicHistory',
		'$state',
        '$stateParams',
        '$scope',
        '$ionicPopup',
        'stayalive',
		'storageService',
		'loginManager',
		'profileService',
		'resources',
		function($log, $ionicHistory, $state, $stateParams, $scope, $ionicPopup, stayalive, storageService, loginManager, profileService, resources){
			var vm = this;
            var requestedState = $stateParams.requestedState;
            vm.credentials = {
                'username': '',
                'password': ''
            };

			vm.login = login;
			vm.logout = logout;
			
            initCtrl();

            function initCtrl () {
                $ionicHistory.clearHistory();
            };

			var onError = function (e) {
                $log.error(e.msg);
            };
            
            var getUser = function(onResolved) {
                profileService.get(function(result) {
                    storageService.setUser(result.data.userName);
                    storageService.local().user = result.data;
                    onResolved();
                });
            };
			
            var onLoginSuccess = function (result) {
                getUser(function(){
                    stayalive.setup();
                    if(requestedState){
                        $state.go(requestedState);
                    } else {
                        $state.go('RCA.home');
                    }
                });
                
            };
            var onLoginError = function(result) {
                vm.informationText = null;
                $log.error(result);
                if (result.status === 403) {
                    vm.informationText = resources.get('loginError');
                }
            };
            var onLogoutSuccess = function() {
                stayalive.stop();
                storageService.setUser(null);
                $state.go('RCA.home');
            };
            
			function login(username, password){
                if(username === '' || password  === '') {return;}
				loginManager.login(username, password, onLoginSuccess, onLoginError);
			};

			function logout(){
				loginManager.logout(onLogoutSuccess);
			};
		}
]);