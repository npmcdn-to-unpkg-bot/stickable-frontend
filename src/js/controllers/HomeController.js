app.controller(
    'HomeController',
    function ($state, $scope, $rootScope, $filter, CategoryResource, PostResource, StickerResource, ModalService, debounce) {

        $scope.setBg = function () {
            setBg($('.home-splash'), '/assets/img/splash/badges.png');
        };

        setTimeout($scope.setBg(), 1);

        $rootScope.pageTitle = '';

        /*var splashImages = [
            'aurora',
            'field',
            'girl',
            'hiking',
            'stars',
            'surfboard',
            'trees'
        ];
        splashImages.shuffle();
        $scope.splashImage = '/assets/img/splash/' + splashImages[0] + '.jpg';*/

        //$scope.categories = CategoryResource.query();

        /**
         * Sticker Search
         */

        $scope.searchData = {
            value: ''
        };
        $scope.searchResults = [];
        $scope.searchResultsVisible = false;
        $scope.searchResultsLoading = false;

        var debouncedSearch = debounce(300, function() {
            if ($scope.searchData.value) {
                $scope.searchResultsVisible = true;
                $scope.searchResultsLoading = true;

                StickerResource.search(
                    {
                        q: $scope.searchData.value
                    },
                    function (results) {
                        $scope.searchResultsLoading = false;
                        $scope.searchResults = results;
                    }
                );

            }
        });

        $scope.search = function () {
            debouncedSearch();
        };

        $scope.searchFocus = function () {
            $scope.searchResultsVisible = true;
            $scope.setBg();
        };

        $scope.searchBlur = function () {
            if (!$scope.searchData.value) {
                $scope.searchResultsVisible = false;
            }
        };

        $scope.newSticker = function (name) {

            name = $filter('titlecase')(name);

            ModalService.showModal({
                templateUrl: 'views/modals/sticker-form.html',
                controller: 'StickerFormController',
                inputs: {
                    name: name,
                }
            }).then(function(modal) {

                 modal.close.then(function (sticker) {
                    if (sticker) {
                        $state.go('sticker', {slug: sticker.slug});
                    }
                });

            });
        };


        /*$scope.taskSearchUrl = apiUrl + '/tasks/search?q=';

        $scope.onTaskSelect = function (object) {
            console.log(object);
            if (object.hasOwnProperty('new')) {

                ModalService.showModal({
                    templateUrl: 'views/modals/task-form.html',
                    controller: 'TaskFormController',
                    inputs: {
                        name: object.new,
                    }
                }).then(function(modal) {

                     modal.close.then(function (task) {
                        if (task) {
                            $state.go('task', {slug: task.slug});
                        }
                    });

                });

            } else {
                $state.go('task', {slug: object.originalObject.slug});
            }
        };*/

        /**
         * Recent Posts
         */
        $scope.showPostTasks = true;
        $scope.posts = PostResource.query();
    }
);
