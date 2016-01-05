app.controller(
    'TaskController',
    function ($scope, $rootScope, $state, $stateParams, TaskResource, UserToDoResource) {

        $rootScope.loading = true;

        $scope.task = null;
        $scope.isOnToDoList = false;

        TaskResource.get({slug: $stateParams.slug}, function (task) {
            $rootScope.loading = false;
            $scope.task = task;
            $scope.isOnToDoList = $scope.task.isOnToDoList;
        });

        $scope.addToDo = function () {
            console.log('addToDo');
            UserToDoResource.save(
                {username: $rootScope.currentUser.username},
                {taskId: $scope.task.id},
                function (result) {
                    alertSuccess('Added to To Do List');
                    $scope.isOnToDoList = true;
                },
                function (result) {
                    alertError(result.data.message);
                }
            );
        };

        $scope.removeToDo = function () {
           UserToDoResource.delete(
                {username: $rootScope.currentUser.username},
                {taskId: $scope.task.id},
                function (result) {
                    alertSuccess('Removed from To Do List');
                    $scope.isOnToDoList = false;
                },
                function (result) {
                    alertError(result.data.message);
                }
            );
        };
    }
);
