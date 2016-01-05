app.controller(
    'SignupController',
    function ($scope, $state, AuthService, UserResource) {

        $scope.signupFormData = {
            loading: false,
            username: '',
            password: '',
            email: '',
            errors: {}
        };

        $scope.signup = function () {
            if ($scope.signupFormData.loading) {
                return false;
            }
            $scope.signupFormData.errors = {};
            $scope.signupFormData.loading = true;

            UserResource.save({
                username: $scope.signupFormData.username,
                password: $scope.signupFormData.password,
                email: $scope.signupFormData.email,
            }, function(response) {

                AuthService
                    .login($scope.signupFormData.username, $scope.signupFormData.password)
                    .then(
                        function (response) {
                            $scope.signupFormData.loading = false;
                            $state.go('home');
                        },
                        function (response) {
                            $scope.signupFormData.loading = false;
                            $scope.signupFormData.errors = {
                                general: response.message
                            };
                        }
                    );

            }, function (response) {
                $scope.signupFormData.loading = false;

                response = response.data;
                if (
                    response.messages
                    &&
                    (
                        response.messages.hasOwnProperty('username')
                        ||
                        response.messages.hasOwnProperty('password')
                        ||
                        response.messages.hasOwnProperty('email')
                    )
                ) {
                    $scope.signupFormData.errors = response.messages;
                } else {

                    $scope.signupFormData.errors = {
                        general: response.message
                    };
                }
            });
        };
    }
);
