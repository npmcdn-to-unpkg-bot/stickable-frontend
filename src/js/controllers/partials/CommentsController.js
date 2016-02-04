app.controller(
    'CommentsController',
    function ($scope, $state, CommentResource) {

        $scope.likeComment = function($event, comment) {
            preventDefault($event);

            comment.liked = comment.liked ? false : true;
            comment.likeClicked = true;

            if (comment.liked) {
                CommentResource.likeComment({commentId: comment.id});
                comment.likeCount = parseInt(comment.likeCount) + 1;
            } else {
                CommentResource.unlikeComment({commentId: comment.id});
                comment.likeCount = parseInt(comment.likeCount) - 1;
            }
        };

    }
);
