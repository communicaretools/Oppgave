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

			function onError(e) {
                $log.error(e.msg);
            };
            
            function getUser(onResolved) {
                profileService.get(function(result) {
                    storageService.setUser(result.data.userName);
                    storageService.local().user = result.data;
                    onResolved();
                });
            };
			
            function onLoginSuccess(result) {
                getUser(function(){
                    stayalive.setup();
                    if(requestedState){
                        $state.go(requestedState);
                    } else {
                        $state.go('RCA.home');
                    }
                });
                
            };
            function onLoginError(result) {
                vm.informationText = null;
                $log.error(result);
                if (result.status === 403) {
                    vm.informationText = resources.get('loginError');
                }
            };
            function onLogoutSuccess() {
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