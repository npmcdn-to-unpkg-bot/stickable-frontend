app.controller(
    'SettingsController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource, $timeout) {

        $rootScope.pageTitle = 'Settings';

        $scope.hasNewImage = false;

        var dropzone;
        $timeout(function () {
            dropzone = new Dropzone("#settings-image", {
                acceptedFiles: "image/*",
                maxFiles: 1,
                autoProcessQueue: false,
                url: '/api/images?sessionToken=' + AuthService.getSessionToken(),
                clickable: '.dropzone-btn',
                thumbnailWidth: 100,
            });

            dropzone.on("addedfile", function () {
                if (dropzone.files[1] != null) {
                    dropzone.removeFile(dropzone.files[0]);
                }
                $scope.hasNewImage = dropzone.files.length > 0;
                $scope.$apply();
            });

            dropzone.on('success', function (file) {
                console.log(file);
                var response = JSON.parse(file.xhr.response);
                console.log('response');
                if (response && response.hasOwnProperty('image')) {
                    $scope.formData.imageId = response.image.id;
                }
                console.log('$scope.formData', $scope.formData);
                $scope.finishSubmit();
            });

            dropzone.on('error', function (file, errorMessage) {
                alertError('Unable to save avatar. ' + errorMessage.message);
            });

            dropzone.on("removedfile", function () {
                $scope.hasNewImage = dropzone.files.length > 0;
                $scope.formData.imageId = false;
                try {
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }
                } catch (e) {

                }
            });

        }, 10);

        $scope.formData = {
            about: '',
            imageId: ''
        };
        $scope.user = null;

        $scope.init = function () {

            if (!$rootScope.currentUser) {
                return false;
            }

            UserResource.get({username: $rootScope.currentUser.username}, function (user) {
                console.log(user);
                $scope.user = user;
                $scope.formData.about = user.profile.about;
            });
        };

        $rootScope.$on('login', function () {
            $scope.init();
        });

        $scope.init();

        $scope.submit = function () {
            if ($scope.hasNewImage) {
                // Send avatar to server
                dropzone.processQueue();
            } else {
                $scope.finishSubmit();
            }
        };

        $scope.finishSubmit = function () {
            UserResource.update(
                {username: $rootScope.currentUser.username},
                $scope.formData,
                function (response) {
                    $scope.formData.loading = false;
                    $scope.user = response.user;
                    $scope.hasNewImage = false;
                    dropzone.removeAllFiles();
                    alertSuccess("Changes saved");
                },
                function (response) {
                    $scope.formData.loading = false;

                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('picture')
                            ||
                            response.data.messages.hasOwnProperty('about')
                        )
                    ) {
                        $scope.formData.errors = response.data.messages;
                    } else {

                        alertError(response.data.message);
                    }

                }
            )
        };

        $scope.generatingAvatar = false;
        $scope.generateAvatar = function ($event) {
            preventDefault($event);
            if ($scope.generatingAvatar) {
                return false
            }

            $scope.generatingAvatar = true;

            UserResource.generateAvatar(
                {username: $rootScope.currentUser.username},
                {},
                function (response) {
                    $scope.generatingAvatar = false;
                    $scope.user = response.user;
                    $scope.hasNewImage = false;
                    dropzone.removeAllFiles();
                    alertSuccess("Changes saved");
                },
                function (response) {
                    $scope.generatingAvatar = false;
                    alertError(response.data.message);

                }
            )
        }
    }
);
