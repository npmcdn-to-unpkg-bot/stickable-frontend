app.controller(
    'UserProfileController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource, ToDoResource) {

        $rootScope.loading = true;
        $rootScope.pageTitle = $stateParams.username;

        $scope.username = $stateParams.username;

        $scope.user = null;
        $scope.stickers = null;
        $scope.todo = null;
        $scope.posts = null;
        UserResource.get(
            {username: $scope.username},
            function(user) {
                $scope.user = user;

                $scope.stickers = UserResource.getStickers({username: $scope.username});
                $scope.posts = UserResource.getPosts({username: $scope.username});

                ToDoResource.query({username: $scope.username},
                    function (result) {
                        $scope.todo = result.tasks
                    }
                );

            }
        );
    }
);
