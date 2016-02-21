app.controller(
    'BotController',
    function ($element, $scope, $rootScope, TaskResource) {
        $rootScope.pageTitle = '';
        //setBg($element, '/assets/img/bg/feet.jpg');

        var skipMessages = [
            'No thanks',
            'Screw that',
            'That Sucks',
            'I don\'t want to',
            'Pass',
            'Nope',
            'Something better',
            'Something else'
        ];

        var goMessages = [
            'Sounds good',
            'Sure',
            'Let\'s do it',
            'I\'m in'
        ];

        $scope.skipMessage = null;
        $scope.goMessage = null;
        $scope.task = null;
        $scope.loading = false;

        $scope.formData = {
            cost: null,
            time: null
        };

        $scope.findTask = function () {
            $scope.loading = true;
            $scope.task = null;
            TaskResource.query(
                $scope.formData,
                function (task) {

                    console.log(task);

                    $scope.loading = false;
                    $scope.task = task;
                    clearBg();
                    setBg($element, task.bgUrl);

                    skipMessages.shuffle();
                    $scope.skipMessage = skipMessages[0];

                    goMessages.shuffle();
                    $scope.goMessage = goMessages[0];
                }, function (response) {

                    $scope.loading = false;
                    $scope.task = false;

                }
            );
        };

        $scope.findTask();

        $scope.$watch('formData.cost', function() {
             $scope.findTask();
        });

        $scope.$watch('formData.time', function() {
             $scope.findTask();
        });
    }
);
