angular.module("ReConnectApp.filters")
	.filter('agoOrDate', [
		'moment', 
		'resources', 
		function(moment, resources){
			return function(date, limit){
				var dayLimit = limit ? limit : 26; //26 is used as treshold by moment 
				var secLimit = 60;
				var a = moment(date);
				var dayDiff = moment().diff(a, 'days');
				var minDiff = moment().diff(a, 'seconds');
				if(minDiff<=secLimit){
					return resources.get("_now");
				}
				if(dayDiff>=dayLimit){
					return a.calendar();
				} else {
					return a.fromNow();
				}
			};
		}
	]);