app.factory(
    'SubmissionResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'submissions/:submissionId',
            {
                submissionId: '@submissionId',
                taskSlug: '@taskSlug',
                sessionToken: function () {
                    return AuthService.getSessionToken() || null;
                }
            },
            {
                save: {
                    method: 'POST',
                    url: apiUrl + 'tasks/:taskSlug/submissions'
                },
            }
        );
    }
);
