app.controller(
    'HomeController',
    function ($scope, $rootScope, CategoryResource, PostResource) {

        $rootScope.pageTitle = '';

        /*var splashImages = [
            'aurora',
            'field',
            'girl',
            'hiking',
            'stars',
            'surfboard',
            'trees'
        ];
        splashImages.shuffle();
        $scope.splashImage = '/assets/img/splash/' + splashImages[0] + '.jpg';*/
        $scope.splashImage = 'http://img.ctrlv.in/img/16/01/21/56a06452057e0.png';

        //$scope.categories = CategoryResource.query();

        $scope.showPostTasks = true;
        $scope.posts = PostResource.query();
    }
);
