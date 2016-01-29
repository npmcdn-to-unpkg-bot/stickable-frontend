app.factory(
    'PostResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'posts/:id',
            {
                id: '@id',
                taskSlug: '@taskSlug',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                /**
                 * Get recent submission posts (for homepage)
                 */
                query: {

                },

                getTaskPosts: {
                  method: 'GET',
                    url: apiUrl + 'tasks/:taskSlug/posts',
                },

                /**
                 * Get a single post
                 */
                get: {
                    cache: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.post;
                    }
                },


            }
        );
    }
);
