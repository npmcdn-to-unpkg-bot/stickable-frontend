app.controller(
    'CommentFormController',
    function ($scope, $rootScope, $state, $stateParams, CommentResource) {

        $scope.task = $scope.$parent.task;

        $scope.commentFormData = {
            loading: false,
            comment: ''
        };

        $scope.addComment = function () {
            $scope.commentFormData.loading = true;
            CommentResource.save(
                {
                    taskId: $scope.task.id,
                    comment: $scope.commentFormData.comment,
                },
                function (response) {
                    console.log(response);
                    $scope.$parent.comments.unshift(response.comment);
                },
                function (response) {
                    alertError(response.data.message);
                }
            );
        };

    }
);
