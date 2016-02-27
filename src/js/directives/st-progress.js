app.directive('stProgress', function factory() {
    return {
        restrict: 'E',
        scope: {
            progress: '='
        },
        templateUrl: 'views/directives/st-progress.html'
    };
});
