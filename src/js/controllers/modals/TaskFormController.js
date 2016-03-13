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

        $scope.errors = {};

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

        $scope.submitting = false;

        $scope.submit = function () {

            if ($scope.submitting) {
                return false;
            }

            var errors = false;

            $scope.errors = {};

            if (!$scope.formData.name) {
                $scope.errors.name = ['Please enter a name.'];
                errors = true;
            }

            if (!$scope.formData.submission) {
                $scope.errors.submission = ['Please fill this out.'];
                errors = true;
            }

            if (errors) {
                return false;
            }

            $scope.submitting = true;


            TaskResource.save(
                $scope.formData,
                function (response) {
                    $scope.submitting = false;
                    alertSuccess("Task saved");
                    close(response.task);
                },
                function (response) {
                    $scope.submitting = false;
                    $scope.submitting = false;
                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('name')
                            ||
                            response.data.messages.hasOwnProperty('submission')
                        )
                    ) {
                        $scope.errors = response.data.messages;
                    } else {
                        alertError(response.data.message);
                    }
                }
            );
        }

    }
);
