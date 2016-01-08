app.factory(
    'SubmissionResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'submissions/:id',
            {
                id: '@id',
                sessionToken: function() {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                query:{
                    isArray: true,
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        return data.submissions;
                    }
                },
            }
        );
    }
);
