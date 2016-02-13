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

        //$scope.categories = CategoryResource.query();

        $scope.showPostTasks = true;
        $scope.posts = PostResource.query();
    }
);
