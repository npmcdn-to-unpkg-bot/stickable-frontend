app.directive('sticker', function factory() {
    return {
        restrict: 'C',
        link: function ($scope, element) {
            $scope.$watch("img", function (newValue, oldValue) {
                if (newValue) {
                    console.log('img', newValue);
                    Sticker.init(element[0]);
                    element.find('.sticker-img').css('background-image', 'url(' + $scope.img + ')');
                }
            });
        },
        scope: {
            img: '@'
        }
    };
});
