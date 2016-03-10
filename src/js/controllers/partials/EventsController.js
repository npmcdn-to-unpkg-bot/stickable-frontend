app.controller(
    'EventsController',
    function ($scope, $state, EventLogResource) {

        $scope.likeEvent = function($event, event) {
            preventDefault($event);

            event.liked = event.liked ? false : true;
            event.likeClicked = true;

            if (event.liked) {
                EventLogResource.likeEvent({id: event.id});
                event.likeCount = parseInt(event.likeCount) + 1;
            } else {
                EventLogResource.unlikeEvent({id: event.id});
                event.likeCount = parseInt(event.likeCount) - 1;
            }
        };

    }
);
