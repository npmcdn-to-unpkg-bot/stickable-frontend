app.directive('stComments', function factory() {
    return {
        restrict: 'E',
        scope: {
            comments: '=',
            showCommentForm: '='
        },
        controller: function ($scope, CommentResource) {

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

            $scope.loadCommentReplies = function ($event, comment) {
                preventDefault($event);
                CommentResource.getCommentReplies(
                    {
                        'commentId': comment.id
                    },
                    function (response) {
                        comment.replies = response.comments
                    },
                    function (response) {
                        alertError(response.data.message);
                    }
                )
            };

            $scope.deleteComment = function ($event, index, comment) {
                preventDefault($event);
                if (confirm('Are you sure you want to delete this comment?')) {
                    CommentResource.delete({commentId: comment.id});
                    $scope.comments.splice(index, 1);
                }
            };

        },
        template: function($scope) {
            return '<div class="comment-include" ng-repeat="(index, comment) in comments" ng-include="\'views/partials/comment.html\'"></div>';
        }
    };
});
