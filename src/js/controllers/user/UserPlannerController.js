app.controller(
    'UserPlannerController',
    function ($element, $scope, $rootScope, $state, $stateParams, UserResource, ToDoResource, ProgressService) {

        $rootScope.loading = true;
        $rootScope.pageTitle = $stateParams.username;
        setBg($element, '/assets/img/bg/planner.jpg');

        $scope.stickers = [];
        $scope.submissions = [];

        $scope.showPostTasks = true;
        $scope.showPostUser = false;
        $scope.showPostApproval = true;
        $scope.posts = [];

        $scope.user = null;
        $scope.username = $stateParams.username;

        ToDoResource.query({username: $scope.username},
            function (result) {
                $scope.user = result.user;
                $scope.stickers = result.stickers;

                for (var i in result.stickers) {
                    if (result.stickers.hasOwnProperty(i)) {
                        result.stickers[i].progress = ProgressService.getProgress(result.stickers[i]);
                    }
                }

                UserResource.getPosts(
                    {
                        username: $scope.username,
                        type:'submission'
                    },
                    function (response) {
                        $scope.posts = response;
                    }
                );
            }
        );
    }
);
