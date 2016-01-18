app.controller(
    'UserProfileController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource) {

        $rootScope.loading = true;
        $rootScope.pageTitle = $stateParams.username;

        $scope.username = $stateParams.username;

        $scope.user = UserResource.get({username: $scope.username});
    }
);
