app.directive('stNotifications', function () {
    return {
        templateUrl: 'views/directives/st-notifications.html',
        //replace: true,
        scope: {
            notifications: '=',
            toggle: '='
        },
        controller: function ($scope, $rootScope, $state, UserNotificationsResource) {

            $scope.clear = function ($event, index) {
                preventDefault($event);
                var notification = $scope.notifications[index];
                $scope.notifications.splice(index, 1);
                if ($scope.notifications.length < 1) {
                    $rootScope.notificationsOpen = false;
                }
                console.log('$scope.notifications', $scope.notifications, $scope.notifications.length, $rootScope.notificationsOpen);
                UserNotificationsResource.delete({username: $rootScope.currentUser.username, id: notification.id});
            };

            $scope.goTo = function ($event, index) {
                preventDefault($event);
                var notification = $scope.notifications[index];

                $scope.clear($event, index);
                $scope.toggle($event);

                switch (notification.destination.type) {
                    case 'comment':
                        $state.go('post', {
                            slug: notification.destination.task.slug,
                            postSlug: notification.destination.post.slug,
                            commentId: notification.commentId
                        });
                        break;

                    case 'post':
                        $state.go('post', {
                            slug: notification.destination.task.slug,
                            postSlug: notification.destination.post.slug
                        });
                        break;

                    case 'task':
                        $state.go('task', {slug: notification.destination.task.slug});
                        break;

                    case 'sticker':
                        $state.go('sticker', {slug: notification.destination.sticker.slug});
                        break;
                }
            };
        }
    }
});
