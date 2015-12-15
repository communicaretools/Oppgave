angular.module("ReConnectApp.config")
	.config(function($ionicConfigProvider) {
		$ionicConfigProvider.tabs.position("top");
		$ionicConfigProvider.tabs.style("striped");
		$ionicConfigProvider.form.checkbox("circle");
		$ionicConfigProvider.navBar.alignTitle("center");
	});

	//Find more in: http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
