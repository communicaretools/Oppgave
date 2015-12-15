describe("when applying agoOrDate", function () {
    var element, scope;

    beforeEach(module(
        'angularMoment',
        'ReConnectApp.filters',
        'ReConnectApp.mocks'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
    }));

    var digestAndExpectToContain = function(text, shouldMatch) {
        scope.$digest();
        if(shouldMatch){
            expect(element.text()).toMatch(text);
        }else {
            expect(element.text()).not.toMatch(text);
        }
    };

    function substractDays(theDate, days) {
        return new Date(theDate.getTime() - days*24*60*60*1000);
    }

    it("should as default display 'now' as text", inject(function ($compile) {
        scope.date = new Date();
        element = $compile("<div>{{date|agoOrDate}}</div>")(scope);
        digestAndExpectToContain("now", true);
    }));

    it("should as default display an old date as date", inject(function ($compile) {
        scope.date = substractDays(new Date(), 60);
        element = $compile("<div>{{date|agoOrDate}}</div>")(scope);
        digestAndExpectToContain("ago", false);
    }));

    it("should display an old date as text if limit is set", inject(function ($compile) {
        scope.date = substractDays(new Date(), 60);
        element = $compile("<div>{{date|agoOrDate : 60}}</div>")(scope);
        digestAndExpectToContain("ago", true);
    }));

    it("should display an old date as date if limit is lower", inject(function ($compile) {
        scope.date = substractDays(new Date(), 60);
        element = $compile("<div>{{date|agoOrDate : 50}}</div>")(scope);
        digestAndExpectToContain("ago", false);
    }));
});