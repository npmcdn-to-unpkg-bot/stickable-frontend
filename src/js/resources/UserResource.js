app.factory(
    'UserResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'user/:username',
            {
                username: '@username',
                sessionToken: function() {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                get: {
                    cache: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.user;
                    }
                },

                save: {
                    method: 'POST',
                    url: apiUrl + 'user'
                },

                update: {
                    method: 'PUT',
                },

                forgot: {
                    method: 'POST',
                    url: apiUrl + 'user/forgot'
                },

                reset: {
                    method: 'POST',
                    url: apiUrl + 'user/reset'
                },

                getStickers: {
                    method: 'GET',
                    url: apiUrl + 'user/:username/stickers'
                }
            }
        );
    }
);
