class ListCtrl {
    constructor(ascending) {
        this.ascending = ascending;

        this.items = [];
    }

    sort() {
        this.items.sort(this.compareItems);
        this.ascending || this.items.reverse();
    }
}

class PensionListCtrl extends ListCtrl {
    static get $inject() { return ['$scope', '$http']; }

    constructor($scope, $http) {
        super(true);

        $http.get('/api/canadianPensionPlans').success((data) => {
            this.items = data;
        });

        /*Promise.all([
            $http.get('/api/canadianPensionPlans'),
            $http.get('/api/americanPensionPlans')
        ]).then((plans) => {
            let canadianPlans = plans[0].data;
            let americanPlans = plans[1].data;

            this.items = [{name: 'OTPP', grade: 100}, ...canadianPlans, ...americanPlans];
            this.sort();

            $scope.$apply();
        });*/
    }


    compareItems(a, b) {
        return b.grade - a.grade;
    }

    get title() { return "Top Pension Plans"; }
}

