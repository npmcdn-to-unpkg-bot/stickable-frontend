app.controller(
    'StickerController',
    function ($scope, $rootScope, $state, $stateParams, StickerResource) {

        $rootScope.loading = true;

        $scope.sticker = null;
        $scope.hasEarners = false;

        StickerResource.get({slug: $stateParams.slug}, function (sticker) {
            $rootScope.loading = false;
            //$rootScope.pageTitle = sticker.name;
            $scope.sticker = sticker;
            $scope.hasEarners = sticker.earners.length > 0;
        });
    }
);
