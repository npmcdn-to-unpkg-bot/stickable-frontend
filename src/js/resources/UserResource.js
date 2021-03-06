app.factory(
    'UserResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'users',
            {
                username: '@username',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                get: {
                    url: apiUrl + 'users/:username',
                    cache: true,
                    transformResponse: function (data) {
                        var data = angular.fromJson(data);
                        return data.user;
                    }
                },

                update: {
                    method: 'PUT',
                    url: apiUrl + 'users/:username'
                },

                generateAvatar: {
                    method: 'POST',
                    url: apiUrl + 'users/:username/generate-avatar'
                },

                save: {
                    method: 'POST',
                },

                forgot: {
                    method: 'POST',
                    url: apiUrl + 'users/forgot'
                },

                reset: {
                    method: 'POST',
                    url: apiUrl + 'users/reset'
                },

                getStickers: {
                    method: 'GET',
                    url: apiUrl + 'users/:username/stickers'
                },

                getPosts: {
                    method: 'GET',
                    url: apiUrl + 'users/:username/posts'
                },

                getSubmissions: {
                    method: 'GET',
                    url: apiUrl + 'users/:username/submissions'
                }
            }
        );
    }
);
