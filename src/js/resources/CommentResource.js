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
                save: {
                    method: 'POST',
                    url: apiUrl + 'posts/:postId/comments',
                },

                saveReply: {
                    method: 'POST',
                    url: apiUrl + 'comments/:commentId/replies',
                },

                getPostsComments: {
                    method: 'GET',
                    url: apiUrl + 'posts/:postId/comments',
                    //isArray: true
                },

                getCommentReplies: {
                    method: 'GET',
                    url: apiUrl + 'comments/:commentId/replies',
                    //isArray: true
                },

                getLikes: {
                    url: apiUrl + 'comments/:commentId/likes',
                    method: 'GET'
                },

                likeComment: {
                    url: apiUrl + 'comments/:commentId/likes',
                    method: 'POST'
                },

                unlikeComment: {
                    url: apiUrl + 'comments/:commentId/likes',
                    method: 'DELETE'
                }

            }
        );
    }
);
