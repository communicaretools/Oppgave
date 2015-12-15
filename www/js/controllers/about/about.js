angular.module('ReConnectApp.controllers')
	.controller('AboutCtrl', [
		'resources',
		 function(resources){
			var vm = this;

			function initCtrl() {
				resources.load().then(function(){
					vm.tool = resources.get("aboutToolTitle");
					vm.guidelines = resources.get("aboutGuidelinesTitle");
				})
		  	};

		  	initCtrl();
	}])