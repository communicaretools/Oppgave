// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ReConnectApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ReConnectApp', [
	'ionic', 
	'ngStorage',
	'ngAudio',
	'angularMoment',
	'ngIOS9UIWebViewPatch',
	'ReConnectApp.config',
	'ReConnectApp.services',
	'ReConnectApp.filters',
	'ReConnectApp.directives',
	'ReConnectApp.controllers'])

	.run(function($ionicPlatform, amMoment) {
		amMoment.changeLocale('nb');
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('RCA', {
			url: '/RCA',
			cache: false,
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'RCACtrl as RCA'
		})
		.state('RCA.home', {
			url: '/home',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/home/home.html',
					controller: 'HomeCtrl as home'
				}
			}
		})
		.state('RCA.login', {
			url: '/login/:requestedState',
			cache: false,
			params: {
				requestedState: {
					value: null,
					squash: true
				}
			},
			views: {
				'menuContent': {
					templateUrl: 'templates/login.html',
					controller: 'LoginCtrl as login'
				}
			}
		})
		
		// about start
		.state('RCA.about', {
			url: '/about',
			cache: false,
			views: {
				'menuContent': {
					templateUrl: 'templates/about/about.html',
					controller: 'AboutCtrl as about'
				}
			}
		})
		.state('RCA.about.tool', {
			url: '/tool',
			cache: false,
			views: {
				'tab-tool': {
					templateUrl: 'templates/about/tab-tool.html'
				}
			}
		})
		.state('RCA.about.guidelines', {
			url: '/guidelines',
			cache: false,
			views: {
				'tab-guidelines': {
					templateUrl: 'templates/about/tab-guidelines.html'
				}
			}
		})
		//about end
	 ;
	$urlRouterProvider.otherwise('/RCA/home');  
});

