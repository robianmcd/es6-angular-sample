var app = angular.module('myApp', []);

app.config(($provide) => {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
});

app.run(($httpBackend) => {
    let canadianPensionPlans = [
        {name: 'OMERS', grade: 85},
        {name: 'PSPP', grade: 66},
        {name: 'RREGOP', grade: 81},
        {name: 'HOOPP', grade: 70}
    ];

    let americanPensionPlans = [
        {name: 'US1', grade: 84},
        {name: 'US2', grade: 55},
        {name: 'US3', grade: 71}
    ];

    $httpBackend.when('GET', '/api/canadianPensionPlans').respond(200, canadianPensionPlans);
    $httpBackend.when('GET', '/api/americanPensionPlans').respond(200, americanPensionPlans);
});
