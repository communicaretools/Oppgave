
describe("when applying limit", function () {
    var element, scope;

    beforeEach(module('ReConnectApp.filters'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        scope.test = "test test";
    }));

    var digestAndExpectToBe = function(text) {
        scope.$digest();
        expect(element.text()).toEqual(text);
    };

    it("default is 100, which doesn't limit the tested text", inject(function ($compile) {
        element = $compile("<div>{{test|limit}}</div>")(scope);
        digestAndExpectToBe("test test");
    }));

    it("with length greater then text, doesn't limit the tested text", inject(function ($compile) {
        element = $compile("<div>{{test|limit:20}}</div>")(scope);
        digestAndExpectToBe("test test");
    }));

    it("with length lesser then text, should limit text", inject(function ($compile) {
        element = $compile("<div>{{test|limit:6}}</div>")(scope);
        digestAndExpectToBe("test...");
    }));

    it("with length lesser then first word", inject(function ($compile) {
        element = $compile("<div>{{test|limit:3}}</div>")(scope);
        digestAndExpectToBe("tes...");
    }));

    it("with no text returns empty string", inject(function ($compile) {
        scope.test = "";
        element = $compile("<div>{{test|limit:3}}</div>")(scope);
        digestAndExpectToBe("");
    }));
});