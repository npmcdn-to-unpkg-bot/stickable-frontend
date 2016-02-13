app.controller(
    'UserSubmissionsController',
    function ($scope, $rootScope, $state, $stateParams, UserResource) {

        $rootScope.loading = true;
        $rootScope.pageTitle = $stateParams.username;

        $scope.submissions = [];
        $scope.user = null;
        $scope.username = $stateParams.username;

        UserResource.getSubmissions({username: $scope.username},
            function (result) {
                $scope.user = result.user;
                $scope.submissions = result.submissions;
            }
        );
    }
);
