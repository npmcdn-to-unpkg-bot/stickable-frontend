app.factory(
    'StickerResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'stickers/:slug',
            {
                slug: '@slug',
                earntId: '@earntId',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                get: {
                    //cache: true,
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data.sticker;
                    }
                },

                getDoers: {
                    method: 'GET',
                    url: apiUrl + 'stickers/:slug/doers'
                },

                getEarners: {
                    method: 'GET',
                    url: apiUrl + 'stickers/:slug/earners'
                },

                likeEarner: {
                    method: 'POST',
                    url: apiUrl + 'stickers/:slug/earners/:earntId/likes'
                },

                unlikeEarner: {
                    method: 'DELETE',
                    url: apiUrl + 'stickers/:slug/earners/:earntId/likes'
                }

            }
        );
    }
);
