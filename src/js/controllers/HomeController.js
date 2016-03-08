app.controller(
    'HomeController',
    function ($element,
              $state,
              $scope,
              $rootScope,
              $filter,
              CategoryResource,
              PostResource,
              StickerResource,
              ModalService,
              debounce,
              ToDoResource,
              EventLogResource) {

        var splashImages = [
            'aurora',
            'field',
            'girl',
            'hiking',
            'stars',
            'surfboard',
            'trees'
        ];
        splashImages.shuffle();
        $scope.splashImage = '/assets/img/splash/' + splashImages[0] + '.jpg';

        $scope.setBg = function () {
            setBg($element, $scope.splashImage);
        };

        $scope.setBg();

        $scope.eventLog = EventLogResource.query();

        /**
         * Sticker Search
         */

        $scope.searchData = {
            value: ''
        };
        $scope.searchResults = [];

        $scope.searchLoading = false;

        var debouncedSearch = debounce(300, function() {
            if ($scope.searchData.value) {
                $scope.searchOpen = true;
                $scope.searchLoading = true;

                StickerResource.search(
                    {
                        q: $scope.searchData.value
                    },
                    function (results) {

                        for (var i = 0; i < results.length; i++) {
                            var result = results[i];
                            if (result.type === 'task') {
                                result.isOnToDoList = result.task.isOnToDoList;
                            } else {
                                result.isOnToDoList = result.sticker.isOnToDoList;
                            }
                        }

                        $scope.searchLoading = false;
                        $scope.searchResults = results;
                    }
                );
            }
        });

        $scope.search = function () {
            debouncedSearch();
        };

        $scope.searchFocus = function () {
            $rootScope.searchOpen = true;
            $scope.setBg();
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        };

        $scope.closeSearch = function () {
            $scope.searchData.value = '';
            $scope.searchResults = [];
            $rootScope.searchOpen = false;
        };

        $scope.searchBlur = function () {

            if ($('.close-search-btn:visible').length < 1) { // Hack to detect >= md
                if (!$scope.searchData.value) {
                    $rootScope.searchOpen = false;
                }
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

        $scope.toggleToDo = function ($event, result) {

            preventDefault($event);

            var data = {};
            var name = '';
            if (result.type === 'task') {
                data.taskId = result.task.id;
                name = result.task.name;
            } else {
                data.stickerId = result.sticker.id;
                name = result.sticker.name;
            }

            if (result.isOnToDoList) {
                result.isOnToDoList = false;
                result.people -= 1;

                ToDoResource.delete(
                    {username: $rootScope.currentUser.username},
                    data,
                    function (result) {
                        alertSuccess('Removed ' + name + ' from your To Do List');
                    },
                    function (result) {
                        alertError(result.data.message);
                    }
                );
            } else {
                result.isOnToDoList = true;
                result.people += 1;

                ToDoResource.save(
                    {username: $rootScope.currentUser.username},
                    data,
                    function (result) {
                        alertSuccess('Added ' + name + ' to your To Do List');
                    },
                    function (result) {
                        alertError(result.data.message);
                    }
                );
            }

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
