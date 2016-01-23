app.controller(
    'ForgotController',
    function ($scope, $state, $stateParams, UserResource) {

        $scope.forgotFormData = {
            loading: false,
            email: '',
            errors: {}
        };

        $scope.success = false;

        $scope.submit = function () {

            $scope.forgotFormData.loading = true;

            UserResource.forgot(
                {},
                {email: $scope.forgotFormData.email},
                function (response) {
                    $scope.forgotFormData.loading = false;
                    $scope.success = true;
                },
                function (response) {
                    $scope.forgotFormData.loading = false;

                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('email')
                        )
                    ) {
                        $scope.forgotFormData.errors = response.data.messages;
                    } else {

                        alertError(response.data.message);
                    }

                }
            );

            return false;
        };
    }
);
