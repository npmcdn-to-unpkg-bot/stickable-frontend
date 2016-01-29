app.factory(
    'CommentResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'comments/:commentId',
            {
                commentId: '@commentId',
                postId: '@postId',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {

                getPostsComments: {
                    method: 'GET',
                    url: apiUrl + 'posts/:postId/comments',
                    isArray: true
                },

                getCommentReplies: {
                    method: 'GET',
                    url: apiUrl + 'comments/:commentId/replies',
                    isArray: true
                }


            }
        );
    }
);
