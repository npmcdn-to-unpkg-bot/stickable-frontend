app.controller(
    'CommentFormController',
    function ($scope, $rootScope, $state, $stateParams, CommentResource) {

        console.log('commentformcontroller', $scope);

        $scope.task = $scope.$parent.task;



    }
);
