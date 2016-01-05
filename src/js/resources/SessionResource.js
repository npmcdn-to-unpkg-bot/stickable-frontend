app.factory(
    'SessionResource',
    function ($resource) {
        return $resource(
            apiUrl + 'session',
            {
                sessionToken: '@sessionToken',
            },
            {
                get: {
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        return data.session;
                    }
                }
            }
        );
    }
);
