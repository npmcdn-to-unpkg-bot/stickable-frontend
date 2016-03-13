app.factory(
    'PostResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'posts/:id',
            {
                id: '@id',
                postSlug: '@postSlug',
                taskSlug: '@taskSlug',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                /**
                 * Get recent submission posts (for homepage)
                 */
                query: {},

                getTaskPosts: {
                    method: 'GET',
                    url: apiUrl + 'tasks/:taskSlug/posts',
                },

                saveTaskPost: {
                    method: 'POST',
                    url: apiUrl + 'tasks/:taskSlug/posts',
                },

                /**
                 * Get a single post
                 */
                get: {
                    url: apiUrl + 'posts/:postSlug',
                    cache: true,
                    /*transformResponse: function (data) {
                     data = angular.fromJson(data);
                     return data.post;
                     }*/
                },

                likePost: {
                    url: apiUrl + 'posts/:id/likes',
                    method: 'POST'
                },

                unlikePost: {
                    url: apiUrl + 'posts/:id/likes',
                    method: 'DELETE'
                }

            }
        );
    }
);
