app.controller(
    'PostFormController',
    function ($scope, $rootScope, $state, $stateParams, PostResource) {

        alert($scope.postType);

        $scope.task = $scope.$parent.task;

        $scope.formData = {
            loading: false,
            comment: ''
        };

        $scope.postType = '';

        $scope.setPostType = function(postType) {
            $scope.postType = postType === $scope.postType ? '' : postType;
        };

        $scope.addComment = function () {
            $scope.formData.loading = true;
            CommentResource.save(
                {
                    taskId: $scope.task.id,
                    comment: $scope.formData.comment,
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
