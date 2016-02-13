app.controller(
    'UserToDoController',
    function ($scope, $rootScope, $state, $stateParams, UserResource, ToDoResource) {

        $rootScope.loading = true;
        $rootScope.pageTitle = $stateParams.username;

        $scope.tasks = [];
        $scope.user = null;
        $scope.username = $stateParams.username;

        ToDoResource.query({username: $scope.username},
            function (result) {
                $scope.user = result.user,
                    $scope.tasks = result.tasks
            }
        );
    }
);
