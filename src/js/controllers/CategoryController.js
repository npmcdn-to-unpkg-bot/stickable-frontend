app.controller(
    'CategoryController',
    function ($scope, $rootScope, $state, $stateParams, CategoryResource) {

        $rootScope.loading = true;

        $scope.category = null;
        $scope.hasSubcategories = false;
        $scope.hasStickers = false;

        CategoryResource.get({slug: $stateParams.slug}, function (category) {
            $scope.category = category;
            $scope.hasSubcategories = category.subcategories.length > 0;
            $scope.hasStickers = category.stickers.length > 0;
        });
    }
);
