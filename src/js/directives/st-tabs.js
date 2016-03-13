app.directive('stTabs', function factory() {
    return {
        restrict: 'E',
        controller: function ($scope) {
            $scope.onChange = function ($event, value) {
                preventDefault($event);
                $scope.model = value;
            }
        },
        scope: {
            model: '=',
            values: '='
        },
        templateUrl: 'views/directives/st-tabs.html',
    };
});
