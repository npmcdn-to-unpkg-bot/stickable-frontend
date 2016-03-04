app.controller(
    'StickersController',
    function ($element, $scope, $rootScope) {
        $rootScope.pageTitle = 'Popular Stickers';
        setBg($element, '/assets/img/bg/about.jpg');
    }
);
