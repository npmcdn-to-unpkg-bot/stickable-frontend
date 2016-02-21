app.controller(
    'BrowseController',
    function ($element, $scope, $rootScope, CategoryResource) {
        $rootScope.pageTitle = '';
        $scope.categories = CategoryResource.query();
        setBg($element, '/assets/img/bg/cats.jpg');
    }
);
