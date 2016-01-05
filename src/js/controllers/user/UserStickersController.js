app.controller(
    'UserStickersController',
    function ($scope, $rootScope, $state, $stateParams, UserResource) {

        $scope.username = $stateParams.username;

        $rootScope.loading = true;
        $rootScope.title = $stateParams.username;
        $rootScope.subtitle = '';

        $scope.user = null;
        $scope.stickers = [];

        UserResource.getStickers({username: $scope.username},
            function (result) {
                $scope.user = result.user,
                $scope.stickers = result.stickers
            }
        );
    }
);
