app.directive('notifications', function () {
    return {
        templateUrl: 'views/directives/notifications.html',
        replace: true,
        controller: function ($scope, $state) {

            $scope.goTo = function ($event, notification) {
                preventDefault($event);

                switch (notification.destination.type) {
                    case 'comment':
                        $state.go('post', {
                            slug: notification.destination.post.slug,
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
