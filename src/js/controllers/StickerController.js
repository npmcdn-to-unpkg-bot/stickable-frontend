app.controller(
    'StickerController',
    function ($scope, $rootScope, $state, $stateParams, StickerResource, ToDoResource, ProgressService, ModalService) {

        $rootScope.loading = true;

        $scope.sticker = null;
        $scope.progress = null;
        $scope.taskPadding = 0;
        StickerResource.get({slug: $stateParams.slug}, function (sticker) {

            $rootScope.loading = false;
            $rootScope.pageTitle = sticker.name;

            $scope.sticker = sticker;
            if (sticker.progress) {
                $scope.progress = ProgressService.getProgress(sticker);
            }

            setBg($('.sticker-splash'), sticker.bgUrl);

            $scope.loadDoers();
            $scope.earners = StickerResource.getEarners({slug: sticker.slug});
            $scope.taskPadding = Math.max(0, 6 - sticker.tasks.length);
        });

        $scope.loadDoers = function () {
            StickerResource.getDoers({slug: $scope.sticker.slug}, function (result) {
                $scope.doers = result;
            });
        };

        $scope.toggleToDo = function () {

            if ($scope.sticker.isOnToDoList) {
                $scope.sticker.isOnToDoList = false;
                ToDoResource.delete(
                    {username: $rootScope.currentUser.username},
                    {stickerId: $scope.sticker.id},
                    function (result) {
                        alertSuccess('Removed ' + $scope.sticker.name + ' from your To Do List');
                        //$scope.sticker.isOnToDoList = false;
                        $scope.loadDoers();
                    },
                    function (result) {
                        alertError(result.data.message);
                    }
                );
            } else {
                $scope.sticker.isOnToDoList = true;
                ToDoResource.save(
                    {username: $rootScope.currentUser.username},
                    {stickerId: $scope.sticker.id},
                    function (result) {
                        alertSuccess('Added ' + $scope.sticker.name + ' to your To Do List');
                        //$scope.task.isOnToDoList = true;
                        $scope.loadDoers();
                    },
                    function (result) {
                        alertError(result.data.message);
                    }
                );
            }

        };

        $scope.likeEarner = function ($event, earner) {
            preventDefault($event);

            earner.likeClicked = true;
            earner.pivot.liked = earner.pivot.liked ? false : true;

            if (earner.pivot.liked) {
                earner.likeCount = earner.pivot.likeCount = parseInt(earner.pivot.likeCount) + 1;
                StickerResource.likeEarner({slug: $scope.sticker.slug, earntId: earner.pivot.id});
            } else {
                earner.likeCount = earner.pivot.likeCount = parseInt(earner.pivot.likeCount) - 1;
                StickerResource.unlikeEarner({slug: $scope.sticker.slug, earntId: earner.pivot.id});
            }

            earner.likeCount = earner.pivot.likeCount;
        };

        $scope.likeDoer = function ($event, doer) {
            preventDefault($event);

            doer.likeClicked = true;
            doer.pivot.liked = doer.pivot.liked ? false : true;

            if (doer.pivot.liked) {
                doer.pivot.likeCount = parseInt(doer.pivot.likeCount) + 1;
                ToDoResource.likeDoer({toDoId: doer.pivot.id});
            } else {
                doer.pivot.likeCount = parseInt(doer.pivot.likeCount) - 1;
                ToDoResource.unlikeDoer({toDoId: doer.pivot.id});
            }

            doer.likeCount = doer.pivot.likeCount;
        };

        $scope.addTask = function ($event) {
            preventDefault($event);

            ModalService.showModal({
                templateUrl: 'views/modals/task-form.html',
                controller: 'TaskFormController',
                inputs: {
                    sticker: $scope.sticker
                }
            }).then(function (modal) {

                modal.close.then(function (task) {
                    if (task) {
                        $state.go('task', {slug: task.slug});
                    }
                });

            });

        };

    }
);
