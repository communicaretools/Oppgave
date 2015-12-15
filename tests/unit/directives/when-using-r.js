describe('When using resources', function () {
    var resources;

    beforeEach(module('ReConnectApp.directives', 'ReConnectApp.config', 'ReConnectApp.mocks', 'ngStorage', function ($provide) {
        $provide.service('resources', function () {
            return {
                get: getResourceMock
            };
        });
    }));

    afterEach(inject(function ($localStorage) {
        $localStorage.$reset();
    }));

    var mockResource = function (key, value) {
        resources = resources || {};
        resources[key] = value;
        getResourceMock = function(resourceKey) {
            return resources[resourceKey];
        }
    };

    it('should display output of the resource function when the resource is present', inject(function ($compile) {
        getResourceMock = function (resourceKey) {
            expect(resourceKey).toEqual('existing-resource');
            return 'resource text';
        };

        var element = $compile('<span r="existing-resource" />')({});
        expect(element.text()).toEqual('resource text');
    }));

    it('should defer display if the resource service returns a promise', inject(function ($compile, $q) {
        var deferred = $q.defer();
        getResourceMock = function (resourceKey) {
            return deferred.promise;
        };

        var element = $compile('<span r="existing-resource">placeholder text</span>')({});
        expect(element.text()).toEqual('placeholder text');

        // add assertion to queue, after the one added by 'r' directive
        deferred.promise.then(function (value) {
            expect(element.text()).toEqual(value);
        });

        deferred.resolve('resource text');
    }));

    describe('when the resource is missing', function () {
        var element;
        beforeEach(inject(function ($compile) {
            getResourceMock = function (resourceKey) { return undefined; };
            element = $compile('<span r="no-such-resource" />')({});
        }));

        it('should log display the resource key where the text was supposed to go', function () {
            expect(element.text()).toEqual('missing:no-such-resource');
        });
    });

    it('should set placeholder if element is input', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<input r="existing-resource" />')({});
        expect(element.attr('placeholder')).toEqual('resource text');
    }));

    it('should set text if element is button', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<button r="existing-resource" />')({});
        expect(element.text()).toEqual('resource text');
    }));

    it('should set alt if element is img', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<img r="existing-resource" />')({});
        expect(element.attr('alt')).toEqual('resource text');
    }));

    it('should set name if element is option', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<option r="existing-resource" />')({});
        expect(element.text()).toEqual('resource text');
    }));

    it('should set value if element is input[type="submit"]', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<input type="submit" r="existing-resource" />')({});
        expect(element.attr('value')).toEqual('resource text');
    }));

    it('should set value if element is input[type="reset"]', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<input type="reset" r="existing-resource" />')({});
        expect(element.attr('value')).toEqual('resource text');
    }));

    it('should set text if element is button[type="reset"]', inject(function ($compile) {
        mockResource('existing-resource', 'resource text');
        var element = $compile('<button type="reset" r="existing-resource" />')({});
        expect(element.text()).toEqual('resource text');
    }));
});