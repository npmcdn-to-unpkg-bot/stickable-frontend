app.controller(
    'BrowseController',
    function ($scope, $rootScope, CategoryResource) {
        $scope.categories = CategoryResource.query();
    }
);
