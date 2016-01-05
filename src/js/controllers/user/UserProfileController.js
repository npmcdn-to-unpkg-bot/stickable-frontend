app.controller(
    'UserProfileController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource) {

        $scope.username = $stateParams.username;

        $rootScope.loading = true;
        $rootScope.title = $stateParams.username;
        $rootScope.subtitle = '';

        $scope.user = UserResource.get({username: $scope.username});
    }
);
