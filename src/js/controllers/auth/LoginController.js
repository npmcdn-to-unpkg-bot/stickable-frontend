app.controller(
    'LoginController',
    function ($element, $scope, $rootScope, $state, $stateParams, AuthService) {

        $rootScope.pageTitle = 'Login';
        setBg($element, '/assets/img/bg/login.jpg');

        $scope.loginFormData = {
            loading: false,
            username: '',
            password: '',
            errors: {}
        };

        $scope.login = function () {

            $scope.loginFormData.loading = true;

            AuthService
                .login($scope.loginFormData.username, $scope.loginFormData.password)
                .then(
                function (response) {
                    $scope.loginFormData.loading = false;
                    $state.go('home');
                },
                function (response) {
                    $scope.loginFormData.loading = false;
                    $scope.sortLoginErrors(response);
                }
            );

            return false;
        };

        $scope.sortLoginErrors = function (response) {
            if (
                response.messages
                &&
                (
                    response.messages.hasOwnProperty('username')
                    ||
                    response.messages.hasOwnProperty('password')
                )
            ) {
                $scope.loginFormData.errors = response.messages;
            } else {

                $scope.loginFormData.errors = {
                    general: response.message
                };
            }
        };

        if ($stateParams.loginFormData) {
            $scope.loginFormData = $stateParams.loginFormData;
        }

        if ($stateParams.response) {
            $scope.sortLoginErrors($stateParams.response);
        }
    }
);
