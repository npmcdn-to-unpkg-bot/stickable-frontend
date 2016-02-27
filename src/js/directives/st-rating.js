app.directive('stRating', function factory() {
    return {
        restrict: 'E',
        controller: function($scope) {
            $scope.setValue = function(val) {
                $scope.model = val;
            }
        },
        scope: {
            model: '=',
            values: '='
        },
        template: function () {
            var t = '<ul class="rating">';
            for (var i = 5; i > 0; i--) {
                t += '<li ng-class="{\'active\': model === ' + i + '}" ng-click="setValue(' + i + ')">{{ values['+(i-1)+'] }}</li>';
            }
            t += '</ul>';
            return t;
        }
    };
});
