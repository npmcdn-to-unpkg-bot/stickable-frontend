app.controller(
    'HelpController',
    function ($element, $scope, $rootScope) {
        $rootScope.pageTitle = 'Help';
        setBg($element, '/assets/img/bg/about.jpg');
    }
);
