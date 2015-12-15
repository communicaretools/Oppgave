angular.module('ReConnectApp.directives')
    .directive('r', [
        'resources', 
        function(resources) {
    
    function setElementContent(resText, nameTag, type){

            if (nameTag !== 'button' &&
                ((nameTag === 'input' && type === 'submit') || (nameTag === 'input' && type === 'reset'))) {
                elm.val(resText);
            } else if (nameTag !== 'button' && (nameTag === 'input' || nameTag === "textarea")) {
                elm.attr("placeholder", resText);
            } else if (nameTag === 'ion-tab') {
                elm.attr('title', resText);
            } else if (nameTag === 'img') {
                elm.attr('alt', resText);
            } else {
                elm.html(resText);
            }
        }

        function setContent(resText, element, attrs) {
            if (!resText) {
                resText = 'missing:' + attrs.r;
            }
            elm = angular.element(element);
            var nameTag = elm[0].nodeName.toLowerCase();
            var type = elm[0].type;
            setElementContent(resText, nameTag, type);
        };

        return function(scope, element, attrs) {
            var promise = resources.get(attrs.r);
            if (promise && angular.isFunction(promise.then)) {
                promise.then(function (value) {
                    setContent(value, element, attrs);
                });
            } else {
                setContent(resources.get(attrs.r), element, attrs);
            }
        };
    }]);