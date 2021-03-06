app.controller(
    'SubmissionFormController',
    function ($scope, SubmissionResource, task, close, $timeout, AuthService) {

        $scope.task = task;
        $scope.submissionType = task.submissionType.toLowerCase();
        $scope.close = close;

        $scope.hasFirstStage = $scope.submissionType === 'image';

        $scope.stage = $scope.hasFirstStage ? 1 : 2;
        $scope.nextEnabled = $scope.hasFirstStage ? false : true;

        $scope.errors = {};

        $scope.formData = {
            imageIds: [],
            title: '',
            text: '',
            private: 0,
            cost: null,
            time: null,
            rating: null
        };

        function getImageIds() {
            var ids = [];
            var files = dropzone.getFilesWithStatus('success');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var response = JSON.parse(file.xhr.response);
                if (response && response.hasOwnProperty('image')) {
                    ids.push(response.image.id);
                }
            }
            return ids;
        }

        var dropzone;

        if ($scope.submissionType === 'image') {
            $timeout(function () {
                dropzone = new Dropzone("#post-file", {
                    acceptedFiles: "image/*",
                    addRemoveLinks: true,
                    url: '/api/images?sessionToken=' + AuthService.getSessionToken(),
                    clickable: '.dropzone-btn',
                    thumbnailWidth: 96,
                });

                dropzone.on('sending', function () {
                    $scope.nextEnabled = false;
                    $scope.$apply();
                });

                dropzone.on('complete', function () {
                    console.log('getFilesWithStatus', dropzone.getFilesWithStatus('success'));
                    $scope.nextEnabled = dropzone.getFilesWithStatus('success').length > 0;
                    $scope.$apply();
                });

                dropzone.on('removedfile', function () {
                    $scope.nextEnabled = dropzone.getFilesWithStatus('success').length > 0;
                    $scope.$apply();
                });

            }, 10);
        }

        $scope.toStage = function (stage) {
            //if (stage > $scope.stage) {
            //    return false;
            //}
            $scope.stage = stage;
        };

        $scope.nextStage = function () {

            switch ($scope.stage) {
                case 1:
                    if ($scope.submissionType === 'image') {
                        dropzone.processQueue();
                        $scope.formData.imageIds = getImageIds();
                    }
                    break;

                case 2:

                    break;
            }

            $scope.stage++;
        };

        $scope.setPrivate = function ($event, val) {
            preventDefault($event);

            $scope.formData.private = val;
        };

        $scope.submitting = false;

        $scope.submit = function () {

            if ($scope.submitting) {
                return false;
            }

            var errors = false;

            $scope.errors = {};

            if (!$scope.formData.title) {
                $scope.errors.title = ['Please enter a title.'];
                $scope.stage = 2;
                errors = true;
            }

            if (!$scope.formData.text) {
                $scope.errors.text = ['Please enter some content.'];
                $scope.stage = 2;
                errors = true;
            }

            if (errors) {
                return false;
            }

            $scope.submitting = true;

            SubmissionResource.save(
                {
                    taskSlug: $scope.task.slug,
                },
                $scope.formData,
                function (response) {
                    $scope.submitting = false;
                    console.log(response);
                    alertSuccess("Submission saved");
                },
                function (response) {

                    $scope.submitting = false;

                    if (
                        response.data.messages
                        &&
                        (
                            response.data.messages.hasOwnProperty('title')
                            ||
                            response.data.messages.hasOwnProperty('text')
                        )
                    ) {
                        $scope.errors = response.data.messages;
                    } else {
                        alertError(response.data.message);
                    }

                }
            );

        };

    }
);
