app.controller(
    'TaskFormController',
    function ($scope, SubmissionResource, name, close, TaskResource) {

        $scope.close = close;

        $scope.formData = {
            name: name,
            submission: '',
            submissionType: 'IMAGE'
        };

        $scope.submit = function () {
            TaskResource.save(
                $scope.formData,
                function (response) {
                    console.log(response);
                    alertSuccess("Task saved");
                    close(response.task);
                },
                function (response) {
                    alertError(response.data.message);
                }
            );
        }

    }
);
