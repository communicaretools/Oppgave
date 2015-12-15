angular.module('ReConnectApp.services')
    .service('resources', [
        '$q',
        '$http',
        '$localStorage',
        'ResourcePath',
        'DefaultLanguage',
        function ($q, $http, $localStorage, resourcePath, defaultLanguage) {
            var resources = {};
            var deferred = $q.defer();
            var loaded = false;

            var sameLanguageAsSet = function (language) {
                if ($localStorage.language === language) {
                    return true;
                } else if (!language && ($localStorage.language === defaultLanguage)) {
                    return true;
                };
                return false;
            };

            var loadLanguage = function () {
                if (loaded) {
                    deferred.resolve("Allready loaded");
                    return;
                };
                resources = {};

                $http.get($localStorage.resourcePath).success(function(result) {
                    resources = angular.extend(resources, result);
                    $localStorage.resources = resources; 
                    loaded = true;
                    deferred.resolve("Loaded");
                });
            };

            var setLanguage = function (language) {

                loaded = loaded && (sameLanguageAsSet(language));
                if(loaded){return;}
                
                language = language || defaultLanguage;
                $localStorage.language = language;
                $localStorage.resourcePath = resourcePath + 'global.' + language + '.json';
            };

            function get (key) {
                if (!loaded) {
                    return deferred.promise.then(function () {
                        return get(key);
                    });
                }
                return $localStorage.resources[key] ? $localStorage.resources[key] : "Missing key: '" + key + "'";
            };

            function load () {
                return deferred.promise;
            };            

            function set (language) {
                deferred = $q.defer();
                setLanguage(language);
                loadLanguage();
                return load();
            };

            setLanguage($localStorage.language);
            loadLanguage();

            return {
                get: get,
                load: load,
                setLanguage: set
            };
        }
    ]);