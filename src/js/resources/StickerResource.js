app.factory(
    'StickerResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'stickers/:slug',
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
                        return data.sticker;
                    }
                }
            }
        );
    }
);
