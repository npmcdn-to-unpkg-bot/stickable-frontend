app.factory(
    'SessionResource',
    function ($resource) {
        return $resource(
            apiUrl + 'sessions',
            {
                sessionToken: '@sessionToken',
            },
            {
                get: {
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.session;
                    }
                }
            }
        );
    }
);
