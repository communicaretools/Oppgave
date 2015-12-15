
describe("when applying percentage", function () {
    var element, scope;

    beforeEach(module('ReConnectApp.filters'));
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        scope.test = 0.7052;
    }));

    var digestAndExpectToBe = function(text) {
        scope.$digest();
        expect(element.text()).toEqual(text);
    };

    it("should by default, not have decimals", inject(function ($compile) {
        element = $compile("<div>{{test|percentage}}</div>")(scope);
        digestAndExpectToBe("71%");
    }));

    it("should display correct number of decimals", inject(function ($compile) {
        element = $compile("<div>{{test|percentage:2}}</div>")(scope);
        digestAndExpectToBe("70.52%");
    }));

    it("should produce trailing zeros, if decimals are set higer than the number has", inject(function ($compile) {
        element = $compile("<div>{{test|percentage:3}}</div>")(scope);
        digestAndExpectToBe("70.520%");
    }));

    it("should with no number return 0%", inject(function ($compile) {
        scope.test = null;
        element = $compile("<div>{{test|percentage}}</div>")(scope);
        digestAndExpectToBe("0%");
    }));
});