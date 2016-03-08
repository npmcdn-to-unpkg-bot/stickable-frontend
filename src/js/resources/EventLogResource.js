app.factory(
    'EventLogResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'event-log',
            {
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
                }
            }
        );
    }
);
