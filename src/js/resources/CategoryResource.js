app.factory(
    'CategoryResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'categories/:slug',
            {
                slug: '@slug',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                get: {
                    cache: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.category;
                    }
                },

                query: {
                    cache: true,
                    isArray: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.categories;
                    }
                }
            }
        );
    }
);
