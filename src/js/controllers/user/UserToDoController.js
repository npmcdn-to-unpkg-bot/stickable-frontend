app.controller(
    'UserToDoController',
    function ($scope, $rootScope, $state, $stateParams, UserResource, UserToDoResource) {

        $scope.username = $stateParams.username;

        $rootScope.loading = true;
        $rootScope.title = $stateParams.username;
        $rootScope.subtitle = '';

        $scope.user = null;
        $scope.tasks = [];

       UserToDoResource.query({username: $scope.username},
            function(result) {
                $scope.user = result.user,
                $scope.tasks = result.tasks
            }
       );
    }
);
