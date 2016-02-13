app.directive('userList', function factory() {
    return {
        restrict: 'C',
        scope: {
            data: '=',
            like: '='
        },
        templateUrl: 'views/directives/user-list.html'
    };
});
