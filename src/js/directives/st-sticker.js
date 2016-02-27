app.directive('stSticker', function factory() {
    return {
        restrict: 'E',

        link: function ($scope, $element) {

            function getInitials(string) {
                return string.match(/\b\w/g).join('')
            }

            $scope.$watch("sticker", function (newSticker) {

                if (newSticker) {
                    $element.children('div').remove();

                    if (newSticker.design && newSticker.design.imageUrl) {
                        $element.html('<span class="sticker" data-sticker-img="' + newSticker.design.imageUrl + '"></span>');
                        Sticker.init($element.children('.sticker')[0]);
                    } else {

                        var initials = getInitials(newSticker.name);
                        $element.html('<span class="sticker sticker-initials"><span>' + initials + '</span></span>');
                    }
                }

            });

        },

        scope: {
            sticker: '=',
        }
    };
});
