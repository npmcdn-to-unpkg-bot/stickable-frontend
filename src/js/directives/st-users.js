app.directive('stUsers', function factory() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            like: '='
        },
        templateUrl: 'views/directives/st-users.html'
    };
});
