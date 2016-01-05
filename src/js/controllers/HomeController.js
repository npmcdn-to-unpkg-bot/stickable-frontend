app.controller(
    'HomeController',
    function ($scope, $rootScope, CategoryResource) {

        $rootScope.title = '';
        $rootScope.subtitle = '';

        var splashImages = [
            'aurora',
            'field',
            'girl',
            'hiking',
            'stars',
            'surfboard',
            'trees'
        ];

        splashImages.shuffle();
        $scope.splashImage = '/assets/img/splash/' + splashImages[0] + '.jpg';

        $scope.categories = CategoryResource.query();
    }
);
