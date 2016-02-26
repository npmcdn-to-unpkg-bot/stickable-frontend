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
                query: {
                    isArray: false,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.task;
                    }
                },

                search: {
                    url: apiUrl + 'tasks/search',
                    isArray: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.tasks;
                    }
                },

                get: {
                    cache: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.task;
                    }
                },

                getDoers: {
                    method: 'GET',
                    url: apiUrl + 'tasks/:slug/doers'
                },
            }
        );
    }
);
