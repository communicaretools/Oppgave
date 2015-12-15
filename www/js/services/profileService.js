angular.module('ReConnectApp.services')
	.factory("profileService", [
		"$http",
		"$log",
		"ApiEndpoint", function($http, $log, ApiEndpoint){
            var onError = function (e) {
                $log.error(e.msg);
            };

        	getUser = function(onSuccess){
    			$http.get(ApiEndpoint.profile +"/userdata")
    				.then(onSuccess, onError);
        	};

            getContact = function(onSuccess){
                $http.get(ApiEndpoint.profile +"/contact")
                    .then(onSuccess, onError);
            };

            getPreferences = function(onSuccess){
                $http.get(ApiEndpoint.profile +"/preferences")
                    .then(onSuccess, onError);
            };

            savePreferences = function(preferences, onSuccess){
                $http.post(ApiEndpoint.profile + "/preferences", {spec: preferences})
                    .then(onSuccess, onError);
            }

        	getAvatar = function(userId, onSuccess){
    			$http.get(ApiEndpoint.avatar + "/resource/" + userId)
    				.then(onSuccess, onError);
        	};

        	avatarList = function(onSuccess){
                $http.get(ApiEndpoint.avatar + "/collection")
                    .then(onSuccess, onError);
        	};

        	saveAvatar = function(avatar, onSuccess){
        		$http.post(ApiEndpoint.avatar + "/resource", {"avatar": avatar})
        			.then(onSuccess, onError);
        	};

            checkUsername = function(username, onSuccess){
                $http.get(ApiEndpoint.profile + "/changeUsername?newName="+ username)
                    .then(onSuccess, onError);
            };

            changeUsername = function(username, onSuccess) {
                $http.post(ApiEndpoint.profile + "/changeUsername", {name: username})
                    .then(onSuccess, onError);
            };

            saveEmail = function(email, onSuccess){
                $http.post(ApiEndpoint.profile +"/changeEmail/", {"Info": email})
                    .then(onSuccess, onError);
            };

            saveSms = function(sms, onSuccess){
                $http.post(ApiEndpoint.profile +"/changeSms/", {"Info": sms})
                    .then(onSuccess, onError);
            };

			var service = {
				"get": getUser,
				"getAvatar": getAvatar,
                "getContact": getContact,
                "getPreferences": getPreferences,
                "savePreferences": savePreferences,
				"saveAvatar": saveAvatar,
				"avatarList": avatarList,
                "checkUsername": checkUsername,
                "changeUsername": changeUsername,
                "saveEmail" : saveEmail,
                "saveSms": saveSms
			};

			return service;
		}
	]);