app.factory(
    'TaskResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'tasks/:slug',
            {
                slug: '@slug',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                get: {
                    cache: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.task;
                    }
                },

                addSubmission: {
                    method: 'POST',
                    url: apiUrl + 'tasks/:slug/submissions'
                },

                getComments: {
                    method: 'GET',
                    url: apiUrl + 'tasks/:slug/comments',
                    isArray: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.comments;
                    }
                }
            }
        );
    }
);
