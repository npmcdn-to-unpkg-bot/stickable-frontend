app.factory(
    'EventLogResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'event-logs',
            {
                id: '@id',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                query: {
                    isArray: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.events;
                    }
                },

                likeEvent: {
                    url: apiUrl + 'event-logs/:id/likes',
                    method:'POST'
                },

                unlikeEvent: {
                    url: apiUrl + 'event-logs/:id/likes',
                    method:'DELETE'
                }
            }
        );
    }
);
