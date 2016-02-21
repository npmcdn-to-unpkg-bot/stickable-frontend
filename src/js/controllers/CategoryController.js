app.controller(
    'CategoryController',
    function ($scope, $rootScope, $state, $stateParams, $element, CategoryResource) {

        $rootScope.loading = true;

        $scope.category = null;
        $scope.hasSubcategories = false;
        $scope.hasStickers = false;
        $rootScope.pageTitle = '';

        CategoryResource.get({slug: $stateParams.slug}, function (category) {

            $scope.category = category;
            $rootScope.pageTitle = category.name;

            $scope.hasSubcategories = category.subcategories.length > 0;
            $scope.hasStickers = category.stickers.length > 0;

            $.backstretch(category.bgUrl);
            //$element.css('background-image', 'url(' + category.bgUrl + ')');

        });
    }
);
