app.controller(
    'StickerFormController',
    function ($scope, CategoryResource, name, close, StickerResource) {

        $scope.categories = CategoryResource.getList();

        $scope.close = close;

        $scope.formData = {
            name: name,
            categoryId: null
        };

        $scope.errors = {};

        $scope.submitting = false;

        $scope.submit = function () {

            if ($scope.submitting) {
                return false;
            }

            var errors = false;

            $scope.errors = {};

            if (!$scope.formData.name) {
                $scope.errors.name = ['Please enter a name.'];
                errors = true;
            }

            if (!$scope.formData.categoryId) {
                $scope.errors.categoryId = ['Please pick a category.'];
                errors = true;
            }

            if (errors) {
                return false;
            }

            $scope.submitting = true;

            StickerResource.save(
                $scope.formData,
                function (response) {
                    $scope.submitting = false;
                    console.log(response);
                    alertSuccess("Sticker saved");
                    close(response.sticker);
                },
                function (response) {
                    $scope.submitting = false;
                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('name')
                            ||
                            response.data.messages.hasOwnProperty('categoryId')
                        )
                    ) {
                        $scope.errors = response.data.messages;
                    } else {
                        alertError(response.data.message);
                    }
                }
            );
        }

    }
);
