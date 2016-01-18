app.controller(
    'BrowseController',
    function ($scope, $rootScope, CategoryResource) {
        $rootScope.pageTitle = '';
        $scope.categories = CategoryResource.query();
    }
);
