angular.module('ReConnectApp.controllers')
	.controller('RCACtrl', [
		'requestCounter',
		'loginManager',
		'moduleService',
		'resources',
		'$ionicSlideBoxDelegate',
		'$timeout',
		'$ionicLoading',
		'$ionicModal',
		'$scope', //scope used for watch
		'$state',
		function(requestCounter, loginManager, moduleService, resources, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $ionicModal, $scope, $state) {
			var vm = this;

			vm.showIntroModal = showIntroModal;
			vm.closeIntroModal = closeIntroModal;
			vm.goToAbout =  goToAbout;
			vm.checkActive = checkActive;
			vm.slideHasChanged = slideHasChanged;
			vm.slideNext = slideNext;

			initCrtl();

			function checkActive(item){
				var module = $state.current.name.split('.')[1];
				return item.active.indexOf(module) > -1;
			};

			function setMenuItems(){
				vm.menuItems= moduleService.forMenu();
				vm.menuItems.filter(function(obj){
				});
			};

			function updateLoginStatus() {

				vm.isLoggedIn = loginManager.getLoginStatus();
			};

			function checkLoginStatus() {
				return loginManager.getLoginStatus();
			};

			function checkRequestCounter() {
				return requestCounter.getRequestCount();
			};

			/* display spinner when we have unanswerd requests*/
			function updateSpinnerStatus() {
				if (requestCounter.getRequestCount() > 0) {
					$ionicLoading.show({
						template: '<ion-spinner></ion-spinner>'
					});
				} else {
					$ionicLoading.hide();
				}
			};

			function getIntroData(){
				var stateWithoutRCA = $state.current.name.replace('RCA.', '');
				var module = stateWithoutRCA.split(/(?=[A-Z.])/)[0].replace('.','');
				return moduleService.forIntro(module);
			}

			function goToAbout(){
				closeIntroModal();
				$state.go('RCA.about.guidelines');
			}

			function showIntroModal(){
				vm.introModal = getIntroData();
				$ionicModal.fromTemplateUrl('templates/intro/introduction.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    vm.introductionModal = modal;
                	vm.introductionModal.show();
                });
			};

            function closeIntroModal () {
                vm.introductionModal.hide();
                vm.introductionModal.remove();
            };

            function slideHasChanged(slideIndex) {
                vm.introModal.reachedLast = slideIndex === vm.introModal.steps.length - 1;
			};

            function slideNext(){
    			$ionicSlideBoxDelegate.next();
			};

			function initCrtl() {
				resources.load().then(
					function(){
						setMenuItems();
						vm.isLoggedIn = updateLoginStatus();
						$scope.$watch(checkRequestCounter, updateSpinnerStatus);
						$scope.$watch(checkLoginStatus, updateLoginStatus);
					}
				);
			};
	}]);