app.controller(
    'UserStickersController',
    function ($scope, $rootScope, $state, $stateParams, UserResource) {

        $rootScope.loading = true;

        $scope.user = null;
        $scope.username = $stateParams.username;
        $scope.stickers = [];

        UserResource.getStickers({username: $scope.username},
            function (result) {
                $scope.user = result.user;
                $scope.stickers = result.stickers;

                $rootScope.pageTitle = result.user.possessiveName + ' Stickers';
            }
        );
    }
);
