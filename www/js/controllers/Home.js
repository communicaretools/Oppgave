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
	}
]);