app.controller(
    'UserSubmissionsController',
    function ($scope, $rootScope, $state, $stateParams, UserResource) {

        $scope.username = $stateParams.username;

        $rootScope.loading = true;
        $rootScope.title = $stateParams.username;
        $rootScope.subtitle = '';

        $scope.user = null;
        $scope.submissions = [];

        UserResource.getSubmissions({username: $scope.username},
            function (result) {
                $scope.user = result.user,
                $scope.submissions = result.submissions
            }
        );
    }
);
