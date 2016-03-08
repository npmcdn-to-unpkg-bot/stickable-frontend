app.directive('stEvents', function () {
    return {
        templateUrl: 'views/directives/st-events.html',
        restrict: 'E',
        scope: {
            events: '='
        },
        controller: function ($scope, $rootScope, $state, UserNotificationsResource) {

        }
    }
});
