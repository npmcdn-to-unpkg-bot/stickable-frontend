app.controller(
    'NewController',
    function ($element, $scope, $rootScope) {
        $rootScope.pageTitle = '';
        setBg($element, '/assets/img/bg/news.jpg');
    }
);
