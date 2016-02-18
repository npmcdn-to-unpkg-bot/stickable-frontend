app.controller(
    'NotificationsController',
    function ($scope, $rootScope, UserNotificationsResource) {


        $scope.init = function () {

            if (!$rootScope.currentUser) {
                return false;
            }
            UserNotificationsResource.query({username: $rootScope.currentUser.username}, function (results) {
                $rootScope.notifications = results;
            });

        };

        $rootScope.$on('login', function () {
            $scope.init();
        });

        $scope.init();

    }
);
