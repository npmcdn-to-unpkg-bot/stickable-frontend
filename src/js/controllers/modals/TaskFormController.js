app.controller(
    'TaskFormController',
    function ($scope, sticker, close, TaskResource) {

        $scope.close = close;

        $scope.formData = {
            stickerId: sticker.id,
            name: '',
            submission: '',
            submissionType: 'IMAGE'
        };

        $scope.submissionTypes = [
            {
                value: 'IMAGE',
                icon: 'camera',
                label: 'Take A Picture'
            },
            {
                value: 'TEXT',
                icon: 'pencil',
                label: 'Write Something'
            }
        ];

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
