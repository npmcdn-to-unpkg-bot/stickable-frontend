app.controller(
    'TaskController',
    function ($scope, $rootScope, $element, $state, $stateParams, TaskResource, SubmissionResource, UserToDoResource) {

        $rootScope.pageTitle = '';
        $rootScope.loading = true;

        $scope.task = null;
        $scope.isOnToDoList = false;

        TaskResource.get({slug: $stateParams.slug}, function (task) {
            $rootScope.loading = false;
            $rootScope.pageTitle = task.name;
            $scope.task = task;
            $scope.isOnToDoList = $scope.task.isOnToDoList;
            $element.css('background-image', 'url(' + task.bgUrl + ')');
        });

        $scope.comments = TaskResource.getComments({slug: $stateParams.slug});

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

        $scope.submissionFormData = {
            loading: false,
            text: '',
            image: ''
        };

        $scope.addSubmission = function () {
            $scope.submissionFormData.loading = true;
            SubmissionResource.save(
                {
                    taskId: $scope.task.id,
                    text: $scope.submissionFormData.text,
                    image: $scope.submissionFormData.image
                },
                function (response) {

                },
                function (response) {
                    alertError(response.data.message);
                }
            );
        };

        $scope.addComment = function () {

        }
    }
);
