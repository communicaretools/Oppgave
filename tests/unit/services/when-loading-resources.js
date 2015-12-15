describe('when loading the resources service', function () {
    beforeEach(function () {
        module('ngStorage',
                'ReConnectApp.services', 
                'ReConnectApp.config');
    });

    afterEach(inject(function($localStorage) {
        $localStorage.$reset();
    }));

    describe('using get', function () {
        it('should set resourcePath', inject(function($localStorage, $injector) {
            $injector.get('resources');
            expect($localStorage.resourcePath).toEqual('resources/global.nb-NO.json');
        }));
    });

    describe('using setResources', function () {
        var ls;
        var rr;
        var hb;
        var rs;

        var setupHttpBackEnd = function (language) {
            hb.expectGET('resources/global.' + language + '.json').respond(200, {
                'key-one': 'value one',
                'key-two': 'value two'
            });
        }

        var checkLocalStorage = function (toMatch) {
            expect(ls.language).toEqual(toMatch);
            expect(ls.resourcePathGlobal).toEqual('resources/global.' + toMatch + '.json');
        };

        beforeEach(inject(function ($localStorage, $httpBackend, $rootScope, $injector) {
            ls = $localStorage;
            hb = $httpBackend;
            rs = $rootScope;
            ls.language = null;
            rr = null;
            setupHttpBackEnd('nb-NO');
            $injector.get('resources');
            hb.flush();
        }));
    });

    it('should return a promise when load is called', inject(function (resources) {
        var result = resources.load();
        expect(result.then()).toBeDefined();
    }));

    describe('when getting resources', function () {
        beforeEach(inject(function ($httpBackend) {
            $httpBackend.expectGET('resources/global.nb-NO.json').respond({
                'key-one': 'value one',
                'key-two': 'value two'
            });
        }));

        it('should return a promise if resources has not been loaded', inject(function (resources, $httpBackend) {
            var result = resources.get('key-one');
            expect(angular.isFunction(result.then)).toBe(true);

            var value;
            result.then(function (r) {
                value = r;
            });
            $httpBackend.flush();  // deliver resources
            expect(value).toEqual('value one');
        }));

        it('should return a value if the requested resource is already loaded', inject(function (resources, $httpBackend) {
            $httpBackend.flush();  // deliver resources
            var result = resources.get('key-one');
            expect(result).toEqual('value one');
            result = resources.get('key-two');
            expect(result).toEqual('value two');
        }));
                
        it('should return new values if the resource language is changed', inject(function (resources, $httpBackend) {
            var keyUSGlobal = 'key-one';
            var keyGBGlobal = 'key-six';

            $httpBackend.flush();  // deliver resources
            expect(resources.get(keyUSGlobal)).toEqual('value one');
            expect(resources.get(keyGBGlobal)).not.toEqual('value six');
            $httpBackend.expectGET('resources/global.en-GB.json').respond({
                'key-five': 'value five',
                'key-six': 'value six'
            });

            resources.setLanguage('en-GB');
            $httpBackend.flush();  // deliver resources
            expect(resources.get(keyGBGlobal)).toEqual('value six');
            expect(resources.get(keyUSGlobal)).not.toEqual('value one');
        }));

        it('should return a value prefixed with missing if the requested resource not in resource set', inject(function (resources, $httpBackend) {
            $httpBackend.flush();  // deliver resources
            var keyMissing = 'key-missing';
            var result = resources.get(keyMissing);
            expect(result).toEqual('Missing key: \'' + keyMissing + '\'');
        }));
    }); 
});