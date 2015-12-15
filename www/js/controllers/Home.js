angular.module('ReConnectApp.controllers')
	.controller('HomeCtrl', [
		'$ionicHistory',
		'$ionicPopup',
		'$state',
		'resources',
		'storageService',
		'loginManager',
		function($ionicHistory, $ionicPopup, $state, resources, storageService, loginManager){
			var vm = this;
			var reminders = [];
			vm.info = info;
			
			vm.showLoginInfo = showLoginInfo;



		    initCtrl();

			function initCtrl(){
				$ionicHistory.clearHistory();
				resources.load().then(function() {
					var isLoggedIn = loginManager.getLoginStatus();
					if(isLoggedIn){
						vm.user = (storageService.local() && storageService.local().user) 
							? storageService.local().user
							: null;
					}
				});	
			};
			
			function info(e, name, description){
				var notImplemented = $ionicPopup.alert({
					title: "Info - " + name,
					template: resources.get(description)
				});
				notImplemented.then(function(){});
			};

			function showLoginInfo(requestedState) {
				var comfirmPopup = $ionicPopup.confirm({
					title: resources.get('homeLoginInfoTitle'),
					template: resources.get("homeLoginInfo"),
					okText: resources.get("homeGoToLogin"),
					cancelText: resources.get("homeLoginLater"),
					okType: '',
					cancelType: 'secondary'
				});
				comfirmPopup.then(function(result){
					if(result) {
						$state.go('RCA.login', {requestedState: requestedState});
					}
				});
			};
	}
]);