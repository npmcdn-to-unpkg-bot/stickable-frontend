app.controller(
    'StickerFormController',
    function ($scope, CategoryResource, name, close, StickerResource) {

        $scope.categories = CategoryResource.getList();

        $scope.close = close;

        $scope.formData = {
            name: name,
            categoryId: null
        };

        $scope.submit = function () {
            StickerResource.save(
                $scope.formData,
                function (response) {
                    console.log(response);
                    alertSuccess("Sticker saved");
                    close(response.sticker);
                },
                function (response) {
                    alertError(response.data.message);
                }
            );
        }

    }
);
