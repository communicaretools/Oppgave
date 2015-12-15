angular.module('ReConnectApp.controllers')
	.controller('HomeCtrl', [
		'$ionicHistory',
		'$ionicPopup',
		'$state',
		'resources',
		'storageService',
		'moduleService',
		'loginManager',
		function($ionicHistory, $ionicPopup, $state, resources, storageService, moduleService, loginManager){
			var vm = this;
			var reminders = [];
			vm.info = info;
			vm.getReminder = getReminder;
			
			vm.showLoginInfo = showLoginInfo;

			function setHomeItems(){
				vm.homeItems = moduleService.forHome();
			};

		    initCtrl();

			function initCtrl(){
				$ionicHistory.clearHistory();
				resources.load().then(function() {
					setHomeItems();
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

			function getReminder(item) {
				var reminderItem = reminders.filter(function(obj){
					if(obj.type === item.reminderId) { return obj;}
				});
				item.reminder = reminderItem.length != 1
					? null
					: reminderItem[0].data;
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