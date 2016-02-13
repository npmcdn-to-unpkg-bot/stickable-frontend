app.directive('stickerProgress', function factory() {
    return {
        restrict: 'C',
        scope: {
            progress: '='
        },
        templateUrl: 'views/directives/sticker-progress.html'
    };
});
