angular.module('ReConnectApp.services')
	.factory('moduleService', ['resources', function(resources) {
		var modules = null;

		function setupModules() {
 		 	modules = {
				home: {
					state: 'RCA.home',
					name: resources.get('menuHome'),
					active: ['home'],
					goToKey: 'goToHome',
					introSteps: [1]
				},
				
				about: {
					state: 'RCA.about',
					name: resources.get('menuAbout'),
					active: ['about'],
					goToKey: 'goToAbout',
					introSteps: [1]
				}
				
			}
		}

		function introData(module){
			var moduleData = modules[module];
			return {
				module: module,
				goTo: moduleData.goToKey,
				steps: moduleData.introSteps,
				reachedLast: moduleData.introSteps.length <= 1
			};
		};

		function forMenu(){
			return [
				modules.home,
				modules.about
			];
		};

		function forHome(){
			return [
				modules.exercises, 
				modules.forum, 
				modules.registration, 
				modules.messages
			];
		};
		
		function initService(){
			resources.load().then(setupModules);
		};

        initService();
		var service = {
			forMenu: forMenu,
			forHome: forHome,
			forIntro: introData,
			setupModules: setupModules
		};
		return service;
	}])