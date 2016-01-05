app.factory(
    'UserToDoResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'user/:username/todo',
            {
                username: '@username',
                slug: '@slug',
                taskId: '@taskId',
                sessionToken: function() {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                query: {
                    method: 'GET',
                    /*transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.user;
                    }*/
                },

                delete: {
                    method: 'DELETE',
                    url: apiUrl + 'user/:username/todo/:taskId'
                }
            }
        );
    }
);
