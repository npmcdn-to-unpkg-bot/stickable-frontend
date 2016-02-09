app.directive('quill',
    function ($timeout) {
        return {
            scope: {
                'toolbarEntries': '@?',
                'toolbar': '@?',
                'showToolbar': '=?',
                'fontfamilyOptions': '=?',
                'fontsizeOptions': '=?',
                'linkTooltip': '@?',
                'imageTooltip': '@?',
                'theme': '@?',
                'save': '@?',
                'translations': '=?',
                'required': '@?editorRequired',
                'readOnly': '&?',
                'errorClass': '@?',
                'ngModel': '='
            },
            require: 'ngModel',
            restrict: 'C',
            templateUrl: 'views/directives/quill.html',
            link: function ($scope, element, attr, ngModel) {

                var quill;

                var config = {
                    //theme: 'snow',
                    styles: false,
                    modules: {
                        'image-tooltip': true,
                        'link-tooltip': true
                    }
                };

                $timeout(function () {

                    quill = new Quill(element[0].querySelector('.quill-editor'), config);

                    quill.addModule('toolbar', {
                        container: element[0].querySelector('.quill-toolbar')
                    });

                    element.find('.ql-editor').addClass('needsclick');

                }, 1);

            }
        };
    }
);
