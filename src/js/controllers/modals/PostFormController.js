app.controller(
    'PostFormController',
    function ($scope, PostResource, task, postType, close) {

        $scope.task = task;
        $scope.postType = postType ? postType : 'tip';
        $scope.close = close;

        $scope.formData = {
            title: '',
            text: '',
        };

        $scope.setPostType = function($event, postType) {
            preventDefault($event);

            $scope.postType = postType === $scope.postType ? '' : postType;
        };

        $scope.submit = function () {
            PostResource.saveTaskPost(
                {
                    taskSlug: $scope.task.slug,
                },
                {
                    title: $scope.formData.title,
                    text: $scope.formData.text,
                    type: $scope.postType
                },
                function (response) {
                    console.log(response);
                    alertSuccess("Post saved");
                    close(response.post);
                },
                function (response) {
                    alertError(response.data.message);
                }
            );
        };

    }
);
