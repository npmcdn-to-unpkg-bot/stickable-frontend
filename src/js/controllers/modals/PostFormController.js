app.controller(
    'PostFormController',
    function ($scope, PostResource, SubmissionResource, task, postType, close) {

        $scope.task = task;
        $scope.postType = postType ? postType : 'question';
        $scope.close = close;

        $scope.formData = {
            loading: false,
            title: '',
            text: '',
            private: 0
        };

        $scope.setPostType = function($event, postType) {
            preventDefault($event);

            $scope.postType = postType === $scope.postType ? '' : postType;
        };
        ;

        $scope.submit = function () {

            $scope.formData.loading = true;

            if (!$scope.postType) {
                alertError("Please select what type of post this is.");
                return false;
            } else if ($scope.postType === 'submission') {

                SubmissionResource.save(
                    {
                        taskSlug: $scope.task.slug,
                    },
                    {
                        postTitle: $scope.formData.title,
                        postText: $scope.formData.text,
                        private: $scope.formData.private
                    },
                    function (response) {
                        console.log(response);
                        alertSuccess("Submission saved");
                        close(response.post);
                    },
                    function (response) {
                        alertError(response.data.message);
                    }
                );


            } else {

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
            }
        };

    }
);
