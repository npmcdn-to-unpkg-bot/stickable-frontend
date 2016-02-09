app.controller(
    'StickerController',
    function ($scope, $rootScope, $state, $stateParams, StickerResource, UserToDoResource) {

        $rootScope.loading = true;

        $scope.sticker = null;
        $scope.hasEarners = false;

        StickerResource.get({slug: $stateParams.slug}, function (sticker) {
            $rootScope.loading = false;
            //$rootScope.pageTitle = sticker.name;
            $scope.sticker = sticker;
            $scope.hasEarners = sticker.earners.length > 0;
        });

        $scope.addToDo = function () {
            console.log('addToDo');
            UserToDoResource.save(
                {username: $rootScope.currentUser.username},
                {stickerId: $scope.sticker.id},
                function (result) {
                    alertSuccess('Added to To Do List');
                    $scope.sticker.isOnToDoList = true;
                },
                function (result) {
                    alertError(result.data.message);
                }
            );
        };

        $scope.removeToDo = function () {
            UserToDoResource.delete(
                {username: $rootScope.currentUser.username},
                {stickerId: $scope.sticker.id},
                function (result) {
                    alertSuccess('Removed from To Do List');
                    $scope.sticker.isOnToDoList = false;
                },
                function (result) {
                    alertError(result.data.message);
                }
            );
        };
    }
);
