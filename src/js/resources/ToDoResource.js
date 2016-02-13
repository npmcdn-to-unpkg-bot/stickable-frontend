app.factory(
    'ToDoResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'users/:username/todo',
            {
                username: '@username',
                slug: '@slug',
                taskId: '@taskId',
                toDoId: '@toDoId',
                sessionToken: function () {
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
                    url: apiUrl + 'users/:username/todo/:taskId'
                },

                getLikes: {
                    method: 'GET',
                    url: apiUrl + 'todo/:toDoId/likes'
                },

                likeDoer: {
                    method: 'POST',
                    url: apiUrl + 'todo/:toDoId/likes'
                },

                unlikeDoer: {
                    method: 'DELETE',
                    url: apiUrl + 'todo/:toDoId/likes'
                }
            }
        );
    }
);
