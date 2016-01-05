app.controller(
    'SettingsController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource) {


        // FIXME: currentUser isn't loaded yet if the app is loaded on the settings page

        $rootScope.loading = true;

        $scope.settingsFormData = {
            loading: false,

            about: '',
            picture: ''
        };

        $scope.user = null;

        UserResource.get({username: $rootScope.currentUser.username}, function (user) {

            $rootScope.loading = false;
            $scope.user = user;

            $scope.settingsFormData.about = user.profile.about;
            $scope.settingsFormData.picture = user.picture;

        });

        $scope.uploadPicture = function() {
            alert('CtrlV upload would go here/');
            /*ctrlv.upload(function(image){
                $('input[name=picture]').val(image.urls.image);
                $('#settings-picture').attr('src', image.urls.image);
            });*/
        };

        $scope.submit = function () {

            $scope.settingsFormData.loading = true;
            UserResource.update(
                {username: $rootScope.currentUser.username},
                {
                    picture: $scope.settingsFormData.picture,
                    about: $scope.settingsFormData.about
                },
                function (response) {
                    $scope.settingsFormData.loading = false;
                    alertSuccess("Changes saved");
                },
                function (response) {
                    $scope.settingsFormData.loading = false;

                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('picture')
                            ||
                            response.data.messages.hasOwnProperty('about')
                        )
                    ) {
                        $scope.settingsFormData.errors = response.data.messages;
                    } else {

                        alertError(response.data.message);
                    }

                }
            )

        };
    }
);
