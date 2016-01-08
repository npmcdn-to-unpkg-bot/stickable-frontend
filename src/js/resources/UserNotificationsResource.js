app.factory(
    'UserNotificationsResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'users/:username/notifications/:id',
            {
                username: '@username',
                sessionToken: function() {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.notifications
                    }
                }
            }
        );
    }
);
