app.controller(
    'HelpController',
    function ($element, $scope, $rootScope) {
        $rootScope.pageTitle = '';
        setBg($element, '/assets/img/bg/about.jpg');
    }
);
