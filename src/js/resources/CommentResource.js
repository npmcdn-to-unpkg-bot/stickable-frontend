app.factory(
    'CommentResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'comments',
            {
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {}
        );
    }
);
