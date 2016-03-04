app.controller(
    'BrowseController',
    function ($element, $scope, $rootScope, CategoryResource) {

        $rootScope.pageTitle = 'Categories';

        $scope.categories = CategoryResource.query();
        setBg($element, '/assets/img/bg/cats.jpg');
    }
);
