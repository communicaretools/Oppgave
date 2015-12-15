angular.module('ReConnectApp.services')
	.factory('storageService', [
		'$localStorage',
		'$sessionStorage',
		function ($localStorage, $sessionStorage) {
			if (!$localStorage.users)
				$localStorage.users = {};

			if (!$sessionStorage.users)
				$sessionStorage.users = {};			

			return {
				"getItem": getEncItem,
				"setItem": setEncItem,
				"removeItem": removeEncItem,
				"setUser": setCurrentUser,
				"getCurrentUser": getCurrentUser,
				"local": getLocalObject,
				"session": getSessionObject,
				"reset": deleteAll
			};

			function setEncItem(secret, key, object) {
				var user = getCurrentUser();
				if(!user) return null;
				if(!object){
					removeEncItem(key);
					return;
				}
				var encrypted = encrypt(object, secret);
				$localStorage.users[user][key] = encrypted;
			}

			function getEncItem(secret, key) {
				var user = getCurrentUser();
				if(!user)return null;
				var encrypted = $localStorage.users[user][key];
				return encrypted && decrypt(encrypted, secret);
			}

			function removeEncItem(key){
				var user = getCurrentUser();
				if(!user) {return;}
				delete $localStorage.users[user][key];
			}

			function setCurrentUser (user) {
				$localStorage.currentUser = user;

				if (!$localStorage.users[$localStorage.currentUser])
					$localStorage.users[$localStorage.currentUser] = {};

				if (!$sessionStorage.users[$localStorage.currentUser])
					$sessionStorage.users[$localStorage.currentUser] = {};
			}

			function getCurrentUser() {
				return $localStorage.currentUser;
			}

			function getLocalObject() {
				return $localStorage.currentUser === null ? null : $localStorage.users[$localStorage.currentUser];
			}

			function getSessionObject() {
				return $localStorage.currentUser === null ? null : $sessionStorage.users[$localStorage.currentUser];
			}

			function deleteAll() {
				delete $localStorage;
				delete $sessionStorage;
			}

			function encrypt(object, secret) {
				var objectAsJson = JSON.stringify(object);
				return CryptoJS.TripleDES.encrypt(objectAsJson, secret);
			}

			function decrypt(encrypted, secret) {
				var decrypted = CryptoJS.TripleDES.decrypt(encrypted, secret);
				return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
			}
	}]);