angular.module('ReConnectApp.services')
    .factory("autosaveService", [
        "$http",
        "$log",
        "ApiEndpoint", function ($http, $log, ApiEndpoint) {
            var autosaveEndpoint = ApiEndpoint.autosave;

            var onError = function (e) {
                $log.error(e.msg);
            };

            function saveAutosave(module, localIdentifier, data, onSuccess) {
                if (!data) return;
                var model = { module: module, data: JSON.stringify(data) };
                $http.post(autosaveEndpoint + "/autosave/"+localIdentifier,  model)
                    .then(onSuccess, onError);
            }

            function getAutosave(module, localIdentifier, onSuccess) {
                $http.get(autosaveEndpoint + "/autosave/"+localIdentifier+"?module=" + module)
                    .then(function(result){
                        onSuccess(result.data)}, onError);
            }

            function deleteAutosave(module, localIdentifier, onSuccess) {
                $http.delete(autosaveEndpoint + "/autosave/" + localIdentifier + "?module=" + module)
                    .then(onSuccess, onError);
            }

            function saveAutosaveGuid(module, localIdentifier, data, onSuccess) {
                if (!data) return;
                var model = { module: module, data: JSON.stringify(data) };
                $http.post(autosaveEndpoint + "/autosaveGuid/"+localIdentifier,  model)
                    .then(onSuccess, onError);
            }

            function getAutosaveGuid(module, localIdentifier, onSuccess) {
                $http.get(autosaveEndpoint + "/autosaveGuid/"+localIdentifier+"?module=" + module)
                    .then(function(result){
                        onSuccess(result.data)}, onError);
            }

            function deleteAutosaveGuid(module, localIdentifier, onSuccess) {
                $http.delete(autosaveEndpoint + "/autosaveGuid/" + localIdentifier + "?module=" + module)
                    .then(onSuccess, onError);
            }

            function skipAutosave(current, lastAutosave, emptyEntry){
                var autosaveEmpty = lastAutosave == null;
                var contentEmpty = true;
                for(var name in emptyEntry){
                    if(!emptyEntry.hasOwnProperty(name)){continue;}                    
                    if(current[name] !== emptyEntry[name]) {
                        contentEmpty = false; 
                        break;
                    };
                };
                if(autosaveEmpty){return contentEmpty};
                for(var name in lastAutosave){
                    if(!lastAutosave.hasOwnProperty(name)){continue;}
                    if(current[name] !== lastAutosave[name]) {return false};                 
                }
                return true;
            };

            function generateDateId(){
                var date = moment();
                if(date.hours() < 5) {
                    date.subtract(1, 'd');
                }
                return date.format('YYMMDD');
            };
            
            return {
                "get": getAutosave,
                "save": saveAutosave,
                "delete": deleteAutosave,
                "getByGuid": getAutosaveGuid,
                "saveByGuid": saveAutosaveGuid,
                "deleteByGuid": deleteAutosaveGuid,
                "skipAutosave": skipAutosave,
                "dateId": generateDateId
            };
        }
    ]);