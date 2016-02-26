app.controller(
    'HomeController',
    function ($state, $scope, $rootScope, CategoryResource, PostResource, TaskResource, ModalService) {

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

        /*$scope.taskSearchData = {
            value: ''
        };
        $scope.taskResults = [];
        $scope.taskResultsVisible = false;
        $scope.taskResultsLoading = false;

        var debouncedTaskSearch = debounce(300, function() {
            if ($scope.taskSearchData.value) {
                $scope.taskResultsVisible = true;
                $scope.taskResultsLoading = true;

                TaskResource.search(
                    {q: $scope.taskSearchData.value},
                    function (tasks) {
                        $scope.taskResults = tasks;
                    }
                )

            } else {
                $scope.taskResultsVisible = false;
            }
        });

        $scope.searchTasks = function () {
            debouncedTaskSearch();
        };*/

        $scope.taskSearchUrl = apiUrl + '/tasks/search?q=';

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
        };

        $scope.showPostTasks = true;
        $scope.posts = PostResource.query();
    }
);
