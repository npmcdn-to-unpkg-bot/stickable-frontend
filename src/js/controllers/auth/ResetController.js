app.controller(
    'ResetController',
    function ($scope, $state, $stateParams, UserResource) {

        $scope.resetFormData = {
            loading: false,
            token: $stateParams.token,
            password: '',
            confirmPassword: '',
            errors: {}
        };

        $scope.success = false;

        $scope.submit = function() {

            if ($scope.resetFormData.password != $scope.resetFormData.confirmPassword) {
                $scope.resetFormData.errors = {
                    confirmPassword: ['Passwords do not match.']
                };
                return false;
            }

            $scope.resetFormData.loading = true;

            UserResource.reset(
                {},
                {
                    token: $scope.resetFormData.token,
                    password: $scope.resetFormData.password
                },
                function (response) {
                    $scope.resetFormData.loading = false;
                    $scope.success = true;
                },
                function (response) {
                    $scope.resetFormData.loading = false;

                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('password')
                        )
                    ) {
                        $scope.resetFormData.errors = response.data.messages;
                    } else {

                        alertError(response.data.message);
                    }

                }
            );

            return false;
        };
   }
);
