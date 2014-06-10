//Taken from "Effective Javascript" section 33. This will already be defined in ES5.
if (Object.create === undefined) {
    Object.create = function (prototype) {
        function C() {}

        C.prototype = prototype;
        return new C();
    };
}

var ListCtrlOld = (function () {
    var ListCtrlOld = function (ascending) {
        this.ascending = ascending;

        this.items = [];
    };

    ListCtrlOld.prototype.sort = function () {
        this.items.sort(this.compareItems);
        this.ascending || this.items.reverse();
    };

    return ListCtrlOld;
})();

var PensionListCtrlOld = (function () {

    var PensionListCtrlOld = function ($http, $q) {
        this.title = "Top Pension Plans";

        ListCtrlOld.call(this, true);

        var _this = this;

        $http.get('/api/canadianPensionPlans').success(function(data) {
            _this.items = data;
        });

        /*$q.all([
            $http.get('/api/canadianPensionPlans'),
            $http.get('/api/americanPensionPlans')
        ]).then(function(plans) {
            var canadianPlans = plans[0].data;
            var americanPlans = plans[1].data;

            _this.items.push({name: 'OTPP', grade: 100});
            Array.prototype.push.apply(_this.items, canadianPlans);
            Array.prototype.push.apply(_this.items, americanPlans);
            _this.sort();
        });*/
    };

    PensionListCtrlOld.$inject = ['$http', '$q'];

    PensionListCtrlOld.prototype = Object.create(ListCtrlOld.prototype);

    PensionListCtrlOld.prototype.compareItems = function(a, b) {
        return b.grade - a.grade;
    };

    return PensionListCtrlOld;
})();

