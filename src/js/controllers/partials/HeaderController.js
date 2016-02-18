app.controller(
    'HeaderController',
    function ($scope, $state, ModalService, AuthService) {

        $scope.loginFormData = {
            loading: false,
            username: '',
            password: '',
            errors: {}
        };

        $scope.login = function () {

            $scope.loginFormData.loading = true;
            console.log($scope);

            AuthService
                .login($scope.loginFormData.username, $scope.loginFormData.password)
                .then(
                function (response) {
                    $scope.loginFormData.loading = false;
                },
                function (response) {
                    $scope.loginFormData.loading = false;
                    console.log('passing to login', {loginFormData: $scope.loginFormData, response: response});
                    $state.go('login', {loginFormData: $scope.loginFormData, response: response});
                }
            );

            return false;
        };

        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.back = function () {
            window.history.go(-1);
        };

        $scope.notificationsOpen = false;
        $scope.toggleNotifications = function ($event) {
            preventDefault($event);
            $scope.notificationsOpen = !$scope.notificationsOpen;
            console.log($scope.notificationsOpen);
        };

    }
);
